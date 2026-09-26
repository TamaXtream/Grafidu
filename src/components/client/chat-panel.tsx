"use client";

import { useEffect, useRef, useState } from "react";
import { aiReply, resolveAction as resolveAiAction } from "@/lib/ai";
import { getCurrentUser } from "@/lib/auth";
import { update } from "@/lib/store";

const AVATAR = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
  </svg>
);

type ActionState = "pending" | "executed" | "declined" | "failed";

export type PendingAction = {
  id: number;
  tool: string;
  summary: string;
  state: ActionState;
  result?: string;
};

export type ChatMsg = { role: "user" | "ai"; text: string; action?: PendingAction };

export default function ChatPanel({
  initial,
  suggestions,
}: {
  initial: ChatMsg[];
  suggestions: string[];
}) {
  const [messages, setMessages] = useState<ChatMsg[]>(initial);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages]);

  function send(text?: string) {
    const t = (text ?? input).trim();
    if (!t || busy) return;
    const u = getCurrentUser();
    if (!u) return;
    setInput("");
    setBusy(true);
    setMessages((prev) => [...prev, { role: "user", text: t }]);
    update((db) => {
      db.chatMessages.push({
        id: db.nextId++,
        userId: u.id,
        role: "user",
        text: t,
        createdAt: new Date().toISOString(),
      });
    });
    // Small delay so the typing indicator stays readable.
    window.setTimeout(() => {
      let reply: string;
      let action: PendingAction | undefined;
      try {
        const res = aiReply(u, t);
        reply = res.reply;
        if (res.pendingAction) {
          action = { ...res.pendingAction, state: "pending" as ActionState };
        }
      } catch {
        reply = "Maaf, aku tidak bisa menjawab sekarang.";
      }
      update((db) => {
        db.chatMessages.push({
          id: db.nextId++,
          userId: u.id,
          role: "ai",
          text: reply,
          createdAt: new Date().toISOString(),
        });
      });
      setMessages((prev) => [...prev, { role: "ai", text: reply, action }]);
      setBusy(false);
    }, 400);
  }

  function patchAction(msgIndex: number, patch: Partial<PendingAction>) {
    setMessages((prev) =>
      prev.map((m, i) =>
        i === msgIndex && m.action ? { ...m, action: { ...m.action, ...patch } } : m
      )
    );
  }

  function handleResolve(msgIndex: number, actionId: number, decision: "confirm" | "decline") {
    const u = getCurrentUser();
    if (!u) return;
    const res = resolveAiAction(u, actionId, decision === "confirm");
    patchAction(msgIndex, {
      state: res.ok ? (decision === "confirm" ? "executed" : "declined") : "failed",
      result: res.result ?? res.error,
    });
  }

  return (
    <div className="chat-area">
      <div className="chat-log" id="chat-log" ref={logRef}>
        {messages.map((m, i) => (
          <div key={i}>
            <div className={"msg" + (m.role === "user" ? " user" : "")}>
              {m.role === "ai" && <span className="ai-avatar">{AVATAR}</span>}
              <div className="bubble">{m.text}</div>
            </div>
            {m.action ? (
              <ActionCard
                action={m.action}
                onResolve={(decision) => handleResolve(i, m.action!.id, decision)}
              />
            ) : null}
          </div>
        ))}
        {busy ? (
          <div className="msg">
            <span className="ai-avatar">{AVATAR}</span>
            <div className="bubble">
              <span className="typing">Mengetik...</span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="suggests">
        {suggestions.map((s) => (
          <button key={s} className="suggest" onClick={() => send(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          id="chat-input"
          placeholder="Tanya apa saja soal belajarmu..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
        />
        <button className="chat-send" id="chat-send" aria-label="Kirim" onClick={() => send()}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m22 2-7 20-4-9-9-4z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function ActionCard({
  action,
  onResolve,
}: {
  action: PendingAction;
  onResolve: (decision: "confirm" | "decline") => void;
}) {
  return (
    <div className="msg" data-action-id={action.id}>
      <span className="ai-avatar">{AVATAR}</span>
      <div
        className="bubble"
        style={{
          border: "1.5px solid var(--purple, #751EF8)",
          background: "var(--purple-soft, #F5F0FF)",
          minWidth: 260,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
          </svg>
          <b style={{ fontSize: 13 }}>Aksi AI</b>
        </div>
        <p style={{ margin: "0 0 10px", fontSize: 13.5 }}>{action.summary}</p>

        {action.state === "pending" ? (
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => onResolve("confirm")}
            >
              Konfirmasi
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => onResolve("decline")}
            >
              Batalkan
            </button>
          </div>
        ) : (
          <span
            className={"pill " + (action.state === "executed" ? "pill-green-plain" : "pill-gray")}
            style={{ fontSize: 12 }}
          >
            {action.state === "executed"
              ? "Dijalankan ✓"
              : action.state === "declined"
                ? "Dibatalkan"
                : "Gagal"}
          </span>
        )}
        {action.result && action.state !== "pending" ? (
          <p style={{ margin: "8px 0 0", fontSize: 12, color: "var(--gray-4)" }}>{action.result}</p>
        ) : null}
      </div>
    </div>
  );
}

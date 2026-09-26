"use client";

import { useState } from "react";
import { getCurrentUser } from "@/lib/auth";
import { update, useDB } from "@/lib/store";

const CHECK = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function StudentTodoManager() {
  const db = useDB();
  const [input, setInput] = useState("");
  const user = getCurrentUser();

  const todos = (db?.todos ?? [])
    .filter((t) => t.userId === user?.id)
    .sort((a, b) => a.id - b.id);

  const doneCount = todos.filter((t) => t.done).length;
  const pct = todos.length ? Math.round((doneCount / todos.length) * 100) : 0;

  function toggle(id: number) {
    update((d) => {
      const t = d.todos.find((x) => x.id === id && x.userId === user?.id);
      if (t) t.done = !t.done;
    });
  }

  function addTodo() {
    const v = input.trim();
    if (!v || !user) return;
    update((d) => {
      d.todos.push({
        id: d.nextId++,
        userId: user.id,
        title: v,
        subtitle: "Kegiatan pribadi",
        done: false,
        createdAt: new Date().toISOString(),
      });
    });
    setInput("");
  }

  return (
    <>
      <h1 className="page-title">To-Do List Pribadi</h1>
      <p className="page-sub">Kelola target harianmu — catat, centang, dan selesaikan satu per satu.</p>

      <div className="progress-card" style={{ marginTop: 24, maxWidth: 640 }}>
        <div className="head">
          <span>Progres To-Do Hari Ini</span>
          <b data-progress-label>{pct}%</b>
        </div>
        <div className="prog">
          <i data-progress-fill style={{ width: `${pct}%` }}></i>
        </div>
      </div>

      <div className="search-row" style={{ maxWidth: 640, marginTop: 22 }}>
        <div className="search-box">
          <input
            type="text"
            id="todo-input"
            placeholder="Tambah kegiatan pribadi..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
          />
        </div>
        <button
          className="chat-send"
          style={{ width: 44, height: 44, borderRadius: 10, flex: "none" }}
          id="todo-add"
          aria-label="Tambah"
          onClick={addTodo}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      <div id="todo-list" style={{ maxWidth: 640, marginTop: 18 }}>
        {todos.map((t) => (
          <div
            key={t.id}
            className={"task-card" + (t.done ? " done" : "")}
            data-check
            data-todo-id={t.id}
            onClick={() => toggle(t.id)}
            role="checkbox"
            aria-checked={t.done}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(t.id);
              }
            }}
          >
            <span className="tbox">{CHECK}</span>
            <span>
              <b>{t.title}</b>
              <span>{t.subtitle}</span>
            </span>
          </div>
        ))}
      </div>

      <div
        className="empty-state"
        id="todo-empty"
        style={{ display: todos.length === 0 ? "block" : "none", maxWidth: 640 }}
      >
        <span className="es-ic">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </span>
        <b>Semua beres!</b>
        <span>Tidak ada kegiatan. Tambahkan target baru atau minta bantuan AI.</span>
      </div>
    </>
  );
}
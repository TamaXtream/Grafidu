"use client";

import { useState } from "react";
import { getCurrentUser } from "@/lib/auth";
import { fmtDate } from "@/lib/format";
import { update, useDB } from "@/lib/store";
import MateriDialog from "@/components/dialogs/materi-dialog";

export default function TeacherMateriManager({ classes }: { classes: string[] }) {
  const db = useDB();
  const user = getCurrentUser();
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  const items = (db?.materials ?? [])
    .filter((m) => m.teacherId === user?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((m) => {
      const klass = db?.classes.find((c) => c.id === m.classId)?.name ?? "";
      return {
        id: m.id,
        title: m.title,
        meta: `${klass} · PDF · ${m.pages} halaman · ${fmtDate(m.createdAt)}`,
        class_name: klass,
        status: m.status,
        views: m.views,
      };
    });

  function toggleAccordion(id: number) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handlePublish(id: number) {
    if (!user) return;
    update((d) => {
      const m = d.materials.find((x) => x.id === id && x.teacherId === user.id);
      if (m) m.status = "tayang";
    });
    window.gtoast?.("Materi tayang ke siswa.");
  }

  function handleDelete(id: number) {
    if (!user) return;
    update((d) => {
      d.materials = d.materials.filter((x) => !(x.id === id && x.teacherId === user.id));
    });
    window.gtoast?.("Materi dihapus.");
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 className="page-title">Materi</h1>
          <p className="page-sub">Bagikan materi dan bahan ajar — praktik siswa tetap nyambung dengan apa yang kamu ajarkan.</p>
        </div>
        <button
          className="btn btn-primary"
          data-dialog="dlg-materi"
          onClick={() => document.getElementById("dlg-materi")?.dispatchEvent(new MouseEvent("click"))}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Bagikan Materi
        </button>
      </div>

      <div className="two-panel" style={{ marginTop: 24 }}>
        <div className="panel" style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px" }}>
          <span style={{ flex: "none", width: 38, height: 38, borderRadius: 10, background: "var(--purple-soft)", color: "var(--purple)", display: "grid", placeItems: "center" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </span>
          <span>
            <b style={{ display: "block", fontSize: 14.5 }}>{items.length} materi dibagikan</b>
            <span style={{ fontSize: 12.5, color: "var(--gray-4)" }}>ke {classes.length} kelas semester ini</span>
          </span>
        </div>
        <div className="panel" style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px" }}>
          <span style={{ flex: "none", width: 38, height: 38, borderRadius: 10, background: "#E3F0FF", color: "var(--blue)", display: "grid", placeItems: "center" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </span>
          <span>
            <b style={{ display: "block", fontSize: 14.5 }}>
              {items.reduce((acc, m) => acc + m.views, 0)} kali dilihat siswa
            </b>
            <span style={{ fontSize: 12.5, color: "var(--gray-4)" }}>minggu ini</span>
          </span>
        </div>
      </div>

      <div id="materi-list" style={{ marginTop: 6 }}>
        {items.map((m) => {
          const isOpen = openIds.has(m.id);
          return (
            <div key={m.id} className={"quiz-row acc-row" + (isOpen ? " open" : "")} data-materi={m.id}>
              <span className="task-ic" style={{ background: "#E3F0FF", color: "var(--blue)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </span>
              <span className="info">
                <b>{m.title}</b>
                <span>{m.meta}</span>
              </span>
              <span className="right">
                <span className={"pill " + (m.status === "tayang" ? "pill-green-plain" : "pill-gray")}>
                  {m.status === "tayang" ? "Tayang" : "Draft"}
                </span>
                <button
                  className="chev"
                  aria-label="Detail materi"
                  aria-expanded={isOpen}
                  onClick={() => toggleAccordion(m.id)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </span>
              <div className="acc-body">
                <div>
                  <div className="acc-inner">
                    <div className="acc-meta">
                      <span><b>Kelas:</b> {m.class_name}</span>
                      <span><b>Dilihat:</b> {m.views} kali</span>
                    </div>
                    <div className="acc-actions">
                      {m.status === "draft" ? (
                        <button
                          className="btn-mini btn-mini-primary"
                          data-publish={m.id}
                          onClick={() => handlePublish(m.id)}
                        >
                          Tayangkan
                        </button>
                      ) : (
                        <button
                          className="btn-mini btn-mini-primary"
                          onClick={() => window.gtoast?.(`Materi dibagikan ulang ke ${m.class_name}.`)}
                        >
                          Bagikan Ulang
                        </button>
                      )}
                      <button
                        className="btn-mini btn-mini-ghost"
                        onClick={() => window.gtoast?.("Materi diunduh.")}
                      >
                        Unduh
                      </button>
                      <button
                        className="btn-mini btn-mini-danger"
                        data-del={m.id}
                        onClick={() => handleDelete(m.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MateriDialog classes={classes} />
    </>
  );
}
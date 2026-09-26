"use client";

import { useState } from "react";
import Link from "next/link";

export type FormattedMaterial = {
  id: number;
  title: string;
  subject: string;
  teacher: string;
  teacherAvatar: string;
  className: string;
  pages: number;
  views: number;
  date: string;
  readTime: string;
};

export default function StudentMateriFilter({
  materials,
}: {
  materials: FormattedMaterial[];
}) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  const subjects = ["all", "Bahasa Indonesia", "Seni Budaya", "Matematika", "Fisika", "Informatika"];

  const filtered = materials.filter((m) => {
    const matchesFilter = filter === "all" || m.subject.toLowerCase().includes(filter.toLowerCase());
    const matchesQuery =
      !q ||
      m.title.toLowerCase().includes(q.toLowerCase()) ||
      m.teacher.toLowerCase().includes(q.toLowerCase()) ||
      m.subject.toLowerCase().includes(q.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <>
      <div className="search-row" style={{ marginTop: 24 }}>
        <div className="search-box">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Cari materi, bab, atau nama guru..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="select-box">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Semua Mapel</option>
            <option value="Bahasa Indonesia">Bahasa Indonesia</option>
            <option value="Seni Budaya">Seni Budaya</option>
            <option value="Matematika">Matematika</option>
            <option value="Fisika">Fisika</option>
            <option value="Informatika">Informatika</option>
          </select>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <div className="chips">
        {subjects.map((s) => (
          <button
            key={s}
            type="button"
            className={"chip" + (filter === s ? " on" : "")}
            onClick={() => setFilter(s)}
          >
            {s === "all" ? "Semua" : s}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
        {filtered.map((m) => (
          <div
            key={m.id}
            className="quiz-row hover-lift"
            style={{ padding: "16px 20px", alignItems: "center" }}
          >
            <span
              className="task-ic"
              style={{
                background: "#E3F0FF",
                color: "var(--blue)",
                width: 44,
                height: 44,
                borderRadius: 12,
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </span>

            <div className="info" style={{ flex: 1, minWidth: 0 }}>
              <b style={{ fontSize: 15, marginBottom: 2 }}>{m.title}</b>
              <span style={{ fontSize: 12.5, color: "var(--gray-4)", display: "flex", gap: 12, flexWrap: "wrap" }}>
                <span>{m.subject} • {m.teacher}</span>
                <span>{m.pages} halaman PDF</span>
                <span>⏱ ~{m.readTime}</span>
                <span>{m.views}x dibaca</span>
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Link
                href={`/student/materi/${m.id}`}
                className="btn btn-primary btn-sm"
              >
                Baca Materi
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state" style={{ display: "block" }}>
          <span className="es-ic">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <b>Tidak ada materi yang cocok</b>
          <span>Coba ubah kata kunci atau pilih mata pelajaran lain.</span>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import type { ClassStudent } from "@/lib/data";

const UP = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2F9E5B" strokeWidth="2.2">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);
const DOWN = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F9564A" strokeWidth="2.2">
    <path d="M7 7l10 10M17 9v8H9" />
  </svg>
);

export default function TeacherGradesManager({
  classes,
  studentsByClass,
}: {
  classes: string[];
  studentsByClass: Record<string, ClassStudent[]>;
}) {
  const [activeClass, setActiveClass] = useState("all");

  const students =
    activeClass === "all"
      ? Object.values(studentsByClass)
          .flat()
          .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
          .sort((a, b) => a.name.localeCompare(b.name))
      : studentsByClass[activeClass] || [];

  return (
    <>
      <h1 className="page-title">Nilai Siswa</h1>
      <p className="page-sub">
        Pantau perkembangan nilai siswa per kelas dan identifikasi siswa yang perlu perhatian.
      </p>

      <div className="chips" id="class-chips" style={{ marginTop: 24 }}>
        <button
          className={"chip" + (activeClass === "all" ? " on" : "")}
          data-class="all"
          onClick={() => setActiveClass("all")}
        >
          Semua Kelas
        </button>
        {classes.map((c) => (
          <button
            key={c}
            className={"chip" + (activeClass === c ? " on" : "")}
            data-class={c}
            onClick={() => setActiveClass(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="detail-card" style={{ marginTop: 20 }}>
        <div className="sec-row" style={{ margin: "0 0 14px" }}>
          <h3 style={{ fontSize: 17 }}>Rata-rata Nilai Siswa</h3>
          <span className="page-sub" id="tg-count" style={{ margin: 0 }}>
            {students.length} siswa
          </span>
        </div>
        <table className="sub-table">
          <thead>
            <tr>
              <th className="c">No</th>
              <th>Nama Siswa</th>
              <th className="c">Rata-rata</th>
              <th className="c">Trend</th>
              <th className="act">Status</th>
            </tr>
          </thead>
          <tbody id="tg-body">
            {students.map((s, i) => (
              <tr key={s.id}>
                <td className="c">{i + 1}</td>
                <td>
                  <Link
                    href={`/teacher/students/${s.id}`}
                    style={{ color: "var(--purple)", fontWeight: 500, textDecoration: "none" }}
                    className="hover-underline"
                  >
                    {s.name} →
                  </Link>
                </td>
                <td className="c">
                  <b>{s.avg}</b>
                </td>
                <td className="c">{s.trend === 1 ? UP : DOWN}</td>
                <td className="act">
                  <span className={"pill " + (s.avg >= 70 ? "pill-green" : "pill-red")}>
                    {s.avg >= 70 ? "Atas Rata Rata" : "Bawah Rata Rata"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="empty-state"
          id="tg-empty"
          style={{ display: students.length === 0 ? "block" : "none" }}
        >
          <b>Tidak ada data siswa</b>
        </div>
      </div>
    </>
  );
}
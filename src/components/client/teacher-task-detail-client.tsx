"use client";

import { Fragment, useState } from "react";
import { getCurrentUser } from "@/lib/auth";
import { update, useDB } from "@/lib/store";
import { fmtDate } from "@/lib/format";

export type SubmittedStudent = {
  sub_id: number;
  student: string;
  avatar: string;
  date: string;
  grade: number | null;
  feedback: string;
};

export type UnsubmittedStudent = {
  student: string;
  avatar: string;
};

const CHECK = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function TeacherTaskDetailClient({ taskId }: { taskId: number }) {
  const db = useDB();
  const user = getCurrentUser();
  const [searchYes, setSearchYes] = useState("");
  const [searchNo, setSearchNo] = useState("");

  const [activeGradeId, setActiveGradeId] = useState<number | null>(null);
  const [scoreInput, setScoreInput] = useState(85);
  const [feedbackInput, setFeedbackInput] = useState("");

  const task = db?.tasks.find((t) => t.id === taskId);
  const submittedStatuses = (db?.taskStatuses ?? []).filter(
    (s) => s.taskId === taskId && s.submittedAt !== null
  );

  const yesList: SubmittedStudent[] = submittedStatuses
    .map((s) => {
      const st = db?.users.find((u) => u.id === s.studentId);
      return {
        sub_id: s.id,
        student: st?.name ?? "Siswa",
        avatar: st?.avatar ?? "/assets/logo.png",
        date: s.submittedAt ? fmtDate(s.submittedAt) : "—",
        grade: s.grade,
        feedback: s.feedback,
      };
    })
    .sort((a, b) => a.sub_id - b.sub_id);

  const submittedIds = new Set(submittedStatuses.map((s) => s.studentId));
  const noList: UnsubmittedStudent[] = (db?.enrollments ?? [])
    .filter((e) => e.classId === task?.classId && !submittedIds.has(e.studentId))
    .map((e) => {
      const st = db?.users.find((u) => u.id === e.studentId);
      return { student: st?.name ?? "Siswa", avatar: st?.avatar ?? "/assets/logo.png" };
    })
    .sort((a, b) => a.student.localeCompare(b.student));

  const filteredYes = yesList.filter((s) =>
    s.student.toLowerCase().includes(searchYes.toLowerCase())
  );
  const filteredNo = noList.filter((s) =>
    s.student.toLowerCase().includes(searchNo.toLowerCase())
  );

  function handleSaveGrade(subId: number) {
    const me = user;
    if (!me || !task) return;
    const score = Math.max(0, Math.min(100, Math.round(Number(scoreInput))));
    if (isNaN(score)) {
      window.gtoast?.("Nilai harus angka 0-100.", "error");
      return;
    }
    const cleanFeedback = feedbackInput.trim();
    update((d) => {
      const row = d.taskStatuses.find((s) => s.id === subId);
      if (!row) return;
      row.grade = score;
      row.feedback = cleanFeedback;
      // Mirror the grade table so the student's average and report card sync.
      d.grades.push({
        id: d.nextId++,
        studentId: row.studentId,
        subject: task.subject || me.subject || "Tugas",
        kind: "Tugas",
        score,
        gradeDate: new Date().toISOString(),
      });
    });
    setActiveGradeId(null);
    setFeedbackInput("");
    window.gtoast?.("Nilai tersimpan.");
  }

  function handleRemind() {
    window.gtoast?.(`Pengingat dikirim ke ${noList.length} siswa.`);
  }

  return (
    <>
      <div className="sub-sec">
        <div className="sub-sec-head">
          <span className="dot dot-green"></span>
          <h3>Sudah Mengumpulkan</h3>
          <span className="cnt">{yesList.length} siswa</span>
        </div>
        <div className="search-row" style={{ maxWidth: 560, marginBottom: 16 }}>
          <div className="search-box">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Cari Siswa..."
              data-search=".sub-table tr"
              value={searchYes}
              onChange={(e) => setSearchYes(e.target.value)}
            />
          </div>
        </div>
        <table className="sub-table">
          <thead>
            <tr>
              <th className="c">No</th>
              <th>Siswa</th>
              <th>Turned In Date</th>
              <th className="act">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredYes.map((s, i) => (
              <Fragment key={s.sub_id}>
                <tr className={activeGradeId === s.sub_id ? "grade-row-open" : ""}>
                  <td className="c">{i + 1}</td>
                  <td>{s.student}</td>
                  <td>{s.date}</td>
                  <td className="act">
                    {s.grade != null ? (
                      <span className="graded-tag">
                        <span className="score-chip">{s.grade}</span>
                        {CHECK}Dinilai
                      </span>
                    ) : (
                      <button
                        className="btn-grade"
                        data-sub={s.sub_id}
                        onClick={() => {
                          setActiveGradeId(s.sub_id);
                          setScoreInput(85);
                        }}
                      >
                        Grade
                      </button>
                    )}
                  </td>
                </tr>
                {activeGradeId === s.sub_id ? (
                  <tr className="grade-editor">
                    <td colSpan={4}>
                      <div className="grade-form">
                        <div className="gf-field">
                          <label>Nilai (0–100)</label>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={scoreInput}
                            onChange={(e) => setScoreInput(Number(e.target.value))}
                            aria-label="Nilai"
                          />
                        </div>
                        <div className="gf-field" style={{ flex: 2 }}>
                          <label>Catatan untuk siswa</label>
                          <textarea
                            placeholder="Masukkan umpan balik singkat..."
                            value={feedbackInput}
                            onChange={(e) => setFeedbackInput(e.target.value)}
                          />
                        </div>
                        <div className="gf-actions">
                          <button
                            className="btn btn-primary btn-sm gf-save"
                            onClick={() => handleSaveGrade(s.sub_id)}
                          >
                            Simpan Nilai
                          </button>
                          <button
                            className="btn btn-outline btn-sm gf-cancel"
                            onClick={() => setActiveGradeId(null)}
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sub-sec">
        <div className="sub-sec-head">
          <span className="dot dot-red"></span>
          <h3>Belum Mengumpulkan</h3>
          <span className="cnt">{filteredNo.length} siswa</span>
        </div>
        <div className="search-row" style={{ maxWidth: 560, marginBottom: 16 }}>
          <div className="search-box">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Cari Siswa..."
              value={searchNo}
              onChange={(e) => setSearchNo(e.target.value)}
            />
          </div>
        </div>
        <table className="sub-table">
          <thead>
            <tr>
              <th className="c">No</th>
              <th>Siswa</th>
              <th>Turned In Date</th>
              <th className="act">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredNo.map((s, i) => (
              <tr key={i}>
                <td className="c">{i + 1}</td>
                <td>{s.student}</td>
                <td>—</td>
                <td className="act">
                  <button className="btn-remind" data-remind={taskId} onClick={handleRemind}>
                    Ingatkan
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

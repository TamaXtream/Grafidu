"use client";

import Link from "next/link";
import { useRequireUser } from "@/lib/auth";
import { useDB } from "@/lib/store";
import { getStudentSidebarData } from "@/lib/student-layout-data";
import { fmtDate } from "@/lib/format";
import { useTitle } from "@/lib/hooks";
import DashboardShell from "@/components/layout/dashboard-shell";
import StudentClassSearch from "@/components/client/student-class-search";
import StudentTasksRightbar from "@/components/client/student-tasks-rightbar";
import BodySync from "@/components/body-sync";

export default function StudentTasksPage() {
  const u = useRequireUser("student");
  const db = useDB();
  useTitle("Daftar Tugas — Grafidu");
  if (!u || !db) return null;

  const sidebarData = getStudentSidebarData(db, u);

  const todos = db.todos.filter((t) => t.userId === u.id).sort((a, b) => a.id - b.id);
  const pct = todos.length
    ? Math.round((todos.filter((t) => t.done).length / todos.length) * 100)
    : 33;

  const classes = db.teachings
    .filter((t) => t.classId === db.classes.find((c) => c.name === (u.className ?? ""))?.id)
    .map((t) => {
      const teacher = db.users.find((x) => x.id === t.teacherId);
      return {
        teacher: teacher?.name ?? "Guru",
        subject: teacher?.subject || "Umum",
        avatar: teacher?.avatar || "/assets/logo.png",
      };
    })
    .sort((a, b) => a.subject.localeCompare(b.subject));

  // School tasks for this student's class, newest deadline first.
  const classId = db.classes.find((c) => c.name === (u.className ?? ""))?.id;
  const schoolTasks = db.tasks
    .filter((t) => t.classId === classId)
    .sort((a, b) => new Date(b.dueAt).getTime() - new Date(a.dueAt).getTime())
    .map((t) => ({
      id: t.id,
      title: t.title,
      subject: t.subject,
      dueAt: t.dueAt,
      status: db.taskStatuses.find((s) => s.taskId === t.id && s.studentId === u.id),
    }));

  return (
    <>
      <BodySync dataPage="student-tasks" />
      <DashboardShell
        role="student"
        sidebar={sidebarData}
        activeNav="Tasks"
        rightbar={
          <StudentTasksRightbar aiNote="Fokuskan Pembelajaranmu ke Seni Budaya dan lanjutkan ke Fisika" />
        }
      >
        <h1 className="page-title">Daftar Tugas</h1>
        <p className="page-sub">Kelola pengerjaan tugas sekolah, project dan target harianmu.</p>

        <div className="progress-card" style={{ marginTop: 24 }}>
          <div className="head">
            <span>Progres Penyelesaian To-Do</span>
            <b data-progress-label>{pct}%</b>
          </div>
          <div className="prog">
            <i data-progress-fill style={{ width: `${pct}%` }}></i>
          </div>
        </div>

        {/* School Assignments Section */}
        <div className="sec-row" style={{ marginTop: 28, marginBottom: 14 }}>
          <h2 className="h2" style={{ margin: 0 }}>Tugas Sekolah</h2>
          <span style={{ fontSize: 13, color: "var(--gray-4)" }}>
            {schoolTasks.length} tugas terdaftar
          </span>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {schoolTasks.map((t) => {
            const isDone = t.status?.done;
            const isGraded = t.status?.grade != null;
            return (
              <Link
                key={t.id}
                href={`/student/tasks/${t.id}`}
                className="task-row hover-lift"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="task-ic">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="5" y="3" width="14" height="18" rx="2.5" />
                    <path d="M9 3.5V2h6v1.5" />
                    <path d="m8.6 12.4 2 2 4-4" />
                  </svg>
                </span>
                <span className="info">
                  <b>{t.title}</b>
                  <span>{t.subject} • Tenggat: {fmtDate(t.dueAt)}</span>
                </span>
                <span className="right" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  {isGraded ? (
                    <span className="pill pill-green">Nilai: {t.status!.grade}</span>
                  ) : isDone ? (
                    <span className="pill pill-green-plain">Sudah Dikumpulkan</span>
                  ) : (
                    <span className="pill pill-red">Belum Selesai</span>
                  )}
                  <span style={{ fontSize: 11, color: "var(--gray-4)" }}>Buka Detail →</span>
                </span>
              </Link>
            );
          })}
        </div>

        {/* Classes search */}
        <h2 className="h2" style={{ marginTop: 32 }}>Kelas yang Diikuti</h2>
        <StudentClassSearch classes={classes} />
      </DashboardShell>
    </>
  );
}

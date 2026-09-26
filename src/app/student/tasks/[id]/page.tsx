"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useRequireUser } from "@/lib/auth";
import { useDB } from "@/lib/store";
import { getStudentSidebarData, getStudentRightbarData } from "@/lib/student-layout-data";
import { fmtDate } from "@/lib/format";
import { useTitle } from "@/lib/hooks";
import DashboardShell from "@/components/layout/dashboard-shell";
import { StudentRightbar } from "@/components/layout/rightbar";
import StudentTaskSubmission from "@/components/client/student-task-submission";
import BodySync from "@/components/body-sync";

export default function StudentTaskDetailPage() {
  const params = useParams<{ id: string }>();
  const taskId = Number(params.id);
  const u = useRequireUser("student");
  const db = useDB();
  useTitle("Detail Tugas — Grafidu");
  if (!u || !db || isNaN(taskId)) return null;

  const task = db.tasks.find((t) => t.id === taskId);
  if (!task) return null;

  const sidebarData = getStudentSidebarData(db, u);
  const rightbarData = getStudentRightbarData(db, u);

  const status = db.taskStatuses.find(
    (s) => s.taskId === taskId && s.studentId === u.id
  );

  const isSubmitted = Boolean(status?.submittedAt);
  const submittedAtStr = status?.submittedAt ? fmtDate(status.submittedAt) : undefined;
  const creator = db.users.find((x) => x.id === task.createdBy);

  return (
    <>
      <BodySync dataPage="student-task-detail" />
      <DashboardShell
        role="student"
        sidebar={sidebarData}
        activeNav="Tasks"
        rightbar={
          <StudentRightbar
            grades={rightbarData.grades}
            aiNote={rightbarData.aiNote}
            ctaHref="/student/todo"
            ctaLabel="Buat To-Do List"
          />
        }
      >
        <div className="crumbs">
          <Link href="/student/tasks">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Daftar Tugas
          </Link>
          <span className="sep">/</span>
          <b>{task.title}</b>
        </div>

        <div className="detail-card">
          <div className="detail-head">
            <span className="task-ic">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="5" y="3" width="14" height="18" rx="2.5" />
                <path d="M9 3.5V2h6v1.5" />
                <path d="m8.6 12.4 2 2 4-4" />
              </svg>
            </span>
            <div>
              <h2 style={{ fontSize: 24, marginBottom: 4 }}>{task.title}</h2>
              <span style={{ fontSize: 13, color: "var(--purple)", fontWeight: 500 }}>
                {task.subject} • {creator?.name ?? "Guru"}
              </span>
            </div>
          </div>

          <div className="detail-meta">
            <span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Ditugaskan {fmtDate(task.assignedAt)}
            </span>
            <span>•</span>
            <span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              Tenggat: {fmtDate(task.dueAt)}
            </span>
          </div>

          <div className="desc-label">Deskripsi &amp; Petunjuk Tugas</div>
          <p className="desc-text" style={{ whiteSpace: "pre-line" }}>
            {task.description || "Tidak ada instruksi tambahan untuk tugas ini."}
          </p>
        </div>

        <StudentTaskSubmission
          taskId={taskId}
          isSubmitted={isSubmitted}
          submittedAtStr={submittedAtStr}
          grade={status?.grade}
          feedback={status?.feedback}
        />

      </DashboardShell>
    </>
  );
}

"use client";

import Image from "next/image";
import { useRequireUser } from "@/lib/auth";
import { useDB } from "@/lib/store";
import { getStudentSidebarData, getStudentRightbarData } from "@/lib/student-layout-data";
import { studentSubjects } from "@/lib/data";
import { useTitle } from "@/lib/hooks";
import DashboardShell from "@/components/layout/dashboard-shell";
import { StudentRightbar } from "@/components/layout/rightbar";
import { StatCard } from "@/components/ui/stat-card";
import StudentClassSearch from "@/components/client/student-class-search";
import BodySync from "@/components/body-sync";

export default function StudentHomePage() {
  const u = useRequireUser("student");
  const db = useDB();
  useTitle("Dashboard Siswa — Grafidu");
  if (!u || !db) return null;

  const sidebarData = getStudentSidebarData(db, u);
  const rightbarData = getStudentRightbarData(db, u);

  const subs = studentSubjects(db, u.id);
  const avg = subs.length
    ? Math.round(subs.reduce((acc, s) => acc + s.score, 0) / subs.length)
    : 0;

  const tasks = sidebarData.tasksToday;
  const done = tasks.filter((t) => t.done).length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 70;

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

  const subHead = `${classes.length} Kelas Terjadwal | ${tasks.length - done} Tugas Belum Terkerjakan | ${done} Tugas Telah Selesai`;

  return (
    <>
      <BodySync dataPage="student-home" />
      <DashboardShell
        role="student"
        sidebar={sidebarData}
        activeNav="Home"
        rightbar={
          <StudentRightbar
            grades={rightbarData.grades}
            aiNote={rightbarData.aiNote}
            ctaHref="/student/todo"
            ctaLabel="Buat To-Do List"
          />
        }
      >
        <div className="profile-head">
          <Image
            src={u.avatar.includes("jessie") ? "/assets/jessie-large.png" : u.avatar}
            alt={u.name}
            width={96}
            height={96}
          />
          <div>
            <div className="profile-name">
              {u.name} <span className="dot"></span>
              <small>{u.className}</small>
            </div>
            <div className="profile-sub">{subHead}</div>
          </div>
        </div>

        <h2 className="h2">Overview</h2>
        <div className="stat-grid">
          <StatCard label="Tugas Selesai" value={pct} tone="green" />
          <StatCard label="Rata-rata Nilai" value={avg} tone="blue" />
          <StatCard label="Tugas Baru" value={Math.max(0, tasks.length - done)} tone="purple" />
        </div>

        <h2 className="h2">Kelas</h2>
        <StudentClassSearch classes={classes} />
      </DashboardShell>j
    </>
  );
}

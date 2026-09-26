"use client";

import { useRequireUser } from "@/lib/auth";
import { useDB } from "@/lib/store";
import { getStudentSidebarData, getStudentRightbarData } from "@/lib/student-layout-data";
import { useTitle } from "@/lib/hooks";
import DashboardShell from "@/components/layout/dashboard-shell";
import { StudentRightbar } from "@/components/layout/rightbar";
import SettingsForm from "@/components/client/settings-form";
import BodySync from "@/components/body-sync";

export default function StudentSettingsPage() {
  const u = useRequireUser("student");
  const db = useDB();
  useTitle("Pengaturan Profil — Grafidu");
  if (!u || !db) return null;

  const sidebarData = getStudentSidebarData(db, u);
  const rightbarData = getStudentRightbarData(db, u);

  return (
    <>
      <BodySync dataPage="student-settings" />
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
        <h1 className="page-title">Pengaturan Profil</h1>
        <p className="page-sub">Kelola informasi akun, keamanan, dan preferensi notifikasi Anda.</p>
        <SettingsForm initialUser={u} />
      </DashboardShell>
    </>
  );
}

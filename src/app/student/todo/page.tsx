"use client";

import { useRequireUser } from "@/lib/auth";
import { useDB } from "@/lib/store";
import { getStudentSidebarData, getStudentRightbarData } from "@/lib/student-layout-data";
import { useTitle } from "@/lib/hooks";
import DashboardShell from "@/components/layout/dashboard-shell";
import { StudentRightbar } from "@/components/layout/rightbar";
import StudentTodoManager from "@/components/client/student-todo-manager";
import BodySync from "@/components/body-sync";

export default function StudentTodoPage() {
  const u = useRequireUser("student");
  const db = useDB();
  useTitle("To-Do List Pribadi — Grafidu");
  if (!u || !db) return null;

  const sidebarData = getStudentSidebarData(db, u);
  const rightbarData = getStudentRightbarData(db, u);

  return (
    <>
      <BodySync dataPage="student-todo" />
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
        <StudentTodoManager />
      </DashboardShell>
    </>
  );
}

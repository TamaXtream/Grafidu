import type { SessionUser } from "@/lib/auth";
import type { DB } from "@/lib/store";
import { studentSubjects } from "@/lib/data";
import type { TodayTask } from "@/components/layout/sidebar";
import type { GradeRow, Announcement } from "@/components/layout/rightbar";

export function getStudentSidebarData(
  db: DB,
  u: SessionUser
): {
  user: { name: string; sub: string; avatar: string };
  tasksToday: TodayTask[];
} {
  const classTasks = db.tasks.filter(
    (t) => t.classId === db.classes.find((c) => c.name === (u.className ?? ""))?.id
  );
  const statusFor = (taskId: number) =>
    db.taskStatuses.find((s) => s.taskId === taskId && s.studentId === u.id);

  const startToday = new Date();
  startToday.setHours(0, 0, 0, 0);
  let rows = classTasks
    .filter((t) => new Date(t.dueAt).getTime() === startToday.getTime())
    .sort((a, b) => a.id - b.id);

  if (rows.length === 0) {
    rows = [...classTasks]
      .sort((a, b) => new Date(b.dueAt).getTime() - new Date(a.dueAt).getTime())
      .slice(0, 3);
  }

  const tasksToday: TodayTask[] = rows.map((t) => {
    const st = statusFor(t.id);
    return {
      id: t.id,
      title: t.title,
      sub: t.subject || t.description,
      done: Boolean(st?.done),
    };
  });

  return {
    user: {
      name: u.name,
      sub: u.className ?? "Siswa",
      avatar: u.avatar || "/assets/jessie-side.png",
    },
    tasksToday,
  };
}

export function getStudentRightbarData(
  db: DB,
  u: SessionUser
): {
  grades: GradeRow[];
  aiNote: string;
  announcements: Announcement[];
} {
  const subs = studentSubjects(db, u.id);
  const grades: GradeRow[] = subs.map((s) => ({
    subject: s.subject,
    score: s.score,
    status: s.status,
  }));

  const annRows = [...db.announcements]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const announcements: Announcement[] = annRows.map((a, i) => ({
    title: a.title,
    body: a.body.slice(0, 120) + (a.body.length > 120 ? "..." : ""),
    when: a.createdLabel || "Baru saja",
    hl: i === 0,
  }));

  return {
    grades,
    aiNote: "Fokuskan Pembelajaranmu ke Seni Budaya dan lanjutkan ke Fisika",
    announcements,
  };
}

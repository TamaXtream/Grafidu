import type { SessionUser } from "@/lib/auth";
import type { DB } from "@/lib/store";
import { teacherClasses, classStudents } from "@/lib/data";
import type { StudentRow, Announcement } from "@/components/layout/rightbar";

export function getTeacherSidebarData(
  db: DB,
  u: SessionUser
): {
  user: { name: string; sub: string; avatar: string };
  classes: string[];
  tasksToday: [];
} {
  const classes = teacherClasses(db, u.id);
  return {
    user: {
      name: u.name,
      sub: u.subject ?? "Bahasa Indonesia",
      avatar: u.avatar || "/assets/budewi-side.png",
    },
    classes,
    tasksToday: [],
  };
}

export function getTeacherRightbarData(
  db: DB,
  u: SessionUser,
  klassOverride?: string
): {
  students: StudentRow[];
  aiNote: string;
  announcements: Announcement[];
} {
  const classes = teacherClasses(db, u.id);
  const klass = klassOverride || u.className || classes[0] || "XI RPL A";

  const stList = classStudents(db, klass);
  const students: StudentRow[] = stList.map((s) => ({ name: s.name, avg: s.avg }));

  const weak = stList.filter((s) => s.avg < 70);
  const aiNote = weak.length
    ? `Nilai rata-rata ${weak[0].name} masih paling rendah nih. Saya bakal siapin beberapa kuis tambahan buat bantu dia catch up.`
    : "Semua siswa dalam kondisi aman. Pertahankan!";

  const anns = [...db.announcements].sort((a, b) => a.id - b.id).slice(0, 2);
  const announcements: Announcement[] = anns.map((a, i) => ({
    title: a.title,
    body: a.body,
    when: a.createdLabel,
    hl: i === 0,
  }));

  return { students, aiNote, announcements };
}

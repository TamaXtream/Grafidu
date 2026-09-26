import Link from "next/link";

type Item = { label: string; href: string; icon: React.ReactNode };

const HOME = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M9 22V12h6v10" />
  </svg>
);
const TASKS = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 6h13M3 12h9M3 18h13" />
    <path d="m19 5 2 2-2 2" />
  </svg>
);
const GRADES = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 3v18h18" />
    <path d="M8 17v-6M13 17V7M18 17v-3" />
  </svg>
);
const AI = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
  </svg>
);
const MATERI = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
const QUIZ = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.6-3 2.6M12 17h.01" />
  </svg>
);

export function BottomNav({ role, active }: { role: "student" | "teacher"; active: string }) {
  const items: Item[] =
    role === "student"
      ? [
          { label: "Home", href: "/student/home", icon: HOME },
          { label: "Tasks", href: "/student/tasks", icon: TASKS },
        ]
      : [
          { label: "Home", href: "/teacher/home", icon: HOME },
          { label: "Tasks", href: "/teacher/tasks", icon: TASKS },
          { label: "Materi", href: "/teacher/materi", icon: MATERI },
          { label: "Grades", href: "/teacher/grades", icon: GRADES },
          { label: "Quiz Maker", href: "/teacher/quiz", icon: QUIZ },
          { label: "AI Agent", href: "/teacher/ai", icon: AI },
        ];
  return (
    <nav className="bottom-nav">
      {items.map((it) => (
        <Link key={it.href} href={it.href} className={active === it.label ? "on" : ""}>
          {it.icon}
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
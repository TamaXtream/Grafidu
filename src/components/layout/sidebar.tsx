"use client";

import Image from "next/image";
import Link from "next/link";

export type TodayTask = { id: string; title: string; sub: string; done: boolean };

export type SidebarPropsData = {
  user: { name: string; sub: string; avatar: string };
  tasksToday: TodayTask[];
  classes?: string[];
};

export const CAL_DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const CAL_ROWS: { d: number | ""; cls?: string; em?: string }[][] = [
  [
    { d: 27, cls: "dim" }, { d: 28, cls: "dim" }, { d: 29, cls: "dim" },
    { d: 30, cls: "dim" }, { d: 31, cls: "dim" }, { d: 1 }, { d: 2, cls: "red" },
  ],
  [
    { d: 3 }, { d: 4 }, { d: 5 }, { d: 6 }, { d: 7 }, { d: 8 }, { d: 9, em: "🟢" },
  ],
  [
    { d: 10 }, { d: 11 }, { d: 12, em: "💞" }, { d: 13 }, { d: 14 }, { d: 15 }, { d: 16, cls: "red" },
  ],
  [
    { d: 17 }, { d: 18 }, { d: 19 }, { d: 20 }, { d: 21 }, { d: 22 }, { d: 23, cls: "red" },
  ],
  [
    { d: 24 }, { d: 25 }, { d: 26 }, { d: 27, cls: "sel" }, { d: 28 }, { d: 29, cls: "red", em: "💗" }, { d: 30, cls: "red" },
  ],
  [
    { d: 31 }, { d: 1, cls: "dim" }, { d: 2, cls: "dim" }, { d: 3, cls: "dim" },
    { d: 4, cls: "dim" }, { d: 5, cls: "dim" }, { d: 6, cls: "pale-red" },
  ],
];

const TASK_ICON = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const GEAR_ICON = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export function Sidebar({
  role,
  user,
  tasksToday,
  classes,
  activeClass,
}: {
  role: "student" | "teacher";
  user: { name: string; sub: string; avatar: string };
  tasksToday: TodayTask[];
  classes?: string[];
  activeClass?: string;
}) {
  const settingsHref = role === "student" ? "/student/settings" : "/teacher/settings";

  function openAddClassDialog() {
    const dlg = document.getElementById("dlg-add-class") as HTMLDialogElement | null;
    if (dlg) {
      if (typeof dlg.showModal === "function") dlg.showModal();
      else dlg.setAttribute("open", "");
    }
  }

  return (
    <aside className="sidebar">
      <Link className="brand" href="/">
        <Image src="/assets/logo.png" alt="Grafidu" width={18} height={18} />
        <span>GRAFIDU</span>
      </Link>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "14px 0 6px" }}>
        <h3 className="side-sec-title" style={{ margin: 0 }}>Calendar</h3>
      </div>
      <div className="cal-head">
        <button aria-label="Sebelumnya">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <b>Agustus 2026</b>
        <button aria-label="Berikutnya">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="cal-dow">
        {CAL_DOW.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="cal-grid">
        {CAL_ROWS.flat().map((c, i) => (
          <i key={i} className={c.cls} data-day={c.cls ? undefined : ""}>
            {c.d}
            {c.em ? <span className="em">{c.em}</span> : null}
          </i>
        ))}
      </div>

      {role === "student" ? (
        <>
          <div className="side-list-head">
            <h3>Tugas Hari Ini</h3>
            <Link className="link-underline" href="/student/tasks">
              Lihat Semua
            </Link>
          </div>
          {tasksToday.map((t) => (
            <div key={t.id} className={"task-card" + (t.done ? " done" : "")} data-check>
              <span className="tbox">{TASK_ICON}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <Link href={`/student/tasks/${t.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <b>{t.title}</b>
                  <span>{t.sub}</span>
                </Link>
              </span>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="side-list-head">
            <h3>Kelas yang diampu</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Link className="link-underline" href="/teacher/classes">
                Lihat Semua
              </Link>
              <button
                className="class-plus"
                aria-label="Tambah kelas"
                data-dialog="dlg-add-class"
                onClick={openAddClassDialog}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          </div>
          {(classes ?? []).map((c) => (
            <Link
              key={c}
              href={`/teacher/classes/${encodeURIComponent(c)}`}
              className={"class-card" + (activeClass === c ? " on" : "")}
              style={{ textDecoration: "none", color: "inherit", display: "flex" }}
            >
              <span className="cic">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="9" cy="7" r="3" />
                  <circle cx="16" cy="10" r="2.4" />
                  <path d="M3.5 20c.6-3 2.8-5 5.5-5s4.9 2 5.5 5" />
                  <path d="M14.5 15.6c.5-.4 1-.6 1.5-.6 1.9 0 3.6 1.6 4.2 4" />
                </svg>
              </span>
              <span>
                <b>{c}</b>
                <span>Kelola Rombel</span>
              </span>
            </Link>
          ))}
        </>
      )}

      <div className="side-user">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={user.avatar.startsWith("/") ? user.avatar : "/" + user.avatar} alt={user.name} />
        <span>
          <b>{user.name}</b>
          <span>{user.sub}</span>
        </span>
        <Link href={settingsHref} aria-label="Pengaturan">
          {GEAR_ICON}
        </Link>
      </div>
    </aside>
  );
}
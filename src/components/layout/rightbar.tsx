import Link from "next/link";

export type GradeRow = { subject: string; score: number; status: string };
export type StudentRow = { name: string; avg: number };
export type Announcement = { title: string; body: string; when: string; hl: boolean };

function Pill({ score, text }: { score: number; text: string }) {
  const cls = score >= 70 ? "pill-green" : "pill-red";
  return <span className={`pill ${cls}`}>{text}</span>;
}

export function StudentRightbar({
  grades,
  aiNote,
  ctaHref,
  ctaLabel,
  announcements,
}: {
  grades: GradeRow[];
  aiNote: string;
  ctaHref: string;
  ctaLabel: string;
  announcements?: Announcement[];
}) {
  return (
    <aside className="rightbar">
      <div className="rb-head">
        <h3>Nilai Terbaru</h3>
        <Link className="link-underline" href="/student/grades">
          Lihat Semua
        </Link>
      </div>
      <table className="rb-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th className="num">Score</th>
            <th className="st">Status</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g) => (
            <tr key={g.subject}>
              <td>{g.subject}</td>
              <td className="num">{g.score}</td>
              <td className="st">
                <Pill score={g.score} text={g.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {announcements && announcements.length > 0 && (
        <div className="ann-card">
          <div className="rb-head" style={{ marginBottom: 4 }}>
            <h3>Pengumuman</h3>
            <Link className="link-underline" href="/student/announcements">
              Lihat Semua
            </Link>
          </div>
          {announcements.map((a) => (
            <div key={a.title} className={"ann-item " + (a.hl ? "hl" : "gy")}>
              <b>{a.title}</b>
              <p>{a.body}</p>
              <time>{a.when}</time>
            </div>
          ))}
        </div>
      )}

      <div className="ai-card">
        <div className="ai-card-head">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
          </svg>
          Rekomendasi AI Untukmu
        </div>
        <div className="ai-note">{aiNote}</div>
        <Link className="btn btn-primary" href={ctaHref}>
          {ctaLabel}
        </Link>
      </div>
    </aside>
  );
}

export function TeacherRightbar({
  students,
  aiNote,
  announcements,
}: {
  students: StudentRow[];
  aiNote: string;
  announcements: Announcement[];
}) {
  return (
    <aside className="rightbar">
      <div className="rb-head">
        <h3>Rata Rata Per Siswa</h3>
        <Link className="link-underline" href="/teacher/students">
          Lihat Semua
        </Link>
      </div>
      <table className="rb-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th className="num">Rata Rata</th>
            <th className="st">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.name}>
              <td>{s.name}</td>
              <td className="num">{s.avg}</td>
              <td className="st">
                <Pill score={s.avg} text={s.avg >= 70 ? "Atas Rata Rata" : "Bawah Rata Rata"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ai-card">
        <div className="ai-card-head">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
          </svg>
          Rekomendasi AI Untukmu
        </div>
        <div className="ai-note">{aiNote}</div>
        <Link className="btn btn-primary" href="/teacher/quiz">
          Buat Kuis
        </Link>
      </div>

      <div className="ann-card">
        <div className="rb-head" style={{ marginBottom: 4 }}>
          <h3>Pengumuman</h3>
          <Link className="link-underline" href="/teacher/announcements">
            Lihat Semua
          </Link>
        </div>
        {announcements.map((a) => (
          <div key={a.title} className={"ann-item " + (a.hl ? "hl" : "gy")}>
            <b>{a.title}</b>
            <p>{a.body}</p>
            <time>{a.when}</time>
          </div>
        ))}
      </div>
    </aside>
  );
}
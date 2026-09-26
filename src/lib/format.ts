const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

/** "24 Agustus 2026" (Indonesian) from a Date or ISO string. */
export function fmtDate(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return String(d);
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** Relative label: "Hari ini" / "Kemarin" / "N hari lalu" / else fmtDate. */
export function relLabel(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "";
  const today = new Date();
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const days = Math.round((startToday.getTime() - start.getTime()) / 86400000);
  if (days <= 0) return "Hari ini";
  if (days === 1) return "Kemarin";
  if (days < 7) return `${days} hari lalu`;
  return fmtDate(date);
}

export function dayName(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return DAYS[date.getDay()];
}

/** Status pill label. Always a text label — never color alone (WCAG AA). */
export function pill(score: number): "Atas Rata Rata" | "Bawah Rata Rata" {
  return score >= 70 ? "Atas Rata Rata" : "Bawah Rata Rata";
}

/** "Hari ini" for a Date (midnight-aligned). */
export function isToday(d: Date | string): boolean {
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return false;
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function todayISO(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")}`;
}
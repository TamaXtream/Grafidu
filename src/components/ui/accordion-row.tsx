"use client";

import { useState } from "react";

/**
 * Collapsible accordion row (mirrors .quiz-row.acc-row in the legacy app).
 * `title`, `meta`, `right` slot, and `children` (the acc-inner) are provided
 * by the caller; the chevron toggles `.open`.
 */
export default function AccordionRow({
  title,
  meta,
  badge,
  badgeClass,
  right,
  children,
}: {
  title: React.ReactNode;
  meta: React.ReactNode;
  badge?: string;
  badgeClass?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={"quiz-row acc-row" + (open ? " open" : "")}>
      <span className="task-ic">{title}</span>
      <span className="info">
        <b>{meta}</b>
        {badge ? <span>{badge}</span> : null}
      </span>
      <span className="right">
        {badge ? <span className={"pill " + (badgeClass ?? "pill-gray")}>{badge}</span> : null}
        {right}
        <button
          className="chev"
          aria-expanded={open}
          aria-label="Detail"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </span>
      <div className="acc-body">
        <div>
          <div className="acc-inner">{children}</div>
        </div>
      </div>
    </div>
  );
}
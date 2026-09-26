"use client";

import { useEffect } from "react";

/**
 * Syncs document.body classes from the current layout.
 * Mirrors the original <body class="landing"> / "app-root" conventions.
 */
export default function BodySync({
  className,
  dataPage,
}: {
  className?: string;
  dataPage?: string;
}) {
  useEffect(() => {
    document.documentElement.classList.add("js");
    document.body.className = className ?? "";
    if (dataPage) document.body.setAttribute("data-page", dataPage);
    return () => {
      document.body.className = "";
      document.body.removeAttribute("data-page");
    };
  }, [className, dataPage]);
  return null;
}
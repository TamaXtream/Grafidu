"use client";

import { useEffect } from "react";

/** Client pages can't export Next.js metadata; this sets the tab title instead. */
export function useTitle(title: string): void {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

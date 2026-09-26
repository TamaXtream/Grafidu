"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const sections = ["platform", "students", "teachers", "ai"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveHash("#" + id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <Link className="brand" href="/">
            <Image src="/assets/logo.png" alt="Grafidu" width={20} height={20} />
            <span>GRAFIDU</span>
          </Link>
          <nav className="nav-links">
            <a href="#platform" className={activeHash === "#platform" ? "active" : ""}>
              Platform
            </a>
            <a href="#students" className={activeHash === "#students" ? "active" : ""}>
              Students
            </a>
            <a href="#teachers" className={activeHash === "#teachers" ? "active" : ""}>
              Teachers
            </a>
            <a href="#ai" className={activeHash === "#ai" ? "active" : ""}>
              AI
            </a>
          </nav>
          <div className="nav-right">
            <Link className="signin" href="/login">
              Sign in
            </Link>
            <Link className="btn btn-primary btn-sm" href="/signup">
              Try Grafidu
            </Link>
            <button
              className="nav-burger"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ============ MOBILE NAV SHEET ============ */}
      <div className={"nav-sheet" + (mobileOpen ? " in" : "")} id="mobile-nav">
        <div className="nav-sheet-head">
          <Link className="brand" href="/" onClick={() => setMobileOpen(false)}>
            <Image src="/assets/logo.png" alt="Grafidu" width={20} height={20} />
            <span>GRAFIDU</span>
          </Link>
          <button className="nav-sheet-close" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile">
          <a href="#platform" onClick={() => setMobileOpen(false)}>Platform</a>
          <a href="#students" onClick={() => setMobileOpen(false)}>Students</a>
          <a href="#teachers" onClick={() => setMobileOpen(false)}>Teachers</a>
          <a href="#ai" onClick={() => setMobileOpen(false)}>AI</a>
        </nav>
        <div className="nav-sheet-ctas">
          <Link className="btn btn-outline" href="/login" onClick={() => setMobileOpen(false)}>
            Sign in
          </Link>
          <Link className="btn btn-primary" href="/signup" onClick={() => setMobileOpen(false)}>
            Try Grafidu
          </Link>
        </div>
      </div>
    </>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { update } from "@/lib/store";

export default function SiteFooter() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    update((db) => {
      db.subscribers.push({
        id: db.nextId++,
        email: value.toLowerCase(),
        createdAt: new Date().toISOString(),
      });
    });
    setEmail("");
    window.gtoast?.("Terima kasih! Kamu sudah terdaftar.");
  }

  return (
    <footer className="site-footer">
      <div className="footer-media" aria-hidden="true">
        <svg className="footer-bg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FBFAFE" />
              <stop offset="1" stopColor="#E6E1FC" />
            </linearGradient>
            <linearGradient id="topwash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#F7F4FE" />
            </linearGradient>
            <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset=".5" stopColor="#FFFFFF" stopOpacity=".55" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="1600" height="500" fill="url(#topwash)" />

          {/* sky sparkles */}
          <g stroke="#751EF8" strokeWidth="2.5" strokeLinecap="round" fill="none">
            <g className="art-twinkle"><path d="M640 404v14M633 411h14" /></g>
            <g className="art-twinkle t2"><path d="M1250 334v11M1244.5 339.5h11" /></g>
            <g className="art-twinkle t3"><path d="M92 470v12M86 476h12" /></g>
            <g className="art-twinkle t4"><path d="M1330 600v10M1325 605h10" /></g>
          </g>

          {/* open book, drifting */}
          <g transform="translate(700 470) rotate(-8)">
            <g className="art-bob-slow">
              <path d="M-42 4C-30 -3 -11 -4 0 1 11 -4 30 -3 42 4V27C30 20 11 19 0 24 -11 19 -30 20 -42 27Z" fill="#FFFFFF" stroke="#5B2EE0" strokeWidth="2.4" strokeLinejoin="round" />
              <path d="M0 1v23" stroke="#5B2EE0" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>

          {/* paper plane, gliding right */}
          <g transform="translate(0 415)">
            <g className="art-plane-a">
              <g className="art-bob">
                <path d="M0 15 52 0 36 25 26 18 21 31Z" fill="#FFFFFF" stroke="#5B2EE0" strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M26 18 52 0" stroke="#5B2EE0" strokeWidth="1.6" opacity=".55" />
              </g>
            </g>
          </g>

          {/* paper plane, gliding left */}
          <g transform="translate(0 440) scale(-.78 .78)">
            <g className="art-plane-b">
              <g className="art-bob">
                <path d="M0 15 52 0 36 25 26 18 21 31Z" fill="#FFFFFF" stroke="#5B2EE0" strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M26 18 52 0" stroke="#5B2EE0" strokeWidth="1.6" opacity=".55" />
              </g>
            </g>
          </g>

          {/* ridges */}
          <path d="M0 486 120 452 240 478 390 430 520 470 660 442 800 476 950 448 1090 480 1230 452 1370 482 1500 460 1600 476V900H0Z" fill="#F3F0FE" opacity=".85" />
          <rect x="0" y="452" width="1600" height="92" fill="url(#mist)" />
          <path d="M0 560 140 516 300 552 460 506 620 550 780 516 940 556 1100 522 1260 558 1420 528 1600 556V900H0Z" fill="#E9E4FC" opacity=".85" />
          <rect x="0" y="510" width="1600" height="92" fill="url(#mist)" />
          <path d="M0 640 180 606 360 636 540 598 720 634 900 606 1080 638 1260 610 1440 640 1600 618V900H0Z" fill="#DDD5FA" opacity=".8" />
          <rect x="0" y="600" width="1600" height="88" fill="url(#mist)" />

          {/* pine outcrops */}
          <path d="M0 604 62 636 92 700 62 780 112 858 66 900H0Z" fill="#E3E0FF" opacity=".85" />
          <g fill="#751EF8">
            <path d="M64 536l24 40h-13l20 34h-14l22 36H27l22-36h-14l20-34H42Z" />
            <path d="M128 588l20 34h-11l17 28h-12l19 31H75l19-31h-12l17-28H88Z" opacity=".92" />
            <path d="M22 646l18 30h-10l15 25h-11l17 28H-8l17-28h-11l15-25H4Z" opacity=".9" />
          </g>

          <path d="M1600 596 1538 630 1508 696 1540 778 1492 856 1540 900H1600Z" fill="#E3E0FF" opacity=".85" />
          <g fill="#751EF8">
            <path d="M1536 528l24 40h-13l20 34h-14l22 36h-76l22-36h-14l20-34h-13Z" />
            <path d="M1472 582l20 34h-11l17 28h-12l19 31h-70l19-31h-12l17-28h-13Z" opacity=".92" />
            <path d="M1578 642l18 30h-10l15 25h-11l17 28h-64l17-28h-11l15-25h-10Z" opacity=".9" />
          </g>

          {/* still lake */}
          <rect x="0" y="700" width="1600" height="200" fill="url(#lake)" />
          <path d="M470 714l64 42H406Z" fill="#E9E4FC" opacity=".32" />
          <path d="M980 718l74 48H906Z" fill="#E9E4FC" opacity=".26" />
          <path d="M1300 760l50 32h-100Z" fill="#E9E4FC" opacity=".22" />
          <g stroke="#B49EEC" strokeWidth="2" strokeLinecap="round" opacity=".28">
            <path d="M180 762H420" />
            <path d="M700 792H980" />
            <path d="M1150 758H1420" />
            <path d="M320 822H560" />
            <path d="M900 842H1240" />
            <path d="M560 868H760" />
          </g>
        </svg>
      </div>

      <div className="footer-inner">
        <div className="footer-grid">
          <div className="brand">
            <div className="brand-lockup">
              <Image className="brand-mark" src="/assets/logo.png" alt="" width={74} height={93} />
              <h2 className="brand-name">Grafidu</h2>
            </div>
            <p className="brand-blurb">A clearer way to learn &mdash; know where you are, know what to do next.</p>
            <ul className="contact-list">
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 13.06 2.4 6.6C2.85 5.68 3.77 5 4.5 5h15c.86 0 1.61.43 2.06 1.1L12 13.06Z"/><path d="M12 15.1 22 8.36V18.5c0 1.38-1.12 2.5-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5V8.36l10 6.74Z"/></svg>
                <a href="mailto:care@grafidu.com">care@grafidu.com</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"/></svg>
                <a href="tel:+6281234567890">+62 812-3456-7890</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></svg>
                <span>Indonesia</span>
              </li>
            </ul>
          </div>

          <nav className="col" aria-label="Students">
            <h3 className="col-title">Students</h3>
            <ul className="link-list">
              <li><a href="#platform">All Subjects</a></li>
              <li><a href="#students">Matematika</a></li>
              <li><a href="#students">Fisika</a></li>
              <li><a href="#students">Biologi</a></li>
              <li><a href="#students">Informatika</a></li>
              <li><a href="#ai">Practice Sets</a></li>
            </ul>
          </nav>

          <nav className="col" aria-label="Platform">
            <h3 className="col-title">Platform</h3>
            <ul className="link-list">
              <li><a href="#students">For Students</a></li>
              <li><a href="#teachers">For Teachers</a></li>
              <li><a href="#ai">AI Agent</a></li>
              <li><a href="#students">Grades &amp; Insights</a></li>
              <li><Link href="/signup">Join Us</Link></li>
              <li><a href="mailto:care@grafidu.com?subject=Media%20Enquiry">Media Enquiry</a></li>
            </ul>
          </nav>

          <nav className="col" aria-label="Care and service">
            <h3 className="col-title">Care &amp; Service</h3>
            <ul className="link-list">
              <li><Link href="/faqs">FAQs</Link></li>
              <li><a href="#platform">Getting Started</a></li>
              <li><Link href="/signup">Where&rsquo;s My Invite</Link></li>
              <li><a href="mailto:care@grafidu.com">Talk To Us</a></li>
            </ul>
          </nav>

          <div className="newsletter">
            <h3 className="col-title">The Letter</h3>
            <p>Study tips, fresh subjects &amp; members-only practice sets &mdash; straight to your inbox.</p>
            <form className="subscribe" onSubmit={handleSubscribe} noValidate>
              <label className="sr-only" htmlFor="nl-email">Email address</label>
              <input
                id="nl-email"
                type="email"
                name="email"
                placeholder="Leave your email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" aria-label="Subscribe">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h15M13 6l6 6-6 6"/></svg>
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="socials">
            <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.93.26-1.56 1.6-1.56h1.7V4.3c-.3-.04-1.3-.13-2.47-.13-2.45 0-4.13 1.5-4.13 4.24v2.4H7.5V14h2.7v8h3.3Z"/></svg></a>
            <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M22 5.9c-.74.33-1.53.55-2.36.65.85-.51 1.5-1.32 1.8-2.28-.79.47-1.67.81-2.6 1A4.1 4.1 0 0 0 11.8 9c0 .32.03.63.1.93A11.65 11.65 0 0 1 3.4 5.64a4.1 4.1 0 0 0 1.27 5.48c-.67-.02-1.3-.2-1.86-.5v.05c0 1.99 1.41 3.65 3.29 4.02-.34.1-.71.14-1.08.14-.27 0-.52-.02-.78-.07.52 1.63 2.04 2.82 3.83 2.85A8.23 8.23 0 0 1 2 19.54 11.6 11.6 0 0 0 8.29 21.4c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.58 1.5-1.3 2.04-2.12Z"/></svg></a>
            <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true" focusable="false"><path d="M12 8.4A3.6 3.6 0 1 0 12 15.6 3.6 3.6 0 0 0 12 8.4Zm0 5.93a2.33 2.33 0 1 1 0-4.66 2.33 2.33 0 0 1 0 4.66ZM16.9 8.2a.84.84 0 1 1-1.68 0 .84.84 0 0 1 1.68 0ZM12 4.8c1.98 0 2.21.01 2.99.04.72.03 1.11.15 1.37.25.34.13.59.29.85.55.26.26.42.5.55.85.1.26.22.65.25 1.37.03.78.04 1.01.04 2.99s-.01 2.21-.04 2.99c-.03.72-.15 1.11-.25 1.37-.13.34-.29.59-.55.85-.26.26-.5.42-.85.55-.26.1-.65.22-1.37.25-.78.03-1.01.04-2.99.04s-2.21-.01-2.99-.04c-.72-.03-1.11-.15-1.37-.25a2.3 2.3 0 0 1-.85-.55 2.3 2.3 0 0 1-.55-.85c-.1-.26-.22-.65-.25-1.37-.03-.78-.04-1.01-.04-2.99s.01-2.21.04-2.99c.03-.72.15-1.11.25-1.37.13-.34.29-.59.55-.85.26-.26.5-.42.85-.55.26-.1.65-.22 1.37-.25C8.64 4.81 8.87 4.8 12 4.8M12 3c-2.01 0-2.26.01-3.05.04-.79.04-1.33.16-1.8.35-.49.19-.9.44-1.31.85-.41.41-.66.82-.85 1.31-.19.47-.31 1.01-.35 1.8-.03.79-.04 1.04-.04 3.05v5.2c0 2.01.01 2.26.04 3.05.04.79.16 1.33.35 1.8.19.49.44.9.85 1.31.41.41.82.66 1.31.85.47.19 1.01.31 1.8.35.79.03 1.04.04 3.05.04s2.26-.01 3.05-.04c.79-.04 1.33-.16 1.8-.35.49-.19.9-.44 1.31-.85.41-.41.66-.82.85-1.31.19-.47.31-1.01.35-1.8.03-.79.04-1.04.04-3.05V9.4c0-2.01-.01-2.26-.04-3.05-.04-.79-.16-1.33-.35-1.8a3.63 3.63 0 0 0-.85-1.31 3.63 3.63 0 0 0-1.31-.85c-.47-.19-1.01-.31-1.8-.35C14.26 3.01 14.01 3 12 3Z"/></svg></a>
            <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M6.94 8.5H3.56V20.4h3.38V8.5ZM5.25 3.6a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.4 13.3c0-3.16-1.69-4.63-3.94-4.63-1.82 0-2.63 1-3.09 1.7V8.5H10v11.9h3.37v-6.64c0-.27.02-.54.1-.73.22-.54.71-1.1 1.55-1.1 1.09 0 1.53.83 1.53 2.05v6.42H20.4V13.3Z"/></svg></a>
          </div>
          <nav className="legal" aria-label="Legal">
            <Link href="/privacy">Privacy Notice</Link>
            <Link href="/terms">Terms &amp; Policies</Link>
            <Link href="/cookies">Cookie Notice</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
import Image from "next/image";
import Link from "next/link";

export default function AuthLeft() {
  return (
    <aside className="auth-left">
      <Link className="auth-logo" href="/">
        <Image src="/assets/logo.png" alt="Grafidu" width={22} height={22} />
        <b>GRAFIDU</b>
      </Link>
      <div className="auth-hero">
        <div className="eyebrow">A clearer way to learn</div>
        <h1>
          Know where you are.
          <br />
          Know{" "}
          <span className="accent">
            what to do
            <br />
            next.
          </span>
        </h1>
        <p>
          Grades, materials, and AI recommendations in one place — so every login starts with
          something useful.
        </p>
      </div>

      <div className="auth-float-score">
        <span className="ic">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </span>
        <span>
          <span>Average score</span>
          <b>87 / 100</b>
        </span>
      </div>

      <div className="auth-float-grades">
        <div className="head">
          <b>Jessie Cooper</b>
          <span>XI RPL B</span>
        </div>
        <div className="afg-row">
          <span>Informatika</span>
          <span className="pill pill-green">95</span>
        </div>
        <div className="afg-row">
          <span>Seni Budaya</span>
          <span className="pill pill-red">65</span>
        </div>
        <div className="afg-row">
          <span>Fisika</span>
          <span className="pill pill-red">72</span>
        </div>
      </div>

      <nav>
        <Link href="/#platform">Platform</Link>
        <Link href="/#students">Students</Link>
        <Link href="/#teachers">Teachers</Link>
        <Link href="/#ai">AI</Link>
      </nav>
    </aside>
  );
}

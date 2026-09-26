"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login, signup } from "@/lib/auth";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const em = email.trim();
    if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setError("Format email tidak valid.");
      return;
    }
    if (password.length < 8) {
      setError("Kata sandi minimal 8 karakter.");
      return;
    }
    if (mode === "signup") {
      if (!fullname.trim()) {
        setError("Nama lengkap wajib diisi.");
        return;
      }
      if (password !== confirm) {
        setError("Konfirmasi kata sandi tidak cocok.");
        return;
      }
    }

    try {
      // Full page reloads reset the in-memory store, so navigation stays client-side.
      if (mode === "login") {
        const u = login(em, password);
        if (u.role === "teacher") {
          window.gtoast?.("Dashboard guru sedang dalam pengembangan — belum tersedia di versi ini.");
          return;
        }
        router.push("/student/home");
      } else {
        signup(fullname.trim(), em, password);
        router.push("/student/home");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="auth-box">
      <div className="auth-switch">
        {mode === "login" ? (
          <>
            New here? <Link href="/signup">Create an account</Link>
          </>
        ) : (
          <>
            Already have an account? <Link href="/login">Sign In</Link>
          </>
        )}
      </div>

      <div className="auth-tabs">
        <Link className={"auth-tab" + (mode === "login" ? " on" : "")} href="/login">
          Sign in
        </Link>
        <Link className={"auth-tab" + (mode === "signup" ? " on" : "")} href="/signup">
          Sign up
        </Link>
      </div>

      <h2>{mode === "login" ? "Welcome back" : "Create your account"}</h2>
      <p className="sub">
        {mode === "login"
          ? "Sign in to see what needs attention today."
          : "Sign up to start tracking your progress."}
      </p>

      {error ? (
        <div className="field-error" style={{ color: "var(--red)", marginBottom: 12, fontSize: 13 }}>
          {error}
        </div>
      ) : null}

      <form id="go-student" onSubmit={handleSubmit} noValidate>
        {mode === "signup" ? (
          <div className="field">
            <label htmlFor="fullname">Full Name</label>
            <div className="control">
              <input
                id="fullname"
                type="text"
                placeholder="Jessie Cooper"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
          </div>
        ) : null}

        <div className="field">
          <label htmlFor="email">Email</label>
          <div className="control">
            <input
              id="email"
              type="email"
              placeholder="jessie@school.edu"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <div className="control">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="show-pw"
              onClick={() => setShowPw((s) => !s)}
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {mode === "signup" ? (
          <div className="field">
            <label htmlFor="confirm">Confirm Password</label>
            <div className="control">
              <input
                id="confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter your password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <button
                type="button"
                className="show-pw"
                onClick={() => setShowConfirm((s) => !s)}
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        ) : (
          <div className="auth-row">
            <label className="checkbox">
              <input type="checkbox" />
              <span className="box">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              Remember me
            </label>
            <span className="spacer"></span>
            <Link href="/forgot-password">Forgot password?</Link>
          </div>
        )}

        <p className="demo-hint">
          Demo — Siswa: jessie.cooper@grafidu.sch.id · Guru: budewi.lestari@grafidu.sch.id · sandi: grafidu123
        </p>

        <button className="btn-auth" type="submit">
          {mode === "login" ? "Sign in" : "Create account"}
        </button>
      </form>

      <div className="auth-or">or continue with</div>

      <button
        className="btn-google"
        type="button"
        onClick={() => window.gtoast?.("Demo: masuk dengan email dan kata sandi di bawah.")}
      >
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
          <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
          <path fill="#4CAF50" d="M24 44c5.3 0 10.1-2 13.7-5.2l-6.3-5.4C29.5 34.9 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.4l6.3 5.4C41.4 35.4 44 30.1 44 24c0-1.3-.1-2.6-.4-3.9z" />
        </svg>
        {mode === "login" ? "Continue with Google" : "Sign up with Google"}
      </button>
    </div>
  );
}
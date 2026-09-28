"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
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

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: em,
        password: password,
      });
      if (error || !data.user) {
        console.error("[login]", error?.message);
        setError(`Login gagal: ${error?.message ?? "Email atau kata sandi salah."}`);
        return;
      }

      const { data: profile, error: profErr } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profErr || !profile) {
        console.error("[profile]", profErr?.message);
        setError("Akun belum punya data di tabel profiles. Tambahkan manual dulu.");
        return;
      }

      const role = (profile as { role: string }).role;
      if (role === "teacher") router.push("/teacher/home");
      else if (role === "admin") router.push("/admin");
      else router.push("/student/home");
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="auth-box">
      <h2>Welcome back</h2>
      <p className="sub">Sign in to see what needs attention today.</p>

      {error ? (
        <div
          className="field-error"
          style={{ color: "var(--red)", marginBottom: 12, fontSize: 13 }}
        >
          {error}
        </div>
      ) : null}

      <form id="go-student" onSubmit={handleSubmit} noValidate>
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
            <button type="button" className="show-pw" onClick={() => setShowPw((s) => !s)}>
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="auth-row">
          <label className="checkbox">
            <input type="checkbox" />
            <span className="box">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.4"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            Remember me
          </label>
          <span className="spacer"></span>
          <a href="/forgot-password">Forgot password?</a>
        </div>
        <button className="btn-auth" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}

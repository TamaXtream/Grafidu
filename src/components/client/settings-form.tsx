"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/lib/auth";
import { getDB, update } from "@/lib/store";

export type UserProfile = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  prefs: string;
};

export default function SettingsForm({ initialUser }: { initialUser: UserProfile }) {
  const router = useRouter();
  const [name, setName] = useState(initialUser.name);
  const [email, setEmail] = useState(initialUser.email);
  const [phone, setPhone] = useState(initialUser.phone);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  let parsedPrefs: Record<string, boolean> = {};
  try {
    parsedPrefs = JSON.parse(initialUser.prefs || "{}");
  } catch {}

  const [prefs, setPrefs] = useState({
    task: parsedPrefs.task ?? true,
    deadline: parsedPrefs.deadline ?? true,
    ai: parsedPrefs.ai ?? false,
    email: parsedPrefs.email ?? false,
  });

  function handleSaveProfile() {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    if (!cleanName || !cleanEmail) {
      window.gtoast?.("Nama dan email wajib diisi.", "error");
      return;
    }
    const me = getCurrentUser();
    if (!me) return;
    if (getDB().users.some((x) => x.email === cleanEmail && x.id !== me.id)) {
      window.gtoast?.("Email sudah dipakai akun lain.", "error");
      return;
    }
    update((db) => {
      const u = db.users.find((x) => x.id === me.id);
      if (u) {
        u.name = cleanName;
        u.email = cleanEmail;
        u.phone = cleanPhone;
      }
    });
    window.gtoast?.("Profil berhasil diperbarui.");
  }

  function handleSavePassword() {
    if (!currentPw) {
      window.gtoast?.("Isi kata sandi saat ini dulu.", "error");
      return;
    }
    if (newPw.length < 8) {
      window.gtoast?.("Kata sandi baru minimal 8 karakter.", "error");
      return;
    }
    if (newPw !== confirmPw) {
      window.gtoast?.("Konfirmasi kata sandi tidak sama.", "error");
      return;
    }
    const me = getCurrentUser();
    const row = me ? getDB().users.find((x) => x.id === me.id) : null;
    if (!me || !row) return;
    if (row.password !== currentPw) {
      window.gtoast?.("Kata sandi saat ini salah.", "error");
      return;
    }
    update((db) => {
      const u = db.users.find((x) => x.id === me.id);
      if (u) u.password = newPw;
    });
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    window.gtoast?.("Kata sandi berhasil diperbarui.");
  }

  function togglePref(key: keyof typeof prefs) {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    const me = getCurrentUser();
    if (!me) return;
    update((db) => {
      const u = db.users.find((x) => x.id === me.id);
      if (u) u.prefs = JSON.stringify(next);
    });
  }

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div className="settings-grid">
      <div className="set-profile">
        <span className="avatar-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={initialUser.avatar.startsWith("/") ? initialUser.avatar : "/" + initialUser.avatar} alt={initialUser.name} width={80} height={80} />
        </span>
        <div className="set-fields">
          <div className="field">
            <label>Nama Lengkap</label>
            <div className="control">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Email</label>
            <div className="control">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Nomor Telepon</label>
            <div className="control">
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <div className="set-save" style={{ marginTop: 22 }}>
            <button type="button" className="btn btn-primary" id="save-profile" onClick={handleSaveProfile}>
              Simpan Perubahan
            </button>
            <button type="button" className="btn btn-outline" id="logout-btn" onClick={handleLogout}>
              Keluar
            </button>
          </div>
        </div>
      </div>

      <div className="set-card">
        <h3>Ubah Kata Sandi</h3>
        <p className="sub">Gunakan kata sandi yang kuat dan belum pernah dipakai sebelumnya.</p>
        <div className="field">
          <label>Kata Sandi Saat Ini</label>
          <div className="control">
            <input
              type="password"
              placeholder="Kata sandi saat ini"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              style={{ letterSpacing: 3 }}
            />
          </div>
        </div>
        <div className="pw-grid">
          <div className="field">
            <label>Kata Sandi Baru</label>
            <div className="control">
              <input
                type="password"
                placeholder="••••••••"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                style={{ letterSpacing: 3 }}
              />
            </div>
          </div>
          <div className="field">
            <label>Konfirmasi Kata Sandi</label>
            <div className="control">
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                style={{ letterSpacing: 3 }}
              />
            </div>
          </div>
        </div>
        <div className="set-save">
          <button className="btn btn-primary" type="button" onClick={handleSavePassword}>
            Perbarui Kata Sandi
          </button>
        </div>
      </div>

      <div className="set-card">
        <h3>Preferensi Notifikasi</h3>
        <p className="sub">Atur notifikasi apa saja yang ingin Anda terima.</p>
        <div style={{ marginTop: 8 }}>
          <div className="toggle-row">
            <span>
              <b>Pengumpulan Tugas Baru</b>
              <span>Dapatkan notifikasi saat siswa mengumpulkan tugas.</span>
            </span>
            <button
              className={"switch" + (prefs.task ? " on" : "")}
              aria-label="toggle"
              onClick={() => togglePref("task")}
            ></button>
          </div>
          <div className="toggle-row">
            <span>
              <b>Pengingat Tenggat Waktu</b>
              <span>Ingatkan saya sebelum tenggat tugas berakhir.</span>
            </span>
            <button
              className={"switch" + (prefs.deadline ? " on" : "")}
              aria-label="toggle"
              onClick={() => togglePref("deadline")}
            ></button>
          </div>
          <div className="toggle-row">
            <span>
              <b>Rekomendasi AI</b>
              <span>Terima saran kuis dan materi berdasarkan nilai terbaru.</span>
            </span>
            <button
              className={"switch" + (prefs.ai ? " on" : "")}
              aria-label="toggle"
              onClick={() => togglePref("ai")}
            ></button>
          </div>
          <div className="toggle-row">
            <span>
              <b>Email Mingguan</b>
              <span>Terima ringkasan nilai dan tugas setiap Senin pagi.</span>
            </span>
            <button
              className={"switch" + (prefs.email ? " on" : "")}
              aria-label="toggle"
              onClick={() => togglePref("email")}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
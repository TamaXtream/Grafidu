"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDB, update, useDB, type Role, type User } from "@/lib/store";

export type SessionUser = {
  id: number;
  role: Role;
  name: string;
  email: string;
  className: string | null;
  subject: string | null;
  avatar: string;
  phone: string;
  prefs: string;
};

function sessionUser(u: User): SessionUser {
  return {
    id: u.id,
    role: u.role,
    name: u.name,
    email: u.email,
    className: u.className,
    subject: u.subject,
    avatar: u.avatar,
    phone: u.phone,
    prefs: u.prefs,
  };
}

/** Current user from the in-memory session; null when logged out. */
export function getCurrentUser(): SessionUser | null {
  const db = getDB();
  if (!db.sessionUserId) return null;
  const u = db.users.find((x) => x.id === db.sessionUserId);
  return u ? sessionUser(u) : null;
}

export function login(email: string, password: string): SessionUser {
  const db = getDB();
  const u = db.users.find((x) => x.email.toLowerCase() === email.trim().toLowerCase());
  if (!u || u.password !== password) {
    throw new Error("Email atau kata sandi salah.");
  }
  update((d) => {
    d.sessionUserId = u.id;
  });
  return sessionUser(u);
}

const DEFAULT_PREFS = '{"task":true,"deadline":true,"ai":false,"email":false}';

export function signup(name: string, email: string, password: string): SessionUser {
  const db = getDB();
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanName || !cleanEmail || !password) {
    throw new Error("Semua kolom wajib diisi.");
  }
  if (password.length < 8) {
    throw new Error("Kata sandi minimal 8 karakter.");
  }
  if (db.users.some((x) => x.email.toLowerCase() === cleanEmail)) {
    throw new Error("Email sudah terdaftar. Coba masuk saja.");
  }

  const klass = db.classes.find((c) => c.name === "XI RPL B");
  let created: User | null = null;
  update((d) => {
    const id = d.nextId++;
    const u: User = {
      id,
      role: "student",
      name: cleanName,
      email: cleanEmail,
      password,
      className: "XI RPL B",
      subject: null,
      avatar: "/assets/logo.png",
      phone: "",
      prefs: DEFAULT_PREFS,
    };
    d.users.push(u);
    if (klass) d.enrollments.push({ classId: klass.id, studentId: id });
    d.chatMessages.push({
      id: d.nextId++,
      userId: id,
      role: "ai",
      text: `Hai ${cleanName.split(" ")[0]}! 👋 Aku AI Agent Grafidu. Mau mulai dari mana?`,
      createdAt: new Date().toISOString(),
    });
    d.sessionUserId = id;
    created = u;
  });
  return sessionUser(created!);
}

export function logout(): void {
  update((d) => {
    d.sessionUserId = null;
  });
}

/**
 * Client-side route guard: returns null on the server and while logged out,
 * then redirects to /login or the caller's role home.
 */
export function useRequireUser(role?: Role): SessionUser | null {
  const router = useRouter();
  const db = useDB();

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      router.replace("/login");
    } else if (role && u.role !== role) {
      router.replace(u.role === "teacher" ? "/teacher/home" : "/student/home");
    }
  }, [db, role, router]);

  if (!db || !db.sessionUserId) return null;
  const u = db.users.find((x) => x.id === db.sessionUserId);
  if (!u) return null;
  if (role && u.role !== role) return null;
  return sessionUser(u);
}

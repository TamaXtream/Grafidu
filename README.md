# GRAFIDU

> **"Know where you are. Know what to do next."**  
> An education platform connecting grades, teacher materials, assignments, and AI recommendations for Indonesian vocational high-school students (XI RPL) and their teachers.

Built with **Next.js 15 (App Router)** and **TypeScript** — pure frontend, no backend, no database, no persistence.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, client components)
- **Language**: TypeScript 5 (strict mode)
- **Data**: In-memory store (`src/lib/store.ts`) seeded on every page load
- **AI**: Fully local, deterministic rule-based agent (`src/lib/ai.ts`) — no external API
- **Styling**: Hand-crafted design system (`globals.css`) extracted pixel-faithfully from Figma

## Project Status — Halfway There

The frontend is a work in progress. What exists today:

- **Landing page** with the student/teacher view tabs and footer
- **Auth flow** — sign in, sign up, forgot password
- **Student core** — dashboard, tasks list, task detail + submission, private to-do list, and settings

Everything else is **not built yet**: grades & report card, quizzes, learning materials, class
hub, AI agent chat, schedule, announcements, and the entire teacher dashboard. Trying a teacher
demo login shows a friendly "under development" toast instead of navigating.

## No Persistence by Design

All data — demo users, classes, tasks, grades, quizzes, sessions — lives in memory only.
Refreshing the browser resets the app to the seeded demo state, and logging out or in
again works entirely client-side. Nothing is written to localStorage, cookies, or any server.

---

## Demo Credentials

All demo accounts use the password: `grafidu123`

| Role | Name | Email |
|---|---|---|
| **Siswa (Student)** | Jessie Cooper | `jessie.cooper@grafidu.sch.id` |
| **Guru (Teacher)** | Bu Dewi Lestari | `budewi.lestari@grafidu.sch.id` |

Teacher accounts are recognized, but the teacher dashboard is not built yet — signing in as a
teacher shows a development notice. Signing up creates an in-memory student in class XI RPL B.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser and sign in with a demo account.

## Production Build

```bash
npm run typecheck
npm run build
npm run start
```

---

## Architecture

```
src/
├── lib/
│   ├── store.ts                  # Reactive in-memory DB (seeded per load, useSyncExternalStore)
│   ├── auth.ts                   # login/signup/logout + useRequireUser(role) client route guard
│   ├── data.ts                   # Derived queries: subject scores, class rosters, averages
│   ├── ai.ts / ai-tools.ts       # Local AI agent: keyword rules, gated tool actions
│   ├── hooks.ts                  # useTitle (client-side document.title)
│   ├── format.ts / utils.ts      # Date/pill formatting helpers
│   └── *-layout-data.ts          # Sidebar/rightbar data selectors per role
├── components/
│   ├── layout/                   # DashboardShell, Sidebar, Rightbar, BottomNav
│   ├── client/                   # Interactive managers (todos, quiz, materi, chat, settings…)
│   ├── dialogs/                  # Add-class and share-materi native <dialog> wrappers
│   └── ui/                       # StatCard, Pill, TaskCard, Toasts
└── app/
    ├── page.tsx                  # Landing page
    ├── (auth)/                   # login, signup, forgot-password
    └── student/                  # home, tasks (+ detail), todo, settings — the built half
```

Every dashboard page is a client component: it calls `useRequireUser(role)` for the
session guard and reads the store through `useDB()`. Mutations call `update()`
directly — there is no network layer at all.

The shared components and libs above intentionally cover more than the routed pages
(quiz runner, materi manager, chat panel, teacher selectors…), so the remaining pages
can be added as routes without new plumbing.
# Grafidu

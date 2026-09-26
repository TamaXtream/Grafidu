# GRAFIDU — Design System

Visual system extracted from the Figma exports (`design/*.png`). Source of truth for all pages.

## Theme

Light mode, white surfaces. One pale-blue section band on the landing page. Black footer. Brand purple carries all primary actions and selection states.

## Color Palette

| Token | Value | Use |
|---|---|---|
| `--purple` | `#751EF8` | Primary actions, active nav/selection, links, progress fills, calendar selection |
| `--purple-hover` | `#6414DB` | Primary button hover |
| `--purple-deep` | `#5B2EE0` | Auth pages only (login/signup buttons, links, headings) |
| `--purple-soft` | `#EEE7FF` | Icon tiles, active filter tint, note surfaces |
| `--purple-banner` | `#E3E0FF` | AI recommendation note background (with 3px `--purple` left bar) |
| `--purple-lav` | `#EDE0FF` | Selected class icon tile |
| `--blue` | `#3B82F6` | Secondary stat accents (Rata-rata icon) |
| `--blue-soft` | `#CCD3FF` | Stat icon circles |
| `--coral` | `#F9564A` | Negative trend arrows |
| `--green` / `--green-soft` | `#3E9E60` / `#DDFFDE` | Success pills ("Atas Rata Rata", "Tayang", "Selesai") |
| `--green-circle` | `#CDEAE1` | Stat icon circles |
| `--red` / `--red-soft` | `#C0504D` / `#FFE8E5` | Warning pills ("Bawah Rata Rata"), unsubmitted dots |
| `--amber` / `--amber-soft` | `#C99212` / `#FFF6E1` | "Belum Selesai", announcement highlight |
| `--ink` | `#181516` | Headings, primary text |
| `--gray-3` | `#70696B` | Body/secondary text (4.6:1 on white) |
| `--gray-4` | `#8E8A8C` | Captions, meta (large/secondary only) |
| `--line` / `--line-soft` | `#E9E7EB` / `#EFEDEF` | Borders, dividers |
| `--bg-blue` | `#F0F6FF` | Landing grades band |
| `--stripe` | `#F9FAFB` | Table zebra rows |

## Typography

- **Inter** (400/500/600/700): all UI, body, data.
- **Inter Tight** (500/600/700): landing display headlines only (hero 61px, sections 40–47px, letter-spacing −0.028 to −0.033em).
- Product scale (fixed rem): 26 page title / 20 section / 15–16 card titles / 13–14 body / 11–12.5 meta. Display letter-spacing floor −0.04em.

## Layout

- Landing: 936px content column, hero full-bleed.
- Dashboard shell: sidebar 341px + flexible main (padding 26/32) + right panel 344px; floating bottom-nav pill centered at bottom.
- Radii: cards/panels 12–14px, inputs/buttons 8–10px, pills 999px. Cards never exceed 16px.
- Borders: 1px `--line`; no border+large-shadow pairing (shadow only on floating nav, modals, hero mockup).

## Components

Buttons (primary purple / outline / sm), status pills (bordered green/red/gray + plain green), stat cards with icon circles, zebra tables, filter chips, task cards (checked = `#E9E9E9` bg), calendar grid, AI note card, announcement card, floating bottom nav, search + select row, auth tabs (segmented), quiz/task rows with icon tiles.

## Motion

150–250ms, ease-out (quart/quint). Reveal-on-scroll on landing only (`.js .reveal`, staggered ≤60ms). Product motion = state only: hover lifts ≤2px, accordion expand, dialog fade+scale .98→1, toast slide-up. Everything respects `prefers-reduced-motion`.

## Z-index scale

bottom-nav 80 → sidebar/topbar sticky 60 (landing nav) → backdrop 90 → dialog 100 → toast 110.

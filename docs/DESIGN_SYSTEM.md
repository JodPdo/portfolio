# Design System — tokens & rules

> **2026-07-06 — V2 "Editorial Dark" is now the active direction (ADR-0003, SPEC Appendix B).**
> The **Palette**, **Dark mode**, **Type**, and **Motion** sections below are the *original light+dark
> résumé identity* and are **SUPERSEDED** for V2. Read the **"V2 — Editorial Dark" section at the bottom of
> this file** for the live tokens, typography, and layout language. Sections kept for history only.

## Palette
> **SUPERSEDED by V2 (ADR-0003).** V2 is dark-only; the light `bg`/`ink` values and `gold` are retired.
> See the V2 palette table below.

| Token | Value | Use |
|---|---|---|
| `primary` | `#0F766E` (teal-700) | headings accents, buttons, links |
| `accent` | `#5EEAD4` (teal-300) | highlights, hover, focus decorations |
| `ink` | `#263238` | body text (light mode) |
| `bg` | `#F3FAF9` / `#FFFFFF` | page / card backgrounds (light) |
| `gold` | `#B8860B` | special links / metric highlights (sparingly) |

**Dark mode:** ~~class strategy (`dark:`) + toggle, respect `prefers-color-scheme` on first load, persist choice (no FOUC — inline script in `<head>`). Dark bg ≈ `#0B1B1A`–`#111827` range, text ≈ `#E6F2F0`; keep contrast AA everywhere.~~ **SUPERSEDED by V2 (ADR-0003):** the site is **dark-only** — no toggle, no light theme, no `.dark` class strategy, no no-FOUC script. `:root` carries the single dark palette (see V2 section).

## Type
> **SUPERSEDED by V2 (ADR-0003).** V2 drops the separate UI sans: display = **Archivo** 500 (huge uppercase),
> everything else = **JetBrains Mono**. See the V2 typography rules below.

- UI/body: **Inter** (or Geist) via `next/font` — no layout shift.
- Code/metrics: **JetBrains Mono**.
- Scale: text-sm → text-4xl/5xl for hero; line-height relaxed for prose.

## Layout & spacing

- Max content width ~**1100px**, generous whitespace, **8-pt spacing scale** (Tailwind default fits).
- Breakpoints to verify every card: **375 / 768 / 1280**.

## Motion
> **SUPERSEDED by V2 (ADR-0003).** V2 standardizes on **GSAP + ScrollTrigger** (no Framer Motion) plus a
> lazy `pixi.js` hero effect, in isolated `components/motion/` islands. See the V2 motion notes below and
> brief §3/§5 for the effect list and reduced-motion behavior.

- Framer Motion, subtle only: fade/slide-up `whileInView`, **150–250 ms**.
- Always respect `prefers-reduced-motion` (disable transforms, keep opacity or nothing).

## A11y (non-negotiable)

Semantic landmarks (`header/nav/main/footer`), visible focus rings, alt text on all images, color contrast AA, fully keyboard-navigable, skip-to-content link.

## Decision log

- 2026-07-05 — initial tokens from résumé palette (producer/architect). Append dated entries below; architect approves structural changes.
- 2026-07-05 — **Tailwind v4 (CSS-first) confirmed** for token implementation (architect, ADR-0001 in docs/SPEC.md Appendix B). PF-M0-03 defines the palette above as CSS variables + `@theme` in `app/globals.css` — **no `tailwind.config.js`**. Dark mode stays class-strategy (`dark:`) with the no-FOUC inline `<head>` script; under v4, wire the dark variant via `@custom-variant dark (&:where(.dark, .dark *))` in globals.css.
- 2026-07-05 — **Routes, folder structure & MDX content model defined** (architect, PF-M0-02) in `docs/ARCHITECTURE.md`; MDX pipeline pre-approved in ADR-0002 (SPEC Appendix B). PF-M0-03's structural needs (token file location, `.dark` class strategy, no-FOUC inline script, `ThemeToggle` at `components/ui/theme-toggle.tsx`) are specified in ARCHITECTURE.md section 5 — implement against it.
- 2026-07-06 — **V2 "Editorial Dark" ratified** (architect, ADR-0003, SPEC Appendix B; ratifies `docs/DESIGN_BRIEF_V2.md`). Dark-only; GSAP + lazy pixi.js (no Framer Motion); Archivo + JetBrains Mono via `next/font`; semantic token names kept, values repointed. Light-mode/toggle/Framer sections above marked SUPERSEDED. Full V2 spec in the section below.

---

## V2 — Editorial Dark (active — 2026-07-06, ADR-0003)

Dark-only editorial system. Big type carries the page; a few signature effects (brief §3). Ratified in
ADR-0003 (SPEC Appendix B); locked product-owner decisions in `docs/DESIGN_BRIEF_V2.md §1`.

### V2 Palette — token table

Single palette on `:root` (no `.dark`, no toggle). Set `color-scheme: dark`.

| Raw value | Role | Semantic token(s) |
|---|---|---|
| `#0A0A0A` | page background | `--background` |
| `#111111` | card / raised surface | `--background-subtle` |
| `#1C1C1C` | hairline / default border | `--border` |
| `#2A2A2A` | strong border | `--border-strong` *(new)* |
| `#F5F5F0` | text primary | `--foreground` |
| `#999999` | text secondary | `--foreground-secondary` *(new)* |
| `#666666` | text muted | `--foreground-muted` *(new)* |
| `#5EEAD4` | accent teal (links, highlights, focus, teal fills) | `--primary`, `--accent`, `--ring` |
| `#04342C` | accent-deep — text/icon color **on** teal fills | `--primary-foreground` |
| `#0F1F1C` | teal-dark image mat (base) | `--surface-mat` *(new)* |
| `#16211F` | teal-dark image mat (raised) | `--surface-mat-strong` *(new)* |

`--accent-foreground` = `--foreground` (`#F5F5F0`) for text sitting *beside* accents on the page. **No gold
in V2** — `--gold` / `--palette-gold` and `text-gold` are retired.

### V2 Typography

- **Display — Archivo, weight 500**, uppercase, **tight leading**, size `clamp(40px, …, 96px)`. Hero name,
  section headlines, big numbers. Tighten tracking on huge sizes; never below ~1.0 line-height at 96px.
- **Labels / metadata — JetBrains Mono**, letter-spacing **.14–.2em**, **10–12px**, often uppercase.
- **Numbered section labels:** `01 — SELECTED WORKS` pattern (mono, muted, the number and rule in
  `--foreground-muted`).
- **Body — 13–14px / line-height 1.7.** JetBrains Mono for short metadata/captions; body prose may use a
  neutral system/JetBrains stack — no separate UI sans is loaded (display = Archivo, else mono/system).
- **Image captions:** mono, `FIG. 01 — THE ENGINEER` pattern.
- Fonts via `next/font/google` (self-hosted, zero layout shift): `Archivo` → `--font-display`,
  `JetBrains Mono` → `--font-mono`. No Inter/Geist.

### V2 Layout language

- **Full-bleed rows** separated by **1px hairlines** (`--border`); generous black negative space.
- **Max-width constraint on prose only** (`--container-content`, case-study body / long text). Structural
  rows and the work list go edge-to-edge.
- **Work list = typographic rows, not cards.** Title (display) + mono meta per row, hairline separators,
  hover state; hover-video preview is a motion enhancement (brief E6), never required to read the row.
- **Images sit in thin-bordered mats** (`--surface-mat` / `--border-strong`) with mono captions; duotone /
  darken treatment so photo backgrounds melt into `#0A0A0A`.

### V2 Motion (summary — full list brief §3, gate §5)

- One engine: **GSAP + ScrollTrigger** (free core). **`pixi.js` lazy** for the hero displacement only
  (`next/dynamic`, desktop + fine pointer, after idle; static duotone `<img>` fallback).
- All `"use client"` effects live in **`components/motion/`**; sections/pages stay server components.
- `prefers-reduced-motion` is mandatory and QA-verified: scramble → final text, marquees paused,
  pixi/parallax off (static image), pinned-horizontal → vertical stack, reveals → instant show.

### V2 token migration rule (binding on PF-V2-02)

**Keep the existing semantic token *names*; repoint their *values*** so component churn is minimal:

| Semantic token | Old (light default) | V2 value |
|---|---|---|
| `--background` | `#ffffff` | `#0A0A0A` |
| `--background-subtle` | `#f3faf9` | `#111111` |
| `--foreground` | `#263238` | `#F5F5F0` |
| `--primary` | `#0f766e` | `#5EEAD4` |
| `--primary-foreground` | `#ffffff` | `#04342C` |
| `--accent` | `#5eead4` | `#5EEAD4` |
| `--accent-foreground` | ink | `#F5F5F0` |
| `--border` | ink@14% | `#1C1C1C` |
| `--ring` | teal-300 | `#5EEAD4` |

Plus **new** tokens: `--foreground-secondary` `#999999`, `--foreground-muted` `#666666`, `--border-strong`
`#2A2A2A`, `--surface-mat` `#0F1F1C`, `--surface-mat-strong` `#16211F`. **Remove (leave no orphan tokens in
`app/globals.css`):** `--gold`/`--palette-gold` (+ every `text-gold`); **`--color-ink` in `@theme` + every
`text-ink` usage** (`#263238` is near-invisible on `#0A0A0A` — do not remap, delete it; use
`--foreground`/`--foreground-secondary`/`--foreground-muted` instead); **the raw `--palette-dark-*` set**
(`--palette-dark-bg`, `--palette-dark-bg-subtle`, `--palette-dark-ink`, `--palette-dark-gold`) — the `.dark`
block that consumed them is gone, so they are dead; and the light raw palette (`--palette-bg`,
`--palette-bg-subtle`, `--palette-ink`) once semantic vars are repointed. Also remove the `.dark` override
block, `@custom-variant dark` (drop `dark:` prefixes — they become unconditional), and `--font-sans`/Geist.
**Add** `--font-display` (Archivo). `:root` becomes the
single dark palette; delete the no-FOUC script and `components/ui/theme-toggle.tsx`.

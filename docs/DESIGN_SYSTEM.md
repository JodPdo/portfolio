# Design System — tokens & rules

Matches the résumé identity (cohesive personal brand). Source of truth for PF-M0-03 Tailwind config.

## Palette

| Token | Value | Use |
|---|---|---|
| `primary` | `#0F766E` (teal-700) | headings accents, buttons, links |
| `accent` | `#5EEAD4` (teal-300) | highlights, hover, focus decorations |
| `ink` | `#263238` | body text (light mode) |
| `bg` | `#F3FAF9` / `#FFFFFF` | page / card backgrounds (light) |
| `gold` | `#B8860B` | special links / metric highlights (sparingly) |

**Dark mode:** class strategy (`dark:`) + toggle, respect `prefers-color-scheme` on first load, persist choice (no FOUC — inline script in `<head>`). Dark bg ≈ `#0B1B1A`–`#111827` range, text ≈ `#E6F2F0`; keep contrast AA everywhere.

## Type

- UI/body: **Inter** (or Geist) via `next/font` — no layout shift.
- Code/metrics: **JetBrains Mono**.
- Scale: text-sm → text-4xl/5xl for hero; line-height relaxed for prose.

## Layout & spacing

- Max content width ~**1100px**, generous whitespace, **8-pt spacing scale** (Tailwind default fits).
- Breakpoints to verify every card: **375 / 768 / 1280**.

## Motion

- Framer Motion, subtle only: fade/slide-up `whileInView`, **150–250 ms**.
- Always respect `prefers-reduced-motion` (disable transforms, keep opacity or nothing).

## A11y (non-negotiable)

Semantic landmarks (`header/nav/main/footer`), visible focus rings, alt text on all images, color contrast AA, fully keyboard-navigable, skip-to-content link.

## Decision log

- 2026-07-05 — initial tokens from résumé palette (producer/architect). Append dated entries below; architect approves structural changes.

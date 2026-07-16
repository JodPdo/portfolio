# Current Phase

**Milestone: M2 — Projects work-rows + MDX case-study layout on V2**

M1.5 (Design V2 "Editorial Dark") closed 2026-07-17. Cards PF-V2-01 … PF-V2-08 all Done; the brief §5 exit gate (PF-V2-07) passed on a production build across all 9 routes.

## Exit Gate (M1.5) — brief §5, owned by PF-V2-07 — CLOSED 2026-07-17

- [x] ADR-0003 ratified; docs consistent (no framer-motion, dark-only recorded)
- [x] Initial JS on `/` < 250KB gzip (excl. lazy pixi chunk; pixi desktop-idle-only) — 238.11KB measured, pixi 0 bytes on initial load
- [x] Lighthouse mobile: Perf ≥ 90 (target 95), A11y/BP/SEO ≥ 95, CLS < 0.1 — 96-98 Perf, 100/100/100 A11y/BP/SEO, CLS 0 across /, /about, /projects, /resume, /contact, /projects/aiklao
- [x] `prefers-reduced-motion` pass: E2 final text, E3 paused, E4/E5 off, E7 vertical stack, E8 instant — all verified live on production build
- [x] Keyboard: work rows focusable, no traps; skip link, landmarks, AA contrast preserved — axe 0 violations on all 9 routes
- [x] No layout shift from fonts/marquees — CLS 0 everywhere
- [x] **M2 (PF-M2-06 MDX layout) now unblocked** — moved to `todo`

Known non-blocking carry-overs from the gate: `/projects/[slug]` still returns 200 (not 404) for an unknown slug — explicitly owned by PF-M2-06 (`generateStaticParams` + `dynamicParams=false` wiring), not a new gap. One axe `incomplete` (color-contrast, paint-order-blind false-positive on the already-investigated PF-V2-08 JPD numeral/title pair) — doesn't affect Lighthouse's scored Accessibility category, no action needed.

## Carry-overs still open

- PF-M1-06 (Resume page) — blocked on product owner PDFs (`/public/resume/`); will be built on the V2 base.
- M2 content is DONE (4 case-study MDX files QA-passed); PF-M2-06 now wires the MDX layout + `/projects/[slug]` 404 fix on the V2 base.

## Milestone map

| M | Goal | Gate |
|---|---|---|
| M0 ✅ | Skeleton live on Vercel | closed 2026-07-05 |
| M1 ✅* | Home, About, Contact, Resume | closed 2026-07-06 except PF-M1-06 (resume PDFs pending) |
| M1.5 ✅ | Design V2 — Editorial Dark | brief §5 gate closed 2026-07-17 (PF-V2-07) |
| **M2 (now)** | Projects work-rows + 4 MDX case studies on V2 | live demo/repo links, content reviewed |
| M3 | SEO/OG, Lighthouse (amended: mobile Perf ≥ 90 + trio ≥ 95 + CLS < 0.1), a11y AA, domain `jod.aiklaotrip.com` | launch |
| M4 (opt) | TH/EN toggle (`next-intl`) | toggle works, no layout break |

Only `producer` edits this file (when a gate passes).

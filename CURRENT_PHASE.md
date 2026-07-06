# Current Phase

**Milestone: M1.5 — Design V2 ("Editorial Dark")**

Goal: adopt Design Brief V2 (`docs/DESIGN_BRIEF_V2.md`) — dark-only editorial redesign with signature motion (scramble, marquee, pixi hero displacement, pinned horizontal How-I-work). Cards PF-V2-01 … PF-V2-07, dependency 01 → 02 → 03 → (04, 05, 06) → 07.

## Exit Gate (M1.5) — brief §5 is the gate, owned by PF-V2-07

- [ ] ADR-0003 ratified; docs consistent (no framer-motion, dark-only recorded)
- [ ] Initial JS on `/` < 250KB gzip (excl. lazy pixi chunk; pixi desktop-idle-only)
- [ ] Lighthouse mobile: Perf ≥ 90 (target 95), A11y/BP/SEO ≥ 95, CLS < 0.1
- [ ] `prefers-reduced-motion` pass: E2 final text, E3 paused, E4/E5 off, E7 vertical stack, E8 instant
- [ ] Keyboard: work rows focusable, no traps; skip link, landmarks, AA contrast preserved
- [ ] No layout shift from fonts/marquees
- [ ] **M2 (PF-M2-06 MDX layout) stays blocked until this gate passes**

## Carry-overs still open

- PF-M1-06 (Resume page) — blocked on product owner PDFs (`/public/resume/`); will be built on the V2 base.
- M2 content is DONE (4 case-study MDX files QA-passed); grid page ships old-theme until PF-V2-05 replaces it with work rows.

## Milestone map

| M | Goal | Gate |
|---|---|---|
| M0 ✅ | Skeleton live on Vercel | closed 2026-07-05 |
| M1 ✅* | Home, About, Contact, Resume | closed 2026-07-06 except PF-M1-06 (resume PDFs pending) |
| **M1.5 (now)** | Design V2 — Editorial Dark | brief §5 budget/a11y gate (PF-V2-07) |
| M2 | Projects work-rows + 4 MDX case studies on V2 | live demo/repo links, content reviewed |
| M3 | SEO/OG, Lighthouse (amended: mobile Perf ≥ 90 + trio ≥ 95 + CLS < 0.1), a11y AA, domain `jod.aiklaotrip.com` | launch |
| M4 (opt) | TH/EN toggle (`next-intl`) | toggle works, no layout break |

Only `producer` edits this file (when a gate passes).

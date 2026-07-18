# Current Phase

**Milestone: M3 — SEO/OG, Lighthouse gate, a11y AA, custom domain (launch)**

M2 (Projects work-rows + MDX case studies on V2) closed 2026-07-18. M3 is now the active milestone; PF-M3-01 (SEO/OG) and PF-M3-02 (full QA + Lighthouse gate) are `todo` and ready to start.

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

## M2 progress

- **PF-M2-06 (MDX case-study layout + `/projects/[slug]` 404 fix) — DONE 2026-07-18.** code-reviewer PASS (renderer-correctness, a11y, token-compliance, factual-accuracy) + qa-engineer PASS the full DoD gate (build/lint green, all 4 case-study routes render real content, unknown slug -> 404 confirmed for both a nonsense slug and the non-canonical `jpd` shorthand, responsive 375/768/1280 clean, dark-only V2 theme, axe 0 violations on all 4 routes, no broken links). This was the last *code* card for M2.
- PF-M2-01 … PF-M2-05 (projects grid + 4 case-study MDX files) — all Done/QA-passed prior.

## M2 — CLOSED 2026-07-18

M2's content + layout work is complete. There is **no dedicated M2 exit-gate card** in `_backlog.json` (M2 has no PF-M2 "gate" card the way M1.5 had PF-V2-07); the formal Lighthouse/a11y sweep for the post-M2 base is owned by M3 as **PF-M3-02**. With PF-M2-06 landed and both non-blocking follow-ups (PF-M2-07, PF-M2-08) now resolved, M2 closes. The three cards that closed it:

- **PF-M2-06** (frontend-engineer) — MDX case-study layout + `/projects/[slug]` 404 wiring (`generateStaticParams` + `dynamicParams=false`). All 4 studies render as SSG, unknown slug -> real 404, responsive 375/768/1280, dark-only V2, axe 0 violations. code-reviewer PASS + qa-engineer PASS.
- **PF-M2-07** (frontend-engineer) — `/projects/tiger-kick` font-swap CLS fix (JetBrains Mono `display:optional`, architect-approved as ADR-0003a in docs/SPEC.md). CLS re-measures clean on a fresh production build. code-reviewer PASS + qa-engineer PASS.
- **PF-M2-08** (content-writer) — leaked internal author note in `content/projects/typing-race.mdx` converted to an MDX `{/* comment */}`; the "must not render publicly" aside confirmed gone from shipped HTML. code-reviewer PASS + qa-engineer PASS.

PF-M2-01 … PF-M2-05 (projects grid + 4 case-study MDX files) were all Done/QA-passed prior.

## Carry-overs still open

- PF-M1-06 (Resume page) — blocked on product owner PDFs (`/public/resume/`); will be built on the V2 base.

## Milestone map

| M | Goal | Gate |
|---|---|---|
| M0 ✅ | Skeleton live on Vercel | closed 2026-07-05 |
| M1 ✅* | Home, About, Contact, Resume | closed 2026-07-06 except PF-M1-06 (resume PDFs pending) |
| M1.5 ✅ | Design V2 — Editorial Dark | brief §5 gate closed 2026-07-17 (PF-V2-07) |
| M2 ✅ | Projects work-rows + 4 MDX case studies on V2 | closed 2026-07-18 (PF-M2-06/07/08); no separate gate card — quality sweep lives in M3/PF-M3-02 |
| **M3 (now)** | SEO/OG, Lighthouse (amended: mobile Perf ≥ 90 + trio ≥ 95 + CLS < 0.1), a11y AA, domain `jod.aiklaotrip.com` | launch — PF-M3-01 (SEO/OG) + PF-M3-02 (QA/Lighthouse gate) now `todo`; PF-M3-05 (nav target-size) open; PF-M3-03 (domain) blocked on 01+02 |
| M4 (opt) | TH/EN toggle (`next-intl`) | toggle works, no layout break |

Only `producer` edits this file (when a gate passes).

# Current Phase

**Milestone: M3 — SEO/OG, Lighthouse gate, a11y AA, custom domain (launch) — CLOSED 2026-07-19. Core project scope COMPLETE; site LAUNCHED at https://jod.aiklaotrip.com.**

M3 closed 2026-07-19 with the domain cutover (PF-M3-03) and the deferred post-cutover SEO verification. Every M3 card is now Done (01, 02, 03, 05, 06, 07, 08; 04 was obsolete/closed). The site is live over HTTPS at **jod.aiklaotrip.com** and all launch-gate work (SEO/OG, Lighthouse, a11y AA, domain) has passed. **The core project scope (M0 → M3) is complete.** Only **M4 (TH/EN toggle) remains, and it is OPTIONAL/DEFERRED** per CLAUDE.md product-owner decision #5 — not started. See the M3-closed section below.

M2 (Projects work-rows + MDX case studies on V2) closed 2026-07-18. The last M1 carry-over (PF-M1-06, resume page) closed 2026-07-19.

## Post-launch updates

- **Post-launch: "Option A" full-bleed in-view-autoplay project previews on /projects + home Featured section — 2026-07-21, reviewed + deployed, confirmed live.** Preview media went full-bleed with in-view (scroll-into-view) autoplay, replacing the E6 hover-only reveal, shared across `/projects` work rows and the homepage Featured projects section (`components/projects/project-media-row.tsx`, `components/motion/use-in-view-autoplay.ts`, `lib/project-previews.ts`); new /projects intro copy "Previews play as you scroll; select a row to read the write-up." Full mandatory chain: architect (two rulings, both 2026-07-21) -> frontend-engineer + content-writer (one copy line) -> code-reviewer PASS -> qa-engineer FAIL (2 bugs) -> frontend-engineer fixed both -> code-reviewer re-PASS -> qa-engineer final PASS. **Two bugs found + fixed in-cycle:** PF-M3-09 (mobile 375px title contrast — AiKlao/Typing Race video-row teal titles measured 2.38-2.59:1 over bright video frames; fixed with an `sm:`-conditional stronger scrim, re-measured >=5.88:1 worst-pixel at 375px, 1280px undisturbed) and PF-M3-10 (homepage keyboard reachability — `<Reveal>`'s `autoAlpha` left the 3 Featured rows `visibility:hidden`/out of tab order until scroll; fixed by swapping to plain `opacity` + in-view-on-mount check in `components/motion/reveal.tsx`, all 3 rows now tab-reachable in order from first paint). Both cards carry qa_verdict PASS. Final independently-measured Lighthouse mobile: **`/` Perf 94 / A11y 100 / BP 100 / SEO 100 / CLS 0; `/projects` Perf 95 / A11y 100 / BP 100 / SEO 100 / CLS 0** — both clear the amended gate (mobile Perf >= 90, trio >= 95, CLS < 0.1). Commit `9a0aa42`; producer confirmed live over HTTPS at jod.aiklaotrip.com (new intro copy in served /projects HTML, new JS/CSS chunks + all 5 `/media/*` preview assets 200, homepage reuses the same media). PF-M3-09 + PF-M3-10 -> Done.
- **Post-launch (no card — direct PO instruction): E6 hover-preview media completed + AiKlao live web-app link added — 2026-07-21, reviewed + deployed.** WorkRow now serves real preview media (AiKlao / Typing Race video `.webm`, Tiger Kick image-only `.webp` since the game is unfinished; JPD stays typographic-poster-only), replacing the poster-only ship; all assets under the 300KB cap. AiKlao case study gains a live web-app link (`dev.aiklaotrip.com`). Full mandatory chain: architect (component-API ruling) -> frontend-engineer + content-writer -> code-reviewer PASS -> qa-engineer PASS (build/lint green, hover/touch/keyboard/reduced-motion via Playwright, Lighthouse 96-98 Perf / 100 A11y/BP/SEO / CLS 0 on `/projects` + `/projects/aiklao`). Commit `1dfc51e`; producer confirmed live over HTTPS at jod.aiklaotrip.com (3 new `/media/*` assets 200 at exact repo byte sizes, "Live web app" link present in served HTML).

## M3 progress

- **PF-M3-01 (SEO/OG) — DONE 2026-07-18.** Per-page titles/meta, JSON-LD Person on `/`, `next/og` OG image (1200x630 PNG at `/opengraph-image`), `sitemap.xml` (9 real routes, absolute URLs), `robots.txt` (`Disallow: /scratch/` + Sitemap line; `/scratch/motion` noindexed). Every route now renders exactly one correct per-page openGraph + twitter set. code-reviewer PASS + qa-engineer PASS (re-verified after the PF-M3-07/08 fix cycle). Note: structural/local validation only — Google Rich Results / hosted OG-preview tools can only run post domain cutover (PF-M3-03), non-blocking for this card.
- **PF-M3-02 (full M3 QA + Lighthouse gate) — DONE 2026-07-18.** Full QA pass per `docs/QA_CHECKLIST.md`. Lighthouse **comfortably clears the amended gate on every route: 96-98 Perf / 100 A11y / 100 BP / 100 SEO / CLS 0** — well above the Design Brief V2 §5 amended gate (mobile Perf ≥ 90 + A11y/BP/SEO ≥ 95 + CLS < 0.1). Two bugs filed from the sweep (PF-M3-06 this pass; PF-M3-05 filed just prior) — both non-blocking. qa-engineer PASS.
- **PF-M3-07 (bugfix: missing OG image on all 4 case-study pages) — DONE 2026-07-18.** Root cause fixed via shared `buildOpenGraph()` helper in `lib/site.ts`; all 4 `/projects/[slug]` routes now carry the absolute OG/twitter image + `og:type=article`. code-reviewer PASS + qa-engineer PASS.
- **PF-M3-08 (bugfix: wrong og:title/description/url on `/about`, `/contact`, `/resume`, `/projects`) — DONE 2026-07-18.** Same root cause/fix as PF-M3-07; all 4 pages now render page-specific og/twitter title/description + own canonical `og:url` (homepage leak gone). code-reviewer PASS + qa-engineer PASS.

### M3 non-blocking follow-ups — both now DONE 2026-07-19

- **PF-M3-05 (frontend-engineer) — DONE 2026-07-19.** Header nav / brand / trust-strip tap targets were 16-22px, below WCAG 2.2 SC 2.5.8's 24px minimum. Fixed by making the collapsing negative-margin spill breakpoint-conditional (spill applied only where each row is provably single-row; dropped wherever the layout can wrap) so wrapped rows can never overlap. First attempt FAILED code review (unconditional spill left overlapping 44px hit boxes at wrap points); rework (commit `fea3372`) fixed it. qa-engineer independently re-measured real getBoundingClientRect() hit boxes via CDP across 8 widths straddling the md/xl wrap boundaries: zero pairwise overlap, every target >= 24px hard floor (44px tall except the 36px GitHub icon whose invisible ::after expands to ~42px), keyboard order/focus-ring clean, axe 0 violations, build + lint green. code-reviewer PASS (re-review) + qa-engineer PASS.
- **PF-M3-06 (content-writer) — DONE 2026-07-18.** All 4 case studies' Links sections no longer render literal `[NEEDS-VERIFICATION: ...]` bracket text; real live links promoted (AiKlao APK + CI/CD, typing-race demo) and remaining entries use placeholder-free plain-text fallbacks. qa grep of all 4 rendered routes: zero internal-marker occurrences. code-reviewer PASS + qa-engineer PASS.

### M3 exit gate — CLOSED 2026-07-19

- **PF-M3-03 (custom domain `jod.aiklaotrip.com` + Vercel Analytics) — DONE 2026-07-19.** The human product owner completed the DNS CNAME + Vercel domain add + HTTPS outside this session. Producer then ran the **deferred post-cutover SEO verification** (deferred from PF-M3-01 because no live URL existed at the time) directly against the live domain. Method: direct HTTP fetch + rigorous structural validation via curl (no WebFetch/Google-Rich-Results-UI/hosted-OG-preview tool driven — stated plainly). All 3 checks PASS:
  - [x] **JSON-LD Person** — `GET https://jod.aiklaotrip.com/` → HTTP 200, title correct; single `<script type="application/ld+json">` block re-parsed as valid JSON: `@context=https://schema.org`, `@type=Person`, `name`, `url=https://jod.aiklaotrip.com`, `sameAs`=[GitHub, LinkedIn] array. All required fields present.
  - [x] **OG image / social meta** — homepage renders a complete `og:*`+`twitter:*` set (title/description/url/site_name/locale/image/type + twitter card/title/description/image); the `og:image` URL itself returns HTTP 200, `content-type: image/png`, PNG IHDR = exactly **1200×630**.
  - [x] **Sitemap + robots absolute-URL** — `/sitemap.xml` HTTP 200, all **9 `<loc>` entries on `https://jod.aiklaotrip.com`**, **zero `vercel.app` occurrences**; `/robots.txt` HTTP 200 with `Disallow: /scratch/` and `Sitemap: https://jod.aiklaotrip.com/sitemap.xml` on the correct domain.
  - Note: Vercel Analytics enablement is the human's dashboard action (not verifiable from this repo/curl session); the domain-live-over-HTTPS half of the DoD is verified above.

**All M3 launch-gate work is complete: SEO/OG (PF-M3-01), full QA + Lighthouse gate 96-98 Perf / 100 trio / CLS 0 (PF-M3-02), OG bugfixes (PF-M3-07/08), nav target-size (PF-M3-05), NEEDS-VERIFICATION link text (PF-M3-06), and domain cutover + post-cutover SEO verification (PF-M3-03). Broken-build/Lighthouse-<90 gate condition not triggered. M3 CLOSED, site launched.**

### After M3 — M4 is optional/deferred

Per CLAUDE.md product-owner decision #5, **M4 (TH/EN toggle, `next-intl`) is OPTIONAL and deferred — do not pull it forward.** With M3 closed, the portfolio's core scope (M0 → M3: skeleton, core pages, Design V2, projects/case studies, and launch) is **complete and live**. No milestone is currently active; M4 (PF-M4-01) stays in `backlog` unless/until the product owner elects to start it.

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

- **None.** PF-M1-06 (Resume page) — the last M1 carry-over, previously blocked on product-owner PDFs — is **DONE 2026-07-19.** Built on the V2 base as a **download-first single all-roles PDF** (the earlier 3-tab role-tailored-PDF design was **dropped** per architect's ADR / docs/SPEC.md Appendix A#5 amendment, commit `286b770`, before the page was built). qa-engineer PASS: real PDF download at 375px and 1280px, no `<iframe>` and zero `.pdf` fetch on mobile (iframe mounts only at >= 1024px via matchMedia), keyboard-reachable download + open-in-new-tab CTAs with visible focus, descriptive thumbnail accessible name, axe 0 violations at 375/768/1280, build + lint green. code-reviewer PASS + qa-engineer PASS. This closes out M1.

## Milestone map

| M | Goal | Gate |
|---|---|---|
| M0 ✅ | Skeleton live on Vercel | closed 2026-07-05 |
| M1 ✅ | Home, About, Contact, Resume | closed 2026-07-06; last carry-over PF-M1-06 (resume page, single all-roles PDF, download-first) Done 2026-07-19 |
| M1.5 ✅ | Design V2 — Editorial Dark | brief §5 gate closed 2026-07-17 (PF-V2-07) |
| M2 ✅ | Projects work-rows + 4 MDX case studies on V2 | closed 2026-07-18 (PF-M2-06/07/08); no separate gate card — quality sweep lives in M3/PF-M3-02 |
| M3 ✅ | SEO/OG, Lighthouse (amended: mobile Perf ≥ 90 + trio ≥ 95 + CLS < 0.1), a11y AA, domain `jod.aiklaotrip.com` | **launch gate closed 2026-07-19** — PF-M3-01 (SEO/OG) + PF-M3-02 (QA/Lighthouse: 96-98 Perf / 100 trio / CLS 0) + PF-M3-07/08 (OG bugfixes) Done 2026-07-18; PF-M3-05 (nav target-size) + PF-M3-06 (NEEDS-VERIFICATION link text) Done 2026-07-19; PF-M3-03 (domain cutover + post-cutover SEO verification: JSON-LD Person / OG image 1200×630 / sitemap+robots absolute-URL all PASS live) Done 2026-07-19. **Site LIVE at https://jod.aiklaotrip.com** |
| M4 (opt) | TH/EN toggle (`next-intl`) — **OPTIONAL, deferred, not started** (PO decision #5) | toggle works, no layout break |

Only `producer` edits this file (when a gate passes).

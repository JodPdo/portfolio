# QA Checklist — qa-engineer runs this per card (relevant items) and in full at every Exit Gate

## Build & hygiene

- [ ] `npm run build` green, `npm run lint` green
- [ ] Zero console errors/warnings on every route (light + dark)
- [ ] No broken links (internal + external) — use a link checker, not eyes
- [ ] All images have meaningful `alt`; `next/image` used (no raw `<img>`)

## Responsive

- [ ] 375px (mobile) — no horizontal scroll, tap targets ≥ 44px
- [ ] 768px (tablet) — grid/nav behave
- [ ] 1280px (desktop) — max-width respected, no stretched content

## Dark mode

- [ ] Toggle works on every page, choice persists, no FOUC
- [ ] Contrast AA in dark mode too (check gold `#B8860B` on dark carefully)

## Accessibility (AA)

- [ ] Keyboard-only pass: every interactive element reachable, visible focus ring, logical order
- [ ] Landmarks + one `h1` per page, heading order sane
- [ ] Skip-to-content link present
- [ ] `prefers-reduced-motion` respected
- [ ] Axe (or Lighthouse a11y) — zero critical issues

## Lighthouse (Exit Gate M3: ≥ 95 all four; gate blocks < 90 anywhere)

- [ ] Performance ≥ 95 (mobile emulation)
- [ ] Accessibility ≥ 95
- [ ] Best Practices ≥ 95
- [ ] SEO ≥ 95

## Content (with content-writer)

- [ ] Every claim verifiable (test counts, coverage, live URLs) — click every trust-strip link
- [ ] No phone number anywhere (product-owner decision)
- [ ] Contact email confirmed by product owner
- [ ] Case-study template complete for all 4 (problem → role → stack → architecture → hard problem → testing → results → links → learned)

## SEO / social (M3)

- [ ] Per-page title + meta description unique
- [ ] JSON-LD Person validates (Rich Results test)
- [ ] OG image renders (check with an OG preview tool)
- [ ] `sitemap.xml` + `robots.txt` served

**Fail handling:** file a bug as a new card in `_backlog.json` (owner = the agent who owns the area), status `todo`, link the failing checklist item. Do not fix-and-forget without a card.

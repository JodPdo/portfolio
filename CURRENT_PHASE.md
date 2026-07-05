# Current Phase

**Milestone: M1 — Home, About, Contact, Resume**

Goal: real pages built from approved, verifiable copy — global layout (header/footer), Home, About (timeline), Resume (download-first tabs), Contact. Responsive + dark mode + working links.

## Exit Gate (M1)

- [ ] Global layout: sticky header + footer, keyboard-navigable, visible focus rings
- [ ] Home, About, Resume, Contact built from reviewed copy (facts verifiable)
- [ ] Responsive 375/768/1280; dark mode OK on every page
- [ ] All links real and working; mailto works; resume PDFs download on mobile + desktop
- [ ] NO phone number anywhere; contact email verified by product owner before ship
- [ ] `npm run build` + `npm run lint` green

## M0 Exit Gate — CLOSED 2026-07-05

- [x] Site loads on the Vercel URL (https://portfolio-zeta-gilt-mm7bxjobci.vercel.app — all 6 routes HTTP 200)
- [x] `npm run build` + `npm run lint` green
- [x] Design tokens usable, dark-mode toggle works (PF-M0-03, QA-verified incl. headless-Edge check)
- [x] Routes exist: `/`, `/projects`, `/projects/[slug]`, `/about`, `/resume`, `/contact`

## Milestone map

| M | Goal | Gate |
|---|---|---|
| M0 ✅ | Skeleton live on Vercel | closed 2026-07-05 |
| **M1 (now)** | Home, About, Contact, Resume | responsive + dark mode + links |
| M2 | Projects grid + 4 MDX case studies | live demo/repo links, content reviewed |
| M3 | SEO/OG, Lighthouse ≥ 95, a11y AA, domain `jod.aiklaotrip.com` | launch |
| M4 (opt) | TH/EN toggle (`next-intl`) | toggle works, no layout break |

Only `producer` edits this file (when a gate passes).

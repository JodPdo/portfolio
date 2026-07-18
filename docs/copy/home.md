# Home page copy — `/` (card PF-M1-02)

**Status:** draft → Review. **Author:** content-writer. **Source of truth:** `docs/SPEC.md` §4.1 (+ §5 for project facts, Appendix A for locked constraints).
**Consumer:** frontend-engineer (PF-M1-03). Build exactly what is written here; anything marked `[NEEDS-VERIFICATION]` must NOT ship as a live link until resolved — use the stated interim target.

Conventions in this doc:
- `Text in quotes` = exact string to render.
- **Target** = the `href` to use, exactly as written.
- **Source** = where the fact/number is verifiable.
- No phone number anywhere. No email on this page (email is pending product-owner verification and belongs to `/contact`).

Page section order (per `docs/ARCHITECTURE.md` §1, Home = hero → featured 3 → skills → CTA, with the trust strip directly under the hero per SPEC §4.1):

1. Hero
2. Trust strip
3. Featured projects (3 cards)
4. Skills (grouped chips)
5. Closing CTA

---

## 1. Hero

**H1 (name):**
> Aekkarat Fontong

**H2 (role line):**
> Software & QA Automation Engineer — I ship production software and the tests that keep it honest.

**Intro paragraph:**
> From a 4.5-year career in the Royal Thai Police to building real, deployed apps — React Native, Node.js, Spring Boot, and 500+ automated tests across six repositories.

- Source: verbatim from SPEC §4.1. "500+" is backed by 505 total = 82 + 138 + 84 + 60 + 116 + 25 (see §2, item 3 below). Do not round up past "500+"; do not print "505" in the hero.
- Sourcing note: "six repositories" (verbatim SPEC §4.1) refers to the six test-bearing codebases in the 505 arithmetic (AiKlao app / Node service / Spring Boot service, Typing Race, Tiger Kick, JPD API), not six distinct GitHub repos — AiKlao's services live in fewer repos.
- "4.5-year career in the Royal Thai Police" and the June 2026 resignation are per SPEC §4.2 (About). Consistent across pages.

**Hero CTAs (three, in this order):**

| Label (exact) | Target | Notes |
|---|---|---|
| `View projects` | `/projects` | Primary button. Internal route, exists since M0. |
| `Download résumé` | `/resume` | Secondary button. Links to the résumé *page*, not a PDF directly — one résumé PDF for all roles, and the page is download-first (Appendix A#2, A#5). |
| `GitHub ↗` | `https://github.com/JodPdo` | Tertiary/ghost. External: `target="_blank" rel="noopener noreferrer"`. Username per SPEC §4.4 / §7. |

---

## 2. Trust strip

Four short, factual claims directly under the hero (SPEC §4.1: "real, clickable"). Each item = label + link. Render as a single row (wraps on mobile). Every claim below states exactly what backs it.

### Item 1 — live demo
- **Label:** `Live demo: race.aiklaotrip.com`
- **Target:** `https://race.aiklaotrip.com` (external, new tab)
- **Source:** SPEC §5, Case Study 2 — Typing Race is "live at race.aiklaotrip.com".

### Item 2 — public APK
- **Label:** `Public Android APK`
- **Target:** `[NEEDS-VERIFICATION: exact AiKlao app-repo releases/latest URL — SPEC §5 CS1 says "APK (releases/latest)" but gives no full URL]`
- **Interim target until verified:** `/projects` (internal). Do not guess a GitHub URL.
- **Source of the claim itself:** SPEC §5, Case Study 1 Results — "public Android APK anyone with LINE can install".

### Item 3 — test count
- **Label:** `500+ automated tests`
- **Target:** `/projects` (internal — the case studies document the per-repo counts; there is no single external URL for the total)
- **Source / arithmetic (CLAUDE.md canonical):** 505 = 82 (AiKlao app, Jest) + 138 (AiKlao Node service, Jest) + 84 (AiKlao Spring Boot service, JUnit/Mockito/MockMvc) + 60 (Typing Race core, Jest + Supertest) + 116 (Tiger Kick, GUT) + 25 (JPD API, Mockito + MockMvc). Say "500+", never a rounded-up figure like "over 550".

### Item 4 — CI/CD
- **Label:** `CI/CD on a self-managed VPS`
- **Target:** `[NEEDS-VERIFICATION: best public evidence URL — e.g. a GitHub Actions workflow file in the Typing Race or AiKlao repo; SPEC names the pipelines but not a URL]`
- **Interim target until verified:** `/projects` (internal).
- **Source of the claim itself:** SPEC §5 — CS1: "GitHub Actions, nginx, PM2, Ubuntu VPS" with "a CI gate blocks the release build on any red test"; CS2: "deployed via GitHub Actions → VPS (nginx + PM2)".

---

## 3. Featured projects (3 cards)

Order is locked (Appendix A#4): **AiKlao → Typing Race → Tiger Kick**. (JPD is not featured on Home; it appears on `/projects`.)

> **Engineering note:** at M2 these cards will render from MDX frontmatter (`featured: true`) per `docs/ARCHITECTURE.md` §3, and frontmatter becomes the canonical card copy. Until then, use the interim copy below — it is written to match what the frontmatter `summary` will say, so the swap is invisible.

### Card 1 — AiKlao
- **Title:** `AiKlao`
- **One-liner:** `Real-time group trip tracking — LINE bot, LIFF web, and a React Native app on one shared backend, with a concurrency-safe SOS path.`
- **Chips (max 4):** `React Native` · `Node.js` · `Spring Boot` · `PostgreSQL`
- **Card link:** `/projects/aiklao`
- Source: SPEC §5 CS1 (platform description, stack, hard problem).

### Card 2 — Typing Race
- **Title:** `Typing Race`
- **One-liner:** `Server-authoritative multiplayer typing game — the client can't cheat, and 60 core tests plus cross-browser Playwright E2E prove it. Live now.`
- **Chips:** `React` · `TypeScript` · `Socket.IO` · `Playwright`
- **Card link:** `/projects/typing-race`
- Source: SPEC §5 CS2 (server-authoritative anti-cheat, 60 Jest + Supertest, Playwright on Chromium/Firefox/WebKit, live at race.aiklaotrip.com).

### Card 3 — Tiger Kick
- **Title:** `Tiger Kick`
- **One-liner:** `A multiplayer party game in Godot — built under a review-gated, agent-driven SDLC I designed: Kanban, mandatory code review, and 116 unit tests plus a headless multiplayer smoke test in CI.`
- **Chips:** `Godot 4` · `GDScript` · `GUT` · `CI`
- **Card link:** `/projects/tiger-kick`
- Source: SPEC §5 CS3. Angle is process-first ("I designed a review-gated SDLC"), never "AI built a game".

**Section heading:** `Featured projects`
**Section link under the cards:** label `All projects →`, target `/projects`.

---

## 4. Skills (grouped chips)

**Section heading:** `Skills`
Four groups, exact labels and chip lists per SPEC §4.1 (order as written — it mirrors the all-roles positioning: build → serve → test → ship):

| Group label | Chips (in order) |
|---|---|
| `Frontend` | `React`, `React Native`, `Next.js`, `TypeScript` |
| `Backend` | `Node/Express`, `Spring Boot`, `REST`, `PostgreSQL` |
| `QA` | `Jest`, `JUnit`, `Playwright`, `GUT`, `Supertest` |
| `DevOps` | `GitHub Actions`, `Docker`, `nginx`, `PM2`, `Vercel`, `Linux/VPS` |

Chips are plain text (not links). Do not add technologies that are not in this table.

---

## 5. Closing CTA

**Copy (exact, per SPEC §4.1):**
> Career-changer, self-taught, and I finish what I start. Let's talk →

**Button:** label `Contact`, target `/contact`.

Optional supporting line above the CTA if the section needs visual weight (approved wording, no new facts):
> Every project on this site is real: built, tested, and linked to its code.

(Wording scoped from "deployed" — JPD API ships code only, and Tiger Kick is a build pipeline, so "deployed" would overclaim; per code review PF-M1-02 finding 1.)

---

## Open items before this page ships (blockers for QA sign-off)

1. `[NEEDS-VERIFICATION]` — AiKlao APK releases URL (trust-strip item 2). Ask the human product owner for the exact `github.com/JodPdo/<repo>/releases/latest` URL.
2. `[NEEDS-VERIFICATION]` — public URL evidencing the CI/CD claim (trust-strip item 4), e.g. a workflow file link in a public repo.
3. Both items have safe interim targets (`/projects`) so PF-M1-03 is not blocked; swap to the real URLs when confirmed and have qa-engineer re-click.

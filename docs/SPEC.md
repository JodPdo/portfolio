# Portfolio Website — Build Spec & Content
**Aekkarat Fontong (Jod)** · Software / QA Automation Engineer · career-changer (Royal Thai Police → software)

A build-ready blueprint: tech stack, page structure, real content, and 4 case studies pulled from actual projects. Intentionally **lean** (ship in 1–2 days) — it doubles as a *frontend showcase* and fills the "web-frontend depth" + "cloud deploy" gaps from HR feedback.

---

## 0. Goals (what this site must do)
1. **Prove frontend ability** — clean, fast, responsive, accessible (the gap recruiters flagged).
2. **Be the single link** on résumé / LinkedIn that shows everything: story → projects → depth → contact.
3. **Tell the career-change story** (police → self-taught → shipped production software) in a way a résumé can't.
4. **Preempt interview questions** with real case studies (architecture, the hard technical problem, testing).
5. Add **cloud deploy** (Vercel) to the stack.

**Non-goals:** blog CMS, animations-for-animations'-sake, over-engineering. Keep it small and excellent.

---

## 1. Tech stack (and why)
| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16 (App Router, TypeScript)** | SSR/SSG + SEO, modern, industry-standard React; shows real frontend. _(current stable as of scaffold — see Appendix B / ADR-0001)_ |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) | fast, consistent, responsive utilities; design tokens live in `app/globals.css` |
| Content | **MDX** for case studies | write case studies as Markdown + React components |
| UI/Icons | lucide-react, minimal custom components | no heavy UI kit |
| Animation | ~~**Framer Motion** (subtle only)~~ → **GSAP + ScrollTrigger; `pixi.js` (lazy, hero only)** | one motion engine, less JS — **SUPERSEDED by ADR-0003** (V2). Framer Motion is not used. |
| Analytics | **Vercel Analytics** (privacy-friendly) | see real visits (a small impact metric later) |
| Deploy | **Vercel** (free Hobby) | 1-click, preview deploys, custom domain |
| Domain | `jod.aiklaotrip.com` **or** `aekkarat.dev` | you already own aiklaotrip.com → free subdomain |
| Quality | ESLint + Prettier + `next/image` + Lighthouse ≥ 95 | demonstrates the quality bar you talk about. _(V2 amendment — ADR-0003: mobile Perf ≥ 90 OK if A11y/BP/SEO ≥ 95 and CLS < 0.1; < 90 anywhere blocks.)_ |

**Bilingual toggle (TH/EN) — optional but high-value:** you already did i18n on AiKlao. A working EN/TH switch here *demonstrates* i18n skill live. Use `next-intl`. Ship EN first; add TH if time allows.

---

## 2. Information architecture (routes)
```
/                 Home — hero + story hook + featured projects + skills + CTA
/projects         All 4 projects (cards) → link to case studies
/projects/aiklao          Case Study 1
/projects/typing-race     Case Study 2
/projects/tiger-kick      Case Study 3
/projects/jpd-api         Case Study 4
/about            Full career-change story, timeline, certs, values
/resume           Download-first: single resume PDF, all roles (Appendix A#5)
/contact          Email, LinkedIn, GitHub (form optional)
```
Global: sticky header (logo/name · Projects · About · Resume · Contact · TH/EN · GitHub) + footer (email, LinkedIn, GitHub, "Built with Next.js, deployed on Vercel").

---

## 3. Design system
- **Palette (match your résumé):** primary teal `#0F766E`, accent `#5EEAD4`, ink `#263238`, bg `#F3FAF9`/white, gold link `#B8860B` (reuse résumé identity → cohesive personal brand).
- **Type:** Inter (or Geist) for UI; a mono (JetBrains Mono) for code/metrics.
- **Layout:** max-width ~1100px, generous whitespace, 8-pt spacing scale.
- **Dark mode:** ~~yes … `prefers-color-scheme` + toggle.~~ **SUPERSEDED by ADR-0003:** V2 is **dark-only** — no toggle, no light theme.
- **Motion:** ~~fade/slide-up on scroll (Framer Motion `whileInView`), 150–250ms~~ → **GSAP + ScrollTrigger** (see ADR-0003 / brief §3); respect `prefers-reduced-motion`.
- **V2 note:** §3 above (palette/type/dark/motion) is the original résumé identity — **the live V2 "Editorial Dark" system is in `docs/DESIGN_SYSTEM.md` (V2 section) and ADR-0003.**
- **A11y:** semantic landmarks, focus rings, alt text, color-contrast AA, keyboard-navigable — *this is you demonstrating the quality you claim.*

---

## 4. Page content (copy — ready to paste)

### 4.1 Home `/`
**Hero**
> # Aekkarat Fontong
> ### Software & QA Automation Engineer — I ship production software and the tests that keep it honest.
> From a 4.5-year career in the Royal Thai Police to building real, deployed apps — React Native, Node.js, Spring Boot, and 500+ automated tests across six repositories.
>
> `[View projects]`  `[Download résumé]`  `[GitHub ↗]`

**Trust strip (real, clickable):** `Live demo: race.aiklaotrip.com` · `Public Android APK` · `500+ automated tests` · `CI/CD on a self-managed VPS`

**Featured projects** (3 cards → case studies): AiKlao · Typing Race · Tiger Kick

**Skills (grouped chips):** Frontend (React, React Native, Next.js, TypeScript) · Backend (Node/Express, Spring Boot, REST, PostgreSQL) · QA (Jest, JUnit, Playwright, GUT, Supertest) · DevOps (GitHub Actions, Docker, nginx, PM2, Vercel, Linux/VPS)

**Closing CTA:** "Career-changer, self-taught, and I finish what I start. Let's talk → [Contact]"

### 4.2 About `/about`
Short, honest, human. Sections:
- **The pivot** — "For 4.5 years I served as a police officer at Phahonyothin Police Station. On night shifts and days off I taught myself to code, shipped apps real people use, and in June 2026 I resigned to become a software engineer full-time. This wasn't a whim — it's the thing I kept choosing."
- **How I work** — ownership of the full lifecycle (design → tests → deploy → prod), test-first, thinks in edge cases, uses AI as a tool while owning every technical decision.
- **Timeline** (vertical): 2022 Police → 2024 42 Bangkok → 2025 first shipped app (AiKlao) → 2026 B.Sc. CS + resigned → software.
- **Certifications:** Postman Academy (API Testing / Prototyping / Documentation), Anthropic Academy (Claude 101 / Claude Code / MCP) — with verify links.
- **Beyond code:** discipline, calm under pressure, teamwork (police + peer code review at 42).

### 4.3 Resume `/resume`
~~Tabs: **Software Engineer · Backend · QA Automation**. Each = embedded PDF (`<iframe>` / react-pdf) + "Download PDF". Note: "Tailored per role — pick the one that fits your opening."~~ **SUPERSEDED by Appendix A#5 (2026-07-19).** The 3-tab / role-tailored-PDF design is dropped. `/resume` is a **single** download-first page — one PDF for all roles (`public/resume/Aekkarat_Fontong_Software_Engineer.pdf`): download button(s) + thumbnail, no tabs, no role-switching UI. Inline PDF embed stays a desktop-only enhancement (Appendix A#2).

### 4.4 Contact `/contact`
- Email: fontong.jod.aekkarut@gmail.com · Phone: +66 94-861-8164
- LinkedIn: linkedin.com/in/aekkarut-fontong · GitHub: github.com/JodPdo
- (Optional form → Formspree/Resend, but mailto is fine)

---

## 5. Case studies (the core — real content)

> **Template per case study:** Overview → My role → Stack → Architecture → The hard problem (deep) → Testing & quality → Results/metrics → Links → What I learned.

### CASE STUDY 1 — AiKlao (`/projects/aiklao`)
**Real-time group trip-tracking platform** · LINE bot + LIFF web + React Native app on one shared PostgreSQL DB.
- **Role:** solo — mobile app, REST backend, DevOps.
- **Stack:** React Native/Expo (TypeScript), Node.js/Express → **ported to Spring Boot 3.3 / Java 21**, PostgreSQL, LINE Login (OAuth 2.0 + PKCE), JWT, GitHub Actions, nginx, PM2, Ubuntu VPS.
- **Architecture:** "Pattern A — single writer": the mobile app is the *only* writer of location; all clients read server-derived state (distance, ETA, break, SOS). Diagram it.
- **The hard problem — a concurrency-safe SOS:** when two SOS requests arrive at the same instant, a naive design creates duplicate emergency alerts. I made the SOS path **concurrency-safe** so simultaneous requests can't double-fire — covered by automated tests. *(This is your strongest backend story — go deep: how you detected it, the guard, the test that simulates the race.)*
- **Also:** background GPS via an Android foreground service with **adaptive 10s/30s intervals + auto power-save < 20% battery**; Thai/English i18n; CORS allow-listing; rate limiting.
- **Testing & quality:** 82 Jest tests on the app (**~80% function coverage**) + 84 JUnit/Mockito/MockMvc on the Spring Boot service + 138 Jest on the Node service; a **CI gate blocks the release build on any red test**.
- **Results:** public Android APK anyone with LINE can install; runs in production on a self-managed VPS.
- **Links:** APK (releases/latest) · app repo · backend repo.
- **Learned:** designing one contract for three clients; migrating a live service Node → Spring Boot without breaking it.

### CASE STUDY 2 — Typing Race (`/projects/typing-race`)
**Real-time multiplayer typing game** — server-authoritative, live at **race.aiklaotrip.com**.
- **Role:** solo — React + TS client, Node + TS + Socket.IO server, PostgreSQL leaderboard.
- **The hard problem — server-authoritative anti-cheat:** the client can never declare a winner, rewind progress, or fake superhuman speed. A **fixed server tick loop is the single broadcaster**; the server clamps progress to a human-plausible rate (`clampProgress`), so pasting the whole passage does nothing. Explain the tick loop, reconnect/presence, and why the client only *reflects* state.
- **Testing & quality (your QA flagship):**
  - **60 Jest + Supertest** tests on the transport-free game core — **~99% statements / 100% functions coverage**.
  - **Cross-browser Playwright E2E** (Chromium, Firefox, WebKit): full solo-vs-bot journey + a **UI-level anti-cheat check** (pasting the passage can't fast-forward), trace/video on failure, plus a **live-site run mode** (`E2E_BASE_URL`).
  - A formal **QA Test Strategy** doc (risk register P1–P3, RTM, entry/exit criteria) — link it.
  - CI gate blocks the VPS deploy on a single red test.
- **Results:** playable instantly (solo vs bot); deployed via GitHub Actions → VPS (nginx + PM2).
- **Links:** live · code.
- **Learned:** making real-time tests deterministic (injected clock, fake timers, range assertions).

### CASE STUDY 3 — Tiger Kick (`/projects/tiger-kick`)
**Server-authoritative multiplayer party game (Godot 4.7, GDScript)** — *and the engineering process I designed to build it.*
- **Angle (frames AI positively):** the story isn't "AI built a game" — it's **"I designed a review-gated software-development process and owned the architecture."**
- **The process I designed:** a Kanban backlog (`Backlog→Todo→Doing→Review→Done`), **10 role-scoped agents** with written contracts (decision authority: MAY / MUST NOT), a **RACI**, **mandatory code review**, **per-phase QA exit gates**, a **document-routing** system, and a **Definition of Done** where S0 (crash)/S1 (desync) bugs block the gate. I set the architecture and quality bar; the AI agents executed against it.
- **The QA system (impressive):** a **4-layer strategy** (GUT unit → headless multiplayer → manual → playtest) + a growing regression suite, an **RTM**, and **severity-based release control**.
- **Testing & quality:** **116 GUT unit tests** + a **headless 2-instance net-smoke test in CI** (two Godot instances connect over ENet; grep logs for PASS/FAIL) that catches multiplayer **desync (S1) before merge**; Godot 4.7 headless CI on every push.
- **Results:** a disciplined, documented, test-gated build pipeline for a real multiplayer game.
- **Links:** code (`.claude/agents`, `AGENT_INDEX.md`, `Tiger_Kick_Project_Docs`, `tests/`).
- **Learned:** turning fuzzy "vibe coding" into a governed SDLC with gates and reviews.

### CASE STUDY 4 — JPD School-Student Registration API (`/projects/jpd-api`)
**Secured Spring Boot 3 REST API** — a clean backend reference.
- **Role:** solo. **Stack:** Spring Boot 3, Spring Data JPA, PostgreSQL, Spring Security, JWT/BCrypt.
- **Design:** layered **controller → service → repository** with a **DTO layer** keeping entities out of the API contract; **RBAC** (ROLE_USER / ROLE_ADMIN), Bean Validation, pagination, **API versioning** (`/api/v1`), centralized error handling.
- **Testing & quality:** **25 tests** — Mockito unit + Spring MockMvc integration on an in-memory H2 (no Postgres needed in CI).
- **Business rules to highlight:** a school can't be deleted while it has students (409/400), unique username/email at registration.
- **Links:** code (README is thorough — link it).
- **Learned:** stateless JWT auth, keeping the API contract decoupled from persistence.

---

## 6. SEO / meta / social
- Per-page `<title>` + meta description; JSON-LD `Person` schema on `/` (name, jobTitle, sameAs: GitHub/LinkedIn).
- Open Graph image (auto via `next/og`) — name + role + "race.aiklaotrip.com live demo".
- `sitemap.xml` + `robots.txt` (Next.js built-ins). Fast = SEO: target Lighthouse Performance/SEO/Best-Practices/A11y ≥ 95 _(V2: Perf hard-floor 90 — ADR-0003)_.

---

## 7. Deployment (Vercel)
1. `npx create-next-app@latest portfolio --ts --tailwind --app`
2. Push to a new GitHub repo `JodPdo/portfolio`.
3. Import on Vercel → auto-deploy on every push; preview deploys per PR.
4. Custom domain: add `jod.aiklaotrip.com` (CNAME to Vercel) — you control aiklaotrip.com DNS already.
5. Add résumé PDFs to `/public/resume/`.

---

## 8. Build plan (lean — don't block job applications)
- **Day 0 (now):** keep applying with the current résumés. Don't wait for the site.
- **Day 1:** scaffold + design tokens + Home + About + Contact + Resume page. Deploy to Vercel (get the URL live early).
- **Day 2:** the 4 case studies (MDX) + project cards + OG image + Lighthouse pass + custom domain.
- **Later (optional):** TH/EN toggle, dark mode polish, Vercel Analytics, a short "How I designed the Tiger Kick SDLC" write-up.

**Definition of Done:** deployed on a custom domain, Lighthouse ≥ 95 all categories _(V2 amendment — ADR-0003: mobile Perf ≥ 90 acceptable if A11y/BP/SEO ≥ 95 and CLS < 0.1)_, mobile-perfect, every project links to a live demo or repo, résumé downloadable, no console errors.

---

## 9. What this site "says" to a recruiter
- I can build a **polished, fast, accessible** frontend (fills the gap).
- I **deploy to the cloud** (Vercel) — not just VPS.
- I can **explain my work** (case studies = communication + depth).
- I'm a **serious career-changer** who ships. The story + the proof, in one link.

---

## Appendix A — Product-owner amendments (2026-07-05, locked)

1. **No phone number on the site.** Contact = email + LinkedIn + GitHub only (overrides §4.4).
2. **Resume page is download-first** (buttons + thumbnails); inline PDF embed is a desktop-only enhancement (amends §4.3).
3. Verify the contact email with the product owner before shipping any page containing it.
   **RESOLVED 2026-07-05:** product owner confirmed `fontong.jod.aekkarut@gmail.com` (matches §4.4). Cleared to ship on /contact and footer where specified.
4. Site targets **all roles** (SE / Backend / QA) — case-study order stays AiKlao → Typing Race → Tiger Kick → JPD.
5. **Single resume PDF — the 3-tab / role-tailored design is DROPPED (2026-07-19).** The earlier plan of three role-tailored PDFs (Software Engineer / Backend / QA Automation) behind tabs on `/resume` is cancelled. The product owner delivered **one** resume PDF for all roles: `public/resume/Aekkarat_Fontong_Software_Engineer.pdf`. `/resume` ships as a **single** download-first page (download button(s) + thumbnail; inline PDF embed remains a desktop-only enhancement per item 2 above) — **no tabs, no role-switching UI, one PDF for every opening.** This amends §4.3 (see the superseded note there).

---

## Appendix B — Architecture decisions (ADRs)

### ADR-0001 — Framework: stay on Next.js 16 (not 15) — 2026-07-05
**Status:** Accepted (architect). **Escalated by:** frontend-engineer during PF-M0-01.

**Context.** The spec and CLAUDE.md were written specifying "Next.js 15", but `create-next-app@latest` (2026-07-05) scaffolded **Next.js 16.2.10** with react 19.2.4, Tailwind **v4** (CSS-first `@theme`, no `tailwind.config.js`), and eslint 9. `npm run build` and `npm run lint` are green on the scaffold. The scaffold also dropped an `AGENTS.md` warning that Next 16 has breaking changes vs older conventions.

**Decision.** Stay on Next.js 16.2.10 + Tailwind v4 as scaffolded. Update docs to match. Do **not** downgrade/re-scaffold to 15.

**Rationale.**
- **Current stable + Vercel-native.** As of 2026-07-05 Next 16 is the current stable line; Vercel authors Next.js and fully supports latest stable — deploy support is a non-issue. Pinning to 15 means fighting `create-next-app`'s default and running an older line for no benefit.
- **Design tokens fit v4 cleanly.** DESIGN_SYSTEM.md tokens (teal `primary #0F766E`, `accent #5EEAD4`, `ink`, `bg`, `gold`, dark-mode class strategy) map directly onto Tailwind v4's CSS-first `@theme` in `app/globals.css` (already present in the scaffold). PF-M0-03 is implementable as-is; no `tailwind.config.js` needed.
- **Downstream compatibility holds.** MDX (M2) via `@next/mdx` supports Next 16; `next-intl` (M4, optional) supports the App Router on 15/16. Nothing on the roadmap requires 15.
- **Quality bar favors newer.** React 19 + newer Next defaults help the Lighthouse ≥ 95 target rather than hurt it.
- **Lower risk.** Re-scaffolding to 15 is more work and more surface area for breakage than accepting a green, current build.

**Consequences.**
- Agents must treat `AGENTS.md` as authoritative: Next 16 conventions may differ from training-data-era Next; consult `node_modules/next/dist/docs/` before writing framework code.
- Design tokens are configured in `app/globals.css` via `@theme` (CSS-first), **not** a JS config file — PF-M0-03 owner should follow the v4 pattern.
- `_backlog.json` PF-M0-01 card text still reads "Next.js 15" as a historical instruction; it is superseded by this ADR and needs no edit.

### ADR-0002 — MDX pipeline & content model: `next-mdx-remote/rsc` + `gray-matter` — 2026-07-05
**Status:** Accepted (architect). **Card:** PF-M0-02. **Full detail:** `docs/ARCHITECTURE.md`.

**Context.** M2 ships 4 case studies as MDX in `content/projects/`, and the `/projects` grid + Home
featured cards need the same content's *metadata* (title, order, summary, stack, metrics, links) as
queryable data. Candidate pipelines on Next 16: `@next/mdx`, `next-mdx-remote`, contentlayer-style.

**Decision.** Use **`next-mdx-remote` (RSC entry `next-mdx-remote/rsc`)** to render the MDX body inside
Server Components, with **`gray-matter`** parsing frontmatter into a typed `Project` model. Content lives in
`content/projects/*.mdx` (not under `app/`); `lib/projects.ts` is the single loader/type. `/projects/[slug]`
is fully static via `generateStaticParams()` + `dynamicParams = false`. Canonical JPD slug is **`jpd-api`**
(per SPEC section 2), not "jpd".

**Rationale.** `@next/mdx` maps one MDX file to one route/import and gives no queryable collection, making
the grid awkward; contentlayer is heavy and a Next-16 maintenance risk — both over-engineer a 4-file site.
`next-mdx-remote/rsc` renders with no client boundary/hydration cost and pairs cleanly with frontmatter-as-data.

**Pre-approved dependencies (M2, architect sign-off given).** `next-mdx-remote`, `gray-matter`,
`remark-gfm`, `rehype-slug`, `rehype-autolink-headings`; **optional** `rehype-pretty-code` (shiki) only if a
case study ships code blocks. Any package beyond this list still needs architect approval.

**Consequences.** Frontend-engineer implements PF-M2 against `docs/ARCHITECTURE.md` sections 1–4 with no
follow-up structural questions. `content/` folder is created under this decision (DOCUMENT_ROUTING rule).

### ADR-0003 — Design V2 "Editorial Dark": direction, motion stack (GSAP; no framer-motion), pixi.js, dark-only — 2026-07-06
**Status:** Accepted (architect). **Card:** PF-V2-01 (milestone M1.5 — Design V2).
**Ratifies:** `docs/DESIGN_BRIEF_V2.md` (product-owner approved 2026-07-06).
**Supersedes:** the light-mode/theme-toggle strategy and the "Framer Motion" motion choice in
`docs/DESIGN_SYSTEM.md` (2026-07-05 decision log); the "Framer Motion (subtle only)" stack line in
`CLAUDE.md` and the Framer Motion / `prefers-color-scheme` + toggle rows in SPEC §Recommended stack and
§Design. **Amends:** the M3 "Lighthouse ≥ 95 all four" exit gate (see decision 7).

**Context.** The product owner selected an editorial dark direction (reference: danielspatzek.com), captured
in `docs/DESIGN_BRIEF_V2.md`: big type does the talking, a small set of signature effects (preloader,
letter-scramble, marquees, hero photo displacement, mouse parallax, work-row hover video, pinned-horizontal
"How I work", scroll reveals). §1 of the brief is **locked by the product owner** (dark-only, no
police-uniform imagery, approved voice, exactly two photos, unchanged facts and case-study order) — this ADR
**ratifies, it does not re-litigate** those. What requires an architect decision is the technical fallout:
new dependencies, which animation system we standardize on, how far to simplify theming now that light mode
is gone, fonts, where client motion lives, and the performance gate.

**Decision.**

1. **Adopt "Editorial Dark" as the V2 visual/motion direction.** Tokens, typography, and layout language are
   recorded in `docs/DESIGN_SYSTEM.md` (dated V2 section). This is the base for M1 rework and all of M2.

2. **Approve two new runtime dependencies — no others.**
   - `gsap` — free core **+ ScrollTrigger** (also free core; not a Club/paid plugin). The one animation
     engine for reveals, marquees fallback, and the pinned-horizontal section.
   - `pixi.js` — **dynamic import only** (`next/dynamic`, `ssr:false`). Loaded exclusively on `/`, **after
     idle**, and **only on desktop + fine pointer**; every non-qualifying visitor (touch, coarse pointer,
     reduced-motion, or the chunk failing to load) gets the static duotone `<img>` fallback. Pixi must never
     enter the initial `/` bundle. This is the E4 hero displacement effect and nothing else.

   No other packages are pre-approved by this ADR. Anything beyond `gsap` + `pixi.js` (e.g. a smooth-scroll
   lib, a cursor lib, Three.js) is **out of scope** per brief §3 and still needs separate architect sign-off.

3. **Standardize on GSAP for all motion. Do NOT add `framer-motion`.** One animation system, less JS, one
   mental model, one reduced-motion code path. CLAUDE.md's original stack line and SPEC's stack table name
   Framer Motion; those are **superseded** — Framer Motion is **not** a dependency of this project.
   *(Action: CLAUDE.md stack line updated under this card; the SPEC table rows are annotated as superseded.)*
   Any prior "use Framer Motion" guidance in the docs is void; if `framer-motion` appears in `package.json`
   it should be removed in PF-V2-02.

4. **Dark-only. Delete the theming machinery, do not just hide it.** There is no light theme and no toggle.
   PF-V2-02 removes, concretely:
   - `components/ui/theme-toggle.tsx` (the only client component required purely for theming — gone).
   - the no-FOUC inline `<script>` in `app/layout.tsx` (first child of `<body>`) and all
     `localStorage.theme` / `prefers-color-scheme` reads. With a single always-dark palette there is nothing
     to flash, so the whole FOUC-avoidance dance is deleted, not ported.
   - the `.dark` override block and light-mode values in `app/globals.css`; `:root` **becomes** the (single)
     dark palette.
   - `@custom-variant dark (...)` in `app/globals.css` is removed, and any `dark:` utility prefixes in
     components are dropped (they become unconditional). One palette = no variant.
   - `<html>` may set `class="dark"` statically if convenient for third-party dark-aware widgets, but nothing
     toggles it and no code depends on it. (`color-scheme: dark` on `:root` is the preferred signal.)
   Dark mode is still "on" for the quality bar — it is simply the *only* mode, which is strictly simpler and
   removes a whole class of QA surface (per-mode contrast, persistence, FOUC).

5. **All client motion lives under `components/motion/`.** New folder (see ARCHITECTURE §2 note). Every
   `"use client"` effect — `<Scramble>`, `<Marquee>`, `<Reveal>`, `<PinnedHorizontal>`, the hero
   displacement wrapper, the preloader, work-row hover-video — is an isolated island imported into otherwise
   **server** components. `components/sections/*` and pages stay server components; they render static markup
   and mount a motion island only where an effect is needed. This keeps the initial JS budget honest and the
   reduced-motion fallbacks colocated with the effect they gate.

6. **Fonts via `next/font/google` (self-hosted, no layout shift):**
   - **Body/mono:** **JetBrains Mono** — labels, metadata, captions, numbered section markers
     (letter-spacing .14–.2em). Already the code/metrics face; now also the metadata voice.
   - **Display:** **Archivo** (weight **500**, used uppercase with tight leading, clamp ~40–96px).
     *Why Archivo:* it is a neo-grotesque **designed for high-impact display/headlines**, ships a true
     weight-500 in its variable file, reads cleanly as huge uppercase, and its engineered/neutral character
     pairs with JetBrains Mono without fighting it — matching the brief's "huge uppercase, tight leading,
     weight 500". It is free, on Google Fonts, and `next/font/google`-compatible (self-hosted → zero layout
     shift, satisfying budget §5's "no shift from fonts"). **Alternatives considered:** *Inter Tight* — fine
     technically but Inter is over-exposed and carries less editorial character; kept only as a drop-in
     fallback if Archivo ever regresses. *Anton / Oswald* — single-weight or condensed-only, no neutral
     weight-500 neo-grotesque, rejected. The prior "Inter (or Geist)" body face from DESIGN_SYSTEM is
     retired: V2 has no separate UI sans — display is Archivo, everything else is JetBrains Mono or system.

7. **Amend the M3 Lighthouse gate (per brief §5).** The global "Lighthouse ≥ 95 all four categories" bar is
   **amended for the effects-heavy V2 build**: on mobile emulation, **Performance ≥ 90 is acceptable IF
   Accessibility / Best-Practices / SEO all stay ≥ 95 AND CLS < 0.1** (target Performance still 95). The
   hard blocker remains **< 90 anywhere**. Additional V2 budget (QA gate, blocks the M1.5 milestone):
   initial JS on `/` **< 250 KB gzip excluding the lazy pixi chunk**; pixi loads only after
   interaction/idle on qualifying desktop. `prefers-reduced-motion` is a **required explicit QA pass**
   (scramble → final text instantly, marquees paused, pixi/parallax disabled → static image, pinned-horizontal
   → vertical stack, reveals → instant-show). *(docs/QA_CHECKLIST.md still states the old "≥ 95 all four"
   gate — a qa-owned file, correctly left to PF-V2-07; this ADR flags it, it does not edit it. CURRENT_PHASE.md
   was already amended by the producer.)*

**Rationale.**
- **Fewer dependencies, one pattern.** GSAP+ScrollTrigger covers scrub/pin/stagger that Framer Motion does
  not do as directly; adding Framer Motion *on top* would mean two animation runtimes for one small site —
  exactly the over-engineering the architecture principle forbids. Pixi is the only way to get the reference
  displacement effect, but it is heavy, so it is quarantined behind a dynamic import and capability gate.
- **Dark-only is a net *removal* of complexity.** The toggle, the persistence, the FOUC script, the dual
  token set, and per-mode QA all disappear. That is strictly simpler and lower-risk than maintaining a light
  theme nobody in the approved direction wants.
- **Server-first with motion islands** protects the ≥ 90/95 performance gate: static HTML from server
  components, JS only where an effect is mounted.
- **`next/font` self-hosting** is the no-layout-shift guarantee the budget requires; Archivo + JetBrains Mono
  is a two-family system (display + mono), the smallest font footprint that still delivers the editorial look.

**Consequences.**
- **Token migration rule for PF-V2-02 (binding):** keep the **semantic** custom-property names that already
  exist so component churn stays minimal — `--background`, `--background-subtle`, `--foreground`, `--primary`,
  `--primary-foreground`, `--accent`, `--accent-foreground`, `--border`, `--ring` survive and are simply
  **repointed** to V2 values; the `.dark` override block collapses into `:root` (single palette). Concrete
  mapping and the new tokens (`--foreground-secondary`, `--foreground-muted`, `--border-strong`, the two
  image-mat surfaces) are in the DESIGN_SYSTEM V2 section. **Retire `--gold` / `--palette-gold`** and any
  `text-gold` usage — V2 has no gold. Remove `--font-sans`/Geist; add `--font-display` (Archivo) and keep
  `--font-mono` (JetBrains Mono).
- **PF-V2-02** deletes `theme-toggle.tsx`, the no-FOUC script, the `.dark` block, `@custom-variant dark`, and
  wires the two `next/font` families. `components/ui/` loses `ThemeToggle` from its inventory (ARCHITECTURE §2
  note). **PF-V2-03..06** build under `components/motion/`.
- **Docs updated by this card:** `docs/DESIGN_SYSTEM.md` (dated V2 section + superseded markers),
  `CLAUDE.md` (stack line), `docs/ARCHITECTURE.md` (§2 folder note), and SPEC stack/design rows annotated.
  `docs/QA_CHECKLIST.md` (qa) is flagged for the gate amendment but not edited here — qa owns it (PF-V2-07).
  `CURRENT_PHASE.md` was already amended by the producer. `_backlog.json` is producer-owned and untouched.
- **ADR-0001/0002 are unaffected** — Next 16 + Tailwind v4 CSS-first `@theme` and the MDX pipeline stand;
  V2 changes token *values* and adds motion deps, not the framework or content pipeline.

### ADR-0003a — JetBrains Mono `display: "optional"` (font-loading policy for the mono body face) — 2026-07-18
**Status:** Accepted (architect). **Card:** PF-M2-07. **Amends:** ADR-0003 decision 6 (fonts) — refines *how*
the body/mono face loads; the Archivo + JetBrains Mono pairing itself is unchanged.

**Context.** ADR-0003 dec. 6 chose `next/font` self-hosting as the "zero layout shift from fonts" guarantee.
In practice the `next/font` *default* (`display: "swap"` + Arial-based `adjustFontFallback`) did **not**
deliver that for the mono *body* face: JetBrains Mono is monospace, so its glyph advance decides where every
body line wraps. `adjustFontFallback` matches vertical metrics, not glyph-advance width, so on a throttled
first paint the fallback-vs-webfont wrap count differs and body copy re-wraps when the webfont swaps in —
measured by qa-engineer as CLS 0.088 on `/projects/tiger-kick` (its 154-char `role` string is the worst
case), a regression from the M1.5 CLS-0 baseline though still under the ADR-0003 dec. 7 `< 0.1` gate.

**Decision.** Set the JetBrains Mono `next/font` config to `display: "optional"` + `adjustFontFallback: false`
+ an explicit real monospace `fallback` stack (`ui-monospace, SFMono-Regular, Menlo, Consolas, Liberation
Mono, monospace`). With `optional`, the browser never swaps the webfont in mid-view, so no re-wrap can occur
(measured CLS 0 on all four case-study routes). Archivo (display) **stays on default `swap`**: it is
proportional, where `adjustFontFallback` metric-matching actually works, and losing a display face to fallback
is more visually jarring than a metric-matched swap.

**Trade-off (accepted).** With `optional`, a genuinely slow *first* visit (webfont not ready inside the browser
block window) renders that page view — the whole site's body text, every route — in the fallback monospace and
does **not** swap the real JetBrains Mono in until the next navigation (once cached). This is acceptable here:
(a) the font is self-hosted + preloaded, so normal connections still paint JetBrains Mono from the first frame;
(b) the fallback is a real monospace stack, so a slow-load visitor sees an on-brand monospace, not a
proportional substitute — the visual delta is small for a mono-body design; (c) it restores ADR-0003's own
stated "no shift from fonts" goal and protects the M3 Lighthouse/CLS exit gate (dec. 7) at the root cause.

**Alternatives rejected.** *Accept a small non-zero CLS with a rationale* — leaves a known regression that can
tip over `0.1` under real conditions or a longer `role` string, and contradicts dec. 6's own promise.
*Per-block `min-height` on the Role/Stack `<dl>`* — whack-a-mole: the re-wrap vector exists for any long mono
text on any route, not just that block, and the reservation is brittle across content/breakpoint changes.
*`size-adjust`/`adjustFontFallback` tuning* — fundamentally can't fix a monospace-vs-proportional glyph-advance
mismatch (it matches vertical metrics only). `display: "optional"` is the simplest site-wide root-cause fix,
adds no dependency, and keeps font-loading policy in one place (`app/layout.tsx`).

### ADR-0003b — Remove E7 pinned-horizontal from About; vertical stack is the universal "How I work" layout — 2026-07-20
**Status:** Accepted (architect), ratifying a product-owner decision. **Card:** follow-up frontend card (About/How-I-work).
**Amends:** ADR-0003's E7 entry — retires one *signature effect* and the pin+scrub layout of the "How I work"
section. The GSAP + ScrollTrigger motion stack itself is **unchanged**; this is a content-layout change, not a
motion-stack change.

**Context.** ADR-0003 ratified `docs/DESIGN_BRIEF_V2.md` §3, whose effect **E7** was a ScrollTrigger pin+scrub
that turned the About page's "How I work" (5 steps) into a pinned horizontal scroll-scrub, degrading to a plain
vertical stack only on mobile / `prefers-reduced-motion`. Post-ship, the product owner reports HR/recruiter
feedback that scroll-hijacking (pinning the viewport and re-mapping vertical scroll to horizontal progress) is
disliked by the primary audience for this site and works against it reading as an engineer's portfolio. The
product owner has decided to remove the effect entirely.

**Decision.**

1. **Remove E7 (pinned-horizontal) from the About "How I work" section, for all users and all breakpoints.**
   There is no pinning and no horizontal scroll-scrub anywhere on the site anymore.

2. **Promote the existing vertical-stack fallback to the sole layout.** The plain vertical stack that was
   previously the mobile / reduced-motion degrade becomes the **universal** layout for that section — the same
   markup renders for every visitor regardless of motion preference or viewport. No motion-preference branch
   remains in this section (any E8 `<Reveal>` entrance on its items, if kept, follows its own reduced-motion
   rule as elsewhere; that is not E7).

3. **GSAP + ScrollTrigger stays in the stack.** It is still actively used by E8 `<Reveal>`
   (`components/motion/reveal.tsx`) in `components/sections/cta.tsx`, `components/sections/skills.tsx`, and
   `components/sections/featured-projects.tsx`. Removing E7 removes **no** dependency; `gsap` remains approved
   and in use per ADR-0003 decision 2.

4. **Retire the `<PinnedHorizontal>` primitive and its only demo consumer (clean removal, no dead code).** With
   E7 gone, `components/motion/pinned-horizontal.tsx` has **zero production consumers** — its sole remaining
   importer is `app/scratch/motion/page.tsx`, a noindexed internal QA/demo route already flagged for deletion
   in PF-V2-03's resolution ("producer deletes the scratch route after V2 primitives are consumed"). The
   frontend follow-up card **deletes both** `components/motion/pinned-horizontal.tsx` and `app/scratch/motion/`
   (executing that long-pending PF-V2-03 cleanup). Rationale: an unused-in-production primitive kept only to
   feed a stale demo route is dead code, and the architecture principle here is "simplest structure, resist
   over-engineering" — speculative-reuse code earns its keep only when there is a real consumer. Git history
   preserves the implementation verbatim if a future section ever genuinely needs pin+scrub, at which point it
   returns via its own card and review.

**Rationale / Trade-off (accepted).**
- **Audience over spectacle.** The site's job is to convert HR/recruiter/hiring-engineer readers; a signature
  effect the primary audience actively dislikes is a net negative, not a differentiator. The engineering
  discipline the site advertises is better shown by a section that just reads cleanly.
- **Net removal of complexity.** This deletes an animation island, its pin-spacer/scrub wiring, and a
  motion-preference branch, and finally clears a demo route + primitive that were dead weight — strictly
  simpler, lower-risk, and less JS on the About route. It removes no dependency because GSAP is load-bearing
  elsewhere.
- **The fallback was already built and shipped**, so promoting it is low-risk: the universal layout is code
  that already passed the M1.5 exit gate as the reduced-motion path.
- **Trade-off:** the V2 direction loses one of brief §3's signature effects. Accepted — the product owner
  owns that call, the remaining effects (preloader, scramble, marquees, hero displacement, parallax, work-row
  hover video, scroll reveals) still carry the editorial character, and correctness for the audience outranks
  effect count.

**Alternatives rejected.** *Keep E7 but soften it (shorter pin, opt-out)* — still scroll-hijacking, still the
disliked interaction, and adds tuning surface for an effect the owner has decided against. *Keep
`<PinnedHorizontal>` as a documented unused primitive "for future reuse"* — dead code with no consumer, exactly
the speculative structure the architecture mandate resists; git history is the correct home for
not-currently-used code.

**Docs updated by this ADR:** this entry; `docs/DESIGN_BRIEF_V2.md` §3 (E7 row marked superseded, pointing
here). Implementation (deleting/rewiring `components/sections/how-i-work.tsx`, deleting
`components/motion/pinned-horizontal.tsx` and `app/scratch/motion/`) is a **frontend-engineer** follow-up under
its own card + review — not done by this ADR. `_backlog.json` and `CURRENT_PHASE.md` are producer-owned and
untouched here.

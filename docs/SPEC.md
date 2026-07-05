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
| Animation | **Framer Motion** (subtle only) | tasteful entrance/hover; don't overdo |
| Analytics | **Vercel Analytics** (privacy-friendly) | see real visits (a small impact metric later) |
| Deploy | **Vercel** (free Hobby) | 1-click, preview deploys, custom domain |
| Domain | `jod.aiklaotrip.com` **or** `aekkarat.dev` | you already own aiklaotrip.com → free subdomain |
| Quality | ESLint + Prettier + `next/image` + Lighthouse ≥ 95 | demonstrates the quality bar you talk about |

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
/resume           Embedded PDF viewer + download buttons (SE / Backend / QA)
/contact          Email, LinkedIn, GitHub (form optional)
```
Global: sticky header (logo/name · Projects · About · Resume · Contact · TH/EN · GitHub) + footer (email, LinkedIn, GitHub, "Built with Next.js, deployed on Vercel").

---

## 3. Design system
- **Palette (match your résumé):** primary teal `#0F766E`, accent `#5EEAD4`, ink `#263238`, bg `#F3FAF9`/white, gold link `#B8860B` (reuse résumé identity → cohesive personal brand).
- **Type:** Inter (or Geist) for UI; a mono (JetBrains Mono) for code/metrics.
- **Layout:** max-width ~1100px, generous whitespace, 8-pt spacing scale.
- **Dark mode:** yes (you did it on mobile — show it here). `prefers-color-scheme` + toggle.
- **Motion:** fade/slide-up on scroll (Framer Motion `whileInView`), 150–250ms, respect `prefers-reduced-motion`.
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
Tabs: **Software Engineer · Backend · QA Automation**. Each = embedded PDF (`<iframe>` / react-pdf) + "Download PDF". Note: "Tailored per role — pick the one that fits your opening."

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
- `sitemap.xml` + `robots.txt` (Next.js built-ins). Fast = SEO: target Lighthouse Performance/SEO/Best-Practices/A11y ≥ 95.

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

**Definition of Done:** deployed on a custom domain, Lighthouse ≥ 95 all categories, mobile-perfect, every project links to a live demo or repo, résumé downloadable, no console errors.

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
4. Site targets **all roles** (SE / Backend / QA) — case-study order stays AiKlao → Typing Race → Tiger Kick → JPD.

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

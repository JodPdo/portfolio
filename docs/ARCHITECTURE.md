# Architecture — Portfolio (routes · folders · content model)

Owner: architect. Status: **Accepted 2026-07-05** (card PF-M0-02).
This is the reference for routes, folder structure, and the MDX content model.
It does not restate design tokens (see `docs/DESIGN_SYSTEM.md`) or page copy (see `docs/SPEC.md`).

Guiding principle: this is a small site. One pattern per problem, short dependency list,
no infrastructure the 4-case-study scope does not need.

---

## 1. Route map

All routes are **static (SSG)** — no runtime data, no server actions. Prerender everything.

| Route | Rendering | Notes |
|---|---|---|
| `/` | Static | Home: hero, featured 3, skills, CTA |
| `/projects` | Static | Grid of all 4 case-study cards (data from frontmatter) |
| `/projects/[slug]` | Static, **generateStaticParams** | Exactly 4 pages; see below |
| `/about` | Static | Story, timeline, certs |
| `/resume` | Static | Download-first (buttons + thumbnails); desktop-only inline PDF enhancement |
| `/contact` | Static | Email + LinkedIn + GitHub only (**no phone**) |
| `*` (unmatched) | `app/not-found.tsx` | Global 404 — add at M1 |

### `/projects/[slug]` — the only dynamic segment

- **The 4 slugs are fixed and come from `content/projects/*.mdx` filenames:**
  `aiklao`, `typing-race`, `tiger-kick`, `jpd-api`.
  (SPEC section 2 and Case Study 4 route it `/projects/jpd-api`; the card's "jpd" is shorthand.
  **Canonical slug = `jpd-api`.**)
- `generateStaticParams()` returns those 4 slugs (from `lib/projects.ts`, not hardcoded).
- `export const dynamicParams = false` so any other slug returns the global 404. No ISR, no fallback.
- `params` is a Promise (Next 16): `const { slug } = await params;` — matches the existing placeholder.
- Per-page metadata via `generateMetadata()` reading frontmatter `title` + `summary`.

### Redirects / not-found

- **No redirects needed** — nothing is published yet, so `jpd-api` is canonical from day one.
  If an old `/projects/jpd` link ever leaks out, add one redirect in `next.config.ts` then;
  do not add it pre-emptively.
- One global `app/not-found.tsx`; no per-segment 404s (over-engineering for 6 routes).

---

## 2. Folder structure

```
app/
  layout.tsx              # root layout; no-FOUC dark-mode inline script (first child of <body>)
  globals.css             # design tokens: @theme + @custom-variant dark (ADR-0001) — the ONLY token file
  not-found.tsx           # global 404 (add M1)
  page.tsx                # /
  projects/page.tsx       # /projects
  projects/[slug]/page.tsx
  about/page.tsx  resume/page.tsx  contact/page.tsx
  sitemap.ts  robots.ts   # Next built-ins (M3)
components/
  ui/                     # stateless primitives: Container, Button, Card, Badge/Chip, Prose, ThemeToggle
  sections/               # page composites: Header/Nav, Footer, Hero, FeaturedProjects,
                          #   SkillsGrid, Timeline, ProjectCard, MetricStrip
  mdx/
    mdx-components.tsx     # element overrides passed to the MDX renderer (h2, a, code, img->next/image)
lib/
  projects.ts             # content loader + Project type (single source of truth)
  utils.ts                # cn() and small helpers
content/
  projects/
    aiklao.mdx  typing-race.mdx  tiger-kick.mdx  jpd-api.mdx
public/
  resume/                 # single resume PDF, all roles — download-first (SPEC Appendix A#5)
  projects/               # case-study covers / architecture diagrams (alt text required)
  og/                     # Open Graph assets (M3)
```

Rules:
- **`components/ui` = reusable primitives** (no page knowledge). **`components/sections` = page-specific
  composites.** If a thing is used on one page only and knows that page's content, it is a section.
- **Design tokens live only in `app/globals.css`** (`@theme`, CSS-first, no `tailwind.config.js`) per ADR-0001.
  Do not introduce a second source of colors/spacing.
- `content/` is **not** under `app/` — it is data, read at build time by `lib/projects.ts`.

> **Note 2026-07-06 (ADR-0003 — Design V2).** Add **`components/motion/`** to the structure above: the
> isolated home for all `"use client"` motion islands (`<Scramble>`, `<Marquee>`, `<Reveal>`,
> `<PinnedHorizontal>`, the lazy pixi hero wrapper, preloader, work-row hover-video). `components/sections/*`
> and pages stay **server** components and mount motion islands only where needed. **Removed** under dark-only:
> `components/ui/theme-toggle.tsx` and the no-FOUC inline script in `app/layout.tsx` (§5 below is superseded on
> those points). `globals.css` keeps `@theme` (ADR-0001) but drops `@custom-variant dark` and the `.dark`
> block — `:root` is the single dark palette. No other structure changes.

---

## 3. Content model — case-study MDX

One `.mdx` file per case study in `content/projects/`. **Frontmatter carries all structured
(card + metadata) fields; the MDX body carries the narrative** (SPEC section 5 template:
Overview -> Role -> Stack -> Architecture -> The hard problem -> Testing & quality -> Results -> Links -> Learned).
Frontmatter is the single source of truth for the `/projects` grid and Home featured cards — no
separate manifest.

### Frontmatter schema

| Field | Type | Req | Purpose |
|---|---|---|---|
| `title` | string | yes | Display name (e.g. "AiKlao") |
| `slug` | string | yes | Must equal filename; route segment |
| `order` | number (1–4) | yes | Card order: AiKlao 1 · Typing Race 2 · Tiger Kick 3 · JPD 4 |
| `summary` | string | yes | One line; card blurb + meta description |
| `tagline` | string | no | Short subtitle under the title |
| `role` | string | yes | e.g. "Solo — mobile app, REST backend, DevOps" |
| `stack` | string[] | yes | Tech chips |
| `tags` | string[] | no | Role targeting for filters: `["SE","Backend","QA"]` |
| `featured` | boolean | no | Home shows 3 (aiklao, typing-race, tiger-kick = true; jpd-api = false) |
| `cover` | string | no | `/projects/<slug>.png` card image (alt = title) |
| `metrics` | `{ label: string; value: string }[]` | no | Metric strip (e.g. `{label:"Automated tests", value:"82"}`) |
| `links` | object (below) | yes | Live / repo(s) / APK / docs |
| `draft` | boolean | no | Excluded from lists when true |

`links` object — every key optional individually. Ideally a case study links to a live demo or repo, but
this is a **content goal, not a schema invariant** (see the 2026-07-05 ruling below — a project may be
link-less in the interim while URLs await product-owner verification):

```yaml
links:
  live: "https://race.aiklaotrip.com"       # deployed demo
  apk: "https://github.com/.../releases/latest"
  docs: "https://.../QA_STRATEGY.md"         # e.g. Typing Race QA strategy
  repos:                                     # labeled array -> handles AiKlao's app+backend repos
    - { label: "App", url: "https://github.com/JodPdo/..." }
    - { label: "Backend", url: "https://github.com/JodPdo/..." }
```

The `Project` TypeScript type lives in `lib/projects.ts` and mirrors this schema exactly.
`lib/projects.ts` exposes: `getAllProjects()` (sorted by `order`, drafts filtered), `getProjectSlugs()`
(for `generateStaticParams`), `getProjectBySlug(slug)`.

**Content integrity:** all metrics must be verifiable from real repos (CLAUDE.md gotcha).
Do not invent numbers. Content is authored/reviewed at M2, not now — these files may be stubs until then.

### Ruling 2026-07-06 — unverified URLs never enter frontmatter (escalated from PF-M2-02 review, F1)

**Convention (one code path for all 4 case studies + the PF-M2-06 renderer):**

1. **`links` frontmatter holds verified, working URLs ONLY.** Never a placeholder or sentinel string.
   If a URL is not yet verified with the product owner, **omit its key** (or omit the whole `links` object).
2. **Unverified/pending URLs live in the MDX body only**, in the Links section, as clearly-marked
   **non-link plain text**: `[NEEDS-VERIFICATION: <what/where>]`. This marker is a human tracking note, not
   machine-consumed — the loader/renderer never sees it, so it can never become a broken `<a href>`.
3. **`links` and all its keys are OPTIONAL** in the `Project` type (`links?`, `live?`, `apk?`, `docs?`,
   `repos?`). A **link-less project is valid** in the interim. The `Project` type carries no sentinel type.
4. **Renderer contract (PF-M2-06):** emit an `<a>` **only** for a key that is present and non-empty.
   Absent key = render nothing (no empty/`#`/placeholder anchor). This is what actually enforces global
   DoD #4 (no broken links) — the "at least one link" idea is a content goal, not a code guard.
5. **Rejected — the sentinel-in-frontmatter option:** storing `"[NEEDS-VERIFICATION: ...]"` as a `links`
   value pollutes the URL type and risks a broken href the day someone forgets to special-case it.
   Absence is unambiguous and needs no special casing. This is the typing-race.mdx pattern; standardize on it.

When a URL is verified with the product owner, the writer **promotes** it: move it from the body
`[NEEDS-VERIFICATION]` line into the correct `links` frontmatter key. AiKlao's currently-missing
`live`/`apk`/`repos` stay body-only until the product owner confirms them.

---

## 4. MDX pipeline — decision (pre-approval for M2)

**Decision: `next-mdx-remote` (RSC variant `next-mdx-remote/rsc`) + `gray-matter`.** See ADR-0002 (SPEC Appendix B).

Why this over the alternatives:
- **`@next/mdx`** treats each `.mdx` as a route/import. It gives no queryable *collection*, and reading
  frontmatter as data for the grid is awkward (needs `export const` conventions). Rejected: our content is
  data-driven (grid + featured + metrics), not one-MDX-per-page.
- **Contentlayer** (or a contentlayer-style build step) is heavier, its Next-16 compatibility/maintenance is
  a risk, and it is overkill for 4 files. Vetoed.
- **`next-mdx-remote/rsc`** compiles an MDX string inside a Server Component (no client boundary, no
  hydration cost) and pairs with `gray-matter` for frontmatter. One pattern serves both the body render and
  the grid data, from a single `content/projects/` folder. Lean and correct.

### Pre-approved dependencies for M2 (frontend-engineer may add without re-asking)

| Package | Role | Approved |
|---|---|---|
| `next-mdx-remote` | Compile/render MDX body in RSC (`/rsc` entry) | yes |
| `gray-matter` | Parse frontmatter -> typed `Project` | yes |
| `remark-gfm` | GFM tables / task lists in case studies | yes |
| `rehype-slug` | Heading `id`s (deep links) | yes |
| `rehype-autolink-headings` | Anchor links on headings | yes |

- **Code syntax highlighting:** if a case study ships code blocks, use **`rehype-pretty-code`** (bundles
  `shiki`) — **pre-approved as optional**, add only when actually needed. Prefer build-time highlighting
  (no client JS).
- **Not part of the MDX pipeline** and approved elsewhere: `lucide-react`, `@vercel/analytics` are
  SPEC-stack items handled in their own M1/M3 cards, not here. **Motion:** `gsap` (+ ScrollTrigger) and
  lazy `pixi.js` per ADR-0003 — **`framer-motion` is NOT used** (removed from the stack, ADR-0003).
- **Any package beyond this table still needs architect sign-off** before install.

---

## 5. Structural needs for PF-M0-03 (design tokens + dark mode)

> **Partly SUPERSEDED 2026-07-06 (ADR-0003, dark-only).** The dark-mode *class strategy*, no-FOUC inline
> script, `@custom-variant dark`, and `theme-toggle.tsx` below are **removed** in PF-V2-02 — V2 is dark-only
> with a single `:root` palette. The token-file location (`app/globals.css`, `@theme`, no JS config) still
> holds. Values migrate to the V2 palette per DESIGN_SYSTEM "V2 token migration rule".

- **Tokens:** define the DESIGN_SYSTEM palette (`primary #0F766E`, `accent #5EEAD4`, `ink`, `bg`, `gold`,
  dark bg/text) as CSS variables + `@theme` in `app/globals.css` (no JS config — ADR-0001). Replace the
  scaffold's placeholder `--background/--foreground` block.
- **Dark-mode strategy:** class-based on `<html>` (`.dark`). Wire the variant in globals.css:
  `@custom-variant dark (&:where(.dark, .dark *));` (per DESIGN_SYSTEM decision log). Use `dark:` utilities.
- **No FOUC:** a small native inline script in `app/layout.tsx`, rendered as the **first child of
  `<body>`** (runs before anything paints — nothing renders ahead of it), reads `localStorage.theme` else
  `prefers-color-scheme` and sets `document.documentElement.classList`. Must be a literal
  `<script dangerouslySetInnerHTML>` — `next/script strategy="beforeInteractive"` does NOT emit a
  synchronous script in Next 16/Turbopack (verified in PF-M0-03 review) and reintroduces the FOUC.
- **Toggle location:** `components/ui/theme-toggle.tsx` — a `"use client"` component that flips the `.dark`
  class and persists to `localStorage`, rendered inside `components/sections/Header`. The only client
  component required for theming.
- Respect `prefers-reduced-motion` on the toggle transition.

---

## 6. Constraints (restated — locked, do not re-litigate)

- **No phone number anywhere.** `/contact` = email + LinkedIn + GitHub only (SPEC Appendix A#1).
- **Resume is download-first** — buttons + thumbnails; inline PDF is a desktop-only enhancement (A#2).
- **Contact email must be verified with the product owner** before it ships on any page (A#3).
- **Case-study order is AiKlao -> Typing Race -> Tiger Kick -> JPD** (`order` 1->4), all-roles positioning (A#4).
- **TH/EN toggle is M4** (`next-intl`) — do not pull forward. Build EN-only; add no i18n structure now.

---

## 7. Ruling 2026-07-22 — one source of truth for public profile links (card PF-M4-04)

**Status: Accepted. Binding on frontend-engineer. Documented here (not in `docs/DESIGN_SYSTEM.md`)
because this is a module-ownership / import-graph decision, not a visual-token one — `DESIGN_SYSTEM.md`
governs palette, type, motion and a11y rules; `ARCHITECTURE.md` §2 already owns "what lives in `lib/`".**

### Problem

`GITHUB_URL` and `LINKEDIN_URL` were re-declared as independent local `const`s in every file that needed
them, bound to the exported pair in `lib/site.ts` only by a prose comment. A comment cannot fail a build.
The 2026-07-22 LinkedIn URL correction had to be applied by hand in three places; a missed copy would have
shipped a dead link in the **global footer on every page** while the homepage JSON-LD looked healthy.

**The actual count is worse than the card states.** `LINKEDIN_URL` has 3 copies; **`GITHUB_URL` has 5**:
`lib/site.ts`, `app/contact/page.tsx`, `components/sections/footer.tsx`, **`components/sections/header.tsx`**
and **`components/sections/hero.tsx`**. The last two were not in the card and are in scope for this fix —
they are the same defect, and the GitHub handle in the sticky header appears on every page just like the footer.

### Origin (checked, not assumed)

`git log --follow` shows `components/sections/footer.tsx` (`e95d347`, PF-M1-01), `app/contact/page.tsx`
(`f554a96`, PF-M1-07), `header.tsx` and `hero.tsx` all predate `lib/site.ts`, which was created later in
`55773e2` for PF-M3-01's SEO/OG work. The local consts were never a deliberate independence decision —
they are pre-`lib/site.ts` code that was not retrofitted when the shared module appeared. **This is
accidental debt. Consolidation carries no hidden intent to preserve.**

### Ruling

1. **Shape — the obvious default is correct.** All consumers `import { GITHUB_URL, LINKEDIN_URL } from
   "@/lib/site"` and delete their local declarations. This *removes* code and adds no layer, so the
   over-engineering bar does not apply. **No new abstraction, no wrapper object, no config file.**
2. **Canonical home stays `lib/site.ts`.** It is not a metadata-helpers module — it opens with "single
   source of truth for site-wide identity + SEO constants" and already holds `SITE_URL`, `PERSON_NAME`,
   `PERSON_NICKNAME`, `JOB_TITLE`, `SITE_NAME`. Profile URLs are *identity*, exactly the same category.
   Creating `lib/profile.ts` / `lib/links.ts` would split identity across two modules — a second place to
   look for the same class of string, i.e. a smaller version of the very problem being fixed — and would
   churn `app/page.tsx`'s imports for zero benefit on a 5-route site. **If `lib/site.ts` ever needs
   splitting, extract the *helpers* (`buildOpenGraph`/`OG_IMAGE`/`formatTitle` → `lib/og.ts`) and leave
   the constants where they are. Do not split the constants.**
3. **Regression guard — the import IS the enforcement. Add nothing else.** With one definition, drift is
   structurally impossible; a `satisfies` clause or a `PROFILE_LINKS` object would add indirection without
   adding a check (nothing stops a future file from declaring a local const *next to* an object export any
   more than next to a loose one). An ESLint `no-restricted-syntax` rule banning re-declaration is real
   enforcement but is overkill at this size — **rejected**. The one required edit: replace the now-false
   "must match the handles already shipped in …" comment in `lib/site.ts` with "import these; never
   re-declare them locally."
4. **Display text is consolidated too.** `app/contact/page.tsx` renders the handles as *separate hardcoded
   literals* (`github.com/JodPdo`, `linkedin.com/in/aekkarut-fontong-b781bb319`) ~80 lines below the URL
   consts — a second drift vector, and the same class of bug already confirmed live in the résumé PDF
   (card PF-M4-02, where the link annotation is right and the printed text is stale). Export
   `GITHUB_DISPLAY` and `LINKEDIN_DISPLAY` from `lib/site.ts`, **defined immediately beneath their URLs**
   so the two can only be read and edited together. **Explicit string constants — do NOT derive the label
   from the URL with a regex/`replace` chain.** Cleverness that silently produces a wrong-but-plausible
   label is worse than a colocated literal.
5. **`EMAIL` stays local to `app/contact/page.tsx` — deliberately NOT centralized.** It has exactly one
   consumer, so it has zero duplication risk today; centralizing it would solve nothing and would place the
   address one autocomplete away from the JSON-LD `Person` block in `app/page.tsx`, which CLAUDE.md
   decision #1 keeps it out of. **Rule: consolidate what is duplicated; do not centralize what is not.**
   If a second consumer ever appears, revisit — and the JSON-LD exclusion must be re-stated at that time.

### Boundary check (done, no issue)

`lib/site.ts` imports nothing at all — no `node:` builtins (unlike `lib/projects.ts`, which uses `node:fs`
and is server-only), no components. It is therefore safe to import from server *or* client components, and
**no import cycle is possible**. All four consuming files (`app/contact/page.tsx`, `footer.tsx`,
`header.tsx`, `hero.tsx`) are Server Components — the only `"use client"` file under `components/sections/`
is `nav-link.tsx`, which does not touch these constants.

### Blast radius — exactly 5 files, zero behaviour change

| File | Change |
|---|---|
| `lib/site.ts` | Fix the stale comment; add `GITHUB_DISPLAY` / `LINKEDIN_DISPLAY` under the URLs |
| `app/contact/page.tsx` | Import URLs + displays; delete 2 local consts + 2 inline label literals |
| `components/sections/footer.tsx` | Import both URLs; delete 2 local consts |
| `components/sections/header.tsx` | Import `GITHUB_URL`; delete 1 local const |
| `components/sections/hero.tsx` | Import `GITHUB_URL`; delete 1 local const |

**No routing change. No dependency added or removed. No config, no `next.config.ts`, no CSS, no content.**

**The acceptance bar for code-reviewer and qa-engineer: rendered HTML must be byte-identical before and
after on `/`, `/contact`, `/about`, `/projects` — same `href`s, same visible text, same JSON-LD `sameAs`.
This is a pure refactor. ANY rendered diff is a bug, not an improvement.** Recommended check: capture the
served HTML of those routes before and after and diff them. One subtlety to verify rather than assume —
swapping an inline JSX text line for `{GITHUB_DISPLAY}` is whitespace-neutral (JSX strips the surrounding
newline+indent in both forms, so no space is added or lost before the adjacent `sr-only` span), but confirm
it in the diff.

### Interaction with PF-M4-03 (same engineer, same pass)

Both cards edit `app/contact/page.tsx`. They do not collide — PF-M4-03 changes only `ROW_CLASSES`
(layout/`min-height`), PF-M4-04 changes only constants and the two label expressions.
**Order: land PF-M4-04 (the refactor) first, verify byte-identical HTML, then apply PF-M4-03's styling
change on top.** Doing the refactor first keeps the "zero rendered diff" bar verifiable; interleaving them
makes the intentional PF-M4-03 height change indistinguishable from an accidental refactor regression.
Restating the PF-M4-03 constraint because it now lives in a shared module: **the LinkedIn display handle
must never be shortened or truncated to fix the wrap** — the short form no longer resolves, and
`LINKEDIN_DISPLAY` is now consumed from `lib/site.ts`, so shortening it there would be a sitewide
truthfulness regression, not a local style tweak. Fix the row height, not the string.

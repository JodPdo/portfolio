# About page copy — `/about`

**Card:** PF-M1-04 · **Owner:** content-writer · **Status:** draft for review
**Source of truth:** docs/SPEC.md §4.2 + Appendix A. Implemented by frontend-engineer in PF-M1-05.
**Rules honored:** no phone number; no invented facts, dates, or links; all-roles positioning (SE / Backend / QA).

Anything marked `[NEEDS-VERIFICATION: …]` must be resolved with the product owner **before this page ships**. Do not guess or substitute.

---

## Page metadata

- **Title:** `About — Aekkarat Fontong`
- **Meta description:** `From 4.5 years in the Royal Thai Police to shipping production software. The full story: the pivot, how I work, and the proof.`

---

## Section 1 — The pivot

**Heading:** `The pivot`

**Body copy:**

> For four and a half years I served as a police officer at Phahonyothin Police Station. On night shifts and days off, I taught myself to code.
>
> It started as curiosity and became the thing I kept choosing. While still in uniform, I built and shipped software real people use: a trip-tracking platform with a public Android APK, a multiplayer game running live on a server I manage myself, and the automated tests behind both.
>
> In June 2026 I resigned to become a software engineer full-time.
>
> This wasn't a whim. Nobody leaves a stable government career for a maybe. I left because after years of building before work, after work, and on days off, the evidence was clear: this is what I do, and I'm ready to do it as my job.

*Writer's note: "trip-tracking platform with a public Android APK" = AiKlao (SPEC CS1); "multiplayer game running live" = Typing Race at race.aiklaotrip.com (SPEC CS2). Both verifiable.*

---

## Section 2 — How I work

**Heading:** `How I work`

**Intro line:**

> Career-changers don't get the benefit of the doubt, so I built my habits around proof.

**Four items (render as cards or a list — implementer's choice):**

1. **I own the full lifecycle.**
   Design, code, tests, CI/CD, deploy, and production on a self-managed VPS. On AiKlao and Typing Race I was the mobile developer, the backend developer, and the ops person — there was no one else to hand off to.

2. **Tests gate my releases.**
   500+ automated tests across six repositories (Jest, JUnit, Supertest, Playwright, GUT). On my projects, a CI gate blocks the release build on any red test — not as policy theater, but because I've seen what slips through without it.

3. **I think in edge cases.**
   What happens when two SOS requests arrive at the same instant? When a player pastes the whole passage instead of typing it? Finding the failure mode before the user does is the job.

4. **I use AI as a tool — and own every decision.**
   For Tiger Kick I designed a review-gated development process: role-scoped agents, mandatory code review, QA exit gates. The AI executed; the architecture, the quality bar, and every accepted line were mine.

*Writer's note: "500+ automated tests" = 505 verified (82 + 138 + 84 + 60 + 116 + 25 per CLAUDE.md). Do not write "505" here — Home uses "500+" and the exact per-repo counts belong to the case studies. Edge-case examples = AiKlao SOS (CS1) and Typing Race anti-cheat (CS2).*

---

## Section 3 — Timeline

**Heading:** `The path`

Vertical timeline (semantic ordered list). Exactly these four entries, in this order — structured as `{ year, title, description }`:

```
[
  {
    year: "2022",
    title: "Royal Thai Police",
    description: "Police officer at Phahonyothin Police Station. Shift work, real stakes, no room for sloppiness — and, off-shift, teaching myself to code."
  },
  {
    year: "2024",
    title: "42 Bangkok",
    description: "Project-based, peer-reviewed computer science school. No lectures — you build, and your peers review your code. Learned to defend my work line by line."
  },
  {
    year: "2025",
    title: "First shipped app — AiKlao",
    description: "Real-time group trip-tracking platform: LINE bot, LIFF web, and a React Native app on one shared backend. Public Android APK, running in production on a self-managed VPS."
  },
  {
    year: "2026",
    title: "B.Sc. Computer Science — and all in",
    description: "Completed a B.Sc. in Computer Science and, in June 2026, resigned from the police to pursue software engineering full-time."
  }
]
```

*Writer's notes:*
- *Dates match SPEC §4.2 exactly: 2022 Police → 2024 42 Bangkok → 2025 first shipped app (AiKlao) → 2026 B.Sc. CS + resigned. Do not reorder or add entries.*
- *[NEEDS-VERIFICATION: B.Sc. CS — confirm with product owner that the degree was completed (not in progress) in 2026, and the institution name. SPEC says only "2026 B.Sc. CS + resigned". If in progress, change the 2026 description to "Finishing a B.Sc. in Computer Science…" — do not ship "Completed" unconfirmed.]*

---

## Section 4 — Certifications

**Heading:** `Certifications`

Each entry renders as: name · issuer · a `Verify ↗` link. **The page must not ship with placeholder URLs.** SPEC §4.2 names the certifications but does not include the verify URLs — every link below must come from the product owner.

**Interim rendering rule for PF-M1-05:** If a verify URL is unconfirmed, render name · issuer with no Verify link — never a dead or placeholder href.

| Certification | Issuer | Verify URL |
|---|---|---|
| API Testing | Postman Academy | [NEEDS-VERIFICATION: Postman Academy "API Testing" — exact badge title + verify URL from product owner] |
| API Prototyping | Postman Academy | [NEEDS-VERIFICATION: Postman Academy "API Prototyping" — exact badge title + verify URL from product owner] |
| API Documentation | Postman Academy | [NEEDS-VERIFICATION: Postman Academy "API Documentation" — exact badge title + verify URL from product owner] |
| Claude 101 | Anthropic Academy | [NEEDS-VERIFICATION: Anthropic Academy "Claude 101" — exact course title + verify URL from product owner] |
| Claude Code | Anthropic Academy | [NEEDS-VERIFICATION: Anthropic Academy "Claude Code" — exact course title + verify URL from product owner] |
| MCP | Anthropic Academy | [NEEDS-VERIFICATION: Anthropic Academy "MCP" — exact course title + verify URL from product owner] |

*Writer's note: names above use SPEC's shorthand ("API Testing / Prototyping / Documentation", "Claude 101 / Claude Code / MCP"). The official badge/course titles may differ — display the exact official titles once the product owner provides the verify links.*

---

## Section 5 — Beyond code

**Heading:** `Beyond code`

**Body copy:**

> Some things police work teaches that a bootcamp can't: discipline that doesn't depend on motivation, staying calm when things go wrong at 3 a.m., and working inside a team where mistakes have consequences.
>
> 42 Bangkok added the other half — having peers pick apart my code and learning that a review is a gift, not an attack.
>
> I bring both to a software team.

---

## Closing CTA

> **Want the details?** The case studies cover the architecture, the hard problems, and the tests.
>
> `[View projects →]`  `[Get in touch]`

Links: `/projects` and `/contact`.

---

## Fact traceability (for code-reviewer)

| Claim | Source |
|---|---|
| 4.5 years, police officer, Phahonyothin Police Station | SPEC §4.2 "The pivot" |
| Taught himself to code on night shifts / days off | SPEC §4.2 "The pivot" |
| Resigned June 2026 | SPEC §4.2 "The pivot" |
| Timeline 2022 / 2024 / 2025 / 2026 milestones | SPEC §4.2 "Timeline" |
| AiKlao: LINE bot + LIFF web + React Native app, public APK, production on self-managed VPS | SPEC §5 CS1 |
| Typing Race live (multiplayer game on self-managed server) | SPEC §5 CS2, race.aiklaotrip.com |
| 500+ automated tests across six repositories | CLAUDE.md (505 = 82+138+84+60+116+25); phrasing matches SPEC §4.1 hero |
| CI gate blocks release on any red test | SPEC §5 CS1 + CS2 |
| Tiger Kick review-gated process (agents, code review, QA gates) | SPEC §5 CS3 |
| Peer code review at 42; discipline / calm under pressure / teamwork | SPEC §4.2 "Beyond code" |
| Certifications list (names) | SPEC §4.2 "Certifications" |
| Certification verify URLs | **NOT in SPEC — all flagged NEEDS-VERIFICATION** |
| B.Sc. CS completion + institution | **Partially in SPEC ("2026 B.Sc. CS") — completion status + institution flagged NEEDS-VERIFICATION** |

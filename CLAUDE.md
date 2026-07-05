# Portfolio Website — Shared Context

**Every agent reads this file first, then `CURRENT_PHASE.md`, then its own contract in `.claude/agents/`, then the card it owns in `_backlog.json`.**

## What we are building

Personal portfolio website for **Aekkarat Fontong (Jod)** — Software / QA Automation Engineer, career-changer (Royal Thai Police → software). Full spec with real content: `docs/SPEC.md`. This site targets **all roles** (SE / Backend / QA), not a single track.

- **Stack:** Next.js 15 (App Router, TypeScript) + Tailwind CSS + MDX case studies. Framer Motion (subtle only). Deploy: Vercel. Domain: `jod.aiklaotrip.com`.
- **Quality bar:** Lighthouse ≥ 95 all categories, a11y AA, responsive 375/768/1280, dark mode, zero console errors.
- **This project is also proof of process:** a review-gated AI-agent SDLC (same discipline as Tiger Kick). Follow the workflow exactly — the workflow itself is portfolio content.

## Team & workflow

- Roster and call-order: `AGENT_INDEX.md`. Current milestone: `CURRENT_PHASE.md`. Where any topic lives: `DOCUMENT_ROUTING.yaml`.
- **Kanban:** `Backlog → Todo → Doing → Review → Done`, one-way. WIP in Doing ≤ 1–2 per agent.
- Pick cards from `_backlog.json` where `owner_agent` = you, `status: "todo"`, and every `depends_on` is `done`. Update the card's `status` as you move it.
- **Review is mandatory:** finished work → `code-reviewer` → `qa-engineer` → `producer` marks Done. A different agent always reviews.

## Definition of Done (global minimum, every card)

1. Meets the card's acceptance criteria (`dod` field).
2. `npm run build` and `npm run lint` pass.
3. Responsive at 375 / 768 / 1280; dark mode OK; no console errors.
4. No broken links; all images have alt text.

**Exit Gate:** a milestone closes only when QA checklist passes + code review clean + DoD met. Broken build or Lighthouse < 90 blocks the gate.

## Change control

- Structural / dependency / routing changes → `architect` approval first.
- Scope or priority calls → `producer`.
- Only `producer` (with the human product owner) touches Vercel/domain/DNS.

## Product-owner decisions (locked — do not re-litigate)

1. **No phone number anywhere on the site** (spam risk). Contact = email, LinkedIn, GitHub only.
2. **Resume page is download-first.** Buttons + thumbnails; inline PDF embed is desktop-enhancement only (iframe PDF UX on mobile is bad).
3. Verify contact email with the product owner before it ships on any page.
4. Case-study order (all-roles positioning): AiKlao → Typing Race → Tiger Kick → JPD.
5. TH/EN toggle is M4 (optional) — do not pull it forward.

## Known gotchas

- `create-next-app` refuses a non-empty directory: scaffold into a temp dir, then merge into repo root (see card PF-M0-01).
- All facts in content must be verifiable from real repos ("505 automated tests" = 82+138+84+60+116+25). Never invent metrics.
- Respect `prefers-reduced-motion`; keep animations 150–250 ms.
- Never commit secrets; résumé PDFs go in `/public/resume/`.

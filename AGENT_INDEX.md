# Agent Index — who exists, who to call

| Agent | Model | Writes code? | Call when… |
|---|---|---|---|
| `producer` | opus | No | assign/track cards, milestone status, approve Done, Exit Gate, Vercel/domain |
| `architect` | opus | No (approves) | routing, folder structure, content model, any dependency or structural change |
| `frontend-engineer` | opus | Yes | pages, components, Tailwind, responsive, dark mode, SEO/OG, CI |
| `content-writer` | opus | Yes (content only) | hero/about copy, the 4 MDX case studies |
| `qa-engineer` | sonnet | Yes (checks/tests) | Lighthouse, a11y, link-check, responsive/dark-mode audit, DoD verification |
| `code-reviewer` | opus | No | review every diff before it can reach Done |

**Human (Jod):** product owner — final taste calls, real credentials, DNS, first deploy.

> **Model note (2026-07-12, product owner):** all agents now run on **opus** (product-owner instruction — the earlier plan to keep `frontend-engineer` on fable through the M1.5 exit gate is superseded; the switch was made mid-M1.5 rather than deferred to PF-V2-07). No agent remains on fable.

## Standard flow per card

`owner agent (Doing)` → `code-reviewer (Review)` → `qa-engineer (verify DoD)` → `producer (Done)`

## Escalation

- Blocked > 30 min or ambiguous requirement → `producer`.
- Structural/dependency question → `architect`.
- Content facts uncertain → ask the human; never guess.

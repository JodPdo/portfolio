# portfolio-web — Kickoff

Portfolio site for Aekkarat Fontong (Jod), built by a **review-gated AI-agent team** (6 agents, mandatory review + QA gates). Spec: `docs/SPEC.md` · Process: `CLAUDE.md` + `AGENT_INDEX.md`.

## Start the loop

1. `git init` + create GitHub repo `JodPdo/portfolio` and push this folder.
2. Open Claude Code in this folder.
3. Say: **"You are `producer`. Read CLAUDE.md, CURRENT_PHASE.md and _backlog.json, then assign the first available card."**
4. Producer assigns `PF-M0-01` → run each card with its owner agent → every card passes `code-reviewer` → `qa-engineer` → producer marks Done.
5. After PF-M0-04: import the repo on Vercel → live URL from day 1.

> Note: agent contracts use `model: fable` for content-writer. If your Claude Code build doesn't accept `fable`, change it to `claude-fable-5` (full model id) or `opus`.

This README gets replaced by the real project README during M0 scaffold.

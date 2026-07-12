import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

// Copy verbatim from docs/copy/home.md §3 (approved, PF-M1-02). Order is
// locked (CLAUDE.md #4): AiKlao -> Typing Race -> Tiger Kick.
//
// V2 (card PF-V2-04, brief §2): typographic rows separated by hairlines —
// not cards. At M2 these render from MDX frontmatter (`featured: true`)
// per docs/ARCHITECTURE.md §3; the copy below matches the frontmatter
// summaries so the swap is invisible. E8 reveals per row.
const FEATURED_PROJECTS = [
  {
    title: "AiKlao",
    summary:
      "Real-time group trip tracking — LINE bot, LIFF web, and a React Native app on one shared backend, with a concurrency-safe SOS path.",
    chips: ["React Native", "Node.js", "Spring Boot", "PostgreSQL"],
    href: "/projects/aiklao",
  },
  {
    title: "Typing Race",
    summary:
      "Server-authoritative multiplayer typing game — the client can't cheat, and 60 core tests plus cross-browser Playwright E2E prove it. Live now.",
    chips: ["React", "TypeScript", "Socket.IO", "Playwright"],
    href: "/projects/typing-race",
  },
  {
    title: "Tiger Kick",
    summary:
      "A multiplayer party game in Godot — built under a review-gated, agent-driven SDLC I designed: Kanban, mandatory code review, and 116 unit tests plus a headless multiplayer smoke test in CI.",
    chips: ["Godot 4", "GDScript", "GUT", "CI"],
    href: "/projects/tiger-kick",
  },
];

export function FeaturedProjects() {
  return (
    <section aria-labelledby="featured-projects-heading" className="w-full">
      <h2
        id="featured-projects-heading"
        className="px-4 pb-8 pt-16 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-secondary sm:px-8"
      >
        01 — Featured projects
      </h2>

      <ul>
        {FEATURED_PROJECTS.map((project, i) => (
          <li key={project.href} className="border-t border-border">
            <Reveal>
              <Link
                href={project.href}
                className="group grid gap-x-8 gap-y-4 px-4 py-10 transition-colors duration-200 hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:transition-none sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:px-8"
              >
                <span
                  aria-hidden="true"
                  className="pt-1.5 font-mono text-xs tracking-[0.18em] text-foreground-secondary"
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-3xl font-medium uppercase leading-none tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary motion-reduce:transition-none sm:text-5xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-prose text-sm leading-relaxed text-foreground-secondary">
                    {project.summary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                    {project.chips.map((chip) => (
                      <li
                        key={chip}
                        className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-secondary"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Decorative glyph (>=24px, non-textual) — muted OK per
                    DESIGN_SYSTEM V2 contrast rule. */}
                <span
                  aria-hidden="true"
                  className="hidden self-center text-2xl text-foreground-muted transition-colors duration-200 group-hover:text-primary motion-reduce:transition-none sm:block"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="border-t border-border px-4 py-6 sm:px-8">
        <Link
          href="/projects"
          className="rounded-sm px-1 py-0.5 font-mono text-xs uppercase tracking-[0.16em] text-primary underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
        >
          All projects →
        </Link>
      </div>
    </section>
  );
}

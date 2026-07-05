import Link from "next/link";

// Copy verbatim from docs/copy/home.md §3 (approved, PF-M1-02). Order is
// locked (CLAUDE.md #4): AiKlao -> Typing Race -> Tiger Kick.
//
// This is deliberately a simple, inline card — the full ProjectCard for the
// /projects grid is built in PF-M2-01, and at M2 these cards will render
// from MDX frontmatter (`featured: true`) per docs/ARCHITECTURE.md §3.
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
    <section
      aria-labelledby="featured-projects-heading"
      className="mx-auto w-full max-w-content px-4 py-16 sm:px-6"
    >
      <h2
        id="featured-projects-heading"
        className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl"
      >
        Featured projects
      </h2>

      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_PROJECTS.map((project) => (
          <li key={project.href}>
            <Link
              href={project.href}
              className="flex h-full flex-col gap-3 rounded-lg border border-border bg-background-subtle p-6 transition-colors duration-200 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground">
                {project.summary}
              </p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                {project.chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-foreground"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-center">
        <Link
          href="/projects"
          className="rounded-sm px-1 py-0.5 text-sm font-semibold text-primary underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
        >
          All projects →
        </Link>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ProjectMediaRow } from "@/components/projects/project-media-row";
import { getProjectPreview } from "@/lib/project-previews";

// Copy verbatim from docs/copy/home.md §3 (approved, PF-M1-02). Order is
// locked (CLAUDE.md #4): AiKlao -> Typing Race -> Tiger Kick.
//
// V2 (card PF-V2-04, brief §2): typographic rows separated by hairlines —
// not cards. E8 reveals per row.
//
// Preview media (architect rulings 2026-07-21 "Option A" → 2026-07-22
// "Option B", which supersedes it): each entry carries an explicit `slug` —
// the lookup key into lib/project-previews.ts, shared with /projects (cheapest
// glue; no fragile href parsing). Rows render the shared <ProjectMediaRow>,
// which frames the in-view-autoplay media as a side thumbnail (never behind
// the text).
const FEATURED_PROJECTS = [
  {
    slug: "aiklao",
    title: "AiKlao",
    summary:
      "Real-time group trip tracking — LINE bot, LIFF web, and a React Native app on one shared backend, with a concurrency-safe SOS path.",
    chips: ["React Native", "Node.js", "Spring Boot", "PostgreSQL"],
    href: "/projects/aiklao",
  },
  {
    slug: "typing-race",
    title: "Typing Race",
    summary:
      "Server-authoritative multiplayer typing game — the client can't cheat, and 60 core tests plus cross-browser Playwright E2E prove it. Live now.",
    chips: ["React", "TypeScript", "Socket.IO", "Playwright"],
    href: "/projects/typing-race",
  },
  {
    slug: "tiger-kick",
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
        {FEATURED_PROJECTS.map((project, i) => {
          const preview = getProjectPreview(project.slug);
          return (
            <li key={project.slug} className="border-t border-border">
              <Reveal>
                <ProjectMediaRow
                  href={project.href}
                  title={project.title}
                  ordinal={`0${i + 1}`}
                  previewSrc={preview?.src}
                  previewPoster={preview?.poster}
                  headingLevel="h3"
                >
                  <p className="text-sm leading-relaxed text-foreground-secondary">
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
                </ProjectMediaRow>
              </Reveal>
            </li>
          );
        })}
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

import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { WorkRow, type WorkRowProject } from "@/components/projects/work-row";
import { buildOpenGraph, formatTitle } from "@/lib/site";

const DESCRIPTION =
  "Four projects, each with a full case study — AiKlao, Typing Race, Tiger Kick, and the JPD API.";

export const metadata: Metadata = {
  title: "Projects",
  description: DESCRIPTION,
  alternates: { canonical: "/projects" },
  ...buildOpenGraph({
    title: formatTitle("Projects"),
    description: DESCRIPTION,
    path: "/projects",
  }),
};

/**
 * Per-project hover-preview assets (E6, card PF-V2-05). Keyed by slug.
 *
 * OUTSTANDING product-owner delivery (tracked, non-blocking per the
 * 2026-07-13 SHIP POSTER-ONLY decision): drop a muted-looping webm clip
 * (<=300KB) — and optionally a real poster image — under /public and add
 * its entry here, e.g.
 *
 *   aiklao: { src: "/media/aiklao-preview.webm", poster: "/media/aiklao.webp" },
 *
 * WorkRow then renders the <video> and loads it on first hover/focus. With
 * no entry (current state, all 4) the row shows the designed typographic
 * poster only — nothing 404s.
 */
const PROJECT_PREVIEWS: Record<
  string,
  { src?: string; poster?: string } | undefined
> = {
  // aiklao: { ... },
  // "typing-race": { ... },
  // "tiger-kick": { ... },
  // "jpd-api": { ... },
};

export default function ProjectsPage() {
  // Ordered by frontmatter `order` (lib/projects.ts) — AiKlao, Typing Race,
  // Tiger Kick, JPD API (docs/ARCHITECTURE.md §3; CLAUDE.md #4).
  const projects = getAllProjects();

  const rows: WorkRowProject[] = projects.map((project) => {
    const preview = PROJECT_PREVIEWS[project.slug];
    return {
      slug: project.slug,
      title: project.title,
      tagline: project.tagline,
      summary: project.summary,
      stack: project.stack,
      previewSrc: preview?.src,
      previewPoster: preview?.poster,
    };
  });

  return (
    <div className="flex w-full flex-1 flex-col py-16">
      <header className="px-4 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-secondary">
          Selected works
        </p>
        <h1 className="mt-4 font-display text-5xl font-medium uppercase leading-none tracking-tight text-foreground sm:text-7xl">
          Projects
        </h1>
        <p className="mt-6 max-w-prose text-sm leading-relaxed text-foreground-secondary">
          Four projects, each with a full case study. Hover or focus a row for
          a preview; select it to read the write-up.
        </p>
      </header>

      <ul className="mt-12">
        {rows.map((project, index) => (
          <li key={project.slug} className="border-t border-border last:border-b">
            <WorkRow project={project} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
}

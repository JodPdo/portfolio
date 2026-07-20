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
 * MEDIA DROPPED 2026-07-20 (architect ruling that day; see DESIGN_SYSTEM.md
 * decision log). Real assets now live in public/media/, so 3 of 4 rows have a
 * live preview. Each entry maps to one of WorkRow's three states:
 *
 *   { src, poster } => video preview (poster is the <video>'s poster attr).
 *   { poster }      => image-only preview: a plain <img> fades in on
 *                      hover/focus (no <video>, no JS). Used when a clip
 *                      doesn't exist yet.
 *   (no entry)      => typographic poster only (the designed panel).
 *
 * State per project:
 *   - aiklao / typing-race: video + poster (real webm clips exist).
 *   - tiger-kick: poster only — the game is unfinished, so a still stands in.
 *   - jpd-api: intentionally absent — stays typographic-poster-only.
 * All referenced files exist on disk, so nothing 404s.
 */
const PROJECT_PREVIEWS: Record<
  string,
  { src?: string; poster?: string } | undefined
> = {
  aiklao: { src: "/media/aiklao-preview.webm", poster: "/media/aiklao-preview.webp" },
  "typing-race": { src: "/media/typing-race-preview.webm", poster: "/media/typing-race-preview.webp" },
  "tiger-kick": { poster: "/media/tiger-kick-preview.webp" }, // NO src — image-only, game unfinished
  // jpd-api: intentionally absent — stays typographic-poster-only.
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

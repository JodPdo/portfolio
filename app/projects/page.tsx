import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { WorkRow, type WorkRowProject } from "@/components/projects/work-row";
import { getProjectPreview } from "@/lib/project-previews";
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

export default function ProjectsPage() {
  // Ordered by frontmatter `order` (lib/projects.ts) — AiKlao, Typing Race,
  // Tiger Kick, JPD API (docs/ARCHITECTURE.md §3; CLAUDE.md #4).
  const projects = getAllProjects();

  const rows: WorkRowProject[] = projects.map((project) => {
    // Preview assets now come from lib/project-previews.ts (shared with the
    // home Featured section) — architect ruling 2026-07-21, Option A.
    const preview = getProjectPreview(project.slug);
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
          Four projects, each with a full case study. Previews play as you scroll;
          select a row to read the write-up.
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

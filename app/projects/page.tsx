import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/sections/project-card";

export const metadata: Metadata = {
  title: "Projects — Aekkarat Fontong",
  description:
    "Four projects, each with a full case study — AiKlao, Typing Race, Tiger Kick, and the JPD API.",
};

export default function ProjectsPage() {
  // Ordered by frontmatter `order` (lib/projects.ts) — AiKlao, Typing Race,
  // Tiger Kick, JPD API (docs/ARCHITECTURE.md §3; CLAUDE.md #4).
  const projects = getAllProjects();

  return (
    <div className="mx-auto w-full max-w-content flex-1 px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
        Projects
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
        Four projects, each with a full case study.
      </p>

      <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}

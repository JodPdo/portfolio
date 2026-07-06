import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Content loader for `content/projects/*.mdx` — single source of truth for
 * the `/projects` grid and the Home "featured" cards (docs/ARCHITECTURE.md §3).
 *
 * Body/MDX rendering is out of scope here (PF-M2-06); `body` is exposed as
 * the raw, uncompiled MDX string for that card to consume later.
 */

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectRepoLink {
  label: string;
  url: string;
}

/**
 * Every key optional individually (Ruling 2026-07-06, ARCHITECTURE.md §3):
 * an unverified URL never enters frontmatter, so a link-less project (or a
 * project missing any one link kind) is valid. No sentinel values here —
 * absence means "omit the link", never a placeholder href.
 */
export interface ProjectLinks {
  live?: string;
  apk?: string;
  docs?: string;
  repos?: ProjectRepoLink[];
}

export interface Project {
  title: string;
  slug: string;
  order: number;
  summary: string;
  tagline?: string;
  role: string;
  stack: string[];
  tags?: string[];
  featured?: boolean;
  cover?: string;
  metrics?: ProjectMetric[];
  links?: ProjectLinks;
  draft?: boolean;
  /** Raw MDX body string (not yet compiled) — for PF-M2-06's renderer. */
  body: string;
}

const REQUIRED_STRING_FIELDS = ["title", "slug", "role", "summary"] as const;

function assertIsProject(
  data: Record<string, unknown>,
  filename: string,
): asserts data is Omit<Project, "body"> {
  for (const field of REQUIRED_STRING_FIELDS) {
    if (typeof data[field] !== "string" || data[field] === "") {
      throw new Error(
        `content/projects/${filename}: frontmatter field "${field}" is required and must be a non-empty string.`,
      );
    }
  }

  if (typeof data.order !== "number") {
    throw new Error(
      `content/projects/${filename}: frontmatter field "order" is required and must be a number.`,
    );
  }

  if (!Array.isArray(data.stack) || data.stack.length === 0) {
    throw new Error(
      `content/projects/${filename}: frontmatter field "stack" is required and must be a non-empty array.`,
    );
  }

  // The loader lint: slug must equal the filename (no drift between the
  // route segment and the file that backs it).
  const expectedSlug = filename.replace(/\.mdx$/, "");
  if (data.slug !== expectedSlug) {
    throw new Error(
      `content/projects/${filename}: frontmatter "slug" ("${String(
        data.slug,
      )}") must equal the filename ("${expectedSlug}").`,
    );
  }
}

let cache: Project[] | null = null;

function loadAllProjects(): Project[] {
  if (cache) return cache;

  const filenames = fs
    .readdirSync(PROJECTS_DIR)
    .filter((name) => name.endsWith(".mdx"));

  const projects = filenames.map((filename) => {
    const filePath = path.join(PROJECTS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    assertIsProject(data, filename);

    return {
      ...(data as Omit<Project, "body">),
      body: content,
    } satisfies Project;
  });

  cache = projects;
  return projects;
}

/** All non-draft projects, sorted by frontmatter `order` ascending. */
export function getAllProjects(): Project[] {
  return loadAllProjects()
    .filter((project) => !project.draft)
    .sort((a, b) => a.order - b.order);
}

/** Slugs for `generateStaticParams()` on `/projects/[slug]`. */
export function getProjectSlugs(): string[] {
  return getAllProjects().map((project) => project.slug);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return loadAllProjects().find(
    (project) => !project.draft && project.slug === slug,
  );
}

import { Reveal } from "@/components/motion/reveal";

// Copy verbatim from docs/copy/home.md §4 (approved, PF-M1-02). Group order
// mirrors the all-roles positioning: build -> serve -> test -> ship. Chips
// are plain text, not links.
//
// V2 (card PF-V2-04, brief §2): hairline-bordered full-bleed section, mono
// labels/chips, E8 stagger on the groups.
const SKILL_GROUPS = [
  {
    label: "Frontend",
    chips: ["React", "React Native", "Next.js", "TypeScript"],
  },
  {
    label: "Backend",
    chips: ["Node/Express", "Spring Boot", "REST", "PostgreSQL"],
  },
  {
    label: "QA",
    chips: ["Jest", "JUnit", "Playwright", "GUT", "Supertest"],
  },
  {
    label: "DevOps",
    chips: ["GitHub Actions", "Docker", "nginx", "PM2", "Vercel", "Linux/VPS"],
  },
];

export function Skills() {
  return (
    <section
      aria-labelledby="skills-heading"
      className="w-full border-t border-border"
    >
      <h2
        id="skills-heading"
        className="px-4 pb-8 pt-16 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-secondary sm:px-8"
      >
        02 — Skills
      </h2>

      <Reveal
        stagger={0.06}
        className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 pb-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4"
      >
        {SKILL_GROUPS.map((group) => (
          <div key={group.label} className="border-t border-border-strong pt-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
              {group.label}
            </h3>
            <ul className="mt-4 flex flex-col gap-1.5">
              {group.chips.map((chip) => (
                <li
                  key={chip}
                  className="font-mono text-sm text-foreground-secondary"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

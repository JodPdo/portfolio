// Copy verbatim from docs/copy/home.md §4 (approved, PF-M1-02). Group order
// mirrors the all-roles positioning: build -> serve -> test -> ship. Chips
// are plain text, not links.
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
      className="mx-auto w-full max-w-content px-4 py-16 sm:px-6"
    >
      <h2
        id="skills-heading"
        className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl"
      >
        Skills
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {SKILL_GROUPS.map((group) => (
          <div key={group.label}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              {group.label}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-border bg-background-subtle px-3 py-1 text-sm text-foreground"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

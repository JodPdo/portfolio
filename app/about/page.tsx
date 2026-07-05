import type { Metadata } from "next";
import Link from "next/link";
import { Timeline } from "@/components/sections/timeline";

// Copy verbatim from docs/copy/about.md (approved, PF-M1-04).
export const metadata: Metadata = {
  title: "About — Aekkarat Fontong",
  description:
    "From 4.5 years in the Royal Thai Police to shipping production software. The full story: the pivot, how I work, and the proof.",
};

// Section 2 — "How I work" (§2, four items).
const HOW_I_WORK_ITEMS: { title: string; description: string }[] = [
  {
    title: "I own the full lifecycle.",
    description:
      "Design, code, tests, CI/CD, deploy, and production on a self-managed VPS. On AiKlao and Typing Race I was the mobile developer, the backend developer, and the ops person — there was no one else to hand off to.",
  },
  {
    title: "Tests gate my releases.",
    description:
      "500+ automated tests across six repositories (Jest, JUnit, Supertest, Playwright, GUT). On my projects, a CI gate blocks the release build on any red test — not as policy theater, but because I've seen what slips through without it.",
  },
  {
    title: "I think in edge cases.",
    description:
      "What happens when two SOS requests arrive at the same instant? When a player pastes the whole passage instead of typing it? Finding the failure mode before the user does is the job.",
  },
  {
    title: "I use AI as a tool — and own every decision.",
    description:
      "For Tiger Kick I designed a review-gated development process: role-scoped agents, mandatory code review, QA exit gates. The AI executed; the architecture, the quality bar, and every accepted line were mine.",
  },
];

// Section 4 — "Certifications". Interim rendering rule (copy doc §4): every
// verify URL is [NEEDS-VERIFICATION], so render name · issuer with NO
// Verify link — never a dead or placeholder href.
const CERTIFICATIONS: { name: string; issuer: string }[] = [
  { name: "API Testing", issuer: "Postman Academy" },
  { name: "API Prototyping", issuer: "Postman Academy" },
  { name: "API Documentation", issuer: "Postman Academy" },
  { name: "Claude 101", issuer: "Anthropic Academy" },
  { name: "Claude Code", issuer: "Anthropic Academy" },
  { name: "MCP", issuer: "Anthropic Academy" },
];

const LINK_CLASSES =
  "rounded-sm px-1 py-0.5 font-semibold text-primary underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-content px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
        About
      </h1>

      {/* Section 1 — The pivot */}
      <section aria-labelledby="pivot-heading" className="mt-12">
        <h2
          id="pivot-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          The pivot
        </h2>
        <div className="mt-4 flex max-w-3xl flex-col gap-4 text-base leading-relaxed text-foreground sm:text-lg">
          <p>
            For four and a half years I served as a police officer at
            Phahonyothin Police Station. On night shifts and days off, I
            taught myself to code.
          </p>
          <p>
            It started as curiosity and became the thing I kept choosing.
            While still in uniform, I built and shipped software real people
            use: a trip-tracking platform with a public Android APK, a
            multiplayer game running live on a server I manage myself, and
            the automated tests behind both.
          </p>
          <p>In June 2026 I resigned to become a software engineer full-time.</p>
          <p>
            This wasn&apos;t a whim. Nobody leaves a stable government career
            for a maybe. I left because after years of building before work,
            after work, and on days off, the evidence was clear: this is what
            I do, and I&apos;m ready to do it as my job.
          </p>
        </div>
      </section>

      {/* Section 2 — How I work */}
      <section aria-labelledby="how-i-work-heading" className="mt-16">
        <h2
          id="how-i-work-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          How I work
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground sm:text-lg">
          Career-changers don&apos;t get the benefit of the doubt, so I built
          my habits around proof.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {HOW_I_WORK_ITEMS.map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-border bg-background-subtle p-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 3 — The path (timeline) */}
      <section aria-labelledby="path-heading" className="mt-16">
        <h2
          id="path-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          The path
        </h2>
        <Timeline />
      </section>

      {/* Section 4 — Certifications */}
      <section aria-labelledby="certifications-heading" className="mt-16">
        <h2
          id="certifications-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Certifications
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CERTIFICATIONS.map((cert) => (
            <li
              key={cert.name}
              className="rounded-lg border border-border bg-background-subtle px-5 py-4 text-sm text-foreground sm:text-base"
            >
              <span className="font-semibold">{cert.name}</span>
              {" · "}
              {cert.issuer}
            </li>
          ))}
        </ul>
      </section>

      {/* Section 5 — Beyond code */}
      <section aria-labelledby="beyond-code-heading" className="mt-16">
        <h2
          id="beyond-code-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Beyond code
        </h2>
        <div className="mt-4 flex max-w-3xl flex-col gap-4 text-base leading-relaxed text-foreground sm:text-lg">
          <p>
            Some things police work teaches that a bootcamp can&apos;t:
            discipline that doesn&apos;t depend on motivation, staying calm
            when things go wrong at 3 a.m., and working inside a team where
            mistakes have consequences.
          </p>
          <p>
            42 Bangkok added the other half — having peers pick apart my code
            and learning that a review is a gift, not an attack.
          </p>
          <p>I bring both to a software team.</p>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        aria-labelledby="about-cta-heading"
        className="mt-16 flex flex-col items-center gap-4 rounded-lg border border-border bg-background-subtle px-6 py-12 text-center"
      >
        <h2
          id="about-cta-heading"
          className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
        >
          Want the details? The case studies cover the architecture, the hard
          problems, and the tests.
        </h2>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-6">
          <Link href="/projects" className={LINK_CLASSES}>
            View projects →
          </Link>
          <Link href="/contact" className={LINK_CLASSES}>
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}

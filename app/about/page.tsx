import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PhotoMat } from "@/components/ui/photo-mat";
import { HowIWork } from "@/components/sections/how-i-work";
import { Timeline } from "@/components/sections/timeline";
import jodWorking from "@/public/images/jod-working-duotone.webp";

// Copy verbatim from docs/copy/about.md (approved, PF-M1-04). V2 "Editorial
// Dark" layout per Design Brief V2 §2–3 (card PF-V2-06): numbered mono
// section labels, display headings, full-bleed rows with hairline borders,
// jod-working duotone in a <PhotoMat>, and §2 rebuilt as the E7 pinned
// horizontal section (<HowIWork>).
export const metadata: Metadata = {
  title: "About — Aekkarat Fontong",
  description:
    "From 4.5 years in the Royal Thai Police to shipping production software. The full story: the pivot, how I work, and the proof.",
};

// Section 4 — "Certifications". Interim rendering rule (copy doc §4): every
// verify URL is [NEEDS-VERIFICATION], so render name · issuer with NO
// Verify link — never a dead or placeholder href (0 <a> in this section).
const CERTIFICATIONS: { name: string; issuer: string }[] = [
  { name: "API Testing", issuer: "Postman Academy" },
  { name: "API Prototyping", issuer: "Postman Academy" },
  { name: "API Documentation", issuer: "Postman Academy" },
  { name: "Claude 101", issuer: "Anthropic Academy" },
  { name: "Claude Code", issuer: "Anthropic Academy" },
  { name: "MCP", issuer: "Anthropic Academy" },
];

const LABEL_CLASSES =
  "font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-secondary";

const H2_CLASSES =
  "mt-4 font-display text-3xl font-medium uppercase leading-none tracking-tight text-foreground sm:text-5xl";

const CTA_LINK_CLASSES =
  "inline-flex items-center gap-1.5 rounded-sm font-mono text-xs uppercase tracking-[0.16em] text-foreground underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

export default function AboutPage() {
  return (
    <div className="flex w-full flex-1 flex-col">
      {/* Page header */}
      <header className="px-4 pt-16 pb-12 sm:px-6 sm:pt-24 lg:px-8">
        <p className={LABEL_CLASSES}>Profile — About</p>
        <h1 className="mt-4 font-display text-5xl font-medium uppercase leading-none tracking-tight text-foreground sm:text-7xl">
          About
        </h1>
      </header>

      {/* Section 1 — The pivot */}
      <section
        aria-labelledby="pivot-heading"
        className="border-t border-border px-4 py-16 sm:px-6 lg:px-8"
      >
        <p className={LABEL_CLASSES}>01 — The pivot</p>
        <h2 id="pivot-heading" className={H2_CLASSES}>
          The pivot
        </h2>
        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start lg:gap-16">
          <div className="flex max-w-prose flex-col gap-5 text-base leading-relaxed text-foreground">
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
            <p>
              In June 2026 I resigned to become a software engineer full-time.
            </p>
            <p>
              This wasn&apos;t a whim. Nobody leaves a stable government career
              for a maybe. I left because after years of building before work,
              after work, and on days off, the evidence was clear: this is what
              I do, and I&apos;m ready to do it as my job.
            </p>
          </div>
          <PhotoMat
            caption="Fig. 02 — The workspace"
            className="lg:justify-self-end lg:sticky lg:top-24"
          >
            <Image
              src={jodWorking}
              alt="A dark keyboard workspace where Aekkarat writes and tests code off-shift"
              placeholder="blur"
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 70vw, 100vw"
              className="h-full w-full object-cover"
            />
          </PhotoMat>
        </div>
      </section>

      {/* Section 2 — How I work (E7 pinned horizontal, 5 panels) */}
      <HowIWork />

      {/* Section 3 — The path (timeline) */}
      <section
        aria-labelledby="path-heading"
        className="border-t border-border px-4 py-16 sm:px-6 lg:px-8"
      >
        <p className={LABEL_CLASSES}>03 — The path</p>
        <h2 id="path-heading" className={H2_CLASSES}>
          The path
        </h2>
        <Timeline />
      </section>

      {/* Section 4 — Certifications */}
      <section
        aria-labelledby="certifications-heading"
        className="border-t border-border px-4 py-16 sm:px-6 lg:px-8"
      >
        <p className={LABEL_CLASSES}>04 — Certifications</p>
        <h2 id="certifications-heading" className={H2_CLASSES}>
          Certifications
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {CERTIFICATIONS.map((cert) => (
            <li
              key={cert.name}
              className="flex flex-col gap-1 bg-background px-5 py-5"
            >
              <span className="text-base font-medium text-foreground">
                {cert.name}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-secondary">
                {cert.issuer}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 5 — Beyond code */}
      <section
        aria-labelledby="beyond-code-heading"
        className="border-t border-border px-4 py-16 sm:px-6 lg:px-8"
      >
        <p className={LABEL_CLASSES}>05 — Beyond code</p>
        <h2 id="beyond-code-heading" className={H2_CLASSES}>
          Beyond code
        </h2>
        <div className="mt-8 flex max-w-prose flex-col gap-5 text-base leading-relaxed text-foreground">
          <p>
            Some things police work teaches that a bootcamp can&apos;t:
            discipline that doesn&apos;t depend on motivation, staying calm when
            things go wrong at 3 a.m., and working inside a team where mistakes
            have consequences.
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
        className="border-t border-border px-4 py-20 sm:px-6 lg:px-8"
      >
        <h2
          id="about-cta-heading"
          className="max-w-content font-display text-2xl font-medium uppercase leading-tight tracking-tight text-foreground sm:text-4xl"
        >
          Want the details? The case studies cover the architecture, the hard
          problems, and the tests.
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-8">
          <Link href="/projects" className={CTA_LINK_CLASSES}>
            View projects →
          </Link>
          <Link href="/contact" className={CTA_LINK_CLASSES}>
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}

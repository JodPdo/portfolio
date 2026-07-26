import type { Metadata } from "next";
import Image from "next/image";
import {
  CERTIFICATION_GROUPS,
  certYear,
  isThaiTitle,
  type Certification,
} from "@/lib/certifications";
import { buildOpenGraph, formatTitle } from "@/lib/site";

// V2 "Editorial Dark" certifications page (card PF-CERT-02, architect ruling
// 2026-07-26 — docs/DESIGN_SYSTEM.md decision log + docs/ARCHITECTURE.md §8).
// Copy verbatim from docs/copy/certifications.md (PF-CERT-01, rev 2).
//
// Static server component: no "use client", no data fetching, no dynamic
// segment and NO per-cert routes (8 short records have nothing to say on a page
// of their own). All certificate facts come from lib/certifications.ts, which
// /about §4 also reads — there is deliberately no second copy anywhere.
//
// Layout language (non-numbered mono page label + display H1, then hairline
// full-bleed numbered sections) mirrors app/resume/page.tsx + app/about/page.tsx.
const DESCRIPTION =
  "Eight certificates from Anthropic Education, Postman Academy and Mahidol University — completion dates and verification links where the issuer publishes one.";

export const metadata: Metadata = {
  title: "Certifications",
  description: DESCRIPTION,
  alternates: { canonical: "/certifications" },
  ...buildOpenGraph({
    title: formatTitle("Certifications"),
    description: DESCRIPTION,
    path: "/certifications",
  }),
};

const LABEL_CLASSES =
  "font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-secondary";

const H2_CLASSES =
  "mt-4 font-display text-3xl font-medium uppercase leading-none tracking-tight text-foreground sm:text-5xl";

function CertificationCard({
  certification,
  issuer,
}: {
  certification: Certification;
  issuer: string;
}) {
  const { name, descriptor, completed, verifyUrl, thumbnail, thumbnailAlt } =
    certification;

  return (
    <li
      // The teal border is applied on hover AND focus-within, so a keyboard user
      // gets the same affordance as a pointer user. Nothing on this card depends
      // on hover to be readable (ruling §7).
      className="flex flex-col border border-border-strong bg-surface-mat-strong transition-colors duration-200 hover:border-primary focus-within:border-primary motion-reduce:transition-none"
    >
      {/* Fixed 4:3 box + object-contain: the two source aspect families
          (~4:3 Skilljar, ~3:2 Mahidol) letterbox onto the mat instead of being
          cropped — object-cover would guillotine the certificate text. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border">
        <Image
          src={thumbnail}
          alt={thumbnailAlt}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 py-5">
        <h3
          className="text-base font-medium leading-snug text-foreground"
          lang={isThaiTitle(name) ? "th" : undefined}
        >
          {name}
        </h3>

        {descriptor ? (
          <p className={LABEL_CLASSES}>{descriptor}</p>
        ) : null}

        <p className={`${LABEL_CLASSES} mt-auto`}>
          {issuer} · <time dateTime={completed}>{certYear(completed)}</time>
        </p>

        {/* Rendered ONLY when verifyUrl exists — absence is the encoding for
            "no verify page" (ruling §3c). No disabled-looking stand-in. */}
        {verifyUrl ? (
          <a
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.16em] text-foreground underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
          >
            Verify
            <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </li>
  );
}

export default function CertificationsPage() {
  return (
    <div className="flex w-full flex-1 flex-col">
      {/* Page header */}
      <header className="px-4 pt-16 pb-12 sm:px-6 sm:pt-24 lg:px-8">
        <p className={LABEL_CLASSES}>Profile — Certifications</p>
        <h1 className="mt-4 font-display text-5xl font-medium uppercase leading-none tracking-tight text-foreground sm:text-7xl">
          Proof of learning.
        </h1>
        <p className="mt-6 max-w-prose text-base leading-relaxed text-foreground-secondary">
          Eight courses, three issuers, all completed in 2026. Six carry a
          public verification link; where an issuer doesn&apos;t publish a
          per-certificate page, I say so rather than link to something that
          isn&apos;t proof.
        </p>
      </header>

      {/* One section per issuer group, numbered 01 / 02 / 03 */}
      {CERTIFICATION_GROUPS.map((group, index) => {
        const number = String(index + 1).padStart(2, "0");
        const headingId = `certification-group-${number}`;

        return (
          <section
            key={group.issuer}
            aria-labelledby={headingId}
            className="border-t border-border px-4 py-16 sm:px-6 lg:px-8"
          >
            <p className={LABEL_CLASSES}>
              {number} — {group.issuer}
            </p>
            <h2 id={headingId} className={H2_CLASSES}>
              {group.issuer}
            </h2>

            {/* 1 col at 375, 2 at 768 (md), 3 at 1280 (xl) */}
            <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {group.certifications.map((certification) => (
                <CertificationCard
                  key={certification.name}
                  certification={certification}
                  issuer={group.issuer}
                />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

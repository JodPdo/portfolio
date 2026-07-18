import { Preloader } from "@/components/home/preloader";
import { StatsMarquee } from "@/components/home/stats-marquee";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Skills } from "@/components/sections/skills";
import { ClosingCta } from "@/components/sections/cta";
import {
  SITE_URL,
  PERSON_NAME,
  PERSON_NICKNAME,
  JOB_TITLE,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/lib/site";

// JSON-LD `Person` schema (PF-M3-01 / docs/SPEC.md §150) — home page only.
// Facts trace to real, verified data: name + nickname (docs/SPEC.md),
// jobTitle (all-roles positioning), and sameAs handles that match the footer
// / contact links. No email or phone in structured data (CLAUDE.md #1).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON_NAME,
  alternateName: PERSON_NICKNAME,
  jobTitle: JOB_TITLE,
  url: SITE_URL,
  sameAs: [GITHUB_URL, LINKEDIN_URL],
};

// Home — V2 "Editorial Dark" (card PF-V2-04, Design Brief V2 §2–3).
// Section order per docs/copy/home.md: hero -> trust strip -> featured 3 ->
// skills -> CTA, with the E3 teal stats marquee directly under the hero.
export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col">
      {/* Static, first-party JSON-LD (no user input). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Preloader route="/" />
      <Hero />
      <StatsMarquee />
      <TrustStrip />
      <FeaturedProjects />
      <Skills />
      <ClosingCta />
    </div>
  );
}

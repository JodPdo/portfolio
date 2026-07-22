import Link from "next/link";
import { Scramble } from "@/components/motion/scramble";
import { PhotoMat } from "@/components/ui/photo-mat";
import { HeroPortrait } from "@/components/home/hero-portrait";
import { MouseParallax } from "@/components/home/mouse-parallax";
import { GITHUB_URL } from "@/lib/site";

// Copy verbatim from docs/copy/home.md §1 (approved, PF-M1-02); V2 layout
// per Design Brief V2 §2 (card PF-V2-04): display name with E2 scramble,
// photo in a thin-bordered mat (E4 displacement + E5 parallax live in the
// client islands), full-bleed row with hairline bottom border.
// GITHUB_URL comes from lib/site.ts — never re-declare it (ARCHITECTURE.md §7).

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-1.5 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="w-full">
      <div className="grid w-full gap-12 px-4 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-center lg:gap-16 lg:py-24">
        {/* E5: text layer drifts slightly against the photo layer. */}
        <MouseParallax depth={-6} className="flex flex-col gap-6">
          <h1
            id="hero-heading"
            className="font-display text-[clamp(40px,7.5vw,96px)] font-medium uppercase leading-[1.02] tracking-tight text-foreground"
          >
            <Scramble text="Aekkarat Fontong" trigger="both" />
          </h1>
          <p className="text-base font-medium text-foreground sm:text-lg">
            Software &amp; QA Automation Engineer — I ship production software
            and the tests that keep it honest.
          </p>
          <p className="max-w-prose text-sm leading-relaxed text-foreground-secondary">
            From a 4.5-year career in the Royal Thai Police to building real,
            deployed apps — React Native, Node.js, Spring Boot, and 500+
            automated tests across six repositories.
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className={`${BUTTON_BASE} bg-primary text-primary-foreground hover:opacity-90`}
            >
              View projects
            </Link>
            <Link
              href="/resume"
              className={`${BUTTON_BASE} border border-border-strong text-foreground hover:border-primary hover:text-primary`}
            >
              Download résumé
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${BUTTON_BASE} px-2 text-foreground underline-offset-4 hover:text-primary hover:underline`}
            >
              GitHub ↗
            </a>
          </div>
        </MouseParallax>

        {/* E4 + E5: photo mat — parallax wrapper, pixi island inside. */}
        <MouseParallax depth={10} className="w-full max-w-[440px] lg:justify-self-end">
          <PhotoMat caption="Fig. 01 — The engineer">
            <HeroPortrait />
          </PhotoMat>
        </MouseParallax>
      </div>
    </section>
  );
}

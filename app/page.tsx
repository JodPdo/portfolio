import { Preloader } from "@/components/home/preloader";
import { StatsMarquee } from "@/components/home/stats-marquee";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Skills } from "@/components/sections/skills";
import { ClosingCta } from "@/components/sections/cta";

// Home — V2 "Editorial Dark" (card PF-V2-04, Design Brief V2 §2–3).
// Section order per docs/copy/home.md: hero -> trust strip -> featured 3 ->
// skills -> CTA, with the E3 teal stats marquee directly under the hero.
export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col">
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

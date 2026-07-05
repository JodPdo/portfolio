import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Skills } from "@/components/sections/skills";
import { ClosingCta } from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col">
      <Hero />
      <TrustStrip />
      <FeaturedProjects />
      <Skills />
      <ClosingCta />
    </div>
  );
}

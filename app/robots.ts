import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * robots.txt (PF-M3-01). Allow all indexable content; explicitly disallow the
 * `/scratch/` QA-demo tree (already noindexed at the page level — this is
 * belt-and-braces so crawlers never fetch it). Points crawlers at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/scratch/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

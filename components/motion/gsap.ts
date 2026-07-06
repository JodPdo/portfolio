"use client";

/**
 * Single GSAP entry point for all motion islands (ADR-0003: one animation
 * engine — GSAP + ScrollTrigger free core, nothing else). Import gsap from
 * here, never from "gsap" directly, so the plugin is registered exactly once
 * and only on the client.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

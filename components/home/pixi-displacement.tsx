"use client";

import { useEffect, useRef } from "react";
import { Application, Assets, DisplacementFilter, Sprite } from "pixi.js";

/**
 * E4 — hero photo displacement on mousemove (Design Brief V2 §3, ADR-0003).
 *
 * THIS MODULE IS THE LAZY PIXI CHUNK. It is the only file that imports
 * `pixi.js` and it must only ever be loaded via `next/dynamic` from
 * <HeroPortrait> (desktop + fine pointer + motion-safe, after idle) so the
 * pixi bundle stays out of the initial JS budget (brief §5).
 *
 * Renders a transparent canvas ON TOP of the static duotone <Image>
 * fallback, drawing the SAME asset cover-fitted, so the swap is invisible.
 * The ticker only runs while displacement is active (starts on mousemove,
 * stops when the effect decays to zero). If WebGL init fails, we silently
 * leave the static image in place.
 */
type PixiDisplacementProps = {
  /** The duotone photo asset (public path — already web-optimized). */
  src: string;
  /** Blurred-noise displacement map (public path). */
  mapSrc: string;
  className?: string;
};

export default function PixiDisplacement({
  src,
  mapSrc,
  className,
}: PixiDisplacementProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let destroyed = false;
    let app: Application | null = null;
    let detach: (() => void) | null = null;

    (async () => {
      try {
        const a = new Application();
        await a.init({
          backgroundAlpha: 0,
          antialias: false,
          resolution: Math.min(window.devicePixelRatio || 1, 2),
          autoDensity: true,
          resizeTo: host,
        });
        if (destroyed) {
          a.destroy(true, { children: true });
          return;
        }
        app = a;

        const [texture, mapTexture] = await Promise.all([
          Assets.load(src),
          Assets.load(mapSrc),
        ]);
        if (destroyed) return;

        mapTexture.source.style.addressMode = "repeat";

        const photo = new Sprite(texture);
        const map = new Sprite(mapTexture);
        const filter = new DisplacementFilter({ sprite: map, scale: 0 });
        photo.filters = [filter];
        a.stage.addChild(photo, map);

        // Cover-fit the photo to the host box (matches CSS object-cover on
        // the static fallback beneath, so the canvas overlays seamlessly).
        const fit = () => {
          const w = a.screen.width;
          const h = a.screen.height;
          const s = Math.max(w / texture.width, h / texture.height);
          photo.scale.set(s);
          photo.position.set(
            (w - texture.width * s) / 2,
            (h - texture.height * s) / 2,
          );
        };
        fit();
        a.renderer.on("resize", fit);

        // Displacement strength follows mouse velocity over the photo and
        // decays back to zero; ticker sleeps whenever fully settled.
        let target = 0;
        let current = 0;
        let lastX = 0;
        let lastY = 0;
        let hasLast = false;

        const step = () => {
          current += (target - current) * 0.1;
          target *= 0.92;
          filter.scale.set(current);
          if (current < 0.05 && target < 0.05) {
            filter.scale.set(0);
            a.ticker.stop();
          }
        };
        a.ticker.add(step);
        a.ticker.stop(); // idle (and zero rendering) until first movement

        const onMove = (e: PointerEvent) => {
          const rect = host.getBoundingClientRect();
          const inside =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;
          if (!inside) {
            hasLast = false;
            return;
          }
          if (hasLast) {
            const d = Math.hypot(e.clientX - lastX, e.clientY - lastY);
            target = Math.min(60, target + d * 0.6);
          }
          lastX = e.clientX;
          lastY = e.clientY;
          hasLast = true;
          map.position.set(
            (e.clientX - rect.left) * 0.5,
            (e.clientY - rect.top) * 0.5,
          );
          if (!a.ticker.started) a.ticker.start();
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        detach = () => {
          window.removeEventListener("pointermove", onMove);
          a.renderer.off("resize", fit);
        };

        host.appendChild(a.canvas);
      } catch {
        // WebGL unavailable / init failed: static duotone image stays.
      }
    })();

    return () => {
      destroyed = true;
      detach?.();
      app?.destroy(true, { children: true });
      app = null;
    };
  }, [src, mapSrc]);

  // Purely decorative enhancement over the real <Image> -> aria-hidden.
  return <div ref={hostRef} aria-hidden="true" className={className} />;
}

"use client";

import { useEffect, useState } from "react";

// Desktop-only inline PDF preview (card PF-M1-06 / SPEC Appendix A#2).
//
// Download-first is the locked product decision: buttons + thumbnail are the
// primary UI on every viewport. An inline <iframe> render is a DESKTOP
// ENHANCEMENT only — iframe PDF UX on mobile is bad, and a 1.7MB fetch there is
// pure waste. Rather than ship the iframe in the DOM and hide it with CSS
// (browsers may still fetch a display:none same-origin iframe), this client
// island mounts the iframe ONLY when a desktop-width media query matches. So:
//   • small viewports (and mobile Lighthouse's 375px emulation) never create
//     the iframe and never fetch the PDF — the download buttons are the whole
//     experience, exactly as required;
//   • the pre-hydration server HTML contains no iframe, so there is no CLS and
//     no wasted mobile bytes.
//
// prefers-reduced-motion is irrelevant here (no animation); the only gate is
// available width.

const DESKTOP_QUERY = "(min-width: 1024px)";

type ResumePreviewProps = {
  src: string;
  title: string;
};

export function ResumePreview({ src, title }: ResumePreviewProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="mt-10 aspect-[8.5/11] w-full max-w-3xl border border-border-strong bg-background-subtle">
      <iframe
        src={`${src}#view=FitH`}
        title={title}
        loading="lazy"
        className="h-full w-full"
      />
    </div>
  );
}

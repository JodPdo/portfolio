"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/**
 * Flips the `.dark` class on <html> and persists the choice.
 *
 * Theme state is synced from the DOM/localStorage via
 * `useSyncExternalStore` rather than `useEffect` + `setState` — the inline
 * no-FOUC script (app/layout.tsx) may already have applied `.dark` before
 * hydration runs, so the client's "real" value can legitimately differ
 * from the server-rendered snapshot. `useSyncExternalStore` is the
 * React-sanctioned way to reconcile that without a hydration warning:
 * it renders `getServerSnapshot()` during hydration, then swaps to the
 * live `getSnapshot()` value right after.
 */

let listeners: Array<() => void> = [];

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void) {
  listeners.push(callback);
  // Cross-tab sync: the `storage` event only fires in *other* tabs, and
  // only reports that localStorage changed elsewhere — it does not touch
  // this tab's DOM. So we apply the new value to this tab's <html> class
  // ourselves before notifying, otherwise getSnapshot() would keep
  // reading this tab's (unchanged) class and nothing would happen.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== "theme") return;
    const next: Theme = e.newValue === "dark" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", next === "dark");
    callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

// Must match the server-rendered default (light) so hydration never warns;
// the inline script already fixed the real DOM class before this paints.
function getServerSnapshot(): Theme {
  return "light";
}

function setTheme(next: Theme) {
  document.documentElement.classList.toggle("dark", next === "dark");
  window.localStorage.setItem("theme", next);
  notify();
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  const toggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background-subtle text-foreground transition-colors duration-200 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

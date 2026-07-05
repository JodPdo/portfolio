import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aekkarat Fontong — Software / QA Automation Engineer",
  description:
    "Portfolio of Aekkarat Fontong (Jod), Software / QA Automation Engineer.",
};

// Sets the correct `.dark` class on <html> before first paint (no-FOUC).
// Runs via next/script strategy="beforeInteractive", which Next always
// injects into <head> and executes before hydration, regardless of where
// the component is placed in the tree (see next/script docs).
const THEME_INIT_SCRIPT = `(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'dark' || stored === 'light'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // The inline theme script (above) mutates classList before React
      // hydrates, so the server-rendered class list and the live DOM can
      // legitimately differ at hydration time. This is the standard,
      // documented way to avoid a false-positive hydration warning for
      // exactly this pattern.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        {/* Minimal, unobtrusive placement for M0. A proper Header (with
            nav + this same toggle) lands in PF-M1-01. */}
        <div className="fixed right-4 top-4 z-50">
          <ThemeToggle />
        </div>
        {children}
      </body>
    </html>
  );
}

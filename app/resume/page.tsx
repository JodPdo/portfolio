import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Download Aekkarat Fontong's resume — tailored for Software Engineer, Backend, and QA Automation roles.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <div className="mx-auto flex w-full max-w-content flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
        Resume
      </h1>
    </div>
  );
}

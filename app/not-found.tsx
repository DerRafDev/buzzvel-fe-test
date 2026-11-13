import type { Metadata } from "next";

import { ButtonLink } from "./_components/ui/button-link";
import { Logo } from "./_components/ui/icons";
import { SmartLink } from "./_components/ui/smart-link";

export const metadata: Metadata = {
  title: "Not part of this demo — Luma",
  robots: { index: false },
};

/**
 * Shared fallback for every out-of-scope destination (Log in, Join Luma,
 * course and category pages, Careers, Terms…). The landing page links to
 * these routes on purpose; they all render this page with a 404 status.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-cream px-5 py-15 text-center">
      <SmartLink href="/" aria-label="Luma home" className="rounded-sm text-ink">
        <Logo />
      </SmartLink>
      <h1 className="mt-10 font-display text-display-6 font-extrabold text-ink md:text-display-3">
        This page isn&apos;t part of this demo
      </h1>
      <p className="mt-4 max-w-[480px] text-body-sm text-muted lg:text-lead">
        This challenge covers a single landing page. Links to pages like this one
        are kept so the navigation stays realistic, but their content was not built.
      </p>
      <ButtonLink href="/" className="mt-8">
        Back to home
      </ButtonLink>
    </main>
  );
}

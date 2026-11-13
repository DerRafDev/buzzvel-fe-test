import type { ReactNode } from "react";

import { SmartLink } from "./smart-link";

export type ButtonVariant = "primary" | "secondary" | "accent" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary: "px-7 bg-primary text-white hover:bg-primary-strong active:bg-primary-strong",
  secondary: "px-7 border border-line bg-white text-ink hover:border-ink active:border-ink",
  accent: "px-7 bg-yellow text-ink hover:bg-yellow-strong active:bg-yellow-strong focus-ring-light",
  // White instead of the design's #e7e7ec, which is 4.46:1 on the blue (below AA).
  ghost: "px-4 text-white hover:underline active:underline underline-offset-4 focus-ring-light",
};

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  /** Stretches the button on mobile, as in the mobile frame; auto width from `md`. */
  fullWidthOnMobile?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  fullWidthOnMobile = false,
  className = "",
  children,
}: ButtonLinkProps) {
  return (
    <SmartLink
      href={href}
      className={[
        // Press state (animation 3): hover color plus a 98% scale while pressed, so
        // touch devices (which never match hover) also get feedback. Reduced motion
        // keeps only the color change.
        "group/button inline-flex items-center justify-center gap-2 rounded-lg py-3.5 text-small font-bold transition-[color,background-color,border-color,scale] active:duration-100 active:ease-out motion-safe:active:scale-[.98]",
        fullWidthOnMobile ? "w-full md:w-auto" : "",
        variants[variant],
        className,
      ].join(" ")}
    >
      {children}
    </SmartLink>
  );
}

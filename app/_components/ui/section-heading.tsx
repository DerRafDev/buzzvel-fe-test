import type { ReactNode } from "react";

type Tone = "default" | "inverse";

type EyebrowProps = { tone?: Tone; className?: string; children: ReactNode };

export function Eyebrow({ tone = "default", className = "", children }: EyebrowProps) {
  return (
    <p
      className={`text-overline font-semibold uppercase ${tone === "inverse" ? "text-white" : "text-primary"} ${className}`}
    >
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  tone?: Tone;
  /** Gap between eyebrow and title: 16px in most sections, 8px in "The people". */
  tight?: boolean;
  className?: string;
};

/** Eyebrow + H2 (+ optional lead) block shared by most sections. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "start",
  tone = "default",
  tight = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={`${tight ? "mt-2" : "mt-4"} font-display text-display-6 font-extrabold md:text-display-4 lg:text-display-3 ${tone === "inverse" ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-body-sm text-muted lg:text-lead">{description}</p>
      ) : null}
    </div>
  );
}

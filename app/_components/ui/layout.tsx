import type { ReactNode } from "react";

type ContainerProps = { className?: string; children: ReactNode };

/**
 * Horizontal gutter of each frame: 20px (mobile), 40px (tablet), 80px (desktop),
 * which yields the 1120px content width of the 1280px desktop frame.
 */
export function Container({ className = "", children }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-20 ${className}`}>
      {children}
    </div>
  );
}

type SectionProps = {
  id?: string;
  labelledBy: string;
  className?: string;
  children: ReactNode;
};

/**
 * Sections that are anchor targets get `tabIndex={-1}` so following an in-page
 * link moves keyboard and screen reader focus to them, not just the scroll position.
 * The outline is suppressed because the section itself is not a control.
 */
export function Section({ id, labelledBy, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      tabIndex={id ? -1 : undefined}
      className={`py-15 outline-none md:py-20 lg:py-25 ${className}`}
    >
      {children}
    </section>
  );
}

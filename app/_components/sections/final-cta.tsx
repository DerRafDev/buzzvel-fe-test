import type { CSSProperties, ComponentType, SVGProps } from "react";

import { learnerAvatars, outOfScope, sectionIds } from "@/app/_data/content";

import { AvatarStack } from "../ui/avatar-stack";
import { ButtonLink } from "../ui/button-link";
import { BoldGlyph, CashGlyph, ChatGlyph, CodepenGlyph, DashboardGlyph } from "../ui/icons";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="relative overflow-hidden bg-butter py-15 lg:py-25">
      <CtaDecorations />
      <div className="relative mx-auto max-w-[720px] px-5 text-center md:px-8">
        <AvatarStack avatars={learnerAvatars} size={40} ring="yellow" className="justify-center" />
        <h2
          id="final-cta-title"
          className="mt-8 font-display text-display-5 font-extrabold text-ink md:text-display-3 lg:text-display-2"
        >
          What will you learn next?
        </h2>
        <p className="mt-4 text-body-sm text-muted lg:text-lead">
          Start with one course. Build from there.
        </p>
        {/* Both buttons are 52px in the frames (the bordered one included), so no stretching. */}
        <div className="mt-10 flex flex-col justify-center gap-3 md:flex-row md:items-start">
          <ButtonLink href={`#${sectionIds.categories}`} fullWidthOnMobile>
            Explore all courses
          </ButtonLink>
          <ButtonLink href={outOfScope.signup} variant="secondary" fullWidthOnMobile className="h-[52px]">
            Join Luma
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

type Shape = { kind: "circle" | "ring" | "square" | "outline-square"; x: number; y: number; size: number };
type Glyph = { Icon: ComponentType<SVGProps<SVGSVGElement>>; x: number; y: number; size: number };

// Positions in px inside the 1280×470 desktop frame. Squares are 12° rotations
// of the size given (Figma reports their larger bounding box).
const shapes: Shape[] = [
  { kind: "ring", x: 22, y: 16, size: 108 },
  { kind: "circle", x: 56, y: 373, size: 120 },
  { kind: "circle", x: 1064, y: 468, size: 40 },
  { kind: "square", x: 1155, y: -13, size: 115 },
  { kind: "square", x: -28, y: 235, size: 56 },
  { kind: "ring", x: 1208, y: 429, size: 32 },
  { kind: "ring", x: 877, y: 43, size: 32 },
  { kind: "outline-square", x: 322, y: 47, size: 56 },
];

const glyphs: Glyph[] = [
  { Icon: BoldGlyph, x: 272, y: 360, size: 101 },
  { Icon: CodepenGlyph, x: 1120, y: 220, size: 80 },
  { Icon: ChatGlyph, x: 141, y: 214, size: 32 },
  { Icon: DashboardGlyph, x: 1016, y: 82, size: 61 },
  { Icon: CashGlyph, x: 963, y: 381, size: 48 },
];

const shapeClass: Record<Shape["kind"], string> = {
  circle: "rounded-full bg-peach",
  ring: "rounded-full border-2 border-peach",
  square: "rotate-[-12deg] rounded-lg bg-peach",
  "outline-square": "rotate-[-12deg] rounded-lg border border-peach",
};

/**
 * Decorative background, only from `lg`: the mobile frame drops it, and at
 * tablet widths it would collide with the centered text. The 1280px layer is
 * centered, so wider and narrower desktops keep the shapes around the content.
 */
function CtaDecorations() {
  const place = ({ x, y, size }: { x: number; y: number; size: number }): CSSProperties => ({
    left: x,
    top: y,
    width: size,
    height: size,
  });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[1280px] -translate-x-1/2 text-peach lg:block">
      {shapes.map((shape, index) => (
        <span key={index} className={`absolute ${shapeClass[shape.kind]}`} style={place(shape)} />
      ))}
      {glyphs.map(({ Icon, ...box }, index) => (
        <Icon key={index} className="absolute" style={place(box)} />
      ))}
    </div>
  );
}

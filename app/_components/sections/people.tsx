import Image from "next/image";
import type { CSSProperties } from "react";

import { collage, outOfScope, sectionIds, type Box, type CollagePhoto } from "@/app/_data/content";

import { ButtonLink } from "../ui/button-link";
import { Container, Section } from "../ui/layout";
import { SectionHeading } from "../ui/section-heading";

export function People() {
  return (
    // Transparent in Figma; the cream comes from the frame background.
    <Section id={sectionIds.people} labelledBy="people-title" className="bg-cream">
      <Container>
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-15">
          <div>
            <SectionHeading
              id="people-title"
              eyebrow="The people"
              title="Meet international students & teachers"
              tight
            />
            {/* Ink in the mobile frame, muted grey in the desktop frame. */}
            <p className="mt-6 text-body-sm text-ink lg:mt-8 lg:text-lead lg:text-muted">
              Morbi sit egestas dignissim pharetra, sed amet. Tempus justo senectus
              risus ac vel, velit, nunc. Eget commodo eget in aliquam facilisi
              facilisi nec magna hendrerit. Placerat ipsum sit tellus urna, faucibus
              aenean lorem faucibus integer.
            </p>
            <ButtonLink href={outOfScope.community} variant="secondary" className="mt-6 lg:mt-8">
              Explore teachers and students
            </ButtonLink>
          </div>
          <PhotoCollage photos={collage} />
        </div>
      </Container>
    </Section>
  );
}

// The collage follows each frame: the 362×310 mobile composition (node 4:1236)
// below `md`, and the 530×523 desktop one (node 4:1137) from `md`. Boxes are
// stored in frame pixels and turned into percentages of each frame, so the
// composition scales with the available width (e.g. 320px at a 360px viewport).
const MOBILE = { w: 362, h: 310, circle: { x: 16, y: -10, w: 330, h: 330 } };
const DESKTOP = { w: 530, h: 523, circle: { x: 15, y: 12, w: 500, h: 500 } };

type Frame = typeof MOBILE;

/** Percent-based position for both frames, exposed as CSS custom properties. */
function placement(mobile: Box, desktop: Box): CSSProperties {
  const pct = (value: number, total: number) => `${(value / total) * 100}%`;
  const vars = (prefix: string, box: Box, frame: Frame) => ({
    [`--${prefix}-x`]: pct(box.x, frame.w),
    [`--${prefix}-y`]: pct(box.y, frame.h),
    [`--${prefix}-w`]: pct(box.w, frame.w),
    [`--${prefix}-h`]: pct(box.h, frame.h),
  });
  return { ...vars("m", mobile, MOBILE), ...vars("d", desktop, DESKTOP) } as CSSProperties;
}

const placed =
  "absolute left-(--m-x) top-(--m-y) w-(--m-w) h-(--m-h) md:left-(--d-x) md:top-(--d-y) md:w-(--d-w) md:h-(--d-h)";

function PhotoCollage({ photos }: { photos: CollagePhoto[] }) {
  return (
    <div className="relative mx-auto aspect-[362/310] w-full max-w-[362px] md:aspect-[530/523] md:max-w-[530px]">
      <div
        aria-hidden="true"
        className={`${placed} rounded-full bg-primary-soft`}
        style={placement(MOBILE.circle, DESKTOP.circle)}
      />
      <ul aria-label="Students and teachers">
        {photos.map((photo) => (
          <li
            key={photo.alt}
            className={`${placed} overflow-hidden rounded-[5px] bg-primary-soft shadow-photo md:rounded`}
            style={placement(photo.mobileBox, photo.box)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              sizes="(min-width: 768px) 140px, 25vw"
              className="size-full object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

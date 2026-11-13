import Image from "next/image";

import featuredImage from "@/app/_assets/images/featured-course.jpg";
import { featuredCourse, sectionIds } from "@/app/_data/content";

import { ButtonLink } from "../ui/button-link";
import { ArrowRight } from "../ui/icons";
import { Container, Section } from "../ui/layout";
import { Eyebrow } from "../ui/section-heading";

export function FeaturedCourse() {
  return (
    <Section id={sectionIds.featured} labelledBy="featured-title" className="bg-primary">
      <Container>
        {/*
          Desktop frame: 538 | 60 | 538 = 1136px, i.e. 16px wider than the 1120px
          container (the row ends at x 1216 of 1280). Kept on purpose with -mr-4.
        */}
        <div className="flex flex-col gap-10 lg:-mr-4 lg:grid lg:grid-cols-2 lg:items-center lg:gap-15">
          <div className="relative">
            <div className="relative aspect-[362/280] overflow-hidden rounded-2xl bg-primary-soft lg:aspect-[538/408]">
              <Image
                src={featuredImage}
                alt="Student working on interface designs for a product design course"
                placeholder="blur"
                sizes="(min-width: 1280px) 538px, (min-width: 1024px) 45vw, 100vw"
                className="size-full object-cover"
              />
            </div>
            <p className="absolute -top-3 -left-3 rounded-md bg-yellow px-3 py-1.5 text-overline font-semibold text-ink uppercase">
              Featured Course
            </p>
          </div>

          <div>
            <Eyebrow tone="inverse">{featuredCourse.eyebrow}</Eyebrow>
            <h2
              id="featured-title"
              className="mt-4 font-display text-display-6 font-extrabold text-white md:text-display-4 lg:text-display-3"
            >
              {featuredCourse.title}
            </h2>
            <p className="mt-5 text-small text-white lg:text-body">{featuredCourse.description}</p>
            <p className="mt-6 text-small text-white lg:text-body">{featuredCourse.instructor}</p>
            {/* White on every viewport: the mobile frame's #e7e7ec is 4.46:1 on the blue (below AA). */}
            <ul aria-label="Course details" className="mt-6 flex flex-wrap gap-3">
              {featuredCourse.details.map((detail) => (
                <li
                  key={detail}
                  className="rounded-lg border border-line px-3.5 py-1.5 text-small text-white"
                >
                  {detail}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 md:flex-row">
              <ButtonLink href={featuredCourse.href} variant="accent" fullWidthOnMobile>
                View course
              </ButtonLink>
              <ButtonLink href={`#${sectionIds.categories}`} variant="ghost" fullWidthOnMobile>
                Browse all courses
                {/* Same arrow nudge as the category cards (animation 2), motion-safe only. */}
                <ArrowRight className="text-white transition-[translate] duration-150 ease-out motion-safe:group-hover/button:translate-x-1 motion-safe:group-focus-visible/button:translate-x-1" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

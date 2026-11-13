import Image from "next/image";

import heroImage from "@/app/_assets/images/hero-learner.jpg";
import { learnerAvatars, sectionIds } from "@/app/_data/content";

import { AvatarStack } from "../ui/avatar-stack";
import { ButtonLink } from "../ui/button-link";
import { Star } from "../ui/icons";
import { Container } from "../ui/layout";
import { Eyebrow } from "../ui/section-heading";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-cream py-15 md:py-20 lg:py-25">
      <Container>
        {/*
          Desktop: 560px text | 60px gap | 500px visual, expressed in `fr` so the
          proportions hold between 1024px and 1280px. Below `lg` the visual is
          moved first (`order-first`) to match the mobile frame, while the DOM
          keeps the H1 first so the reading order starts with the heading.
        */}
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[560fr_500fr] lg:items-start lg:gap-15">
          <div>
            <Eyebrow>Learn at your own pace</Eyebrow>
            <h1
              id="hero-title"
              className="mt-4 font-display text-display-4 font-extrabold text-ink md:text-[3.25rem]/[3.625rem] lg:text-display-2 xl:text-display-1"
            >
              Build skills that actually move you forward.
            </h1>
            <p className="mt-6 max-w-[480px] text-body-sm text-muted lg:text-lead">
              Practical courses taught by people who do the work every day. Learn
              design, technology, business and more — one focused lesson at a time.
            </p>
            <div className="mt-8 flex flex-col gap-3 md:flex-row">
              {/* 54px tall in the desktop frame (other primary buttons are 52px). */}
              <ButtonLink href={`#${sectionIds.categories}`} fullWidthOnMobile className="lg:h-[54px]">
                Explore courses
              </ButtonLink>
              <ButtonLink href={`#${sectionIds.howItWorks}`} variant="secondary" fullWidthOnMobile>
                See how it works
              </ButtonLink>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3 md:justify-start">
              <AvatarStack avatars={learnerAvatars.slice(0, 3)} size={32} ring="cream" />
              <p className="text-small text-muted">
                <strong className="font-bold text-ink">Trusted by 24,000+</strong> learners
              </p>
            </div>
          </div>

          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}

/**
 * Photo with decorative shapes and two floating stat cards. Positions come from
 * the Figma frames and are expressed as percentages of each frame's box
 * (362×380 on mobile, 500×520 on desktop) so the composition scales in between.
 */
function HeroVisual() {
  return (
    <div className="relative order-first mx-auto aspect-[362/380] w-full max-w-[560px] lg:order-none lg:mx-0 lg:aspect-[500/520] lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute top-[6.3%] left-[27.6%] h-[90%] w-[75.1%] rounded-2xl bg-peach lg:top-[4.6%] lg:left-[90%] lg:w-[17.8%]"
      />
      <div
        aria-hidden="true"
        className="absolute top-[80%] left-[-2.8%] aspect-square w-[17.7%] rounded-full bg-primary-soft lg:top-[77.5%] lg:left-[-9%] lg:w-[21.2%]"
      />

      <div className="absolute inset-y-0 left-[2.2%] w-[95.6%] overflow-hidden rounded-2xl bg-primary-soft lg:inset-0 lg:w-full lg:rounded-3xl">
        {/*
          The mobile frame stretches this photo (Figma "STRETCH" fill), which would
          distort it; object-cover keeps the frame's box and crops instead.
        */}
        <Image
          src={heroImage}
          alt="Person focused on learning at their laptop"
          preload
          placeholder="blur"
          sizes="(min-width: 1280px) 500px, (min-width: 1024px) 44vw, (min-width: 768px) 560px, 92vw"
          className="size-full object-cover"
        />
      </div>

      <div className="absolute top-[1.6%] left-0 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-float lg:top-[3.1%] lg:left-[-4.4%]">
        <span className="rounded-lg bg-primary-soft px-1 py-1 text-small font-bold text-primary">
          120+
        </span>
        <span className="text-small text-ink">expert-led courses</span>
      </div>

      {/* Anchored on the right so it never pushes past the viewport on narrow screens. */}
      <div className="absolute top-[78.2%] right-[-3%] flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-float lg:top-[83.8%] lg:right-[-11.4%]">
        <span className="flex gap-0.5 text-yellow" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} />
          ))}
        </span>
        <span className="text-small whitespace-nowrap text-ink">
          <span className="sr-only">Rated </span>4.9 avg rating
        </span>
      </div>
    </div>
  );
}

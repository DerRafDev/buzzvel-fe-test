import Image from "next/image";

import alexMorgan from "@/app/_assets/images/alex-morgan.jpg";
import { sectionIds, stats } from "@/app/_data/content";

import { QuoteMark } from "../ui/icons";
import { Container, Section } from "../ui/layout";

export function Testimonial() {
  return (
    <Section id={sectionIds.testimonial} labelledBy="testimonial-title" className="bg-white">
      <Container>
        {/* The design has no visible heading here; this one names the region for screen readers. */}
        <h2 id="testimonial-title" className="sr-only">
          What our learners say
        </h2>
        {/*
          Desktop frame: quote (600px) and stats (401px) are pushed apart inside a
          1136px row that runs 16px past the container, like FeaturedCourse.
        */}
        <div className="flex flex-col gap-15 lg:-mr-4 lg:flex-row lg:items-center lg:justify-between">
          <figure className="lg:max-w-[600px] lg:flex-1">
            <QuoteMark className="text-primary" />
            <blockquote className="mt-4 font-display text-title-sm/8 font-semibold text-ink md:text-[1.625rem]/[2.375rem] md:tracking-[-0.025em] lg:text-quote">
              <p>
                The lessons are short enough to fit into my week, but detailed enough
                that I actually leave with something I can use.
              </p>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <Image
                src={alexMorgan}
                alt=""
                width={48}
                height={48}
                sizes="48px"
                className="size-12 rounded-full bg-primary-soft object-cover"
              />
              <span>
                <span className="block text-body-sm font-bold text-ink lg:text-body">Alex Morgan</span>
                <span className="block text-small text-muted">Product Manager</span>
              </span>
            </figcaption>
          </figure>

          {/* Mobile: a row of three columns; desktop: a column with a left rule. */}
          <dl className="grid grid-cols-3 lg:flex lg:w-[401px] lg:shrink-0 lg:flex-col lg:gap-5 lg:border-l lg:border-line lg:pl-12">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end">
                {/* Desktop frame: the label sits in a 21px box (24px text overflows it), so each stat is 95px tall. */}
                <dt className="pr-2 text-small text-muted-2 lg:mt-1 lg:h-[21px]">{stat.label}</dt>
                <dd className="font-display text-display-4 font-extrabold text-primary md:text-display-3 lg:text-display-1">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}

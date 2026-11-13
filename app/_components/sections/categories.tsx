import { categories, outOfScope, sectionIds, type Category } from "@/app/_data/content";

import { ArrowRight } from "../ui/icons";
import { Container, Section } from "../ui/layout";
import { SectionHeading } from "../ui/section-heading";
import { SmartLink } from "../ui/smart-link";

export function Categories() {
  return (
    <Section id={sectionIds.categories} labelledBy="categories-title" className="bg-white">
      <Container>
        <SectionHeading
          id="categories-title"
          eyebrow="Find your next skill"
          title="Learn something worth knowing."
          description="Short, practical courses designed around skills you can put to work immediately."
          className="max-w-[560px]"
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-5">
          {categories.map((category, index) => (
            <li key={category.slug} className="flex">
              <CategoryCard category={category} index={index + 1} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

type CategoryCardProps = { category: Category; index: number };

/**
 * The whole card is one link (the Figma layer is a "Link"). Categories with
 * content on this page point to it; the rest use the out-of-scope demo route.
 */
function CategoryCard({ category, index }: CategoryCardProps) {
  const href = category.onPageDetail?.href ?? outOfScope.category(category.slug);
  const actionLabel = category.onPageDetail?.label ?? "Explore";

  return (
    // Animation 2: on hover/focus the border turns blue (always) and, only when
    // motion is allowed, the card lifts 2px and the arrow slides 4px (150ms).
    // Animation 3: while pressed the border turns blue and, motion allowed, the card scales to 99%.
    <SmartLink
      href={href}
      className="group flex w-full flex-col justify-between rounded-2xl border border-line bg-white p-6 transition-[border-color,translate,scale] duration-150 ease-out hover:border-primary focus-visible:border-primary active:border-primary active:duration-100 motion-safe:active:scale-[.99] motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5 lg:p-7"
    >
      <div>
        <span className="mt-0.5 inline-block rounded-md bg-primary-soft px-2 py-1 text-overline font-semibold text-primary">
          {String(index).padStart(2, "0")}
        </span>
        <h3 className="mt-5 font-display text-title-sm font-bold text-ink lg:text-title">
          {category.title}
        </h3>
        <p className="mt-3 text-small text-muted-2">{category.description}</p>
      </div>
      {/* 20px row (the arrow height), as in Figma; grows if the label wraps (~1024px). */}
      <span className="mt-6 flex min-h-5 items-center gap-2 text-small/5 font-bold text-ink">
        {actionLabel}
        <ArrowRight className="shrink-0 transition-[translate] duration-150 ease-out motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1" />
      </span>
    </SmartLink>
  );
}

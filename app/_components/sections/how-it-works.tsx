import { sectionIds, steps, type Step, type StepIcon } from "@/app/_data/content";

import { Container, Section } from "../ui/layout";
import { SectionHeading } from "../ui/section-heading";

export function HowItWorks() {
  return (
    <Section id={sectionIds.howItWorks} labelledBy="how-title" className="bg-cream">
      <Container>
        <SectionHeading
          id="how-title"
          eyebrow="How Luma works"
          title="Less browsing. More learning."
          align="center"
        />
        <div className="relative mt-10 lg:mt-[108px] lg:pb-7">
          {/*
            Horizontal connector (md+): from the centre of the first icon to the
            centre of the third, behind the opaque icon tiles. Width = two columns
            plus two gaps of the 3-column grid. Animation 4 (connector-draw-x):
            draws on scroll where supported; otherwise it is static and complete.
          */}
          <div
            aria-hidden="true"
            className="connector-draw-x absolute top-7 left-7 hidden h-px w-[calc((100%-4rem)*2/3+4rem)] bg-line md:block lg:w-[calc((100%-10rem)*2/3+10rem)]"
          />
          <ol className="relative grid gap-0 md:grid-cols-3 md:gap-8 lg:gap-20">
            {steps.map((step, index) => (
              <StepItem key={step.title} step={step} index={index + 1} isLast={index === steps.length - 1} />
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

type StepItemProps = { step: Step; index: number; isLast: boolean };

function StepItem({ step, index, isLast }: StepItemProps) {
  return (
    // Mobile frame: steps are stacked and joined by a 1×50px vertical line that
    // ends at the next icon; the line is replaced by the horizontal one from md.
    <li className={`relative ${isLast ? "" : "pb-[76px] md:pb-0"}`}>
      <StepGlyph icon={step.icon} />
      <p className="mt-6 text-overline font-semibold text-muted uppercase">
        Step {String(index).padStart(2, "0")}
      </p>
      <h3 className="mt-2 font-display text-title-sm font-bold text-ink lg:text-title">
        {step.title}
      </h3>
      <p className="mt-3 text-small text-muted lg:text-body">{step.description}</p>
      {isLast ? null : (
        <span aria-hidden="true" className="connector-draw-y absolute bottom-0 left-7 h-[50px] w-px bg-line md:hidden" />
      )}
    </li>
  );
}

/** Abstract 56px icon tiles drawn in CSS, as in the Figma frames. */
function StepGlyph({ icon }: { icon: StepIcon }) {
  if (icon === "focus") {
    return (
      <div aria-hidden="true" className="relative size-14 rounded-full bg-primary-soft">
        <span className="absolute top-2 left-2 size-6 rounded-md bg-primary" />
      </div>
    );
  }
  if (icon === "experience") {
    return (
      <div aria-hidden="true" className="relative size-14">
        {/* Square tile is 15% orange in the mobile frame and peach in the desktop frame. */}
        <span className="absolute inset-0 rotate-[-12deg] rounded-lg bg-orange/15 md:bg-peach" />
        <span className="absolute top-6 left-6 size-7 rounded-full bg-orange" />
      </div>
    );
  }
  return (
    <div aria-hidden="true" className="relative size-14 rounded-xl bg-butter">
      <span className="absolute top-7 left-2 size-5 rounded-full bg-mustard" />
    </div>
  );
}

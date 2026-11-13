import { contactMethods, sectionIds, type ContactMethod } from "@/app/_data/content";

import { ChatBubble, Clock } from "../ui/icons";
import { Container, Section } from "../ui/layout";
import { Eyebrow } from "../ui/section-heading";
import { SmartLink } from "../ui/smart-link";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <Section id={sectionIds.contact} labelledBy="contact-title" className="bg-white">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-15">
          <div className="flex flex-col gap-8 lg:w-[480px] lg:gap-10">
            <div className="flex flex-col gap-4">
              <Eyebrow>Contact</Eyebrow>
              <h2
                id="contact-title"
                className="font-display text-display-6 font-extrabold text-ink md:text-display-4 lg:text-display-3"
              >
                Get in touch
              </h2>
              <p className="text-small text-muted lg:text-lead">
                Have a question? We’re here to help. Whether you’re looking for the
                right course, learning with your team or interested in teaching with
                Luma, we’d love to hear from you.
              </p>
            </div>
            <ul className="flex flex-col gap-4">
              {contactMethods.map((method) => (
                <li key={method.title}>
                  <ContactMethodCard method={method} />
                </li>
              ))}
            </ul>
          </div>

          {/* Both columns shrink in proportion (480:540) between 1024px and 1280px. */}
          <div className="lg:w-[540px]">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ContactMethodCard({ method }: { method: ContactMethod }) {
  const Icon = method.icon === "chat" ? ChatBubble : Clock;
  return (
    <div className="flex items-center gap-4 rounded-xl bg-cream p-4 lg:p-5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
        <Icon />
      </span>
      <div className="flex flex-col gap-0.5 lg:gap-1">
        <p className="text-small text-ink">{method.title}</p>
        {method.href ? (
          <SmartLink href={method.href} className="w-fit rounded-sm text-small text-primary underline-offset-4 hover:underline">
            {method.detail}
          </SmartLink>
        ) : (
          <p className="text-small text-muted">{method.detail}</p>
        )}
      </div>
    </div>
  );
}

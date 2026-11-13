"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";

type FieldName = "name" | "email" | "question";
type FieldErrors = Partial<Record<FieldName, string>>;
type Values = Record<FieldName, string>;

// Order matters: focus goes to the first invalid field in this order.
const FIELD_ORDER: FieldName[] = ["name", "email", "question"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(values: Values): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your full name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address, like name@example.com.";
  }
  if (!values.question.trim()) errors.question = "Please tell us how we can help.";
  return errors;
}

type ContactFormProps = {
  /** Simulated network latency; tests pass 0. */
  submitDelayMs?: number;
};

/**
 * Contact form with client-side validation and a simulated submission.
 * There is no backend in this challenge, so the confirmation says explicitly
 * that nothing was sent. Native validation is disabled (`noValidate`) so all
 * errors use the same accessible pattern: inline text linked by
 * `aria-describedby`, `aria-invalid`, and focus moved to the first invalid field.
 */
export function ContactForm({ submitDelayMs = 600 }: ContactFormProps) {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const values: Values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      question: String(data.get("question") ?? ""),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setStatus("");

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      const field = form.elements.namedItem(firstInvalid);
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, submitDelayMs));
    setSending(false);
    formRef.current?.reset();
    const firstName = values.name.trim().split(/\s+/)[0];
    setStatus(`Thanks, ${firstName}! This is a demo, so your message wasn't actually sent.`);
  }

  const fieldId = (name: FieldName) => `${formId}-${name}`;
  const errorId = (name: FieldName) => `${formId}-${name}-error`;

  const fieldProps = (name: FieldName, sizeClasses: string) => ({
    id: fieldId(name),
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? errorId(name) : undefined,
    className: `w-full rounded-lg border bg-cream px-4 text-small text-ink placeholder:text-muted ${
      errors[name] ? "border-error" : "border-line"
    } ${sizeClasses}`,
  });

  return (
    <div className="rounded-2xl border border-line bg-white px-5 py-6 shadow-form md:p-10">
      <div>
        <h3 id={`${formId}-title`} className="font-display text-title font-bold text-ink">
          Contact us
        </h3>
        <p className="mt-2 text-small text-muted">Fill out the fields and we will get in touch.</p>
      </div>

      <form
        ref={formRef}
        noValidate
        aria-labelledby={`${formId}-title`}
        onSubmit={handleSubmit}
        className="mt-6"
      >
        <div className="flex flex-col gap-5">
          <Field label="Full name" htmlFor={fieldId("name")} error={errors.name} errorId={errorId("name")}>
            <input {...fieldProps("name", "h-12 py-3")} type="text" autoComplete="name" placeholder="Your name" />
          </Field>
          <Field label="Email" htmlFor={fieldId("email")} error={errors.email} errorId={errorId("email")}>
            <input {...fieldProps("email", "h-12 py-3")} type="email" autoComplete="email" placeholder="youremail@example.com" />
          </Field>
          <Field label="Your question" htmlFor={fieldId("question")} error={errors.question} errorId={errorId("question")}>
            <textarea {...fieldProps("question", "block h-[100px] resize-y py-3.5 lg:h-[120px]")} placeholder="Tell us how we can help..." />
          </Field>
        </div>

        <button
          type="submit"
          // aria-disabled instead of disabled keeps focus on the button while sending.
          aria-disabled={sending}
          // Press state (animation 3) only while not sending, so a busy button does not react.
          className="mt-6 w-full rounded-lg bg-primary px-7 py-3.5 text-small font-bold text-white transition-[color,background-color,border-color,scale] hover:bg-primary-strong aria-[disabled=false]:active:bg-primary-strong aria-[disabled=false]:active:duration-100 aria-[disabled=false]:active:ease-out motion-safe:aria-[disabled=false]:active:scale-[.98] aria-disabled:cursor-progress aria-disabled:opacity-80"
        >
          {sending ? "Sending…" : "Send message"}
        </button>

        {/* Always rendered so screen readers announce the message when it changes. */}
        <p role="status" className="mt-4 text-small text-ink empty:hidden">
          {status}
        </p>
      </form>
    </div>
  );
}

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  children: ReactNode;
};

function Field({ label, htmlFor, error, errorId, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-small font-bold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="text-small text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

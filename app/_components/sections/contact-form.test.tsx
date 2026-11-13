import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ContactForm } from "./contact-form";

function setup() {
  const user = userEvent.setup();
  render(<ContactForm submitDelayMs={0} />);
  return {
    user,
    name: screen.getByLabelText("Full name"),
    email: screen.getByLabelText("Email"),
    question: screen.getByLabelText("Your question"),
    submit: screen.getByRole("button", { name: "Send message" }),
  };
}

describe("ContactForm", () => {
  it("shows an error for each empty field and moves focus to the first one", async () => {
    const { user, name, email, question, submit } = setup();

    await user.click(submit);

    expect(name).toHaveFocus();
    expect(name).toHaveAccessibleDescription("Please enter your full name.");
    expect(email).toHaveAccessibleDescription("Please enter your email address.");
    expect(question).toHaveAccessibleDescription("Please tell us how we can help.");
    for (const field of [name, email, question]) {
      expect(field).toHaveAttribute("aria-invalid", "true");
    }
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("keeps only the email error when the address is invalid, and focuses it", async () => {
    const { user, name, email, question, submit } = setup();

    await user.type(name, "Ana Souza");
    await user.type(email, "ana@");
    await user.type(question, "Which course should I start with?");
    await user.click(submit);

    expect(email).toHaveFocus();
    expect(email).toHaveAccessibleDescription(
      "Please enter a valid email address, like name@example.com.",
    );
    expect(name).not.toHaveAttribute("aria-invalid");
    expect(question).not.toHaveAttribute("aria-invalid");
  });

  it("confirms a valid submission as a demo and clears the form", async () => {
    const { user, name, email, question, submit } = setup();

    await user.type(name, "Ana Souza");
    await user.type(email, "ana@example.com");
    await user.type(question, "Which course should I start with?");
    await user.click(submit);

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Thanks, Ana! This is a demo, so your message wasn't actually sent.",
    );
    expect(name).toHaveValue("");
    expect(email).toHaveValue("");
    expect(question).toHaveValue("");
    expect(name).not.toHaveAttribute("aria-invalid");
  });
});

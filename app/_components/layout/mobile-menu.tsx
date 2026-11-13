"use client";

import { useEffect, useId, useRef, useState } from "react";

import { headerActions, primaryNav } from "@/app/_data/content";

import { ButtonLink } from "../ui/button-link";
import { CloseIcon, MenuIcon } from "../ui/icons";
import { SmartLink } from "../ui/smart-link";

const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Disclosure menu for viewports below `lg` (the desktop nav does not fit there).
 * The panel is not modal: it sits in the header flow and pushes the page down,
 * so there is no focus trap. Tab order is button → panel links, as in the DOM.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    // Escape closes the menu and returns focus to the toggle, so keyboard users
    // are not left on a link that just disappeared.
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    // If the viewport grows to the desktop layout, the toggle is hidden;
    // close the panel so it cannot stay open behind the desktop nav.
    const desktop = window.matchMedia(DESKTOP_QUERY);
    function onChange(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        // 44px touch target; the negative margin keeps the 24px icon where the
        // 36px button of the mobile frame places it.
        className="-mr-1 flex size-11 items-center justify-center rounded-lg text-ink lg:hidden"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/*
        Animation 1: when `hidden` is removed, @starting-style (Tailwind `starting:`)
        fades the panel in and slides it down 8px. Closing is instant. With reduced
        motion the transition is removed and the panel simply appears.
      */}
      <div
        id={panelId}
        hidden={!open}
        className="basis-full pb-6 transition-[opacity,translate] duration-200 ease-out starting:-translate-y-2 starting:opacity-0 motion-reduce:transition-none lg:hidden"
      >
        <nav aria-label="Main">
          <ul className="border-t border-line pt-2">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <SmartLink
                  href={item.href}
                  onClick={close}
                  className="block rounded-lg py-3 text-body text-ink hover:text-primary"
                >
                  {item.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <ButtonLink href={headerActions.login.href} variant="secondary" fullWidthOnMobile>
            {headerActions.login.label}
          </ButtonLink>
          <ButtonLink href={headerActions.start.href} fullWidthOnMobile>
            {headerActions.start.label}
          </ButtonLink>
        </div>
      </div>
    </>
  );
}

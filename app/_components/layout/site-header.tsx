import { headerActions, primaryNav } from "@/app/_data/content";

import { Logo } from "../ui/icons";
import { SmartLink } from "../ui/smart-link";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-cream">
      {/* flex-wrap lets the mobile menu panel break onto its own row below the bar. */}
      <div className="relative mx-auto flex max-w-[1280px] flex-wrap items-center justify-between px-5 md:px-10 lg:px-20">
        <SmartLink
          href="/"
          aria-label="Luma home"
          className="flex h-[68px] items-center rounded-sm text-ink lg:h-[69px]"
        >
          <Logo />
        </SmartLink>

        {/* Centered on the viewport, as in the desktop frame (x 472–808 of 1280). */}
        <nav aria-label="Main" className="hidden lg:absolute lg:left-1/2 lg:block lg:-translate-x-1/2">
          <ul className="flex gap-8">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <SmartLink
                  href={item.href}
                  className="rounded-sm text-small text-muted transition-[color,background-color,border-color] hover:text-ink"
                >
                  {item.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <SmartLink
            href={headerActions.login.href}
            className="rounded-lg px-4 py-2.5 text-small text-muted transition-[color,background-color,border-color,scale] hover:text-ink active:text-ink active:duration-100 active:ease-out motion-safe:active:scale-[.98]"
          >
            {headerActions.login.label}
          </SmartLink>
          <SmartLink
            href={headerActions.start.href}
            className="rounded-lg bg-primary px-5 py-2.5 text-small font-bold text-white transition-[color,background-color,border-color,scale] hover:bg-primary-strong active:bg-primary-strong active:duration-100 active:ease-out motion-safe:active:scale-[.98]"
          >
            {headerActions.start.label}
          </SmartLink>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}

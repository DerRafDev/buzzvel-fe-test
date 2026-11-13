import { footerColumns } from "@/app/_data/content";

import { Logo } from "../ui/icons";
import { SmartLink } from "../ui/smart-link";

export function SiteFooter() {
  return (
    <footer className="bg-ink pt-15 pb-5 md:pt-20 lg:pb-10">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-20">
        {/*
          Mobile: brand, then Explore + Company side by side, then Support (2-col grid flow).
          Desktop: 416px brand + three 208px columns with 32px gaps = 1136px, which,
          like the Featured and Testimonial rows, runs 16px past the 1120px container
          in the Figma frame; the overflow is kept on purpose. `fr` keeps the same
          proportions below 1280px.
        */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:-mr-4 lg:grid-cols-[416fr_208fr_208fr_208fr] lg:gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            {/* block + block SVG: no inline line box, so the logo row is 17px as in Figma. */}
            <SmartLink href="/" aria-label="Luma home" className="focus-ring-light block w-fit rounded-sm text-white [&>svg]:block">
              <Logo />
            </SmartLink>
            <p className="mt-3 text-small text-footer-muted lg:max-w-60">
              Practical learning for curious people.
            </p>
          </div>

          {footerColumns.map((column) => {
            const headingId = `footer-${column.title.toLowerCase()}`;
            return (
              <nav key={column.title} aria-labelledby={headingId}>
                <h2 id={headingId} className="text-overline font-semibold text-on-dark uppercase">
                  {column.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <SmartLink
                        href={link.href}
                        className="focus-ring-light block w-fit rounded-sm text-small text-footer-muted transition-[color,background-color,border-color] hover:text-white"
                      >
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>

        {/* Mobile: 36px below the last link, as rendered in the frame (its Support list
            has a fixed height shorter than its content). Desktop: 64px below the grid. */}
        <div className="mt-9 border-t border-muted pt-6 lg:mt-16">
          {/* Mobile frame: centered and white; desktop frame: left-aligned and #e7e7ec. */}
          <p className="text-center text-caption text-white lg:text-left lg:text-on-dark">
            © 2026 Luma Learning
          </p>
        </div>
      </div>
    </footer>
  );
}

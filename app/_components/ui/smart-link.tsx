import Link from "next/link";
import type { ComponentProps } from "react";

type SmartLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string };

/**
 * In-page anchors and `mailto:` links render a plain `<a>`; routes use `next/link`.
 * Route prefetching is disabled because every route other than `/` is an
 * out-of-scope demo page that resolves to the 404 fallback.
 */
export function SmartLink({ href, ...props }: SmartLinkProps) {
  if (href.startsWith("#") || href.startsWith("mailto:")) {
    return <a href={href} {...props} />;
  }
  return <Link href={href} prefetch={href === "/" ? undefined : false} {...props} />;
}

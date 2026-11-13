import type { NextConfig } from "next";

/**
 * GitHub Pages mode (`bun run build:pages`): a fully static export served from
 * https://derrafdev.github.io/buzzvel-fe-test/. The regular `bun run build`
 * is unaffected.
 */
const isPagesExport = process.env.GITHUB_PAGES === "true";

const pagesExport: NextConfig = {
  output: "export",
  // Cache Components turns on Partial Prerendering, which `next build` rejects
  // in export mode ("PPR cannot be enabled in export mode"). The app uses no
  // `use cache` or dynamic APIs, so every page is fully static either way.
  // `partialPrefetching` requires `cacheComponents`, so both go.
  cacheComponents: false,
  partialPrefetching: false,
  // Project site: everything lives under /<repository>/.
  basePath: "/buzzvel-fe-test",
  // Links render as `/buzzvel-fe-test/` instead of `/buzzvel-fe-test`, which
  // GitHub Pages would answer with a redirect to the trailing-slash URL.
  trailingSlash: true,
  // There is no server to run the image optimizer, so `next/image` serves the
  // imported files as they are (they are pre-sized in `app/_assets/images`).
  images: { unoptimized: true },
};

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  ...(isPagesExport ? pagesExport : {}),
};

export default nextConfig;

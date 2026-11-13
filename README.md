# Buzzvel Front-End Challenge

Landing page for the Buzzvel Front-End Engineer challenge ("Luma", from the Figma file *Buzzvel FE - Test 2026*), built with Next.js (App Router), TypeScript, Tailwind CSS and ESLint.

## Live Demo

Hosted on **GitHub Pages** as a static export: [View the live demo](https://derrafdev.github.io/buzzvel-fe-test/).

> **Deployment pending.** The Pages workflow runs on the first push to `main` that includes it, so until then this is the expected URL and it may still show the previous content. The differences between the static export and the regular build are listed in [GitHub Pages (static export)](#github-pages-static-export).

## Requirements

- [Bun](https://bun.sh) **1.3.14** — the same version is pinned in `package.json` (`packageManager`) and used by CI.

Install Bun with the official script, pinning the version:

```bash
curl -fsSL https://bun.sh/install | bash -s "bun-v1.3.14"
bun --version # 1.3.14
```

## Getting started

```bash
bun install --frozen-lockfile
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description                                         |
| ------------------- | --------------------------------------------------- |
| `bun run dev`       | Start the development server                        |
| `bun run lint`      | Run ESLint over the project                         |
| `bun run typecheck` | Generate Next.js route types and run `tsc --noEmit` |
| `bun run test`      | Run the unit tests once (Vitest + Testing Library)  |
| `bun run build`     | Create a production build                           |
| `bun run build:pages` | Create the GitHub Pages static export in `out/` (served under `/buzzvel-fe-test/`) |
| `bun run start`     | Serve the production build                          |

## Validation

Run the same checks as CI before opening a pull request:

```bash
bun install --frozen-lockfile
bun run lint
bun run typecheck
bun run test
bun run build
```

## Continuous integration

`.github/workflows/ci.yml` runs on pull requests and on pushes to `main`. It installs Bun 1.3.14, installs dependencies with `--frozen-lockfile`, and runs lint, typecheck, tests and the production build.

`.github/workflows/pages.yml` deploys the site on pushes to `main` and on manual runs (*Actions → Deploy to GitHub Pages → Run workflow*). With the same Bun setup, it runs lint, typecheck and tests, then `bun run build:pages`. It then publishes `out/` with the official Pages actions (`configure-pages`, `upload-pages-artifact`, `deploy-pages`) to the `github-pages` environment. The repository's Pages source must be set to **GitHub Actions**.

## GitHub Pages (static export)

`bun run build:pages` sets `GITHUB_PAGES=true`, which switches `next.config.ts` to a static export. `bun run build` is unchanged.

| Option | Regular build | Pages export | Why |
| --- | --- | --- | --- |
| `output` | default (server) | `"export"` → `out/index.html`, `out/404.html` | GitHub Pages only serves files |
| `basePath` | none | `/buzzvel-fe-test` | Project site URL. `next/link`, `next/image` static imports, fonts, CSS, JS and the favicon all get the prefix |
| `trailingSlash` | `false` | `true` | Links render as `/buzzvel-fe-test/`, avoiding the redirect GitHub Pages sends for `/buzzvel-fe-test` |
| `cacheComponents`, `partialPrefetching` | `true` | `false` | Next.js rejects the export with "PPR cannot be enabled in export mode". The app uses no `use cache` or request-time APIs, so the page is fully static in both modes |
| `images.unoptimized` | `false` | `true` | No server runs the image optimizer |

To preview the export locally under the same path:

```bash
bun run build:pages
mkdir -p /tmp/pages && rm -rf /tmp/pages/buzzvel-fe-test && cp -R out /tmp/pages/buzzvel-fe-test
python3 -m http.server 3000 -d /tmp/pages # then open http://localhost:3000/buzzvel-fe-test/
```

A generic static server does not reproduce GitHub Pages' 404 handling. It was verified with a small server that, like Pages, answers unknown paths with `404.html` and status 404.

**Behavior and loading differences**

- **Images.** `next/image` serves the imported JPEG files as they are, so there is no `srcset` and no WebP/AVIF conversion. The browser loads one file per image at every width. Lazy loading, the hero preload and the hero's blur placeholder still work. To keep that cheap, the collage photos were downscaled at the source (see [Images](#images)). The hero photo stays at 900×1100 (125 KB). That is below 2× its 500px desktop box, so a smaller file would look soft on high-density screens. All 20 images on the page total about 1 MB in the export.
- **Out-of-scope links** (`/login/`, `/courses/…`, `/terms/`…) have no generated page. GitHub Pages answers them with `out/404.html` and status 404, which renders the same "This page isn't part of this demo" page as the regular build. Its logo and "Back to home" link point to `/buzzvel-fe-test/`. Query strings such as `/courses/?category=business` get the same page.
- **Prefetching.** Without Partial Prefetching, the link to `/` uses the default prefetch. Out-of-scope links still have prefetching disabled.
- **No server features.** There are no response headers, redirects or server-rendered 404 status from Next.js, so status codes come from GitHub Pages. The contact form was already client-only (simulated submit), so it behaves the same.

**Verified locally** (Chromium 151, Playwright) with the export served under `/buzzvel-fe-test/`:

- CSS, both fonts, the favicon and all 20 images load. The page has no console errors and no failed requests.
- Header and footer anchors move focus to their sections, and opening `/#how-it-works` directly scrolls to it.
- The logo returns to the landing page. "Log in" opens the 404 page, and its logo and "Back to home" link return to the landing page. A direct visit to a missing URL gets status 404.
- At 402px with touch, the mobile menu opens, closes on Escape, and closes when a link is followed.
- The contact form shows its errors, moves focus to the first invalid field, shows "Sending…" and then the success message, and clears its fields.

Full-page screenshots of the export and of `bun run build` + `bun run start` have the same layout: page heights are 5695px at 1280px and 7801px at 402px. Pixel differences are limited to the photos, which the regular build serves resized as WebP/AVIF and the export serves as the source JPEGs.

## Project structure

```
app/
  layout.tsx                 # Fonts (next/font), metadata, viewport, skip link
  page.tsx                   # Route "/": header, the 8 main sections, footer
  not-found.tsx              # Shared 404 for every out-of-scope destination
  globals.css                # Tailwind entry point and design tokens (@theme)
  _assets/images/            # Images exported from Figma (static imports)
  _data/content.ts           # Typed local content: nav, categories, steps, stats, collage, footer
  _components/
    ui/                      # Container/Section, ButtonLink, SmartLink, SectionHeading, AvatarStack, icons
    layout/                  # SiteHeader, MobileMenu (client), SiteFooter
    sections/                # Hero, Categories, FeaturedCourse, HowItWorks, Testimonial,
                             # People, Contact + ContactForm (client) + its test, FinalCta
```

Only two components are Client Components: `MobileMenu` (open state, Escape, closing at the desktop breakpoint) and `ContactForm` (validation, focus management, simulated submit). Everything else is server-rendered and prerendered as static content.

## Breakpoints

| Range       | Source                                                                 |
| ----------- | ---------------------------------------------------------------------- |
| < 768px     | Mobile frame (402px)                                                   |
| 768–1023px  | Tablet adaptation (not in Figma): 40px gutters, 2–3 column grids, mobile header |
| ≥ 1024px    | Desktop frame (1280px). Column widths use `fr`/percentages so the layout holds from 1024px up |

## Design deviations

Every known difference between the delivered page and the Figma frames (*FE - Desktop*, 1280px, and *FE - Mobile*, 402px). The tablet range (768–1023px) and desktop widths between 1024px and 1279px have no frame; how they adapt is described in [Breakpoints](#breakpoints) and the last rows below.

### Accessibility (contrast)

Measured in Chrome on the production build (WCAG 2 contrast ratio, AA requires 4.5:1 for this text size).

| Section · viewport | Figma | Implemented | Before → after | Why |
| --- | --- | --- | --- | --- |
| Featured · mobile | Detail chips text `#e7e7ec` on `#3157f6` | White, as in the desktop frame | 4.46 → 5.49 | Below AA |
| Featured · all | "Browse all courses" text `#e7e7ec` on `#3157f6` | White | 4.46 → 5.49 | Below AA |
| Contact · all | Input placeholders `#6d7384` on `#f9f8f3` | `#656770` | 4.45 → 5.30 | Below AA |
| Contact · all | "Up to 24 hours on business days" `#6d7384` on `#f9f8f3` | `#656770` | 4.45 → 5.30 | Below AA (found by the full-page audit) |
| How it works · all | "STEP 0X" labels `#6d7384` on `#f9f8f3` | `#656770` | 4.45 → 5.30 | Below AA (found by the full-page audit) |

After these changes an automated audit of every visible text node (99 at mobile widths, 105 at desktop widths) finds none below AA at 360, 402, 768, 1024 and 1280px. `#6d7384` is still used on white, where it measures 4.73.

### Content

| Section · viewport | Figma | Implemented | Why |
| --- | --- | --- | --- |
| Contact · mobile | Form copy in Portuguese ("Nome completo", "Sua dúvida", "Enviar mensagem"…) | English copy from the desktop frame | The rest of the mobile frame, and the whole page, is in English |
| How it works · desktop | All three steps read "STEP 01" | STEP 01 / 02 / 03 | Matches the mobile frame; the repeated number is a copy error |
| How it works · mobile | Step 2: "…professionals who actually use these skills." | "…professionals who use these skills." (desktop copy) | One source of copy for both viewports |
| Categories · all | First card action reads "Explore" | "View featured course" | The card links to the Featured section on this page, so the label states the real destination (see [Link destinations](#link-destinations)) |
| People · all | Lorem ipsum paragraph | Kept as is | Fidelity; no real copy was provided |

### Images

| Section · viewport | Figma | Implemented | Why |
| --- | --- | --- | --- |
| Hero · mobile | Photo (900×1100) stretched to fill a 346×380 box (Figma "Stretch") | Same box, `object-cover` centered: about 21px is cropped from the top and from the bottom, nothing is distorted | Stretching distorts the photo by about 11% horizontally. Verified at 402px |
| Hero · desktop | Photo in a 500×520 box ("Fill") | Same | — |
| People · all | Photos use "Fill" (centered) | `object-cover` centered | Equivalent |
| People · all | Photo exports up to 1880×1255 (1.4 MB for the ten photos) | Same photos downscaled to 480px tall, JPEG quality 70 (550 KB in total). Crop and composition are unchanged | The largest box is 138×207 CSS px (desktop) and 94×129 (mobile), so 480px still covers 2.3× and 3.7× density. This matters for the GitHub Pages export, which has no image optimizer. No visible difference at the rendered sizes |
| Final CTA · desktop | iconoir "cash" glyph drawn with masked strokes | The two side shapes are plain filled paths | Same silhouette without SVG masks |

### Layout and spacing

| Section · viewport | Figma | Implemented | Why |
| --- | --- | --- | --- |
| Header · mobile | 36×36 menu button | 44×44 hit area; the 24px icon stays where the frame places it | Minimum touch target; visually identical |
| People · mobile and tablet | Collage composition of the mobile frame (362×310) | Mobile composition below 768px (matches the frame at 402px, scaled to 320px at 360px); desktop composition (530×523) from 768px | No tablet frame; the desktop composition fits there |
| Contact · all | No resize affordance on the textarea | Browser resize handle (vertical only) | Lets people enlarge the field for longer questions |
| Section heights · mobile 402px | Hero 1044 · Categories 1297 · Featured 888 · How 1000 · Testimonial 524 · Contact 1096 · CTA 469 (page 7799) | 1046 · 1300 · 894 · 992 · 520 · 1098 · 470 (page 7801). Header, People and Footer match | Sub-pixel text metrics and Figma frames whose fixed heights differ from their content; every difference is ≤ 8px |
| Section heights · desktop 1280px | Testimonial 524 · Contact 796 · CTA 469 · Footer 395 (page 5691) | 525 · 798 · 472 · 393 (page 5695). Header, Hero, Categories, Featured, How and People match | Same as above; every difference is ≤ 3px |
| Footer · mobile | Divider 36px below the last Support link (the list frame is shorter than its content) | 36px, as rendered | Matches what the frame shows rather than its frame sizes |
| Testimonial · desktop | Stat labels in a 21px box (the 24px text overflows it) | Same 21px box | Keeps each stat 95px tall, as in the frame |
| How it works · md+ | Connector line from x 52 to x 813 | From the centre of the first icon to the centre of the third | Responsive formula; the difference is hidden behind the icon tiles |

### Widths without a frame

| Section · viewport | Implemented |
| --- | --- |
| All · 768–1023px | Mobile header with the menu; 40px gutters; Categories in 2 columns; How it works in 3 columns; Hero, Featured, Testimonial, People and Contact stacked; H1 52px, H2 40px |
| All · 1024–1279px | Desktop layout with columns in `fr`/percentages; Hero H1 56px (64px from 1280px); Contact columns shrink in proportion (480:540) |
| Final CTA · < 1024px | Decorative shapes hidden (the mobile frame removes them; at tablet widths they would collide with the text). From 1024px they are positioned on a centered 1280px layer, so 1024–1279px crops the outermost shapes |

## Interaction decisions

The Figma file has no prototype interactions and no hover, focus, open, error, loading or success states. Everything below was defined for this implementation.

**States**

- **Hover:** primary buttons darken (`#2445d4`), the yellow button darkens (`#ffe54d`), secondary buttons get an ink border, the ghost "Browse all courses" link is underlined, text links turn ink (or white on dark), category cards get a blue border.
- **Focus:** every control shows a 2px outline with a 2px offset, blue on light backgrounds and white on the blue and dark sections. The outline is never animated.
- **Skip link:** "Skip to content" appears on the first Tab and moves focus to `<main>`.
- **Anchor targets:** sections that in-page links point to have `tabIndex={-1}`, so following a link moves keyboard and screen-reader focus to the section (no outline is drawn on the section itself).
- **Header:** not sticky.

**Mobile menu (below 1024px)**

- A disclosure button (`aria-expanded`, `aria-controls`, label "Open menu" / "Close menu") reveals a panel with the four links, "Log in" and "Start learning".
- The panel is not modal: it pushes the page down and has no focus trap. Tab goes from the button into the panel.
- It closes on Escape (focus returns to the button), when a link is activated, and when the viewport reaches 1024px.

**Contact form**

- Client-side validation on submit: required name, email and question, and a valid email format.
- Errors appear under each field (`aria-describedby`, `aria-invalid`, red border, `#c62828` text at 5.62:1), and focus moves to the first invalid field.
- While "sending", the button reads "Sending…" and uses `aria-disabled` (not `disabled`), so focus stays on it.
- There is no backend. Submission is simulated (~600ms), then a `role="status"` message says so explicitly: *"Thanks, {name}! This is a demo, so your message wasn't actually sent."* The form is then cleared.

**Animations** (added after the visual and accessibility review)

1. **Mobile menu.** Trigger: opening the menu. Effect: the panel fades in and slides down 8px over 200ms (`@starting-style`); closing is instant. Fallback: with reduced motion, or without `@starting-style` support, the panel appears instantly.
2. **Category cards and arrow links.** Trigger: hover or keyboard focus. Effect: the card lifts 2px and the arrow slides 4px over 150ms, and the border fades to blue over the same 150ms. Fallback: with reduced motion only the border color changes.
3. **Press state.** Trigger: pressing a button, a header action or a category card (touch, mouse, or Space on the submit button). Effect: while pressed, the control scales to 98% (cards 99%) and takes its hover color (100ms). Touch devices never get hover styles, so this is their visual response to a tap. The submit button does not react while it reads "Sending…". The browser's native tap highlight is kept. Fallback: with reduced motion only the color changes.
4. **How it works connector.** Trigger: scrolling the section into view. Effect: the connector line draws from step 1 towards step 3 — the horizontal line from 768px, each vertical segment below that — tied to scroll position with `animation-timeline: view()`. The horizontal line is complete before it reaches the middle of the viewport, each vertical segment as soon as it is fully in view, so opening `/#how-it-works` directly shows the lines in view complete. Fallback: browsers without scroll-driven animations (e.g. Firefox today) and reduced motion show the static, complete line, as in the frames.

Tested in Chromium 151 (Playwright, 402px with touch emulation and 1280px, with and without reduced motion) and in Safari on the iOS 27 simulator (connector only; the press state was not tested on iOS). Desktop Safari, Firefox and real devices were not tested. The rest state of the page is pixel-identical to the version without animations 3 and 4 in Chromium at 402px and 1280px, apart from sub-pixel anti-aliasing differences caused by the animated connector being composited on its own layer.

## Link destinations

No link uses `href="#"`. Destinations either point to a section on this page or to a route outside the scope of the challenge.

| Origin | Label | Destination |
| --- | --- | --- |
| Header / footer | Logo | `/` |
| Header | Courses · Start learning | `#categories` |
| Header | For Teams | `#contact` |
| Header | Community | `#people` |
| Header | About | `#how-it-works` |
| Header | Log in | `/login` (out of scope) |
| Hero | Explore courses · See how it works | `#categories` · `#how-it-works` |
| Categories | Product Design card ("View featured course") | `#featured` |
| Categories | Technology · Business · Creative cards | `/courses?category=…` (out of scope) |
| Featured | View course | `/courses/designing-products-people-understand` (out of scope) |
| Featured | Browse all courses | `#categories` |
| People | Explore teachers and students | `/community` (out of scope) |
| Contact | contact@luma.com | `mailto:contact@luma.com` |
| Final CTA | Explore all courses · Join Luma | `#categories` · `/signup` (out of scope) |
| Footer · Explore | Courses · Categories · Instructors · For Teams | `#categories` · `#categories` · `#people` · `#contact` |
| Footer · Company | About · Careers · Journal | `#how-it-works` · `/careers` · `/journal` (out of scope) |
| Footer · Support | Help Center · Contact · Terms · Privacy | `/help` · `#contact` · `/terms` · `/privacy` (out of scope) |

**Out-of-scope pages.** These are real routes on purpose, so links keep normal link semantics (focusable, hover, open in new tab). They all render `app/not-found.tsx`, which returns 404 and says "This page isn't part of this demo", with a link back home. Route prefetching is disabled for them.

**On-page detail.** The Figma file has no lesson lists, syllabus or category pages, so no extra content was invented. The only real link in the content is that the featured course is a Product Design course; that card therefore points to the Featured section instead of the fallback. "View course" uses the fallback because the section already shows everything the design provides for the course.

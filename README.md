# Buzzvel Front-End Challenge

Landing page for the Buzzvel Front-End Engineer challenge ("Luma", from the Figma file *Buzzvel FE - Test 2026*), built with Next.js (App Router), TypeScript, Tailwind CSS and ESLint.

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

1. **Mobile menu:** the panel fades in and slides down 8px over 200ms when it opens (`@starting-style`); closing is instant.
2. **Category cards and arrow links:** on hover or focus the card lifts 2px and the arrow slides 4px over 150ms; the border color change is immediate.

With `prefers-reduced-motion: reduce`, neither animation moves anything: the panel appears instantly and only the border color changes on the cards. Verified by emulating the media feature in Chrome.

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

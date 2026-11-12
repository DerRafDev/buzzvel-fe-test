# Buzzvel Front-End Challenge

Landing page for the Buzzvel Front-End Engineer challenge, built with Next.js (App Router), TypeScript, Tailwind CSS and ESLint.

> Status: project setup (Step 0). The page at `/` is a temporary placeholder until the Figma design is implemented.

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
| `bun run build`     | Create a production build                           |
| `bun run start`     | Serve the production build                          |

## Validation

Run the same checks as CI before opening a pull request:

```bash
bun install --frozen-lockfile
bun run lint
bun run typecheck
bun run build
```

## Continuous integration

`.github/workflows/ci.yml` runs on pull requests and on pushes to `main`. It installs Bun 1.3.14, installs dependencies with `--frozen-lockfile`, and runs lint, typecheck and the production build.

## Project structure

```
app/
  layout.tsx   # Root layout and metadata
  page.tsx     # Route "/"
  globals.css  # Tailwind entry point and global styles
```

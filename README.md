# Jim Santora — Resume

## Live Site (GitHub Pages)
**[→ jimsantora.github.io/resume](https://jimsantora.github.io/resume/)**

A personal resume site in two forms, built from one content file (`lib/resume.ts`):

- **The site**: a static Next.js page, readable without JavaScript.
- **The terminal version** (`/resume/tui/`): the same resume as a k9s-style terminal app, written in Rust with
  [Ratatui](https://ratatui.rs) and running in the browser via [Ratzilla](https://github.com/orhun/ratzilla) (WebAssembly).

Project docs live in [`docs/`](docs/): product brief, complexity guidelines and the redesign history.

## Tech Stack

- **Site**: [Next.js](https://nextjs.org) static export, TypeScript, [Tailwind CSS](https://tailwindcss.com),
  JetBrains Mono + IBM Plex Sans, icons from [Lucide](https://lucide.dev) and [Simple Icons](https://simpleicons.org)
- **Terminal version** (`tui/`): Rust, Ratatui, Ratzilla (WebGL2), [tui-big-text](https://crates.io/crates/tui-big-text),
  built with [trunk](https://trunkrs.dev)
- **Deployment**: GitHub Pages via GitHub Actions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/resume](http://localhost:3000/resume). The `/resume` base path is required.

For the terminal version you need Rust (via [rustup](https://rustup.rs)), the wasm target and trunk:

```bash
rustup target add wasm32-unknown-unknown
npm run tui:build        # builds the TUI into public/tui so the dev server can serve it
cd tui && trunk serve    # or work on the TUI on its own at http://127.0.0.1:8080
```

## Editing content

All resume content lives in `lib/resume.ts`. After changing it (or the box art in `public/images`), regenerate the
TUI's copies:

```bash
npm run tui:content      # needs Pillow for the cover art (pip install pillow)
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build static export to /out
npm run tui:build    # Build the terminal version into public/tui
npm run tui:content  # Regenerate tui/src/content.rs and the pixel-art covers
npm run type-check   # TypeScript check
npm run lint         # ESLint
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the terminal version and the site and deploys
`out/` to GitHub Pages.

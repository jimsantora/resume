# Jim Santora — Interactive Resume

## Live Site (GitHub Pages)
**[→ jimsantora.github.io/resume](https://jimsantora.github.io/resume/)**

A terminal-themed personal resume built with Next.js and deployed to GitHub Pages. Features a GitHub-dark aesthetic, JetBrains Mono font, and a single-window terminal UI with animated prompts.

## Tech Stack

- **Framework** — [Next.js](https://nextjs.org) (static export via `output: 'export'`)
- **Language** — TypeScript
- **Styling** — [Tailwind CSS](https://tailwindcss.com)
- **Icons** — [Lucide React](https://lucide.dev) + [Simple Icons](https://simpleicons.org)
- **Font** — [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via `next/font/google`
- **Deployment** — GitHub Pages via GitHub Actions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/resume](http://localhost:3000/resume) — note the `/resume` base path is required.

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build static export to /out
npm run type-check   # TypeScript check
npm run lint         # ESLint
```

## Deployment

Pushes to `main` automatically trigger the GitHub Actions workflow at `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages.

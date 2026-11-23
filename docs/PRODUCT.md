# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Hiring managers and recruiters** evaluating Jim for staff-level platform / site reliability / DevOps roles. They need to grasp seniority, range, and shipped work within about 30 seconds, and find where to go next (GitHub, LinkedIn).
- **Engineering peers** sizing Jim up. They reward depth, specificity, and craft, and will dig past the first screen.

## Product Purpose

A personal, public resume site for Jim Santora, a Staff Engineer (Platform & Site Reliability; currently Staff DevOps Engineer at 2K Games since 2026) with 25 years across gaming, media, and ad-tech. Success means a visitor leaves knowing who Jim is, what he has run at scale, which titles he shipped, and how to reach his profiles, and remembers the site as distinctive without its being gimmicky.

## Positioning

A clean, readable engineer's resume first, with a k9s-style terminal version as an opt-in for those who seek it out (`/resume/tui/`, built in Rust with Ratatui/Ratzilla; SSH later). The main site keeps a light terminal accent (mono headings, orange and aqua) without terminal costume. Backed by facts no other resume carries: credits on 15 shipped game titles (Fortnite, FIFA 17–22, Battlefield 2042, Madden, Need for Speed, Star Wars: Squadrons, Plants vs. Zombies) and infrastructure at 2K Games, Epic Games, Twitter, EA, CBS Interactive, and Right Media/Yahoo.

## Operating Context

- Visitors arrive from job applications, LinkedIn, GitHub, and direct links, on desktop and mobile.
- Hosted on GitHub Pages at `jimsantora.github.io/resume` (base path `/resume`). Deployed by GitHub Actions on push to `main`.

## Capabilities and Constraints

- Next.js static export (`output: 'export'`), TypeScript, Tailwind CSS. No server, no API routes, no runtime secrets: everything must work as static files on GitHub Pages.
- Full resume content must be pre-rendered HTML, readable without JavaScript and by crawlers.
- Confirmed interactivity: an **optional** client-side command prompt layered on top of the static page (e.g. `help`, `whoami`, `ls`, `cat`, `open github`) for navigating and revealing content. It is self-contained, needs no storage, and never gates content.
- `docs/GUIDELINES.md` governs complexity: favor static content and CSS, keep interactive pieces simple and self-contained, avoid cross-component state, browser storage, and timing-dependent behavior.

## Brand Commitments

- The main site is a normal, readable resume; the terminal experience lives in the opt-in TUI. No fake shell commands or terminal chrome on the main site.
- Public-safe personal detail only: **never publish a phone number or email address.** Contact routes are links only:
  - GitHub: https://github.com/jimsantora
  - LinkedIn: https://www.linkedin.com/in/jimsantora
- Voice: first person, plainspoken, dry humor ("millions of players don't care about your deployment window").

## Evidence on Hand

- All resume content lives in `lib/resume.ts`: profile, links, about text, skills, full work history 2001–present, 15 game credits. Box art: `public/images/*.jpg`.
- Dates are years only, everywhere (no months).
- No PDF resume, no testimonials, no metrics beyond those in the job bullets. Do not invent any.

## Product Principles

1. Content first: the resume must read completely as plain, fast, static HTML; theme and interaction are layered on top.
2. Specifics over claims: scale numbers, shipped titles, and named systems carry the persuasion.
3. Distinctive, never obnoxious: personality lives in precise details, not noise.
4. Simple to maintain: one person maintains this; prefer CSS and small, isolated components.

## Accessibility & Inclusion

Keyboard navigable, readable contrast on a dark terminal ground, respects `prefers-reduced-motion` (typing and blinking effects must stop), semantic headings for screen readers.

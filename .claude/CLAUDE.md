# Resume site: project notes

Personal resume for Jim Santora at `jimsantora.github.io/resume` (base path `/resume`). Two forms built from one content file:

- **The site**: Next.js static export (TypeScript, Tailwind), server components, readable without JavaScript.
- **The terminal version** (`tui/`, served at `/resume/tui/`): the same resume as a k9s-style terminal app in Rust (Ratatui), running in the browser via Ratzilla (WebAssembly). It's opt-in, linked from the header button and the "Terminal version" section only.

Docs live in `docs/`: `PRODUCT.md` (audience, positioning, principles), `GUIDELINES.md` (complexity rules) and `REDESIGN_PLAN.md` (history of how the design got here). `README.md` at the root has setup.

## Editing content

- **All resume content lives in `lib/resume.ts`**: profile and pitch, links, `about` paragraphs, specialties, skills, jobs, credits.
  - `about[0]` appears in the hero (under the pitch); `about[1..]` appear in the About section.
  - The newest job (2K Games) intentionally has no bullets; the site shows "Current role" for it.
  - Credit titles are stored ALL CAPS; `displayTitle()` formats them.
- **A little copy lives outside `lib/resume.ts`**:
  - `components/Hero.tsx`: the hero facts' "across gaming, media and ad-tech".
  - `components/TerminalVersion.tsx`: the section blurb and its "Rust, Ratatui, WebAssembly" note.
  - Section notes such as "9 roles since 2001" are computed from the data.
- **The TUI has its own generated copy of the content.** After any change to `lib/resume.ts` or the box art in `public/images/`, run:

  ```bash
  npm run tui:content
  ```

  and **commit the regenerated files** (`tui/src/content.rs`, `tui/src/covers.rs`, `tui/assets/covers/`, `public/images/px/`). CI builds the TUI but does **not** regenerate its content, so skipping this ships a stale terminal version.
  - It needs the `typescript` package (a devDependency) and Pillow (`pip install pillow`).
  - In a git worktree whose `node_modules` is a symlink, Node may not resolve `typescript`: prefix with `NODE_PATH=<main checkout>/node_modules`.
- **If credits or roles change visibly**, `public/images/tui-preview.png` (a real screenshot of the TUI's credits view, shown in the Terminal version section) goes stale. Re-capture it at 1200×760 CSS px, 2× scale, with the credits view open, downscaled to 1280 px wide.

## Content rules (from docs/PRODUCT.md)

- **Never publish an email address or phone number.** Contact is links only: GitHub and LinkedIn.
- Voice: first person, plainspoken, dry humor.
- Don't invent metrics or claims; specifics come from the job bullets. Ask before changing factual claims.

## Previewing

- **Site**: `npm run dev`, then http://localhost:3000/resume (the `/resume` base path is required).
- **TUI**: needs Rust with the `wasm32-unknown-unknown` target and trunk (in `~/.cargo/bin`, which may not be on PATH in an already-open shell):

  ```bash
  PATH="$HOME/.cargo/bin:$PATH" npm run tui:build   # builds into public/tui (gitignored) for the dev server
  ```

  Then use the site's "Terminal version" link (`/resume/tui/index.html`). Or work on the TUI alone with `cd tui && trunk serve` (http://127.0.0.1:8080).
- **Checks**: `npm run type-check`, `npm run lint`, `npm run build`; `cargo test` in `tui/`.

## Design guardrails

- The main site is a normal, readable resume. **No terminal costume** on it: no fake shell commands as headings, fake output, window chrome or scanlines. The terminal experience lives in the TUI.
- Keep the look: dark ink ground, JetBrains Mono for headings/labels/data, IBM Plex Sans for prose, orange name, aqua accents (tokens in `tailwind.config.ts`). The hero art is the pixel-art cover mosaic (`components/HeroArt.tsx`).
- The main info (name through the GitHub/LinkedIn buttons) should fit on the first screen at 1280×720 and on a 390×844 phone.
- `docs/GUIDELINES.md` applies: favor static content and CSS; keep interactive pieces small and isolated. The only client component on the site is the nav's current-section highlight (`components/NavLinks.tsx`).

## Deploy

Pushes to `main` run `.github/workflows/deploy.yml`: it installs Rust (wasm32) and a checksum-verified trunk (`TRUNK_VERSION`), runs `npm run tui:build` and then `npm run build`, and publishes `out/` (including `out/tui`) to GitHub Pages.

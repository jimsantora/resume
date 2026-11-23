# Resume restart: TUI theme

Status (2026-11-23): **direction changed, awaiting go-ahead.** Prototypes A–D taught us that "recognisable TUI", "stylish" and "readable resume" pull against each other on one web page, and a look alone doesn't engage anyone. Goal (Jim): visitors in general should get interested in him and his career, and be delighted by the design.

## New direction: one real TUI, shipped two ways, plus a stylish website

1. **The TUI app** (Go + bubbletea/lipgloss). A real program and the single home of the terminal aesthetic, free to look exactly like k9s/lazygit. It reads content generated from `lib/resume.ts` (JSON export), so there's one source of truth.
2. **Over SSH** (charm `wish`): `ssh <domain>`. Needs a domain and a host with a public IP (homelab with a port-forward, or a small VM / Fly.io). Until there's a domain, test it locally (`ssh localhost -p 23234`).
3. **In the browser**: the same app compiled to WASM and rendered in xterm.js, as the website's hero, so every visitor can drive the real thing without a terminal. Risk: bubbletea-in-WASM needs custom stdin/stdout wiring. Spike it first, and fall back to an asciinema recording of the real app.
4. **The website** (Next.js static, GitHub Pages): stylish, readable, crawlable resume. The live terminal is the hero, "or run `ssh …` in your own terminal" is the hook, and the full resume follows as plain HTML for scanners and no-JS. The prototypes (C's readability, D's k9s marks) feed the page styling.

Order: (1) build the TUI locally, then (3) the WASM spike, then (4) the website, then (2) SSH once there's a domain. Prereq: Go from the official go.dev .pkg (Intel Mac, no Homebrew).

Domain: not bought yet. Only step 2 needs it. Suggest something like a .dev/.com name via an at-cost registrar; GitHub Pages can use it too.

## Framework decision and spike results (2026-11-23)

Chose **Ratatui + Ratzilla (Rust)** over bubbletea: Ratzilla is built for the browser, while bubbletea-in-WASM is unofficial. SSH comes later via `russh`. Toolchain: rustup (stable 1.100.0) plus the `wasm32-unknown-unknown` target, and trunk 0.22.1 (prebuilt release, checksum verified, in `~/.cargo/bin`). Build with `trunk build --release --public-url /resume/tui/` from `tui/`.

Spike (`tui/`) results, served locally under `/resume/tui/` like GitHub Pages:
- Static output (index.html + .js + .wasm) works under the `/resume/tui/` base path, and `.wasm` is served as `application/wasm`. Pages needs nothing special.
- **Keys:** Ratzilla listens on the focusable terminal element, not the document, so the site must auto-focus it or invite a click.
- **DomBackend:** ~89 KB gzipped. Selectable text, but the borders render badly (dashed verticals, right edge short of the frame, corners missing) because of font-metric measurement. It might be fixable with a web font loaded before init and line-height tuning.
- **WebGl2Backend** (current): pixel-clean borders and text, and supports clickable hyperlinks and mouse selection. Cost: **~1.09 MB gzipped** (likely the embedded font atlas). Investigate `FontAtlasConfig::dynamic(...)` for a smaller binary and a custom font. Hyperlink clicks are not tested yet.
- Not yet deployed to real GitHub Pages. Pages deploys from `main` via `.github/workflows/deploy.yml`, so ask before changing that.

## Step 1: the TUI app (built 2026-11-23, k9s-style)

Lives in `tui/`. Run it locally: `cd tui && trunk serve --open`. Build for Pages: `trunk build --release --public-url /resume/tui/`.

- `src/content.rs` is **generated** from `lib/resume.ts` by `node scripts/gen-tui-content.cjs` (needs `typescript` resolvable; locally `NODE_PATH=<main checkout>/node_modules`). It's committed so a Rust build doesn't need Node. Regenerate it after editing resume content.
- `src/app.rs`: state, keys and clicks. No browser code, so it's reusable for SSH later. `src/ui.rs`: k9s rendering. `src/main.rs`: Ratzilla/WebGL wiring, font preload, link opening.
- k9s look: the default k9s skin colours; an info header (orange labels) with `<n>` hotkeys (fuchsia) and an ASCII `jim` logo; a dodger-blue frame with a centred `view(scope)[count]` title; aqua rows with an inverse-aqua selection; a YAML-ish `describe(view/id)` view; orange/aqua crumbs.
- Views: `<1>` experience (COMPANY/TITLE/FROM↓/TO/AGE/NOTES), `<2>` credits, `<3>` skills (describe shows "# used at …" derived from the job bullets), `<4>` about.
- Mouse-first: click a row to describe it, click hotkeys and crumbs, click ▲/▼ on the frame to scroll (Ratzilla has no wheel event), and GitHub/LinkedIn are clickable links. Keys: 1–4, j/k/arrows, enter/d, esc/q, g/G, space/PgUp/PgDn.
- Responsive: under 100 cols the logo drops; under 72 cols the header compacts to one hotkey row (`exp`), the columns trim and ids get shortened with "…"; under 24 rows the header hides.
- Font: JetBrains Mono at 15px via the dynamic atlas (Google Fonts link in `tui/index.html`, awaited before init). The static default atlas lacked en/em dashes and arrows.
- Links: Ratzilla's built-in hyperlink detection didn't fire with the dynamic atlas, so links are our own click regions (`Action::Link`) opened via `window.open`.
- Verified in headless Chrome under `/resume/tui/`: all views, describe and scroll, row/link clicks (with the open captured), and the phone width (390px ≈ 43 cols).
- Size: ~1.15 MB gzipped wasm. The default static atlas is still linked even though it's unused; look into trimming it.

Next: step 3, the website around it (hero = this terminal in an iframe or a mounted canvas, plain-HTML resume below), then the deploy workflow (Rust + trunk step before `next build`), then SSH.

## Earlier status

Jim liked C's readability (not its pastels or weak reference) and B's k9s recognisability (not its style). D (hybrid) was nice, but still not recognisable or engaging.

## Context

The Nov 2026 terminal/TUI redesign (branch `worktree-terminal-redesign`, unpushed) was abandoned. Lessons that shape this restart:

- Prototype clickable HTML at real size with real content **before** committing to a direction.
- No fake shell output (no invented commands, commit hashes, `finger`, etc.). Anything that looks interactive must do something.
- Mouse-first. Keyboard is a bonus, with a small interaction budget: select, switch view, go back. No command line, pager or fuzzy finder.
- Pick a deliberate visual world, not GitHub-dark plus amber/green. Fonts should read as clearly monospace without being wide (Martian Mono was disliked).
- Follow Guidelines.md: static first, CSS over JS, small isolated pieces.

Reference TUIs Jim named: **lazygit, k9s, bubbletea**.

## What's on this branch (`worktree-tui-restart`, off `main`)

- `lib/resume.ts`: the content model carried over from the old branch (2K Games Staff DevOps role since Jun 2026; Epic ends Jun 2026; title "Staff Engineer").
- `PRODUCT.md`: audience, constraints, brand commitments. Never publish email or phone; links only.
- `public/images/`: box art. Some `.jpg` files are actually WebP (fifa-18, fortnite) or PNG (pvz-gw2, star-wars-squadrons). Re-encode or rename them in the real build.
- `prototypes/`: standalone, framework-free HTML. Open `prototypes/index.html` in a browser.
  - `a-panels.html`: after lazygit. Numbered stacked panels plus a detail pane. JetBrains Mono, blue-ink ground, green active border.
  - `b-table.html`: after k9s. Info/hotkey/logo header, framed resource table, describe view, crumbs. IBM Plex Mono, navy-black, aqua/orange/fuchsia.
  - `c-charm.html`: after bubbletea/lipgloss. Name badge, tabs joined to a rounded window, list plus detail box. Geist Mono, purple/pink, light and dark.
  - `data.js`: generated from `lib/resume.ts` by a small transpile script. Regenerate it if the content changes. The script is a one-off: TS transpile via `typescript.transpileModule`, then dump the exports as `window.RESUME`.
- Published preview of all three: https://claude.ai/artifact/1uCBnYspFKMvhgctDbDn4J (private)

## Next steps once a direction is chosen

1. Iterate on the chosen prototype in plain HTML with Jim (quick, small rounds) until the look is settled.
2. Port it to Next.js static export:
   - The page is server-rendered from `lib/resume.ts`, and all content is in the HTML without JS. On a phone or without JS it reads as a normal stacked page.
   - One small client component handles selection and keys. No storage, and no cross-component state beyond "active view + selected index".
   - Fonts via `next/font/google`. Base path `/resume` (GitHub Pages).
3. Replace the old `components/*` and `app/sections`. Update README.
4. Verify with `npm run build`, `npm run type-check` and `npm run lint`, then a screenshot pass at 1440 and 390 widths with reduced motion on.
5. Open a PR to `main`. The deploy happens via GitHub Actions on merge.

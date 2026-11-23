import { ArrowUpRight, Linkedin, SquareTerminal } from 'lucide-react';
import { siGithub } from 'simple-icons';
import { credits, jobs, links, profile } from '@/lib/resume';

export const TUI_HREF = '/resume/tui/';

const NAV = [
  { href: '#experience', label: 'Experience' },
  { href: '#credits', label: 'Game credits' },
  { href: '#skills', label: 'Skills' },
  { href: '#about', label: 'About' },
];

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={siGithub.path} />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <a href="#top" className="font-mono text-sm font-bold tracking-tight text-fg">
          jim<span className="text-orange">santora</span>
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-6 font-mono text-sm text-dim md:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-fg">
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={TUI_HREF}
          className="inline-flex items-center gap-2 rounded border border-line px-3 py-1.5 font-mono text-xs text-aqua transition-colors hover:border-aqua"
        >
          <SquareTerminal className="h-4 w-4" aria-hidden="true" />
          Terminal version
        </a>
      </div>
    </header>
  );
}

export function Hero() {
  const current = jobs[0];
  const previous = profile.employers.filter(e => e !== current.company);
  const since = jobs[jobs.length - 1].period.match(/\d{4}/)?.[0];

  return (
    <section id="top" className="mx-auto grid max-w-5xl gap-12 px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20 lg:grid-cols-[1fr_24rem] lg:items-end">
      <div>
        <p className="font-mono text-sm text-aqua">
          {profile.title} · {profile.discipline}
        </p>
        <h1 className="mt-4 font-mono text-5xl font-extrabold leading-none tracking-tight md:text-7xl">
          {profile.first} <span className="text-orange">{profile.last}</span>
        </h1>
        <p className="mt-6 max-w-xl text-xl leading-relaxed text-fg md:text-2xl">{profile.pitch}</p>

        <dl className="mt-10 grid max-w-xl grid-cols-1 gap-6 border-t border-line pt-6 font-mono text-sm sm:grid-cols-3">
          <div>
            <dt className="text-dim">Now</dt>
            <dd className="mt-1 text-fg">
              {current.title}, {current.company}
            </dd>
          </div>
          <div>
            <dt className="text-dim">Since</dt>
            <dd className="mt-1 text-fg">{since}, across gaming, media and ad-tech</dd>
          </div>
          <div>
            <dt className="text-dim">Shipped</dt>
            <dd className="mt-1 text-fg">{credits.length} game credits</dd>
          </div>
        </dl>
        <p className="mt-6 font-mono text-sm text-dim">Previously at {previous.join(', ')}</p>

        <div className="mt-10 flex flex-wrap gap-3 font-mono text-sm">
          <a
            href={links.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-fg px-4 py-2.5 font-medium text-ink transition-opacity hover:opacity-90"
          >
            <GitHubIcon className="h-4 w-4" /> GitHub
          </a>
          <a
            href={links.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-line px-4 py-2.5 text-fg transition-colors hover:border-fg"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
          </a>
        </div>
      </div>

      <TuiTeaser />
    </section>
  );
}

/** A real screenshot of the TUI, linking to it. */
function TuiTeaser() {
  return (
    <a
      href={TUI_HREF}
      className="group block overflow-hidden rounded-lg border border-line bg-panel transition-colors hover:border-aqua"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/resume/images/tui-preview.png"
        alt="The terminal version of this resume: a k9s-style table of game credits with a pixel-art cover of Battlefield 2042"
        width={1280}
        height={811}
        className="block w-full"
      />
      <span className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 font-mono text-xs">
        <span className="text-dim">
          Same resume, <span className="text-fg">as a k9s-style terminal app</span>
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-aqua transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </a>
  );
}

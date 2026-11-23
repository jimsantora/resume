import { Linkedin, SquareTerminal } from 'lucide-react';
import { siGithub } from 'simple-icons';
import { about, credits, jobs, links, profile } from '@/lib/resume';
import HeroArt from './HeroArt';
import NavLinks from './NavLinks';

// index.html explicitly: next dev doesn't serve directory indexes from public/.
export const TUI_HREF = '/resume/tui/index.html';

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={siGithub.path} />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ink">
      <a
        href="#experience"
        className="sr-only rounded bg-aqua px-3 py-2 font-mono text-sm text-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-30"
      >
        Skip to experience
      </a>
      <div className="mx-auto flex h-11 max-w-5xl items-center justify-between gap-6 px-5 md:px-8">
        <a href="#top" className="font-mono text-sm font-bold tracking-tight text-fg">
          jim<span className="text-orange">santora</span>
        </a>
        <NavLinks />
        <a
          href={TUI_HREF}
          className="inline-flex items-center gap-1.5 rounded border border-line px-2.5 py-1 font-mono text-xs text-aqua transition-colors hover:border-aqua"
        >
          <SquareTerminal className="h-3.5 w-3.5" aria-hidden="true" />
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
    <section
      id="top"
      className="mx-auto grid max-w-5xl gap-12 px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-center"
    >
      <div>
        <h1 className="font-mono text-5xl font-extrabold leading-none tracking-tight text-balance md:text-6xl">
          {profile.first} <span className="text-orange">{profile.last}</span>
        </h1>
        <p className="mt-3 font-mono text-base text-aqua md:text-lg">
          {profile.title} · {profile.discipline}
        </p>
        <p className="mt-5 max-w-xl text-xl leading-snug text-fg text-pretty md:text-2xl">{profile.pitch}</p>
        {/* First paragraph of About, verbatim; the rest stays in the About section. */}
        <p className="mt-4 max-w-[60ch] leading-relaxed text-fg/75 text-pretty">{about[0]}</p>

        {/* Label/value pairs, read like the TUI's info block. */}
        <dl className="mt-6 grid max-w-xl grid-cols-[6rem_1fr] gap-x-4 gap-y-1.5 border-t border-line pt-4 font-mono text-sm">
          <dt className="text-dim">Now</dt>
          <dd className="text-fg">
            {current.title}, {current.company}
          </dd>
          <dt className="text-dim">Since</dt>
          <dd className="text-fg">{since}, across gaming, media and ad-tech</dd>
          <dt className="text-dim">Shipped</dt>
          <dd className="text-fg">{credits.length} game credits</dd>
          <dt className="text-dim">Previously</dt>
          <dd className="text-fg">{previous.join(', ')}</dd>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3 font-mono text-sm">
          <a
            href={links.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-fg px-4 py-2 font-medium text-ink transition-opacity hover:opacity-90"
          >
            <GitHubIcon className="h-4 w-4" /> GitHub
          </a>
          <a
            href={links.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-line px-4 py-2 text-fg transition-colors hover:border-fg"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
          </a>
        </div>
      </div>

      <div className="hidden lg:block">
        <HeroArt />
      </div>
    </section>
  );
}

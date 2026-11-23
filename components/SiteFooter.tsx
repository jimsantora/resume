import { links, profile } from '@/lib/resume';
import { TUI_HREF } from './Hero';

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-12 font-mono text-sm md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-dim">
          Prefer a terminal?{' '}
          <a href={TUI_HREF} className="text-aqua underline decoration-aqua/40 underline-offset-4 hover:decoration-aqua">
            Open the k9s-style version
          </a>
          , built in Rust with Ratatui.
        </p>
        <p className="flex gap-6">
          <a href={links.github.href} target="_blank" rel="noopener noreferrer" className="text-fg hover:text-aqua">
            GitHub
          </a>
          <a href={links.linkedin.href} target="_blank" rel="noopener noreferrer" className="text-fg hover:text-aqua">
            LinkedIn
          </a>
          <span className="text-dim">{profile.name}</span>
        </p>
      </div>
    </footer>
  );
}

import { links, profile } from '@/lib/resume';

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-12 font-mono text-sm md:flex-row md:items-center md:justify-end md:px-8">
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

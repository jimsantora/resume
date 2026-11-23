'use client';

import { useEffect, useState } from 'react';

export const NAV = [
  { id: 'experience', label: 'Experience' },
  { id: 'credits', label: 'Game credits' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
];

/**
 * Section links that highlight the section currently in view. Without JS they are plain
 * anchor links; the highlight is a progressive enhancement.
 */
export default function NavLinks() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = NAV.map(n => document.getElementById(n.id)).filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    // A section counts as current while it crosses a band just under the fixed header.
    const observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-56px 0px -70% 0px' },
    );
    sections.forEach(s => observer.observe(s));
    const onTop = () => window.scrollY < 120 && setActive(null);
    window.addEventListener('scroll', onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onTop);
    };
  }, []);

  return (
    <nav aria-label="Sections" className="hidden items-center gap-6 font-mono text-[13px] md:flex">
      {NAV.map(n => {
        const current = active === n.id;
        return (
          <a
            key={n.id}
            href={`#${n.id}`}
            aria-current={current ? 'location' : undefined}
            className={`relative py-1 transition-colors ${current ? 'text-fg' : 'text-dim hover:text-fg'}`}
          >
            {n.label}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 -bottom-[11px] h-px bg-orange transition-opacity ${current ? 'opacity-100' : 'opacity-0'}`}
            />
          </a>
        );
      })}
    </nav>
  );
}

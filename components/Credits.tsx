import { credits, displayTitle } from '@/lib/resume';
import { Section } from './Section';

export default function Credits() {
  return (
    <Section id="credits" title="Game credits" note={`${credits.length} shipped titles`}>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {credits.map((c, i) => (
          <li key={c.title} className="group">
            <div className="aspect-[3/4] overflow-hidden rounded border border-line bg-panel transition-colors group-hover:border-orange">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={`${displayTitle(c.title)} box art`}
                width={300}
                height={400}
                loading={i < 5 ? 'eager' : 'lazy'}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-3 text-sm font-semibold leading-snug text-fg">{displayTitle(c.title)}</p>
            <p className="mt-1 font-mono text-xs leading-snug text-dim">
              {c.year} · {c.role}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

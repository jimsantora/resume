import { about, specialties } from '@/lib/resume';
import { Section } from './Section';

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-10 lg:grid-cols-[1fr_16rem]">
        <div className="max-w-[68ch] space-y-5 text-lg leading-relaxed text-fg/90">
          {about.map(p => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <div>
          <h3 className="font-mono text-sm text-dim">Focus</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {specialties.map(s => (
              <li key={s} className="rounded border border-line px-2.5 py-1 font-mono text-xs text-fg">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

import { skills } from '@/lib/resume';
import { GROUP_ICONS, skillIconSvg } from '@/lib/skillIcons';
import { Section } from './Section';

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map(group => {
          const Icon = GROUP_ICONS[group.dir];
          return (
            <div key={group.dir}>
              <h3 className="flex items-center gap-2 font-mono text-sm font-bold text-aqua">
                {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                {group.label}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.items.map(item => {
                  const svg = skillIconSvg(item);
                  return (
                    <li key={item} className="flex items-center gap-2.5 text-fg/90">
                      {svg ? (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 shrink-0 text-dim"
                          fill="currentColor"
                          aria-hidden="true"
                          dangerouslySetInnerHTML={{ __html: svg }}
                        />
                      ) : (
                        <span className="h-4 w-4 shrink-0" aria-hidden="true" />
                      )}
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

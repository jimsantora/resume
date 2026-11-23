import { ChevronRight } from 'lucide-react';
import { jobs, type Job } from '@/lib/resume';
import { Section } from './Section';

/** Roles from 2015 on are shown in full; earlier ones collapse to a one-line summary. */
const RECENT_FROM = 2015;
const startYear = (j: Job) => Number(j.period.match(/\d{4}/)?.[0] ?? 0);

function JobHead({ job }: { job: Job }) {
  return (
    <div className="grid gap-x-8 gap-y-1 md:grid-cols-[9rem_1fr]">
      <p className="font-mono text-sm tabular-nums text-dim md:pt-1">{job.period}</p>
      <div>
        <h3 className="text-lg font-semibold text-fg">{job.title}</h3>
        <p className="font-mono text-sm text-orange">{job.company}</p>
      </div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3 md:ml-[11rem]">
      {items.map(d => (
        <li key={d} className="relative max-w-[68ch] pl-5 leading-relaxed text-fg/85">
          <span className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-aqua/70" aria-hidden="true" />
          {d}
        </li>
      ))}
    </ul>
  );
}

export default function Experience() {
  const recent = jobs.filter(j => startYear(j) >= RECENT_FROM);
  const earlier = jobs.filter(j => startYear(j) < RECENT_FROM);

  return (
    <Section id="experience" title="Experience" note={`${jobs.length} roles since ${startYear(jobs[jobs.length - 1])}`}>
      <div className="divide-y divide-line">
        {recent.map((job, i) => (
          <article key={`${job.company}-${job.period}`} className="py-8 first:pt-0">
            <JobHead job={job} />
            {job.details.length > 0 ? (
              <Bullets items={job.details} />
            ) : (
              i === 0 && (
                <p className="mt-3 font-mono text-xs text-aqua md:ml-[11rem]">Current role</p>
              )
            )}
          </article>
        ))}
      </div>

      <h3 className="mb-2 mt-10 font-mono text-sm text-dim">Earlier roles</h3>
      <div className="divide-y divide-line border-y border-line">
        {earlier.map(job => (
          <details key={`${job.company}-${job.period}`} className="group py-5">
            <summary className="flex cursor-pointer items-start gap-3 rounded-sm hover:[&_h3]:text-aqua">
              <ChevronRight
                className="mt-1.5 h-4 w-4 shrink-0 text-dim transition-transform group-open:rotate-90"
                aria-hidden="true"
              />
              <div className="flex-1">
                <JobHead job={job} />
              </div>
            </summary>
            <div className="pl-7">
              <Bullets items={job.details} />
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}

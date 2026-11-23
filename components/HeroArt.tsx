import { credits, displayTitle, jobs, periodRange } from '@/lib/resume';

export type HeroArtKind = 'trace' | 'covers' | 'topology';

// Edge fade shared by the decorative options, so they sit in the page rather than on it.
const FADE = '[mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]';

/** A. Career as a trace: each role is a span on a 2001 → now axis, oldest at the top. */
function Trace() {
  const now = new Date();
  const rows = [...jobs].reverse().map(j => ({ job: j, range: periodRange(j.period, now) }));
  const t0 = Math.floor(rows[0].range[0]);
  const t1 = now.getFullYear() + 1;
  const W = 420;
  const L = 16;
  const R = 16;
  const rowH = 30;
  const top = 8;
  const x = (t: number) => L + ((t - t0) / (t1 - t0)) * (W - L - R);
  const H = top + rows.length * rowH + 26;
  const ticks: number[] = [];
  for (let y = t0; y <= t1; y += 5) ticks.push(y);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label={`Career timeline: ${rows.length} roles from ${t0} to today`}
    >
      {ticks.map(t => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={0} y2={H - 18} stroke="#232b38" strokeDasharray="2 4" />
          <text x={x(t)} y={H - 4} textAnchor="middle" className="fill-dim font-mono" fontSize="10">
            {t}
          </text>
        </g>
      ))}
      {rows.map(({ job, range: [s, e] }, i) => {
        const current = i === rows.length - 1;
        const y = top + i * rowH;
        const x0 = x(s);
        const w = Math.max(3, x(e) - x0);
        const label = job.company.split(' / ')[0];
        const rightSide = x0 > W * 0.62;
        return (
          <g key={job.company + job.period}>
            <text
              x={rightSide ? x0 + w : x0}
              y={y + 9}
              textAnchor={rightSide ? 'end' : 'start'}
              className={current ? 'fill-orange font-mono' : 'fill-dim font-mono'}
              fontSize="10"
            >
              {label}
            </text>
            <rect
              x={x0}
              y={y + 14}
              width={w}
              height={8}
              rx={2}
              className={current ? 'fill-orange' : 'fill-aqua'}
              opacity={current ? 0.9 : 0.35}
            />
          </g>
        );
      })}
    </svg>
  );
}

/** B. The 15 covers as pixel art, echoing the terminal version's half-block covers. */
function Covers() {
  return (
    <div className={`grid grid-cols-5 gap-2 opacity-60 ${FADE}`} aria-hidden="true">
      {credits.map(c => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={c.title}
          src={c.image.replace('/resume/images/', '/resume/images/px/').replace(/\.jpg$/, '.png')}
          alt=""
          title={displayTitle(c.title)}
          width={15}
          height={20}
          className="aspect-[3/4] w-full rounded-[2px] [image-rendering:pixelated]"
        />
      ))}
    </div>
  );
}

/** C. A service-topology sketch: seeded nodes linked to their nearest neighbours. */
function Topology() {
  // Small deterministic PRNG so the server render is stable.
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const W = 420;
  const H = 360;
  const nodes = Array.from({ length: 26 }, (_, i) => ({ i, x: 20 + rand() * (W - 40), y: 20 + rand() * (H - 40) }));
  const edges = new Set<string>();
  for (const a of nodes) {
    const near = nodes
      .filter(b => b !== a)
      .sort((p, q) => Math.hypot(p.x - a.x, p.y - a.y) - Math.hypot(q.x - a.x, q.y - a.y))
      .slice(0, 2);
    for (const b of near) edges.add([a.i, b.i].sort((m, n) => m - n).join('-'));
  }
  const hubs = new Set([3, 11, 19]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`w-full ${FADE}`} aria-hidden="true">
      {[...edges].map(k => {
        const [a, b] = k.split('-').map(Number);
        return <line key={k} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#00e5c0" strokeOpacity="0.18" />;
      })}
      {nodes.map(n =>
        hubs.has(n.i) ? (
          <circle key={n.i} cx={n.x} cy={n.y} r={4.5} className="animate-pulse fill-orange" opacity={0.8} />
        ) : (
          <circle key={n.i} cx={n.x} cy={n.y} r={2.5} className="fill-aqua" opacity={0.45} />
        ),
      )}
    </svg>
  );
}

export default function HeroArt({ kind }: { kind: HeroArtKind }) {
  if (kind === 'covers') return <Covers />;
  if (kind === 'topology') return <Topology />;
  return <Trace />;
}

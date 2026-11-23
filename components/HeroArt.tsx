import { credits, displayTitle } from '@/lib/resume';

/**
 * The 15 game covers as dim pixel art beside the hero, echoing the terminal version's
 * half-block covers. Decorative: the credits section below carries the real list.
 */
export default function HeroArt() {
  return (
    <div
      className="grid grid-cols-5 gap-2 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]"
      aria-hidden="true"
    >
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

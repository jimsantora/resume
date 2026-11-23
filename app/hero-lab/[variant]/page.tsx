// TEMPORARY: side-by-side hero options for review. Delete this route once one is chosen.
import Experience from '@/components/Experience';
import { Hero, SiteHeader } from '@/components/Hero';
import type { HeroArtKind } from '@/components/HeroArt';

const VARIANTS: Record<string, HeroArtKind> = { a: 'trace', b: 'covers', c: 'topology' };

export function generateStaticParams() {
  return Object.keys(VARIANTS).map(variant => ({ variant }));
}

export default async function HeroLab({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  return (
    <>
      <SiteHeader />
      <main>
        <Hero art={VARIANTS[variant] ?? 'trace'} />
        <Experience />
      </main>
    </>
  );
}

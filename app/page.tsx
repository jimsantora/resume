import About from '@/components/About';
import Credits from '@/components/Credits';
import Experience from '@/components/Experience';
import { Hero, SiteHeader } from '@/components/Hero';
import SiteFooter from '@/components/SiteFooter';
import Skills from '@/components/Skills';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Experience />
        <Credits />
        <Skills />
        <About />
      </main>
      <SiteFooter />
    </>
  );
}

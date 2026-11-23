import About from '@/components/About';
import Credits from '@/components/Credits';
import Experience from '@/components/Experience';
import { Hero, SiteHeader } from '@/components/Hero';
import SiteFooter from '@/components/SiteFooter';
import Skills from '@/components/Skills';
import TerminalVersion from '@/components/TerminalVersion';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Experience />
        <Credits />
        <TerminalVersion />
        <Skills />
        <About />
      </main>
      <SiteFooter />
    </>
  );
}

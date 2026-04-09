import React from 'react';
import TerminalPrompt from './TerminalPrompt';

interface IntroSectionProps {
  typedText: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({ typedText }) => {
  return (
    <section>
      <TerminalPrompt command="cat about.txt" />
      <div className="pl-4 md:pl-8 border-l-2 border-[#30363d] space-y-4">
        <div className="text-3xl md:text-5xl font-bold text-[#ccc]">
          {typedText.startsWith("Hello, I'm ") ? (
            <>
              {"Hello, I'm "}
              <br className="block md:hidden" />
              <span className="text-[#ff9500]">{typedText.slice("Hello, I'm ".length)}</span>
            </>
          ) : (
            typedText
          )}
          <span className="text-white animate-pulse">_</span>
        </div>
        <h1 className="text-2xl md:text-4xl text-[#00ffcc]">Senior Platform & Site Reliability Engineer</h1>

        <div className="space-y-4 text-[#ccc] leading-relaxed">
          <p>
            I&apos;m a platform and site reliability engineer with 20+ years of experience and a simple philosophy:
            leave every system better than you found it. I care deeply about the craft — not just keeping things
            running, but understanding why they break, building platforms that scale, and making the engineers around
            me more effective.
          </p>
          <p>
            I&apos;ve spent most of my career at the intersection of infrastructure and software, working across
            gaming, media, and ad-tech. The gaming industry in particular has shaped how I think about reliability —
            millions of players don&apos;t care about your deployment window, and neither does a live game launch.
            That pressure builds good instincts. I&apos;ve been credited on 15 shipped titles and counting.
          </p>
          <p>
            My technical range runs broad by design. I&apos;m as comfortable reasoning about storage architecture or
            Kubernetes platform design as I am writing automation, reviewing code, or debugging a production incident
            at 2am. I gravitate toward problems that sit between teams — the ones nobody else owns — and I tend to
            leave behind tooling and standards that outlast my involvement.
          </p>
          <p>
            Outside of work I run a homelab, follow the games industry closely, dabble in electronic music, and
            travel when I can. I&apos;ve been an early and enthusiastic adopter of AI-assisted engineering — I build
            with Claude Code daily and believe agentic tooling is changing what it means to be a productive engineer.
          </p>
        </div>

        <p className="text-sm text-[#888]">
          <span className="text-[#ff9500]">specialties:</span>{' '}
          platform engineering, kubernetes, CI/CD, GitOps, observability, infrastructure-as-code, incident response
        </p>
      </div>
    </section>
  );
};

export default IntroSection;

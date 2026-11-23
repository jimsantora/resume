import { ArrowUpRight } from 'lucide-react';
import { TUI_HREF } from './Hero';
import { Section } from './Section';

/** The opt-in terminal app: a real screenshot of its credits view, linking to it. */
export default function TerminalVersion() {
  return (
    <Section id="terminal" title="Terminal version" note="Rust, Ratatui, WebAssembly">
      <a
        href={TUI_HREF}
        className="group block overflow-hidden rounded-lg border border-line bg-black transition-colors hover:border-aqua"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/resume/images/tui-preview.png"
          alt="Open the terminal version. Its game credits view: a k9s-style table with FIFA 22 selected and a pixel-art cover beside it"
          width={1280}
          height={469}
          loading="lazy"
          className="block w-full"
        />
      </a>
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[60ch] leading-relaxed text-fg/85">
          The same resume as a k9s-style terminal app. Browse roles, credits and skills with the mouse or keyboard,
          right in the browser.
        </p>
        <a
          href={TUI_HREF}
          className="group/btn inline-flex shrink-0 items-center gap-2 self-start rounded border border-aqua/60 px-4 py-2.5 font-mono text-sm text-aqua transition-colors hover:border-aqua hover:bg-aqua/10 md:self-auto"
        >
          Open the terminal version
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </Section>
  );
}

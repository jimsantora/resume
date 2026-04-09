import React from 'react';

export default function TerminalPrompt({ command }: { command: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6">
      <span className="text-[#00ffcc] flex-shrink-0">➜</span>
      <span className="text-[#64ffda] flex-shrink-0">~</span>
      <span className="text-[#ff9500] flex-shrink-0">$</span>
      <span className="text-white break-all">{command}</span>
      <span className="inline-block w-2 h-4 bg-[#00ffcc] animate-pulse flex-shrink-0" />
    </div>
  );
}

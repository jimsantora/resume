import React from 'react';

export default function WindowChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#161b22] p-0 md:p-4 lg:p-8 font-['JetBrains_Mono',monospace]">
      <div className="max-w-6xl mx-auto bg-[#0d1117] md:rounded-lg overflow-hidden shadow-2xl md:border border-[#30363d]">
        {/* macOS Window Controls */}
        <div className="h-10 md:h-12 bg-gradient-to-b from-[#21262d] to-[#161b22] border-b border-[#30363d] flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#ff9500] shadow-[0_0_8px_rgba(255,149,0,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-[#00ffcc] shadow-[0_0_8px_rgba(0,255,204,0.4)]" />
          <span className="ml-4 text-[#888] text-sm">terminal — ~/resume</span>
        </div>

        {/* Terminal Content */}
        <div className="bg-[#0d1117] p-4 md:p-6 lg:p-8 relative">
          {/* CRT scan-line effect */}
          <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] opacity-20" />
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </div>
  );
}

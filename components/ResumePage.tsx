'use client';

import React, { useState, useEffect } from 'react';
import WindowChrome from './WindowChrome';
import IntroSection from './IntroSection';
import ExperienceSection from './ExperienceSection';
import CreditsSection from './CreditsSection';
import SkillsSection from './SkillsSection';

export default function ResumePage() {
  const [typedText, setTypedText] = useState('');
  const introText = "Hello, I'm Jim Santora";
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < introText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + introText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <WindowChrome>
      <div className="space-y-8 md:space-y-12">
        <IntroSection typedText={typedText} />
        <SkillsSection />
        <ExperienceSection />
        <CreditsSection />

        {/* Terminal footer */}
        <div className="pt-8 border-t border-[#30363d] text-sm space-y-1">
          <p className="flex items-center gap-2">
            <span className="text-[#00ffcc]">➜</span>
            <span className="text-[#64ffda]">~</span>
            <span className="text-[#ff9500]">$</span>
            <span className="text-[#ccc]">sudo shutdown -h now</span>
          </p>
          <p className="text-[#888]">
            Reticulating splines... [<span className="text-[#888]">███████████████████</span><span className="text-[#888] animate-pulse">█</span>]{' '}
            <span className="animate-pulse">100%</span>
          </p>
          <p className="text-[#888]">
            Last login:{' '}
            {new Date().toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </WindowChrome>
  );
}

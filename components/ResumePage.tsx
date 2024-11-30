import React, { useState, useEffect } from 'react';
import TerminalWindow from './TerminalWindow';
import IntroSection from './IntroSection';
import ExperienceSection from './ExperienceSection';
import CreditsSection from './CreditsSection';
import SkillsSection from './SkillsSection';
import NavBar from './NavBar';

export default function ResumePage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [typedText, setTypedText] = useState('');
  const introText = "Hello, I'm James Santora";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState('default');

  useEffect(() => {
    if (currentIndex < introText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + introText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div
      className={`min-h-screen font-mono transition-colors duration-300 fixed inset-0 overflow-auto ${
        theme === 'dark' ? 'bg-gray-900 text-green-400' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <NavBar theme={theme} toggleTheme={toggleTheme} currentSection={currentSection} />

      <div className="container mx-auto px-4 pt-24">
        <div data-section="intro">
          <TerminalWindow title="~ intro.sh" sectionId="intro">
            <IntroSection typedText={typedText} theme={theme} />
          </TerminalWindow>
        </div>

        <div data-section="intro">
          <TerminalWindow title="~ skills.sh" sectionId="skills">
            <SkillsSection theme={theme} />
          </TerminalWindow>
        </div>

        <div data-section="experience">
          <TerminalWindow title="~ experience.sh" sectionId="experience">
            <ExperienceSection />
          </TerminalWindow>
        </div>

        <div data-section="game-credits">
          <TerminalWindow title="~ game-credits.sh" sectionId="game-credits">
            <CreditsSection theme={theme} />
          </TerminalWindow>
        </div>
      </div>
    </div>
  );
}

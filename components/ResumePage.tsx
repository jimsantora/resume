import React, { useState, useEffect } from 'react';
import { Terminal, Code2, Database, Cloud } from 'lucide-react';
import { useAchievements, AchievementNotification } from './Achievements';
import { useScrollTrigger } from '../lib/hooks/useScrollTrigger';
import TerminalWindow from './TerminalWindow';
import IntroSection from './IntroSection';
import ExperienceSection from './ExperienceSection';
import NavBar from './NavBar';
import Skills from './Skills';

export default function ResumePage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [typedText, setTypedText] = useState('');
  const introText = "Hello, I'm James Santora";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState('default');

  const { unlockedAchievements, currentNotification, unlockAchievement, achievements } =
    useAchievements();

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
      className={`min-h-screen font-mono transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-green-400' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <NavBar
        theme={theme}
        toggleTheme={toggleTheme}
        unlockedAchievements={unlockedAchievements}
        achievements={achievements}
        currentSection={currentSection}
      />

      <AchievementNotification achievement={currentNotification} theme={theme} />

      <div className="container mx-auto px-4 pt-24">
        <TerminalWindow title="~ intro.sh" sectionId="intro">
          <IntroSection typedText={typedText} theme={theme} />
        </TerminalWindow>

        <TerminalWindow title="~ skills.sh" sectionId="skills">
          <Skills theme={theme} />
        </TerminalWindow>

        <TerminalWindow title="~ experience.sh" sectionId="experience">
          <ExperienceSection />
        </TerminalWindow>

        <TerminalWindow title="~ game-credits.sh" sectionId="game-credits">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'MADDEN NFL 21', year: '2020', role: 'Sr. DevOps Engineer' },
              { title: 'STAR WARS: SQUADRONS', year: '2020', role: 'Sr. DevOps Engineer' },
              { title: 'FIFA 20', year: '2019', role: 'Sr. DevOps Engineer / Lead' },
              {
                title: 'PLANTS VS ZOMBIES: BATTLE FOR NEIGHBORVILLE',
                year: '2019',
                role: 'Techops Service Engineering',
              },
              { title: 'FIFA 19', year: '2018', role: 'Sr. Systems Engineer' },
              { title: 'FIFA 18', year: '2017', role: 'Sr. Storage Engineer' },
              {
                title: 'NEED FOR SPEED: PAYBACK',
                year: '2017',
                role: 'Sr. Systems Engineer, Storage',
              },
              { title: 'FIFA 17', year: '2016', role: 'EADP Tech Ops' },
              { title: 'PLANTS VS ZOMBIES: GARDEN WARFARE 2', year: '2016', role: 'Tech Ops' },
            ].map((game, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 border-orange-500 hover:scale-105 transition-transform ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <h3 className="font-bold text-orange-500">{game.title}</h3>
                <p className="text-sm opacity-75">{game.year}</p>
                <p className="text-sm mt-2 flex items-center">
                  <Terminal className="w-4 h-4 mr-2" />
                  {game.role}
                </p>
              </div>
            ))}
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}

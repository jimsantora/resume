import React, { useState } from 'react';
import { Sun, Moon, Trophy } from 'lucide-react';
import { Achievement } from './Achievements';
import ShellPrompt from './ShellPrompt';

interface NavBarProps {
  theme: string;
  toggleTheme: () => void;
  unlockedAchievements: string[];
  achievements: Achievement[];
  currentSection?: string;
}

const NavBar: React.FC<NavBarProps> = ({
  theme,
  toggleTheme,
  unlockedAchievements,
  achievements,
  currentSection = 'default',
}) => {
  const [showAchievements, setShowAchievements] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${
        theme === 'dark' ? 'bg-gray-900/95' : 'bg-gray-100/95'
      } backdrop-blur-sm border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}
    >
      <div className="container mx-auto px-4">
        <div className="h-16 grid grid-cols-3 items-center">
          {/* Left section - Shell Prompt */}
          <div className="justify-self-start min-w-[200px]">
            <ShellPrompt theme={theme} currentSection={currentSection} />
          </div>

          {/* Center section - empty for now */}
          <div className="justify-self-center"></div>

          {/* Right section - controls */}
          <div className="justify-self-end flex items-center space-x-4">
            <button
              onClick={() => setShowAchievements(!showAchievements)}
              className={`p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500 relative ${
                theme === 'dark' ? 'text-green-400' : 'text-gray-600'
              }`}
            >
              <Trophy className="w-6 h-6" />
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500 ${
                theme === 'dark' ? 'text-green-400' : 'text-gray-600'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Achievements Dropdown */}
      {showAchievements && (
        <div
          className={`absolute right-4 top-16 w-96 rounded-lg shadow-lg border-2 border-orange-500 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-orange-500 font-bold flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Achievements
              </h3>
              <button
                onClick={() => setShowAchievements(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-2">
              {achievements.map(achievement => {
                const isUnlocked = unlockedAchievements.includes(achievement.id);
                return (
                  <div
                    key={achievement.id}
                    className={`p-2 rounded ${isUnlocked ? 'opacity-100' : 'opacity-50'}`}
                  >
                    <div className="flex items-center gap-2">
                      {achievement.icon || (
                        <Trophy
                          className={`w-4 h-4 ${isUnlocked ? 'text-yellow-500' : 'text-gray-500'}`}
                        />
                      )}
                      <span
                        className={`font-medium ${isUnlocked ? 'text-orange-500' : 'text-gray-500'}`}
                      >
                        {achievement.title}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      {isUnlocked ? achievement.description : '???'}
                    </p>
                    {isUnlocked && (
                      <p className="text-xs text-yellow-500 mt-1">+{achievement.points} XP</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
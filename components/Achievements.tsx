import React from 'react';
import { Terminal, Code2, Gamepad2, Brain } from 'lucide-react';

const achievementIcons = {
  intro: <Brain className="w-4 h-4" />,
  skills: <Terminal className="w-4 h-4" />,
  experience: <Code2 className="w-4 h-4" />,
  games: <Gamepad2 className="w-4 h-4" />,
};

export default function Achievements({ currentSection = 'default' }) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 flex gap-2">
      {Object.entries(achievementIcons).map(([section, icon]) => (
        <div
          key={section}
          className={`p-2 rounded-lg transition-all duration-300 ${
            currentSection === section
              ? 'bg-orange-500 text-white scale-110'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          title={section.charAt(0).toUpperCase() + section.slice(1)}
        >
          {icon}
        </div>
      ))}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const getDirectoryFromSection = (section: string) => {
  const dirMap: { [key: string]: string } = {
    default: '/home/jsantora',
    intro: '/home/jsantora/about',
    skills: '/home/jsantora/skills',
    experience: '/home/jsantora/career',
    'game-credits': '/home/jsantora/games',
  };
  return dirMap[section] || dirMap.default;
};

// Function to get just the last part of the path with tilde
const getShortPath = (fullPath: string) => {
  if (fullPath === '/home/jsantora') return '~';
  const lastPart = fullPath.split('/').pop();
  return `~/${lastPart}`;
};

export const ShellPrompt: React.FC<{
  theme?: string;
  currentSection?: string;
}> = ({ theme = 'dark', currentSection = 'default' }) => {
  const hostname = 'excelcior';
  const currentDir = getDirectoryFromSection(currentSection);

  return (
    <div className="font-mono flex items-center gap-2 transition-all duration-300">
      <Terminal className="w-4 h-4 text-orange-500" />
      {/* Desktop version */}
      <span className={`hidden md:inline ${theme === 'dark' ? 'text-green-400' : 'text-gray-600'}`}>
        <span className="text-orange-500">root</span>
        <span className="text-gray-500">@</span>
        <span className="text-green-500">{hostname}</span>
        <span className="text-gray-500">:</span>
        <span className="text-orange-500">{currentDir}</span>
        <span className="text-green-500"># </span>
        <span className="animate-pulse">▊</span>
      </span>

      {/* Mobile version - shows directory with tilde */}
      <span className={`md:hidden ${theme === 'dark' ? 'text-green-400' : 'text-gray-600'}`}>
        <span className="text-orange-500">{getShortPath(currentDir)}</span>
        <span className="text-green-500"># </span>
        <span className="animate-pulse">▊</span>
      </span>
    </div>
  );
};

export default ShellPrompt;

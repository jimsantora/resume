import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const LOTR_HOSTS = [
  'frodo', // The Ring-bearer
  'samwise', // Frodo's faithful companion
  'gandalf', // The Grey/White wizard
  'aragorn', // King of Gondor
  'legolas', // Elven prince
  'gimli', // Son of Glóin
  'boromir', // Son of Denethor
  'galadriel', // Lady of Lothlórien
  'elrond', // Lord of Rivendell
  'bilbo', // The first Ring-finder
  'theoden', // King of Rohan
  'faramir', // Captain of Gondor
  'eowyn', // Shield-maiden of Rohan
  'arwen', // Evenstar
  'treebeard', // Eldest of the Ents
];

const getInitialHostname = () => {
  if (typeof window === 'undefined') return LOTR_HOSTS[0];

  const storedSeed = sessionStorage.getItem('lotr-host-seed');
  if (!storedSeed) {
    const newSeed = Date.now();
    sessionStorage.setItem('lotr-host-seed', newSeed.toString());
    return LOTR_HOSTS[newSeed % LOTR_HOSTS.length];
  }

  return LOTR_HOSTS[parseInt(storedSeed) % LOTR_HOSTS.length];
};

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
  const [hostname, setHostname] = useState<string | null>(null);
  const currentDir = getDirectoryFromSection(currentSection);

  useEffect(() => {
    setHostname(getInitialHostname());
  }, []);

  if (!hostname) return null;

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

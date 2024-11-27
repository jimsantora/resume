import React from 'react';
import { Terminal } from 'lucide-react';

const LOTR_HOSTS = [
  'frodo',      // The Ring-bearer
  'samwise',    // Frodo's faithful companion
  'gandalf',    // The Grey/White wizard
  'aragorn',    // King of Gondor
  'legolas',    // Elven prince
  'gimli',      // Son of Glóin
  'boromir',    // Son of Denethor
  'galadriel',  // Lady of Lothlórien
  'elrond',     // Lord of Rivendell
  'bilbo',      // The first Ring-finder
  'theoden',    // King of Rohan
  'faramir',    // Captain of Gondor
  'eowyn',      // Shield-maiden of Rohan
  'arwen',      // Evenstar
  'treebeard'   // Eldest of the Ents
];

const getRandomHost = () => {
  // Use current timestamp as seed for consistent selection during session
  const seed = parseInt(sessionStorage.getItem('lotr-host-seed') || '0');
  if (seed === 0) {
    const newSeed = Date.now();
    sessionStorage.setItem('lotr-host-seed', newSeed.toString());
    return LOTR_HOSTS[newSeed % LOTR_HOSTS.length];
  }
  return LOTR_HOSTS[seed % LOTR_HOSTS.length];
};

const getDirectoryFromSection = (section: string) => {
  const dirMap: { [key: string]: string } = {
    'default': '/root',
    'intro': '/root/about',
    'skills': '/root/skills',
    'experience': '/root/career',
    'game-credits': '/root/games'
  };
  return dirMap[section] || dirMap.default;
};

export const ShellPrompt: React.FC<{
  theme?: string;
  currentSection?: string;
}> = ({ 
  theme = 'dark',
  currentSection = 'default'
}) => {
  const [hostname] = React.useState(() => getRandomHost());
  const currentDir = getDirectoryFromSection(currentSection);
  
  return (
    <div className="font-mono flex items-center gap-2 transition-all duration-300">
      <Terminal className="w-4 h-4 text-red-500" />
      <span className={`${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
        <span className="text-red-500">root</span>
        <span className="text-gray-500">@</span>
        <span className="text-purple-500">{hostname}</span>
        <span className="text-gray-500">:</span>
        <span className="text-yellow-500">{currentDir}</span>
        <span className="text-red-500"># </span>
        <span className="animate-pulse">▊</span>
      </span>
    </div>
  );
};

export default ShellPrompt;
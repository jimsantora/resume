import React from 'react';
import { Terminal } from 'lucide-react';

interface GameCredit {
  title: string;
  year: string;
  role: string;
}

interface CreditsSectionProps {
  theme: 'dark' | 'light';
  credits?: GameCredit[];
}

const defaultCredits: GameCredit[] = [
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
];

const CreditsSection: React.FC<CreditsSectionProps> = ({ theme, credits = defaultCredits }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {credits.map((game, index) => (
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
  );
};

export default CreditsSection;

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
  { title: 'PLANTS VS ZOMBIES: GARDEN WARFARE 2', year: '2016', role: 'Tech Ops' },
  { title: 'FIFA 17', year: '2016', role: 'EADP Tech Ops' },
  { title: 'FIFA 18', year: '2017', role: 'Sr. Storage Engineer' },
  { title: 'FORTNITE', year: '2017', role: 'Sr. Site Reliability Engineer' },
  { title: 'NEED FOR SPEED: PAYBACK', year: '2017', role: 'Sr. Systems Engineer, Storage' },
  { title: 'FIFA 19', year: '2018', role: 'Sr. Systems Engineer' },
  { title: 'FIFA 20', year: '2019', role: 'Sr. DevOps Engineer / Lead' },
  { title: 'PLANTS VS ZOMBIES: BATTLE FOR NEIGHBORVILLE', year: '2019', role: 'Techops Service Engineering' },
  { title: 'FIFA 21', year: '2020', role: 'Sr. DevOps Engineer' },
  { title: 'MADDEN NFL 21', year: '2020', role: 'Sr. DevOps Engineer' },
  { title: 'STAR WARS: SQUADRONS', year: '2020', role: 'Sr. DevOps Engineer' },
  { title: 'Battlefield 2042', year: '2021', role: 'Sr. DevOps Engineer' },
  { title: 'FIFA 22', year: '2021', role: 'Sr. DevOps Engineer' },
  { title: 'MADDEN NFL 22', year: '2021', role: 'Sr. DevOps Engineer' },
  { title: 'NEED FOR SPEED: UNBOUND', year: '2022', role: 'Sr. DevOps Engineer' },
];

const CreditsSection: React.FC<CreditsSectionProps> = ({ theme, credits = defaultCredits }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {credits.map((game, index) => (
        <div key={index} className="game-credit-card p-4 h-64 relative">
          <div className="flex h-full">
            {/* Game info - left side */}
            <div className="flex-1 flex flex-col justify-between pr-4">
              <div>
                <h3 className="font-gaming font-black text-orange-500 text-2xl mb-2">{game.title}</h3>
                <p className="text-sm opacity-75">{game.year}</p>
              </div>
              <p className="text-sm mt-2 flex items-center">
                <Terminal className="w-4 h-4 mr-2" />
                {game.role}
              </p>
            </div>

            {/* Box art - right side */}
            <div className="w-32 flex-shrink-0">
              <div className="relative">
                <div className={`absolute -inset-1 rounded-lg ${theme === 'dark' ? 'bg-orange-500' : 'bg-orange-300'} opacity-50 blur`} />
                <img
                  src={`/resume/images/${game.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`}
                  alt={`${game.title} box art`}
                  className="relative w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreditsSection;

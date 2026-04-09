import React from 'react';
import Image from 'next/image';
import TerminalPrompt from './TerminalPrompt';

interface GameCredit {
  title: string;
  year: string;
  role: string;
}

const defaultCredits: GameCredit[] = [
  { title: 'FORTNITE', year: '2017', role: 'Sr. Site Reliability Engineer' },
  { title: 'NEED FOR SPEED: UNBOUND', year: '2022', role: 'Senior DevOps Engineer' },
  { title: 'FIFA 22', year: '2021', role: 'Senior DevOps Engineer' },
  { title: 'Battlefield 2042', year: '2021', role: 'Senior DevOps Engineer' },
  { title: 'MADDEN NFL 22', year: '2021', role: 'Senior DevOps Engineer' },
  { title: 'FIFA 21', year: '2020', role: 'Senior DevOps Engineer' },
  { title: 'MADDEN NFL 21', year: '2020', role: 'Sr. DevOps Engineer' },
  { title: 'STAR WARS: SQUADRONS', year: '2020', role: 'Sr. DevOps Engineer' },
  { title: 'FIFA 20', year: '2019', role: 'Sr. DevOps Engineer / Lead' },
  { title: 'PLANTS VS ZOMBIES: BATTLE FOR NEIGHBORVILLE', year: '2019', role: 'Techops Service Engineering' },
  { title: 'FIFA 19', year: '2018', role: 'Sr. Systems Engineer' },
  { title: 'FIFA 18', year: '2017', role: 'Sr. Storage Engineer' },
  { title: 'NEED FOR SPEED: PAYBACK', year: '2017', role: 'Sr. Systems Engineer, Storage' },
  { title: 'FIFA 17', year: '2016', role: 'EADP Tech Ops' },
  { title: 'PLANTS VS ZOMBIES: GARDEN WARFARE 2', year: '2016', role: 'Tech Ops' },
];

const CreditsSection: React.FC<{ credits?: GameCredit[] }> = ({ credits = defaultCredits }) => {
  return (
    <section>
      <TerminalPrompt command={'find ./games -name "credits.txt" -exec grep "Santora" {} \\;'} />
      <div className="pl-4 md:pl-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {credits.map((game, index) => {
            const imagePath = `/resume/images/${game.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;
            return (
              <div
                key={index}
                className="group relative aspect-[3/4] bg-[#161b22] border border-[#30363d] rounded overflow-hidden hover:border-[#ff9500] hover:shadow-[0_0_20px_rgba(255,149,0,0.3)] transition-all duration-300"
              >
                <Image
                  src={imagePath}
                  alt={`${game.title} box art`}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  priority={index < 5}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                  <p className="text-[#ff9500] text-sm font-semibold leading-tight">{game.title}</p>
                  <p className="text-[#00ffcc] text-xs mt-1">{game.role}</p>
                  <p className="text-[#888] text-xs">{game.year}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CreditsSection;

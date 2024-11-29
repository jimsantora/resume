import React, { useState, useEffect } from 'react';
import { Terminal, Code2, Database, Cloud } from 'lucide-react';
import { useAchievements, AchievementNotification } from './Achievements';
import { useScrollTrigger } from '../lib/hooks/useScrollTrigger';
import TerminalWindow from './TerminalWindow';
import IntroSection from './IntroSection';
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
          <div className="space-y-8">
            {[
              {
                title: 'SR. SITE RELIABILITY ENGINEER',
                company: 'TWITTER',
                period: '2022 – Present',
                details: [
                  "Dedicated to Twitter's in-memory caching teams, building on previous experience in data storage, availability, and reliability",
                  "Supported Twemcache, Twitter's in-house fork of Memcached, as well as Redis, and Pelikan",
                  'Focus on moving to the cloud while modernizing observability',
                ],
              },
              {
                title: 'SR. DEVOPS / SITE RELIABILITY ENGINEER',
                company: 'ELECTRONIC ARTS',
                period: '2019 – 2022',
                details: [
                  'Built and promoted modern, scalable platform for game servers using Kubernetes',
                  'Dedicated to discovering and eradicating toil through engineering and automation',
                  'Performed LiveOps support for game launches and organized war games sessions',
                ],
              },
              {
                title: 'SR. SYSTEMS ENGINEER (LEAD)',
                company: 'ELECTRONIC ARTS',
                period: '2015 – 2019',
                details: [
                  'Lead Systems Engineer for FIFA, focusing on configuration management modernization',
                  'Developed Terraform CI/CD pipelines for infrastructure-as-code',
                  'Supported game launches with systems monitoring and capacity planning',
                ],
              },
              {
                title: 'SR. SYSTEMS ENGINEER',
                company: 'CBS INTERACTIVE',
                period: '2008 – 2015',
                details: [
                  'Lead storage administrator, maintaining over a petabyte of data',
                  'Supported high-profile, high-traffic sites including CBS.com, CBSNews, CNET',
                  'Implemented monitoring and metrics across storage infrastructure',
                ],
              },
              {
                title: 'UNIX ADMINISTRATOR',
                company: 'RIGHT MEDIA / YAHOO INC.',
                period: '2005 – 2008',
                details: [
                  'Scaled ad serving network from 300 to 5,000+ nodes',
                  'Developed automation for system maintenance using CFEngine',
                  "Integrated Right Media infrastructure into Yahoo's datacenters",
                ],
              },
              {
                title: 'SYSTEMS ADMINISTRATOR',
                company: 'BOLT MEDIA',
                period: '2003 – 2005',
                details: [
                  'Deployed and optimized social media platform on JBoss, Apache and MySQL',
                  'Built monitoring infrastructure with Nagios and Cacti',
                  'Maintained build and deployment scripts',
                ],
              },
              {
                title: 'IT MANAGER',
                company: 'AGRA SERVICES BROKERAGE CO.',
                period: '2001 – 2003',
                details: [
                  'Maintained SCO Unix, Linux, and Windows servers',
                  'Migrated 60+ user desktops to Linux using LTSP',
                  'Implemented in-house email using Qmail/SpamAssassin',
                ],
              },
            ].map((job, index) => (
              <div key={index} className="job-card">
                <div className="flex items-center mb-2">
                  <Code2 className="mr-2 text-orange-500" />
                  <h3 className="text-xl font-bold text-orange-500">{job.title}</h3>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">{job.company}</span>
                  <span className="text-sm opacity-75">{job.period}</span>
                </div>
                <ul className="space-y-2">
                  {job.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1">$</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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

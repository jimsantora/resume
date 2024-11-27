import React, { useState, useEffect } from 'react';
import { Sun, Moon, Terminal, Code2, Database, Cloud } from 'lucide-react';
import { useAchievements, AchievementNotification, AchievementsList } from './achievements';
import { useScrollTrigger } from './useScrollTrigger';

export default function ResumeWebsite() {
  const [theme, setTheme] = useState('dark');
  const [typedText, setTypedText] = useState('');
  const introText = "Hello, I'm James Santora";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const { unlockedAchievements, currentNotification, unlockAchievement } = useAchievements();

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

  // Enhanced terminal-style section wrapper
  const TerminalWindow: React.FC<{ 
    title: string, 
    children: React.ReactNode, 
    sectionId: string 
  }> = ({ title, children, sectionId }) => {
    // Create ref for scroll tracking
    const sectionRef = useScrollTrigger(sectionId, unlockAchievement);

    return (
      <div 
        ref={sectionRef} 
        className="mb-12 rounded-lg overflow-hidden border-2 border-orange-500"
      >
        <div className={`flex items-center p-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="font-bold text-orange-500">{title}</span>
        </div>
        <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen font-mono transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-green-400' 
        : 'bg-gray-100 text-gray-800'
    }`}>

      <AchievementNotification achievement={currentNotification} theme={theme} />
      <AchievementsList unlockedAchievements={unlockedAchievements} theme={theme} />

      <div className="fixed top-4 right-4 flex items-center space-x-4">
        <span className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-gray-600'}`}>
          [system@jsantora ~]$
        </span>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500"
        >
          {theme === 'dark' ? 
            <Sun className="w-6 h-6" /> : 
            <Moon className="w-6 h-6" />
          }
        </button>
      </div>

      <div className="container mx-auto px-4 py-16">
        <TerminalWindow title="~ intro.sh">
          <div className="mb-8 h-12">
            <span className="text-3xl font-bold">
              {typedText}
              <span className="animate-pulse">_</span>
            </span>
          </div>
          <p className="text-xl mb-6 text-orange-500">SR SITE RELIABILITY ENGINEER</p>
          <div className={`space-y-4 ${theme === 'dark' ? 'text-green-300' : 'text-gray-700'}`}>
            <p>As a Senior Site Reliability Engineer with over 20 years in the industry, I have built my career on architecting enterprise-scale solutions and driving technical strategy across organizations. Currently at Epic Games, I focus on advancing CI/CD and Infrastructure as Code practices, contributing to the foundational technology that powers both Fortnite and the Unreal Engine ecosystem while establishing technical standards that influence multiple teams.</p>
            <p>My seven-year tenure at Electronic Arts demonstrates my ability to drive long-term technical vision and organizational change. I progressed from leading FIFA's infrastructure modernization to architecting scalable platforms that served multiple game studios. I established company-wide best practices for cloud infrastructure and Kubernetes adoption while serving as a principal technical advisor for centralized monitoring and observability solutions. My architectural decisions and technical leadership supported major franchises including FIFA, Madden NFL, and Star Wars: Squadrons, where I designed resilient systems serving millions of players and mentored teams in operational excellence.</p>
            <p>My expertise in building comprehensive observability solutions has been fundamental to driving reliability at scale. By implementing robust monitoring frameworks using tools like Prometheus, Grafana, and the ELK stack, I've enabled teams to gain deep insights into their systems' behavior and performance. I excel at defining and tracking meaningful SLIs that align with business objectives, establishing realistic SLOs that balance reliability with innovation, and creating SLAs that build trust with stakeholders. This data-driven approach to reliability engineering, combined with my broad technical expertise in cloud platforms, container orchestration, and modern DevOps practices, allows me to identify and solve complex technical challenges at the organizational level through systematic problem-solving and automation.</p>
            <p>I am a systems thinker at heart, driven by a passion for creating scalable, maintainable infrastructure that enables organizational success. By combining deep technical expertise with strong collaborative skills, I help teams reduce operational overhead, increase stability, and accelerate their delivery capabilities. I focus on identifying and solving problems that impact multiple teams, creating reusable solutions, and establishing technical standards that improve efficiency across the organization. This strategic approach to engineering challenges, coupled with my ability to mentor and influence others, has consistently helped organizations work more efficiently and deliver more effectively.</p>
          </div>
        </TerminalWindow>

        <TerminalWindow title="~ skills.sh">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-orange-500 flex items-center">
                <Cloud className="mr-2" /> Cloud & Infrastructure
              </h3>
              <ul className="space-y-1">
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">$</span>
                  AWS, GCP, Azure
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">$</span>
                  Kubernetes, Docker
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">$</span>
                  Terraform, GitOps
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-orange-500 flex items-center">
                <Terminal className="mr-2" /> Languages
              </h3>
              <ul className="space-y-1">
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">$</span>
                  GO, Python
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">$</span>
                  Shell, Perl
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-orange-500 flex items-center">
                <Database className="mr-2" /> Data & Storage
              </h3>
              <ul className="space-y-1">
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">$</span>
                  MySQL, PostgreSQL
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">$</span>
                  Redis, Memcached
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">$</span>
                  Kafka, RabbitMQ
                </li>
              </ul>
            </div>
          </div>
        </TerminalWindow>

        <TerminalWindow title="~ experience.sh">
          <div className="space-y-8">
            {[
              {
                title: "SR. SITE RELIABILITY ENGINEER",
                company: "TWITTER",
                period: "2022 – Present",
                details: [
                  "Dedicated to Twitter's in-memory caching teams, building on previous experience in data storage, availability, and reliability",
                  "Supported Twemcache, Twitter's in-house fork of Memcached, as well as Redis, and Pelikan",
                  "Focus on moving to the cloud while modernizing observability"
                ]
              },
              {
                title: "SR. DEVOPS / SITE RELIABILITY ENGINEER",
                company: "ELECTRONIC ARTS",
                period: "2019 – 2022",
                details: [
                  "Built and promoted modern, scalable platform for game servers using Kubernetes",
                  "Dedicated to discovering and eradicating toil through engineering and automation",
                  "Performed LiveOps support for game launches and organized war games sessions"
                ]
              },
              {
                title: "SR. SYSTEMS ENGINEER (LEAD)",
                company: "ELECTRONIC ARTS",
                period: "2015 – 2019",
                details: [
                  "Lead Systems Engineer for FIFA, focusing on configuration management modernization",
                  "Developed Terraform CI/CD pipelines for infrastructure-as-code",
                  "Supported game launches with systems monitoring and capacity planning"
                ]
              },
              {
                title: "SR. SYSTEMS ENGINEER",
                company: "CBS INTERACTIVE",
                period: "2008 – 2015",
                details: [
                  "Lead storage administrator, maintaining over a petabyte of data",
                  "Supported high-profile, high-traffic sites including CBS.com, CBSNews, CNET",
                  "Implemented monitoring and metrics across storage infrastructure"
                ]
              },
              {
                title: "UNIX ADMINISTRATOR",
                company: "RIGHT MEDIA / YAHOO INC.",
                period: "2005 – 2008",
                details: [
                  "Scaled ad serving network from 300 to 5,000+ nodes",
                  "Developed automation for system maintenance using CFEngine",
                  "Integrated Right Media infrastructure into Yahoo's datacenters"
                ]
              },
              {
                title: "SYSTEMS ADMINISTRATOR",
                company: "BOLT MEDIA",
                period: "2003 – 2005",
                details: [
                  "Deployed and optimized social media platform on JBoss, Apache and MySQL",
                  "Built monitoring infrastructure with Nagios and Cacti",
                  "Maintained build and deployment scripts"
                ]
              },
              {
                title: "IT MANAGER",
                company: "AGRA SERVICES BROKERAGE CO.",
                period: "2001 – 2003",
                details: [
                  "Maintained SCO Unix, Linux, and Windows servers",
                  "Migrated 60+ user desktops to Linux using LTSP",
                  "Implemented in-house email using Qmail/SpamAssassin"
                ]
              }
            ].map((job, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg border border-orange-500 transition-all hover:translate-x-2 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
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

        <TerminalWindow title="~ game-credits.sh">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "MADDEN NFL 21", year: "2020", role: "Sr. DevOps Engineer" },
              { title: "STAR WARS: SQUADRONS", year: "2020", role: "Sr. DevOps Engineer" },
              { title: "FIFA 20", year: "2019", role: "Sr. DevOps Engineer / Lead" },
              { title: "PLANTS VS ZOMBIES: BATTLE FOR NEIGHBORVILLE", year: "2019", role: "Techops Service Engineering" },
              { title: "FIFA 19", year: "2018", role: "Sr. Systems Engineer" },
              { title: "FIFA 18", year: "2017", role: "Sr. Storage Engineer" },
              { title: "NEED FOR SPEED: PAYBACK", year: "2017", role: "Sr. Systems Engineer, Storage" },
              { title: "FIFA 17", year: "2016", role: "EADP Tech Ops" },
              { title: "PLANTS VS ZOMBIES: GARDEN WARFARE 2", year: "2016", role: "Tech Ops" }
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

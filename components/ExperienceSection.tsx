import React from 'react';
import { Code2 } from 'lucide-react';

interface JobDetails {
  title: string;
  company: string;
  period: string;
  details: string[];
}

interface ExperienceSectionProps {
  jobs?: JobDetails[];
}

const defaultJobs: JobDetails[] = [
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
];

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ jobs = defaultJobs }) => {
  return (
    <div className="space-y-8">
      {jobs.map((job, index) => (
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
  );
};

export default ExperienceSection;

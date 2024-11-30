import React from 'react';
import { Building2 } from 'lucide-react';

interface JobDetails {
  title: string;
  company: string;
  period: string;
  details: string[];
}

const defaultJobs: JobDetails[] = [
  {
    title: 'SR. SITE RELIABILITY ENGINEER',
    company: 'Twitter',
    period: '2022 – Present',
    details: [
      "Dedicated to Twitter's in-memory caching teams, building on previous experience in data storage, availability, and reliability",
      "Supported Twemcache, Twitter's in-house fork of Memcached, as well as Redis, and Pelikan",
      'Focus on moving to the cloud while modernizing observability',
    ],
  },
  {
    title: 'SR. DEVOPS / SITE RELIABILITY ENGINEER',
    company: 'Electronic Arts',
    period: '2019 – 2022',
    details: [
      'Built and promoted modern, scalable platform for game servers using Kubernetes',
      'Dedicated to discovering and eradicating toil through engineering and automation',
      'Performed LiveOps support for game launches and organized war games sessions',
    ],
  },
  {
    title: 'SR. SYSTEMS ENGINEER (LEAD)',
    company: 'Electronic Arts',
    period: '2015 – 2019',
    details: [
      'Lead Systems Engineer for FIFA, focusing on configuration management modernization',
      'Developed Terraform CI/CD pipelines for infrastructure-as-code',
      'Supported game launches with systems monitoring and capacity planning',
    ],
  },
  {
    title: 'SR. SYSTEMS ENGINEER',
    company: 'CBS Interactive',
    period: '2008 – 2015',
    details: [
      'Lead storage administrator, maintaining over a petabyte of data',
      'Supported high-profile, high-traffic sites including CBS.com, CBSNews, CNET',
      'Implemented monitoring and metrics across storage infrastructure',
    ],
  },
  {
    title: 'UNIX ADMINISTRATOR',
    company: 'Yahoo, Inc.',
    period: '2005 – 2008',
    details: [
      'Scaled ad serving network from 300 to 5,000+ nodes',
      'Developed automation for system maintenance using CFEngine',
      "Integrated Right Media infrastructure into Yahoo's datacenters",
    ],
  },
  {
    title: 'SYSTEMS ADMINISTRATOR',
    company: 'Bolt Media',
    period: '2003 – 2005',
    details: [
      'Deployed and optimized social media platform on JBoss, Apache and MySQL',
      'Built monitoring infrastructure with Nagios and Cacti',
      'Maintained build and deployment scripts',
    ],
  },
  {
    title: 'IT MANAGER',
    company: 'Agra Services Brokerage Co.',
    period: '2001 – 2003',
    details: [
      'Maintained SCO Unix, Linux, and Windows servers',
      'Migrated 60+ user desktops to Linux using LTSP',
      'Implemented in-house email using Qmail/SpamAssassin',
    ],
  },
];

const ExperienceSection: React.FC<{ jobs?: JobDetails[] }> = ({ jobs = defaultJobs }) => {
  return (
    <div className="space-y-8">
      {jobs.map((job, index) => (
        <div key={index} className="job-card">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="hidden md:block p-3 rounded-lg bg-orange-500/10 ring-1 ring-orange-500/20">
              <Building2 className="w-6 h-6 text-orange-500" />
            </div>

            <div className="flex-1 w-full">
              {/* Company and Date */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1">
                <h3 className="text-3xl font-syne text-orange-500">{job.company}</h3>
                <span className="text-sm opacity-75 md:ml-4 mt-1 md:mt-0">{job.period}</span>
              </div>

              {/* Job Title */}
              <h4 className="text-lg font-semibold text-orange-400 mb-4">{job.title}</h4>

              {/* Details */}
              <ul className="space-y-2">
                {job.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">*</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;

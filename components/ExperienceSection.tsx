import React from 'react';
import TerminalPrompt from './TerminalPrompt';

interface JobDetails {
  title: string;
  company: string;
  period: string;
  details: string[];
}

const defaultJobs: JobDetails[] = [
  {
    title: 'SR. SITE RELIABILITY ENGINEER',
    company: 'Epic Games',
    period: '2022 – 2026',
    details: [
      'Owned GitHub Enterprise Server internally, including autoscaling runners in EKS via Actions Runner Controller (ARC); designed custom dashboards surfacing service health, user experience, and usage hot spots down to the workflow level; built automation workflows for admin and governance tasks.',
      "Administered Epic's GitHub.com Enterprise accounts, including one of the largest private orgs on the platform (~500K members); managed licensing and cost optimization across internal and external GitHub instances.",
      "Served on Epic's Open Tech Council, a cross-disciplinary advisory board responsible for vetting, organizing, and publishing the company's open source projects and contributions.",
      'Led platform engineering for the Pipelines team; migrated Jenkins workflows to GitHub Actions, established a reusable GHA library with contribution standards adopted org-wide, and migrated Terraform Enterprise to HCP Terraform Cloud.',
      "Led delivery of Epic's first cloud-based render farm using Deadline Cloud on AWS EKS; infrastructure managed via Terraform, EC2 worker images built with Packer (Windows/Linux), deployed through GitHub Actions.",
      'Maintained and extended ArgoCD-based GitOps workflows, authoring ApplicationSets across multiple environments; served as on-call SME for two large-scale Vault instances.',
    ],
  },
  {
    title: 'SR. SITE RELIABILITY ENGINEER',
    company: 'Twitter',
    period: '2022',
    details: [
      "Embedded with Twitter's in-memory caching teams supporting Twemcache, Redis, and Pelikan across a massive on-prem infrastructure.",
      'Focused on cloud migration strategy and observability modernization for latency-sensitive, high-availability caching systems.',
    ],
  },
  {
    title: 'SR. SITE RELIABILITY ENGINEER',
    company: 'Electronic Arts',
    period: '2019 – 2022',
    details: [
      'Built and promoted a cloud-native, Kubernetes-centric platform for game servers, focused on scalability and operational efficiency.',
      "Embedded with the observability team to improve reliability and scalability of EA's centralized monitoring stack (Prometheus, Cortex, Grafana, ELK, Loki); identified and resolved service bottlenecks, significantly reducing downtime and time to recovery.",
      'Partnered with game studios org-wide to drive observability adoption and integrate with centralized monitoring, logging, and alerting platforms.',
      'Organized pre-launch war games sessions to stress-test and document service resilience; provided LiveOps support across multiple game launches.',
    ],
  },
  {
    title: 'LEAD SYSTEMS ENGINEER',
    company: 'Electronic Arts',
    period: '2015 – 2019',
    details: [
      'Led systems engineering for FIFA, driving configuration management modernization across Puppet and Chef.',
      'Developed Terraform CI/CD pipelines for IaC across on-prem and cloud environments.',
      'Owned Systems Engineering code review approvals, establishing code standards and best practices org-wide.',
      'Provided LiveOps war room support across game launches, including capacity planning, storage and systems monitoring, and security remediation.',
    ],
  },
  {
    title: 'SR. SYSTEMS ENGINEER',
    company: 'CBS Interactive',
    period: '2008 – 2015',
    details: [
      'Led storage administration across 80+ appliances and 1PB+ of data (Hitachi, NetApp, HP/3Par, EMC/Isilon); engineered storage tiers for video encoding, virtualization, and Oracle databases; owned yearly storage budgeting and purchasing decisions.',
      'Managed 2,000+ VMware virtual machines across multiple clusters; automated BIOS and driver updates through hardware/VMware integration; administered the full stack from ESXi to networking and vCOPS monitoring.',
      'Rationalized a global footprint from 8,000 servers across 8 datacenters down to ~5,000 servers across 4, while expanding the number of supported properties.',
      'Drove video infrastructure expansion in partnership with encoding teams, re-architecting storage and high-bandwidth file transfer pipelines to support orders-of-magnitude growth in video production.',
      'Migrated third-party IaaS-hosted sites to an in-house private cloud model, reducing costs and enabling a DevOps-style workflow for development teams.',
      'Provided LiveOps support for CBS News, CBS Sports, CNET, Gamespot, Last.FM, and Showtime through high-traffic events including March Madness, E3, CES, and NFL season.',
    ],
  },
  {
    title: 'UNIX ADMINISTRATOR',
    company: 'Right Media / Yahoo Inc.',
    period: '2005 – 2008',
    details: [
      'Founding IT team member; contributed to key hiring decisions across Networking, Security, Systems, Dev, and Corporate IT.',
      'Scaled the ad serving network from 300 to 5,000+ nodes, developing CFEngine-based automation for provisioning and ongoing maintenance.',
      "Integrated Right Media's infrastructure into Yahoo's datacenters, hardware, and OS stack post-acquisition.",
      'Administered LDAP, DNS, DHCP, mail, syslog, and other core services with full redundancy across dev, QA, and production.',
      'Managed user accounts in compliance with Sarbanes-Oxley access and audit requirements.',
    ],
  },
  {
    title: 'SYSTEMS ADMINISTRATOR',
    company: 'Bolt Media',
    period: '2003 – 2005',
    details: [
      'Administered and optimized a high-availability Java web platform on JBoss and Apache, focusing on performance, security hardening, and uptime.',
      'Managed MySQL infrastructure including replication, automated backups, and configuration.',
      'Built a monitoring stack around Nagios and Cacti, replacing ad-hoc tooling with a stable, reliable solution.',
      'Developed a Linux server deployment scripting suite for consistent, repeatable provisioning.',
      'Contributed to an Active Directory migration, including Exchange 2003 rollout for company email.',
    ],
  },
  {
    title: 'IT MANAGER',
    company: 'Agra Services Brokerage Co.',
    period: '2001 – 2003',
    details: [
      'Sole IT owner for 120+ users across office, mobile, and partner environments; managed all hardware/software procurement and server infrastructure.',
      'Brought email in-house using qmail, cutting junk mail by 80%+ with SpamAssassin and ClamAV.',
      'Migrated 60+ desktops from Windows to diskless Linux terminals via LTSP, eliminating desktop virus issues and consolidating maintenance onto a single server.',
      'Implemented VPN and a new security policy to harden the network against intrusion and enable secure remote access.',
      'Built and maintained FileMaker Pro databases for time & attendance, invoicing, inventory, and accounting.',
    ],
  },
];

const ExperienceSection: React.FC<{ jobs?: JobDetails[] }> = ({ jobs = defaultJobs }) => {
  return (
    <section>
      <TerminalPrompt command="git log --experience" />
      <div className="pl-4 md:pl-8 space-y-8">
        {jobs.map((job, index) => (
          <div key={index} className="border-l-4 border-[#00ffcc] pl-4 md:pl-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
              <h3 className="text-base md:text-xl text-[#64ffda]">{job.title}</h3>
              <span className="text-[#888] text-sm">{job.period}</span>
            </div>
            <p className="text-[#00ffcc] mb-3 text-lg">{job.company}</p>
            <ul className="space-y-2">
              {job.details.map((detail, idx) => (
                <li key={idx} className="text-[#ccc] text-sm flex items-start gap-2">
                  <span className="text-[#ff9500] flex-shrink-0">▸</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;

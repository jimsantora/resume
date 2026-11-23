// Single source of truth for resume content. The website renders from here, and
// scripts/gen-tui-content.cjs generates the TUI's content from it.

export const profile = {
  name: 'Jim Santora',
  first: 'Jim',
  last: 'Santora',
  title: 'Staff Engineer',
  discipline: 'Platform & Site Reliability',
  pitch: '25 years leaving systems better than I found them, across gaming, media, and ad-tech.',
  employers: ['2K Games', 'Epic Games', 'Twitter', 'Electronic Arts', 'CBS Interactive', 'Yahoo'],
  host: 'resume',
  user: 'jim',
};

export const links = {
  github: { label: 'github.com/jimsantora', href: 'https://github.com/jimsantora' },
  linkedin: { label: 'linkedin.com/in/jimsantora', href: 'https://www.linkedin.com/in/jimsantora' },
} as const;

export const about: string[] = [
  "I'm a platform and site reliability engineer. I care as much about why systems break as about keeping them up, and most of my time goes into building platforms that scale and tooling that makes the engineers around me faster.",
  "Games have shaped how I think about reliability more than anything else. Millions of players don't care about your deployment window, and neither does a launch date. That pressure builds good instincts. I've been credited on 15 shipped titles and counting.",
  "I'm as comfortable reasoning about storage architecture or Kubernetes platform design as I am writing automation, reviewing code, or working a production incident. I'm drawn to the problems that sit between teams, the ones nobody else owns, and I tend to leave behind tooling and standards that outlast my involvement.",
  "Outside of work I run a homelab, follow the games industry closely, dabble in electronic music, and travel when I can. I build with Claude Code every day and teach other engineers to do the same; agentic tooling is changing what a productive engineer looks like.",
];

export const specialties = [
  'platform engineering',
  'kubernetes',
  'CI/CD',
  'GitOps',
  'observability',
  'infrastructure-as-code',
  'incident response',
];

export interface SkillGroup {
  dir: string;
  label: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  { dir: 'cloud', label: 'Cloud & Infrastructure', items: ['AWS', 'GCP', 'Azure', 'Packer', 'GNU/Linux'] },
  {
    dir: 'containers',
    label: 'Containers & Orchestration',
    items: ['Kubernetes', 'Docker', 'Helm', 'Harbor', 'Artifactory'],
  },
  { dir: 'ci-cd', label: 'CI/CD & GitOps', items: ['GitLab CI', 'GitHub Actions', 'ArgoCD', 'Jenkins', 'Git'] },
  {
    dir: 'ai',
    label: 'AI & Tooling',
    items: ['Claude Code', 'MCP Servers', 'Context Engineering', 'RAG', 'SDD', 'Agentic Workflows'],
  },
  { dir: 'iac', label: 'IaC & Config Management', items: ['Terraform', 'Vault', 'Puppet', 'Chef', 'Ansible'] },
  {
    dir: 'observability',
    label: 'Observability',
    items: ['Prometheus', 'Grafana', 'ELK Stack', 'Loki', 'OpenTelemetry'],
  },
  {
    dir: 'data',
    label: 'Data & Messaging',
    items: ['MySQL', 'MariaDB', 'PostgreSQL', 'Redis', 'Memcached', 'Kafka', 'RabbitMQ'],
  },
  { dir: 'languages', label: 'Languages', items: ['Python', 'Bash', 'Go', 'PowerShell', 'Perl'] },
];

export interface Job {
  title: string;
  company: string;
  period: string;
  details: string[];
}

export const jobs: Job[] = [
  {
    title: 'Staff DevOps Engineer',
    company: '2K Games',
    period: '2026 – present',
    details: [
      "Created and lead AI LevelUP, 2K Platform Engineering's AI training program: launched it for my team, expanded it across all of Platform Engineering within a month, and teach Claude Code, MCP servers, spec-driven design, and skill authoring to 25+ engineers live and async. Built the internal plugin marketplace where engineers now publish skills of their own.",
      "Led the first zero-downtime migrations onto 2K's new platform: went from learning the process to migrating a live service solo in my second month, then led a cross-team re-migration on a compressed timeline that succeeded on the first attempt.",
      'Built the platform handbook that became its single source of truth: an AI-powered system that compiles facts from GitHub, Jira, Confluence, Spotify Portal, and AWS into onboarding guides, runbooks, and a full inventory of accounts, clusters, and services, and grades every source for staleness. New engineers onboard with it; managers and partner teams rely on it.',
      "Leading 2K's adoption of the AWS DevOps Agent, an AI incident-response tool now running across 32 services; authored the two approved designs that connect it to Datadog through a purpose-built read-only integration and lock it down with least-privilege access.",
      "Drive standards across Platform Engineering's four teams: authored a governance proposal that unifies three teams' parallel efforts into one policy set, enforced in EKS and validated in CI, and serve as the technical interviewer for Staff-level platform hires.",
    ],
  },
  {
    title: 'Sr. Site Reliability Engineer',
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
    title: 'Sr. Site Reliability Engineer',
    company: 'Twitter',
    period: '2022',
    details: [
      "Embedded with Twitter's in-memory caching teams supporting Twemcache, Redis, and Pelikan across a massive on-prem infrastructure.",
      'Focused on cloud migration strategy and observability modernization for latency-sensitive, high-availability caching systems.',
    ],
  },
  {
    title: 'Sr. Site Reliability Engineer',
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
    title: 'Lead Systems Engineer',
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
    title: 'Sr. Systems Engineer',
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
    title: 'Unix Administrator',
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
    title: 'Systems Administrator',
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
    title: 'IT Manager',
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

export interface Credit {
  title: string;
  year: string;
  role: string;
  image: string;
}

const credit = (title: string, year: string, role: string): Credit => ({
  title,
  year,
  role,
  image: `/resume/images/${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`,
});

// Fortnite leads as the marquee title; the rest run newest first.
export const credits: Credit[] = [
  credit('FORTNITE', '2017', 'Sr. Site Reliability Engineer'),
  credit('NEED FOR SPEED: UNBOUND', '2022', 'Senior DevOps Engineer'),
  credit('FIFA 22', '2021', 'Senior DevOps Engineer'),
  credit('Battlefield 2042', '2021', 'Senior DevOps Engineer'),
  credit('MADDEN NFL 22', '2021', 'Senior DevOps Engineer'),
  credit('FIFA 21', '2020', 'Senior DevOps Engineer'),
  credit('MADDEN NFL 21', '2020', 'Sr. DevOps Engineer'),
  credit('STAR WARS: SQUADRONS', '2020', 'Sr. DevOps Engineer'),
  credit('FIFA 20', '2019', 'Sr. DevOps Engineer / Lead'),
  credit('PLANTS VS ZOMBIES: BATTLE FOR NEIGHBORVILLE', '2019', 'Techops Service Engineering'),
  credit('FIFA 19', '2018', 'Sr. Systems Engineer'),
  credit('FIFA 18', '2017', 'Sr. Storage Engineer'),
  credit('NEED FOR SPEED: PAYBACK', '2017', 'Sr. Systems Engineer, Storage'),
  credit('FIFA 17', '2016', 'EADP Tech Ops'),
  credit('PLANTS VS ZOMBIES: GARDEN WARFARE 2', '2016', 'Tech Ops'),
];

/** Stable URL slug for a job, e.g. `epic-games-2022`. */
export function jobSlug(job: Job): string {
  const company = job.company.split('/')[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
  return `${company}-${job.period.match(/\d{4}/)?.[0] ?? ''}`;
}

/** Title-case display for ALL-CAPS game titles, keeping known acronyms. */
export function displayTitle(t: string): string {
  const keep = new Set(['FIFA', 'NFL', 'II']);
  return t
    .split(' ')
    .map(w => {
      const bare = w.replace(/[^A-Za-z0-9]/g, '');
      if (keep.has(bare.toUpperCase()) || /\d/.test(bare)) return w.toUpperCase();
      if (bare.toLowerCase() === 'vs') return 'vs';
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(' ');
}

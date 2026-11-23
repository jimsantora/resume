// Generated from lib/resume.ts
window.RESUME = {
 "profile": {
  "name": "Jim Santora",
  "first": "Jim",
  "last": "Santora",
  "title": "Staff Engineer",
  "discipline": "Platform & Site Reliability",
  "pitch": "20+ years leaving systems better than I found them, across gaming, media, and ad-tech.",
  "employers": [
   "2K Games",
   "Epic Games",
   "Twitter",
   "Electronic Arts",
   "CBS Interactive",
   "Yahoo"
  ],
  "host": "resume",
  "user": "jim"
 },
 "links": {
  "github": {
   "label": "github.com/jimsantora",
   "href": "https://github.com/jimsantora"
  },
  "linkedin": {
   "label": "linkedin.com/in/jimsantora",
   "href": "https://www.linkedin.com/in/jimsantora"
  }
 },
 "about": [
  "I'm a platform and site reliability engineer with 20+ years of experience and a simple philosophy: leave every system better than you found it. I care deeply about the craft — not just keeping things running, but understanding why they break, building platforms that scale, and making the engineers around me more effective.",
  "I've spent most of my career at the intersection of infrastructure and software, working across gaming, media, and ad-tech. The gaming industry in particular has shaped how I think about reliability — millions of players don't care about your deployment window, and neither does a live game launch. That pressure builds good instincts. I've been credited on 15 shipped titles and counting.",
  "My technical range runs broad by design. I'm as comfortable reasoning about storage architecture or Kubernetes platform design as I am writing automation, reviewing code, or debugging a production incident at 2am. I gravitate toward problems that sit between teams — the ones nobody else owns — and I tend to leave behind tooling and standards that outlast my involvement.",
  "Outside of work I run a homelab, follow the games industry closely, dabble in electronic music, and travel when I can. I've been an early and enthusiastic adopter of AI-assisted engineering — I build with Claude Code daily and believe agentic tooling is changing what it means to be a productive engineer."
 ],
 "specialties": [
  "platform engineering",
  "kubernetes",
  "CI/CD",
  "GitOps",
  "observability",
  "infrastructure-as-code",
  "incident response"
 ],
 "skills": [
  {
   "dir": "cloud",
   "label": "Cloud & Infrastructure",
   "items": [
    "AWS",
    "GCP",
    "Azure",
    "Packer",
    "GNU/Linux"
   ]
  },
  {
   "dir": "containers",
   "label": "Containers & Orchestration",
   "items": [
    "Kubernetes",
    "Docker",
    "Helm",
    "Harbor",
    "Artifactory"
   ]
  },
  {
   "dir": "ci-cd",
   "label": "CI/CD & GitOps",
   "items": [
    "GitLab CI",
    "GitHub Actions",
    "ArgoCD",
    "Jenkins",
    "Git"
   ]
  },
  {
   "dir": "ai",
   "label": "AI & Tooling",
   "items": [
    "Claude Code",
    "MCP Servers",
    "Context Engineering",
    "RAG",
    "SDD",
    "Agentic Workflows"
   ]
  },
  {
   "dir": "iac",
   "label": "IaC & Config Management",
   "items": [
    "Terraform",
    "Vault",
    "Puppet",
    "Chef",
    "Ansible"
   ]
  },
  {
   "dir": "observability",
   "label": "Observability",
   "items": [
    "Prometheus",
    "Grafana",
    "ELK Stack",
    "Loki",
    "OpenTelemetry"
   ]
  },
  {
   "dir": "data",
   "label": "Data & Messaging",
   "items": [
    "MySQL",
    "MariaDB",
    "PostgreSQL",
    "Redis",
    "Memcached",
    "Kafka",
    "RabbitMQ"
   ]
  },
  {
   "dir": "languages",
   "label": "Languages",
   "items": [
    "Python",
    "Bash",
    "Go",
    "PowerShell",
    "Perl"
   ]
  }
 ],
 "jobs": [
  {
   "title": "Staff DevOps Engineer",
   "company": "2K Games",
   "period": "Jun 2026 – present",
   "details": [],
   "slug": "2k-games-2026"
  },
  {
   "title": "Sr. Site Reliability Engineer",
   "company": "Epic Games",
   "period": "2022 – Jun 2026",
   "details": [
    "Owned GitHub Enterprise Server internally, including autoscaling runners in EKS via Actions Runner Controller (ARC); designed custom dashboards surfacing service health, user experience, and usage hot spots down to the workflow level; built automation workflows for admin and governance tasks.",
    "Administered Epic's GitHub.com Enterprise accounts, including one of the largest private orgs on the platform (~500K members); managed licensing and cost optimization across internal and external GitHub instances.",
    "Served on Epic's Open Tech Council, a cross-disciplinary advisory board responsible for vetting, organizing, and publishing the company's open source projects and contributions.",
    "Led platform engineering for the Pipelines team; migrated Jenkins workflows to GitHub Actions, established a reusable GHA library with contribution standards adopted org-wide, and migrated Terraform Enterprise to HCP Terraform Cloud.",
    "Led delivery of Epic's first cloud-based render farm using Deadline Cloud on AWS EKS; infrastructure managed via Terraform, EC2 worker images built with Packer (Windows/Linux), deployed through GitHub Actions.",
    "Maintained and extended ArgoCD-based GitOps workflows, authoring ApplicationSets across multiple environments; served as on-call SME for two large-scale Vault instances."
   ],
   "slug": "epic-games-2022"
  },
  {
   "title": "Sr. Site Reliability Engineer",
   "company": "Twitter",
   "period": "2022",
   "details": [
    "Embedded with Twitter's in-memory caching teams supporting Twemcache, Redis, and Pelikan across a massive on-prem infrastructure.",
    "Focused on cloud migration strategy and observability modernization for latency-sensitive, high-availability caching systems."
   ],
   "slug": "twitter-2022"
  },
  {
   "title": "Sr. Site Reliability Engineer",
   "company": "Electronic Arts",
   "period": "2019 – 2022",
   "details": [
    "Built and promoted a cloud-native, Kubernetes-centric platform for game servers, focused on scalability and operational efficiency.",
    "Embedded with the observability team to improve reliability and scalability of EA's centralized monitoring stack (Prometheus, Cortex, Grafana, ELK, Loki); identified and resolved service bottlenecks, significantly reducing downtime and time to recovery.",
    "Partnered with game studios org-wide to drive observability adoption and integrate with centralized monitoring, logging, and alerting platforms.",
    "Organized pre-launch war games sessions to stress-test and document service resilience; provided LiveOps support across multiple game launches."
   ],
   "slug": "electronic-arts-2019"
  },
  {
   "title": "Lead Systems Engineer",
   "company": "Electronic Arts",
   "period": "2015 – 2019",
   "details": [
    "Led systems engineering for FIFA, driving configuration management modernization across Puppet and Chef.",
    "Developed Terraform CI/CD pipelines for IaC across on-prem and cloud environments.",
    "Owned Systems Engineering code review approvals, establishing code standards and best practices org-wide.",
    "Provided LiveOps war room support across game launches, including capacity planning, storage and systems monitoring, and security remediation."
   ],
   "slug": "electronic-arts-2015"
  },
  {
   "title": "Sr. Systems Engineer",
   "company": "CBS Interactive",
   "period": "2008 – 2015",
   "details": [
    "Led storage administration across 80+ appliances and 1PB+ of data (Hitachi, NetApp, HP/3Par, EMC/Isilon); engineered storage tiers for video encoding, virtualization, and Oracle databases; owned yearly storage budgeting and purchasing decisions.",
    "Managed 2,000+ VMware virtual machines across multiple clusters; automated BIOS and driver updates through hardware/VMware integration; administered the full stack from ESXi to networking and vCOPS monitoring.",
    "Rationalized a global footprint from 8,000 servers across 8 datacenters down to ~5,000 servers across 4, while expanding the number of supported properties.",
    "Drove video infrastructure expansion in partnership with encoding teams, re-architecting storage and high-bandwidth file transfer pipelines to support orders-of-magnitude growth in video production.",
    "Migrated third-party IaaS-hosted sites to an in-house private cloud model, reducing costs and enabling a DevOps-style workflow for development teams.",
    "Provided LiveOps support for CBS News, CBS Sports, CNET, Gamespot, Last.FM, and Showtime through high-traffic events including March Madness, E3, CES, and NFL season."
   ],
   "slug": "cbs-interactive-2008"
  },
  {
   "title": "Unix Administrator",
   "company": "Right Media / Yahoo Inc.",
   "period": "2005 – 2008",
   "details": [
    "Founding IT team member; contributed to key hiring decisions across Networking, Security, Systems, Dev, and Corporate IT.",
    "Scaled the ad serving network from 300 to 5,000+ nodes, developing CFEngine-based automation for provisioning and ongoing maintenance.",
    "Integrated Right Media's infrastructure into Yahoo's datacenters, hardware, and OS stack post-acquisition.",
    "Administered LDAP, DNS, DHCP, mail, syslog, and other core services with full redundancy across dev, QA, and production.",
    "Managed user accounts in compliance with Sarbanes-Oxley access and audit requirements."
   ],
   "slug": "right-media-2005"
  },
  {
   "title": "Systems Administrator",
   "company": "Bolt Media",
   "period": "2003 – 2005",
   "details": [
    "Administered and optimized a high-availability Java web platform on JBoss and Apache, focusing on performance, security hardening, and uptime.",
    "Managed MySQL infrastructure including replication, automated backups, and configuration.",
    "Built a monitoring stack around Nagios and Cacti, replacing ad-hoc tooling with a stable, reliable solution.",
    "Developed a Linux server deployment scripting suite for consistent, repeatable provisioning.",
    "Contributed to an Active Directory migration, including Exchange 2003 rollout for company email."
   ],
   "slug": "bolt-media-2003"
  },
  {
   "title": "IT Manager",
   "company": "Agra Services Brokerage Co.",
   "period": "2001 – 2003",
   "details": [
    "Sole IT owner for 120+ users across office, mobile, and partner environments; managed all hardware/software procurement and server infrastructure.",
    "Brought email in-house using qmail, cutting junk mail by 80%+ with SpamAssassin and ClamAV.",
    "Migrated 60+ desktops from Windows to diskless Linux terminals via LTSP, eliminating desktop virus issues and consolidating maintenance onto a single server.",
    "Implemented VPN and a new security policy to harden the network against intrusion and enable secure remote access.",
    "Built and maintained FileMaker Pro databases for time & attendance, invoicing, inventory, and accounting."
   ],
   "slug": "agra-services-brokerage-co-2001"
  }
 ],
 "credits": [
  {
   "title": "Fortnite",
   "year": "2017",
   "role": "Sr. Site Reliability Engineer",
   "image": "images/fortnite.jpg"
  },
  {
   "title": "Need For Speed: Unbound",
   "year": "2022",
   "role": "Senior DevOps Engineer",
   "image": "images/need-for-speed--unbound.jpg"
  },
  {
   "title": "FIFA 22",
   "year": "2021",
   "role": "Senior DevOps Engineer",
   "image": "images/fifa-22.jpg"
  },
  {
   "title": "Battlefield 2042",
   "year": "2021",
   "role": "Senior DevOps Engineer",
   "image": "images/battlefield-2042.jpg"
  },
  {
   "title": "Madden NFL 22",
   "year": "2021",
   "role": "Senior DevOps Engineer",
   "image": "images/madden-nfl-22.jpg"
  },
  {
   "title": "FIFA 21",
   "year": "2020",
   "role": "Senior DevOps Engineer",
   "image": "images/fifa-21.jpg"
  },
  {
   "title": "Madden NFL 21",
   "year": "2020",
   "role": "Sr. DevOps Engineer",
   "image": "images/madden-nfl-21.jpg"
  },
  {
   "title": "Star Wars: Squadrons",
   "year": "2020",
   "role": "Sr. DevOps Engineer",
   "image": "images/star-wars--squadrons.jpg"
  },
  {
   "title": "FIFA 20",
   "year": "2019",
   "role": "Sr. DevOps Engineer / Lead",
   "image": "images/fifa-20.jpg"
  },
  {
   "title": "Plants vs Zombies: Battle For Neighborville",
   "year": "2019",
   "role": "Techops Service Engineering",
   "image": "images/plants-vs-zombies--battle-for-neighborville.jpg"
  },
  {
   "title": "FIFA 19",
   "year": "2018",
   "role": "Sr. Systems Engineer",
   "image": "images/fifa-19.jpg"
  },
  {
   "title": "FIFA 18",
   "year": "2017",
   "role": "Sr. Storage Engineer",
   "image": "images/fifa-18.jpg"
  },
  {
   "title": "Need For Speed: Payback",
   "year": "2017",
   "role": "Sr. Systems Engineer, Storage",
   "image": "images/need-for-speed--payback.jpg"
  },
  {
   "title": "FIFA 17",
   "year": "2016",
   "role": "EADP Tech Ops",
   "image": "images/fifa-17.jpg"
  },
  {
   "title": "Plants vs Zombies: Garden Warfare 2",
   "year": "2016",
   "role": "Tech Ops",
   "image": "images/plants-vs-zombies--garden-warfare-2.jpg"
  }
 ]
};

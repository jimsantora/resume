import React from 'react';
import * as SimpleIcons from 'simple-icons';
import { Cloud, Box, GitBranch, Brain, Wrench, Gauge, Database, Code } from 'lucide-react';
import TerminalPrompt from './TerminalPrompt';

const getIcon = (name: string): { svg: string } | undefined => {
  const iconName = `si${name}` as keyof typeof SimpleIcons;
  return SimpleIcons[iconName] as { svg: string } | undefined;
};

// Row 1
const row1: SkillCategory[] = [
  {
    category: 'Cloud & Infrastructure',
    icon: Cloud,
    skills: [
      { name: 'AWS', iconKey: 'Amazonaws' },
      { name: 'GCP', iconKey: 'Googlecloud' },
      { name: 'Azure', iconKey: 'Microsoftazure' },
      { name: 'Packer', iconKey: 'Packer' },
      { name: 'GNU/Linux', iconKey: 'Linux' },
    ],
  },
  {
    category: 'Containers & Orchestration',
    icon: Box,
    skills: [
      { name: 'Kubernetes', iconKey: 'Kubernetes' },
      { name: 'Docker', iconKey: 'Docker' },
      { name: 'Helm', iconKey: 'Helm' },
      { name: 'Harbor', iconKey: 'Harbor' },
      { name: 'Artifactory', iconKey: 'Jfrog' },
    ],
  },
];

// Row 2
const row2: SkillCategory[] = [
  {
    category: 'CI/CD & GitOps',
    icon: GitBranch,
    skills: [
      { name: 'GitLab CI', iconKey: 'Gitlab' },
      { name: 'GitHub Actions', iconKey: 'Githubactions' },
      { name: 'ArgoCD', iconKey: 'Argo' },
      { name: 'Jenkins', iconKey: 'Jenkins' },
      { name: 'Git', iconKey: 'Git' },
    ],
  },
  {
    category: 'AI & Tooling',
    icon: Brain,
    skills: [
      { name: 'Claude Code', iconKey: 'Anthropic' },
      { name: 'MCP Servers', iconKey: 'Anthropic' },
      { name: 'Context Engineering', iconKey: '' },
      { name: 'RAG', iconKey: '' },
      { name: 'SDD', iconKey: '' },
      { name: 'Agentic Workflows', iconKey: '' },
    ],
  },
];

// Row 3
const row3: SkillCategory[] = [
  {
    category: 'IaC & Config Management',
    icon: Wrench,
    skills: [
      { name: 'Terraform', iconKey: 'Terraform' },
      { name: 'Vault', iconKey: 'Vault' },
      { name: 'Puppet', iconKey: 'Puppet' },
      { name: 'Chef', iconKey: 'Chef' },
      { name: 'Ansible', iconKey: 'Ansible' },
    ],
  },
  {
    category: 'Observability',
    icon: Gauge,
    skills: [
      { name: 'Prometheus', iconKey: 'Prometheus' },
      { name: 'Grafana', iconKey: 'Grafana' },
      { name: 'ELK Stack', iconKey: 'Elastic' },
      { name: 'Loki', iconKey: 'Grafanaloki' },
      { name: 'OpenTelemetry', iconKey: 'Opentelemetry' },
    ],
  },
];

// Row 4
const row4: SkillCategory[] = [
  {
    category: 'Data & Messaging',
    icon: Database,
    skills: [
      { name: 'MySQL', iconKey: 'Mysql' },
      { name: 'MariaDB', iconKey: 'Mariadb' },
      { name: 'PostgreSQL', iconKey: 'Postgresql' },
      { name: 'Redis', iconKey: 'Redis' },
      { name: 'Memcached', iconKey: 'Memcached' },
      { name: 'Kafka', iconKey: 'Apachekafka' },
      { name: 'RabbitMQ', iconKey: 'Rabbitmq' },
    ],
  },
  {
    category: 'Languages',
    icon: Code,
    skills: [
      { name: 'Python', iconKey: 'Python' },
      { name: 'Bash', iconKey: 'Gnubash' },
      { name: 'Go', iconKey: 'Go' },
      { name: 'PowerShell', iconKey: 'Powershell' },
      { name: 'Perl', iconKey: 'Perl' },
    ],
  },
];

interface SkillCategory {
  category: string;
  icon: React.ElementType;
  skills: { name: string; iconKey: string }[];
}

const allCategories = [...row1, ...row2, ...row3, ...row4];

function SkillCard({ category, icon: Icon, skills }: SkillCategory) {
  return (
    <div className="border border-[#30363d] bg-[#161b22] p-4 rounded">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-[#64ffda]" />
        <h3 className="text-[#00ffcc]">{category}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => {
          const icon = getIcon(skill.iconKey);
          return (
            <span
              key={skill.name}
              className="px-2 py-1 bg-[#0d1117] border border-[#30363d] text-[#ccc] text-sm rounded flex items-center gap-2 hover:border-[#ff9500] transition-colors cursor-default"
            >
              {icon && (
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 flex-shrink-0"
                  fill="currentColor"
                  dangerouslySetInnerHTML={{ __html: icon.svg }}
                />
              )}
              {skill.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

const SkillsSection: React.FC = () => {
  return (
    <section>
      <TerminalPrompt command="ls -la /skills" />
      <div className="pl-4 md:pl-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {allCategories.map(cat => (
          <SkillCard key={cat.category} {...cat} />
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;

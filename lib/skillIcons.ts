// Display icons for the skills section. Content lives in lib/resume.ts; this file only maps
// names to icons, so a skill without an entry simply renders without one.
import * as SimpleIcons from 'simple-icons';
import { Box, Brain, Cloud, Code, Database, Gauge, GitBranch, Wrench, type LucideIcon } from 'lucide-react';

/** Simple Icons key (without the `si` prefix) per skill name. */
const ICON_KEYS: Record<string, string> = {
  AWS: 'Amazonaws',
  GCP: 'Googlecloud',
  Azure: 'Microsoftazure',
  Packer: 'Packer',
  'GNU/Linux': 'Linux',
  Kubernetes: 'Kubernetes',
  Docker: 'Docker',
  Helm: 'Helm',
  Harbor: 'Harbor',
  Artifactory: 'Jfrog',
  'GitLab CI': 'Gitlab',
  'GitHub Actions': 'Githubactions',
  ArgoCD: 'Argo',
  Jenkins: 'Jenkins',
  Git: 'Git',
  'Claude Code': 'Anthropic',
  'MCP Servers': 'Anthropic',
  Terraform: 'Terraform',
  Vault: 'Vault',
  Puppet: 'Puppet',
  Chef: 'Chef',
  Ansible: 'Ansible',
  Prometheus: 'Prometheus',
  Grafana: 'Grafana',
  'ELK Stack': 'Elastic',
  Loki: 'Grafanaloki',
  OpenTelemetry: 'Opentelemetry',
  MySQL: 'Mysql',
  MariaDB: 'Mariadb',
  PostgreSQL: 'Postgresql',
  Redis: 'Redis',
  Memcached: 'Memcached',
  Kafka: 'Apachekafka',
  RabbitMQ: 'Rabbitmq',
  Python: 'Python',
  Bash: 'Gnubash',
  Go: 'Go',
  PowerShell: 'Powershell',
  Perl: 'Perl',
};

export function skillIconSvg(name: string): string | undefined {
  const key = ICON_KEYS[name];
  if (!key) return undefined;
  const icon = SimpleIcons[`si${key}` as keyof typeof SimpleIcons] as { svg: string } | undefined;
  return icon?.svg;
}

/** Lucide icon per skill group (keyed by SkillGroup.dir). */
export const GROUP_ICONS: Record<string, LucideIcon> = {
  cloud: Cloud,
  containers: Box,
  'ci-cd': GitBranch,
  ai: Brain,
  iac: Wrench,
  observability: Gauge,
  data: Database,
  languages: Code,
};

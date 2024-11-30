import React from 'react';
import Image from 'next/image';
import { Cloud, Database, Code2, Activity, GitBranch } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

interface SkillsSectionProps {
  theme: 'light' | 'dark';
  categories?: SkillCategory[];
}

const defaultCategories: SkillCategory[] = [
  {
    title: 'Cloud & Infrastructure',
    icon: <Cloud className="w-6 h-6" />,
    skills: ['AWS', 'GCP', 'Azure', 'Terraform', 'Docker', 'Kubernetes'],
  },
  {
    title: 'Observability',
    icon: <Activity className="w-6 h-6" />,
    skills: ['Prometheus', 'Grafana', 'Elasticsearch', 'Logstash', 'Kibana'],
  },
  {
    title: 'CI/CD & DevOps',
    icon: <GitBranch className="w-6 h-6" />,
    skills: ['GitLab CI-CD', 'GitHub Actions', 'Jenkins', 'Argo', 'Packer'],
  },
  {
    title: 'Configuration & Automation',
    icon: <Code2 className="w-6 h-6" />,
    skills: ['Puppet', 'Chef', 'Ansible', 'Python', 'Go', 'Shell'],
  },
  {
    title: 'Storage & Data',
    icon: <Database className="w-6 h-6" />,
    skills: ['NetApp', 'Isilon', '3Par', 'MySQL', 'PostgreSQL', 'Redis'],
  },
];

const SkillsSection: React.FC<SkillsSectionProps> = ({ theme, categories = defaultCategories }) => {
  const getSkillImage = (skill: string) => {
    return `/resume/images/${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}.${skill.endsWith('.png') ? 'png' : 'svg'}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`skill-card ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/90'}`}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="skill-icon-container">{category.icon}</div>
            <h3 className="text-2xl font-bold text-orange-500">{category.title}</h3>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {category.skills.map((skill, idx) => (
              <div
                key={idx}
                className={`group p-6 rounded-lg flex flex-col items-center justify-center gap-4 
                  transition-all duration-300 hover:scale-105 hover:bg-orange-500/10 
                  ${theme === 'dark' ? 'text-green-400' : 'text-gray-700'}`}
              >
                <div className="relative w-16 h-16 transform transition-transform duration-300 group-hover:-translate-y-1">
                  <Image
                    src={getSkillImage(skill)}
                    alt={`${skill} logo`}
                    fill
                    className="object-contain filter group-hover:brightness-110"
                    sizes="64px"
                    onError={(e) => {
                      // Fallback to a default icon or hide the image container
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <span className="text-xs md:text-sm text-center font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;

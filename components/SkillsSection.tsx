import React from 'react';
import { Cloud, Database, Code2, Activity, GitBranch, Box } from 'lucide-react';

interface Skill {
  name: string;
  level: 'EXPERT' | 'ADVANCED' | 'INTERMEDIATE';
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

interface SkillsSectionProps {
  theme: 'light' | 'dark';
  categories?: SkillCategory[];
}

const defaultCategories: SkillCategory[] = [
  {
    title: 'Cloud Platforms',
    icon: <Cloud className="w-6 h-6" />,
    skills: [
      { name: 'AWS', level: 'EXPERT' },
      { name: 'GCP', level: 'ADVANCED' },
      { name: 'Azure', level: 'INTERMEDIATE' },
    ],
  },
  {
    title: 'Containers & Orchestration',
    icon: <Box className="w-6 h-6" />,
    skills: [
      { name: 'Kubernetes', level: 'EXPERT' },
      { name: 'Docker', level: 'EXPERT' },
      { name: 'Helm', level: 'EXPERT' },
    ],
  },
  {
    title: 'Observability',
    icon: <Activity className="w-6 h-6" />,
    skills: [
      { name: 'Prometheus', level: 'EXPERT' },
      { name: 'Grafana', level: 'EXPERT' },
      { name: 'ELK Stack', level: 'ADVANCED' },
    ],
  },
  {
    title: 'Storage Solutions',
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: 'NetApp', level: 'EXPERT' },
      { name: 'Isilon', level: 'ADVANCED' },
      { name: '3Par', level: 'ADVANCED' },
    ],
  },
  {
    title: 'Configuration Management',
    icon: <Code2 className="w-6 h-6" />,
    skills: [
      { name: 'Puppet', level: 'EXPERT' },
      { name: 'Chef', level: 'EXPERT' },
      { name: 'Terraform', level: 'EXPERT' },
    ],
  },
  {
    title: 'DevOps & CI/CD',
    icon: <GitBranch className="w-6 h-6" />,
    skills: [
      { name: 'GitLab CI-CD', level: 'EXPERT' },
      { name: 'GitHub Actions', level: 'ADVANCED' },
      { name: 'Jenkins', level: 'EXPERT' },
    ],
  },
];

const SkillsSection: React.FC<SkillsSectionProps> = ({ theme, categories = defaultCategories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category, index) => (
        <div key={index} className="skill-card">
          <div className="flex items-center gap-4 mb-6">
            <div className="skill-icon-container">{category.icon}</div>
            <h3 className="text-xl font-bold text-orange-500">{category.title}</h3>
          </div>

          <div className="space-y-4">
            {category.skills.map((skill, idx) => (
              <div key={idx} className={theme === 'dark' ? 'text-green-400' : 'text-gray-700'}>
                <div className="flex justify-between items-center mb-1">
                  <span>{skill.name}</span>
                  <span className="text-sm opacity-75">{skill.level}</span>
                </div>
                <div className="skill-progress-bar">
                  <div
                    className={`h-full transition-all duration-300 ${
                      skill.level === 'EXPERT'
                        ? 'bg-green-500 w-full'
                        : skill.level === 'ADVANCED'
                          ? 'bg-blue-500 w-4/5'
                          : 'bg-yellow-500 w-3/5'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;

import React, { useState } from 'react';
import { Cloud, Database, Code2, Activity, GitBranch, Box, Server } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import TerminalWindow from './TerminalWindow';
import Image from 'next/image';

// Types
interface SkillLevel {
  label: string;
  color: string;
}

interface SkillLevels {
  EXPERT: SkillLevel;
  ADVANCED: SkillLevel;
  INTERMEDIATE: SkillLevel;
}

interface Skill {
  name: string;
  level: keyof SkillLevels;
}

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  skills: Skill[];
}

interface SkillCardProps {
  category: Category;
  skills: Skill[];
  theme: 'light' | 'dark';
  onHover: (categoryId: string | null) => void;
}

const SKILL_LEVELS: SkillLevels = {
  EXPERT: { label: 'Expert', color: 'bg-green-500' },
  ADVANCED: { label: 'Advanced', color: 'bg-blue-500' },
  INTERMEDIATE: { label: 'Intermediate', color: 'bg-yellow-500' },
};

// Skill Card Component
const SkillCard: React.FC<SkillCardProps> = ({ category, skills, theme, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        relative p-6 rounded-lg border-2 border-orange-500
        transform transition-all duration-300
        ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}
        hover:scale-105 hover:shadow-lg
      `}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover(category.id);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHover(null);
      }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`
          p-3 rounded-lg
          ${theme === 'dark' ? 'bg-orange-500/10' : 'bg-orange-500/5'}
          transform transition-all duration-300
          ${isHovered ? 'scale-110' : ''}
        `}
        >
          <category.icon className="w-6 h-6 text-orange-500" />
        </div>
        <h3 className="text-xl font-bold text-orange-500">{category.name}</h3>
      </div>

      <div className="space-y-4">
        {skills.map(skill => (
          <div
            key={skill.name}
            className={`
              relative overflow-hidden
              ${theme === 'dark' ? 'text-green-400' : 'text-gray-700'}
            `}
          >
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <Image
                  src={`/resume/images/${skill.name.toLowerCase()}.svg`}
                  alt={skill.name}
                  width={24}
                  height={24}
                  className="rounded"
                />
                <span>{skill.name}</span>
              </div>
              <span className="text-sm opacity-75">{SKILL_LEVELS[skill.level].label}</span>
            </div>

            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`
                  h-full ${SKILL_LEVELS[skill.level].color}
                  transition-all duration-1000 ease-out
                  ${isHovered ? 'w-full' : 'w-0'}
                `}
                style={{
                  width: isHovered
                    ? skill.level === 'EXPERT'
                      ? '100%'
                      : skill.level === 'ADVANCED'
                        ? '80%'
                        : '60%'
                    : '0%',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Skills data
const skillCategories: Category[] = [
  {
    id: 'cloud',
    name: 'Cloud Platforms',
    icon: Cloud,
    skills: [
      { name: 'AWS', level: 'EXPERT' },
      { name: 'GCP', level: 'ADVANCED' },
      { name: 'Azure', level: 'INTERMEDIATE' },
    ],
  },
  {
    id: 'containers',
    name: 'Containers & Orchestration',
    icon: Box,
    skills: [
      { name: 'Kubernetes', level: 'EXPERT' },
      { name: 'Docker', level: 'EXPERT' },
      { name: 'Harbor', level: 'ADVANCED' },
    ],
  },
  {
    id: 'monitoring',
    name: 'Observability',
    icon: Activity,
    skills: [
      { name: 'Prometheus', level: 'EXPERT' },
      { name: 'Grafana', level: 'EXPERT' },
      { name: 'ELK Stack', level: 'ADVANCED' },
    ],
  },
  {
    id: 'storage',
    name: 'Storage Solutions',
    icon: Database,
    skills: [
      { name: 'NetApp', level: 'EXPERT' },
      { name: 'EMC/Isilon', level: 'ADVANCED' },
      { name: '3Par Storage', level: 'ADVANCED' },
    ],
  },
  {
    id: 'automation',
    name: 'Configuration Management',
    icon: Code2,
    skills: [
      { name: 'Puppet', level: 'EXPERT' },
      { name: 'Chef', level: 'EXPERT' },
      { name: 'Terraform', level: 'EXPERT' },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & CI/CD',
    icon: GitBranch,
    skills: [
      { name: 'GitLab CI/CD', level: 'EXPERT' },
      { name: 'GitHub Actions', level: 'ADVANCED' },
      { name: 'Jenkins', level: 'EXPERT' },
      { name: 'GitOps', level: 'ADVANCED' },
    ],
  },
];

const Skills: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <TerminalWindow title="/home/jsantora/skills.mtrx" theme={theme}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
        {skillCategories.map(category => (
          <SkillCard
            key={category.id}
            category={category}
            skills={category.skills}
            theme={theme}
            onHover={setActiveCategory}
          />
        ))}
      </div>
    </TerminalWindow>
  );
};

export default Skills;

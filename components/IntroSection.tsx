import React from 'react';

interface IntroSectionProps {
  typedText: string;
  theme: 'dark' | 'light';
}

const IntroSection: React.FC<IntroSectionProps> = ({ typedText, theme }) => {
  return (
    <>
      <div className="intro-text-container">
        <span className="text-3xl font-bold">
          {typedText}
          <span className="animate-pulse">_</span>
        </span>
      </div>
      <p className="text-xl mb-6 text-orange-500">SR SITE RELIABILITY ENGINEER</p>
      <div className={`space-y-4 ${theme === 'dark' ? 'text-green-300' : 'text-gray-700'}`}>
        <p>
          As a Senior Site Reliability Engineer with over 20 years in the industry, I have built my
          career on architecting enterprise-scale solutions and driving technical strategy across
          organizations. Currently at Epic Games, I focus on advancing CI/CD and Infrastructure as
          Code practices, contributing to the foundational technology that powers both Fortnite and
          the Unreal Engine ecosystem while establishing technical standards that influence multiple
          teams.
        </p>
        <p>
          My seven-year tenure at Electronic Arts demonstrates my ability to drive long-term
          technical vision and organizational change. I progressed from leading FIFA&apos;s
          infrastructure modernization to architecting scalable platforms that served multiple game
          studios. I established company-wide best practices for cloud infrastructure and Kubernetes
          adoption while serving as a principal technical advisor for centralized monitoring and
          observability solutions. My architectural decisions and technical leadership supported
          major franchises including FIFA, Madden NFL, and Star Wars: Squadrons, where I designed
          resilient systems serving millions of players and mentored teams in operational
          excellence.
        </p>
        <p>
          My expertise in building comprehensive observability solutions has been fundamental to
          driving reliability at scale. By implementing robust monitoring frameworks using tools
          like Prometheus, Grafana, and the ELK stack, I&apos;ve enabled teams to gain deep insights
          into their systems&apos; behavior and performance. I excel at defining and tracking
          meaningful SLIs that align with business objectives, establishing realistic SLOs that
          balance reliability with innovation, and creating SLAs that build trust with stakeholders.
          This data-driven approach to reliability engineering, combined with my broad technical
          expertise in cloud platforms, container orchestration, and modern DevOps practices, allows
          me to identify and solve complex technical challenges at the organizational level through
          systematic problem-solving and automation.
        </p>
        <p>
          I am a systems thinker at heart, driven by a passion for creating scalable, maintainable
          infrastructure that enables organizational success. By combining deep technical expertise
          with strong collaborative skills, I help teams reduce operational overhead, increase
          stability, and accelerate their delivery capabilities. I focus on identifying and solving
          problems that impact multiple teams, creating reusable solutions, and establishing
          technical standards that improve efficiency across the organization. This strategic
          approach to engineering challenges, coupled with my ability to mentor and influence
          others, has consistently helped organizations work more efficiently and deliver more
          effectively.
        </p>
      </div>
    </>
  );
};

export default IntroSection;

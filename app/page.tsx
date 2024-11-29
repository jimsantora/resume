'use client';

import { useState, useEffect } from 'react';
import Home from '../components/Home';
import Skills from '../components/Skills';
import Navbar from '../components/Navbar';
import { Geist } from '@/app/fonts'

export default function Page() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentSection, setCurrentSection] = useState('default');

  const handleScroll = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        setCurrentSection(section.id);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main
      className={`
        min-h-screen transition-colors ${Geist.className}
        ${theme === 'dark' ? 'bg-gray-900 text-green-400' : 'bg-gray-100 text-gray-800'}
      `}
    >
      <Navbar 
        theme={theme} 
        toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        currentSection={currentSection}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-16 pt-24">
          <section id="intro">
            <Home theme={theme} />
          </section>

          <section id="skills">
            <Skills theme={theme} />
          </section>
        </div>
      </div>
    </main>
  );
}
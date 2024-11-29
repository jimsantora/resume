import React from 'react';
import { Sun, Moon } from 'lucide-react';
import Achievements from './Achievements';
import Geist from '@/app/fonts'

const Navbar = ({ 
  theme, 
  toggleTheme, 
  currentSection 
}: { 
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentSection: string;
}) => {
  return (
    <div className={`
      fixed top-0 left-0 right-0 z-50
      ${theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/80'}
      backdrop-blur-sm border-b border-orange-500/20
    `}>
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <h1 className={`${Geist.className} text-orange-500 font-bold text-lg`}>
            jsantora@terminal:~$
          </h1>
          
          <div className="flex items-center gap-4">
            <Achievements currentSection={currentSection} />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-orange-500/10 hover:bg-orange-500/20 transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-6 h-6 text-orange-500" />
              ) : (
                <Moon className="w-6 h-6 text-orange-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
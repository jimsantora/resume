import { Sun, Moon } from 'lucide-react';
import ShellPrompt from './ShellPrompt';

interface NavBarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  currentSection?: string;
}

const NavBar: React.FC<NavBarProps> = ({ theme, toggleTheme, currentSection = 'default' }) => {
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${
        theme === 'dark' ? 'bg-gray-900/95' : 'bg-gray-100/95'
      } backdrop-blur-sm border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}
    >
      <div className="container mx-auto px-4">
        <div className="h-16 grid grid-cols-3 items-center">
          {/* Left section - Shell Prompt */}
          <div className="justify-self-start min-w-[200px]">
            <ShellPrompt theme={theme} currentSection={currentSection} />
          </div>

          {/* Center section - empty for now */}
          <div className="justify-self-center"></div>

          {/* Right section - controls */}
          <div className="justify-self-end flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500 ${
                theme === 'dark' ? 'text-green-400' : 'text-gray-600'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

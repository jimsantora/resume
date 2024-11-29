import React from 'react';

const TerminalWindow: React.FC<{
  children: React.ReactNode;
  title: string;
  theme: 'light' | 'dark';
}> = ({ children, title, theme }) => {
  return (
    <div className="rounded-lg overflow-hidden border-2 border-orange-500">
      <div className={`flex items-center p-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="font-bold text-orange-500">{title}</span>
      </div>
      <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>{children}</div>
    </div>
  );
};

export default TerminalWindow;

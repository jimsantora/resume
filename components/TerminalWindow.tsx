import React from 'react';

interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  sectionId: string;
  onSectionChange?: (sectionId: string) => void;
}

const TerminalWindow: React.FC<TerminalWindowProps> = React.forwardRef<HTMLDivElement, TerminalWindowProps>(
  ({ title, children, sectionId, onSectionChange }, ref) => {
    const handleSectionChange = () => {
      onSectionChange?.(sectionId);
    };

    return (
      <div ref={ref} className="terminal-window" onClick={handleSectionChange}>
        <div className="terminal-header">
          <div className="flex space-x-2 mr-4">
            <div className="terminal-header-dot bg-red-500"></div>
            <div className="terminal-header-dot bg-yellow-500"></div>
            <div className="terminal-header-dot bg-green-500"></div>
          </div>
          <span className="font-bold text-orange-500">{title}</span>
        </div>
        <div className="terminal-content">{children}</div>
      </div>
    );
  }
);

TerminalWindow.displayName = 'TerminalWindow';

export default TerminalWindow;

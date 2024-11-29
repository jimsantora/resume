import React from 'react';
import TerminalWindow from './TerminalWindow';

const Home: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <TerminalWindow title="/home/jsantora" theme={theme}>
      <div className="h-12">
        <span className="typing-animation text-2xl sm:text-3xl font-bold">
          Hello, I&apos;m James Santora
        </span>
      </div>
      <h2 className="text-lg sm:text-xl text-orange-500 mb-4 sm:mb-6">
        SR SITE RELIABILITY ENGINEER
      </h2>
      <p
        className={`text-sm sm:text-base leading-relaxed ${theme === 'dark' ? 'text-green-300' : 'text-gray-600'}`}
      >
        With over 20 years of experience in the industry, I&apos;ve worked with a multitude of
        different technologies and held many different titles. The common thread throughout them all
        is that I am (and always have been), an engineer at heart.
      </p>
    </TerminalWindow>
  );
};

export default Home;

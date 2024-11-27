'use client';

import { Terminal } from 'lucide-react';

const TerminalWindow = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <div className="rounded-lg overflow-hidden border-2 border-orange-500">
      <div className="flex items-center p-2 bg-gray-800">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="font-bold text-orange-500">{title}</span>
      </div>
      <div className="p-6 bg-gray-900">
        {children}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto py-8">
          <TerminalWindow title="/home/jsantora">
            <h1 className="text-3xl font-bold mb-4">James Santora</h1>
            <h2 className="text-xl text-orange-500 mb-6">SR SITE RELIABILITY ENGINEER</h2>
            <p className="text-green-300 leading-relaxed">
              With over 20 years of experience in the industry, I've worked with a multitude of different
              technologies and held many different titles. The common thread throughout them all is that
              I am (and always have been), an engineer at heart.
            </p>
          </TerminalWindow>
        </div>
      </div>
    </main>
  );
}
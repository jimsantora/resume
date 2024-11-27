'use client';

import { Terminal } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Terminal-style header */}
        <header className="border-2 border-orange-500 rounded-lg overflow-hidden">
          <div className="bg-gray-800 p-2 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500 font-bold">~/jsantora</span>
            </div>
          </div>
          <div className="p-6 bg-gray-900">
            <h1 className="text-3xl font-bold mb-4">James Santora</h1>
            <h2 className="text-xl text-orange-500 mb-6">SR SITE RELIABILITY ENGINEER</h2>
            <p className="text-green-300 leading-relaxed">
              With over 20 years of experience in the industry, I've worked with a multitude of different
              technologies and held many different titles. The common thread throughout them all is that
              I am (and always have been), an engineer at heart.
            </p>
          </div>
        </header>
      </div>
    </main>
  );
}
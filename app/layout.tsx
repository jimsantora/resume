import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import '@/styles/tailwind.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'James Santora - Interactive Resume',
  description: 'Written with assistance from Claude and Copilot',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased bg-[#0d1117]`}>{children}</body>
    </html>
  );
}

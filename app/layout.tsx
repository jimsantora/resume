import type { Metadata } from 'next';
import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import { profile } from '@/lib/resume';
import '@/styles/tailwind.css';

const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700', '800'], variable: '--font-mono' });
const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.title}, ${profile.discipline}`,
  description: profile.pitch,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      <body className="bg-ink text-fg font-sans antialiased">{children}</body>
    </html>
  );
}

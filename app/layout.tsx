import type { Metadata } from 'next';
import '@/styles/tailwind.css';

export const metadata: Metadata = {
  title: 'James Santora - Site Reliability Engineer',
  description: 'Senior SRE with extensive experience in gaming and technology infrastructure',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-green-400 font-mono antialiased">
        {children}
      </body>
    </html>
  );
}
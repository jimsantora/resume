// app/layout.tsx
import type { Metadata } from 'next'
import { GeistMono, Geist } from './fonts'
import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: 'James Santora - Site Reliability Engineer',
  description: 'Senior SRE with extensive experience in gaming and technology infrastructure',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${Geist.variable} ${GeistMono.variable}`}>
      <body className={`${GeistMono.className} bg-gray-900 text-green-400 antialiased`}>
        {children}
      </body>
    </html>
  )
}
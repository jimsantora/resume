// app/fonts/index.ts
import localFont from 'next/font/local'

export const GeistMono = localFont({
  src: './GeistMonoVF.woff',
  variable: '--font-geist-mono'
})

export const Geist = localFont({
  src: './GeistVF.woff',
  variable: '--font-geist'
})
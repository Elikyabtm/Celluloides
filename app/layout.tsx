import type { Metadata, Viewport } from 'next'
import { Cinzel, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cinzel = Cinzel({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Celluloïdes Noires — L\'Héritage Éclaté',
  description: 'Une archive numérique immersive explorant l\'évolution de la représentation des femmes noires dans le cinéma hollywoodien.',
  generator: 'v0.app',
  keywords: ['cinema', 'Hollywood', 'femmes noires', 'représentation', 'archives', 'histoire'],
  authors: [{ name: 'Sisters in Cinema' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0B0B0B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${cinzel.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

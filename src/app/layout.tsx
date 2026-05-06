import type { Metadata } from 'next'
import TawkTo from '@/components/ui/TawkTo'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://my.pandai.org'),
  title: "Pandai — Malaysia's #1 Online Learning App",
  description: 'Score A and improve grades with Pandai. Game-like quizzes, tests, flashcards, notes, and live tuition for Malaysian school students.',
  keywords: 'pandai, online learning, malaysia, school, quiz, SPM, UPSR, PT3',
  openGraph: {
    title: "Pandai — Malaysia's #1 Online Learning App",
    description: 'Score A and improve grades with Pandai.',
    url: 'https://my.pandai.org',
    siteName: 'Pandai',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pandai — Malaysia's #1 Online Learning App",
    description: 'Score A and improve grades with Pandai.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <TawkTo />
      </body>
    </html>
  )
}

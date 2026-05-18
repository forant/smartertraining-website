import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/landing/header'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'SmarterTraining — Training that adapts to real life',
  description:
    'Get a realistic workout plan that adjusts to your fatigue, schedule, and goals — without guilt, guesswork, or rigid training blocks.',
  icons: {
    icon: '/icon-32.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Header />
        {children}
      </body>
    </html>
  )
}

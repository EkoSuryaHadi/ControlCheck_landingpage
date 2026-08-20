import './globals.css'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'
import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'KurvaUp AI Lab',
  description: 'Practical AI products built for real-world work.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AnalyticsTracker />
        <Navbar />
        {children}
      </body>
    </html>
  )
}

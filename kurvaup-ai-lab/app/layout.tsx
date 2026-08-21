import './globals.css'
import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai.kurvaup.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'KurvaUp AI Lab | AI Solutions for Project Control & Assurance',
    template: '%s | KurvaUp AI Lab',
  },
  description:
    'Practical AI-powered products for Project Control, Cost Management, Risk, Schedule Optimization, QA/QC, analytics, and project assurance.',
  keywords: [
    'KurvaUp AI Lab',
    'Project Control AI',
    'Cost Management AI',
    'Risk Management AI',
    'EPC AI',
    'QA QC AI',
    'Schedule Optimization',
    'Project Assurance',
    'Artificial Intelligence',
  ],
  authors: [{ name: 'KurvaUp AI Lab' }],
  creator: 'KurvaUp AI Lab',
  publisher: 'KurvaUp AI Lab',
  applicationName: 'KurvaUp AI Lab',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'KurvaUp AI Lab',
    title: 'KurvaUp AI Lab | AI Solutions for Project Control & Assurance',
    description:
      'Explore practical AI products for Project Control, Cost Management, Risk, Schedule Optimization, QA/QC, and project assurance.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'KurvaUp AI Lab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KurvaUp AI Lab | AI Solutions for Project Control & Assurance',
    description:
      'Practical AI products for project control, cost, risk, schedule, QA/QC, and project assurance.',
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
  manifest: '/manifest.webmanifest',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'KurvaUp AI Lab',
  url: siteUrl,
  description:
    'AI product lab focused on practical tools for project control, cost, risk, scheduling, QA/QC, analytics, and project assurance.',
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'KurvaUp AI Lab',
  url: siteUrl,
  description:
    'Practical AI-powered products built for real-world project and engineering workflows.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <GoogleAnalytics />
        <AnalyticsTracker />
        <Navbar />
        {children}
      </body>
    </html>
  )
}

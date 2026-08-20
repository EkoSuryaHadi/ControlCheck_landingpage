'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    trackEvent('page_view', { path: pathname })
  }, [pathname])

  useEffect(() => {
    const sessionMarker = 'kurvaup_return_checked'
    if (sessionStorage.getItem(sessionMarker)) return
    sessionStorage.setItem(sessionMarker, '1')

    const seenKey = 'kurvaup_seen_before'
    if (localStorage.getItem(seenKey)) {
      trackEvent('return_visit', { path: pathname })
    }
    localStorage.setItem(seenKey, new Date().toISOString())
  }, [])

  return null
}

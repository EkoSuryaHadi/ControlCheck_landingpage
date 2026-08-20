export type AnalyticsEvent = 'page_view' | 'product_view' | 'try_free_click' | 'app_open' | 'feedback_submit' | 'idea_submit' | 'return_visit'

function getId(key: string) {
  if (typeof window === 'undefined') return undefined
  let value = localStorage.getItem(key)
  if (!value) {
    value = crypto.randomUUID()
    localStorage.setItem(key, value)
  }
  return value
}

export async function trackEvent(event: AnalyticsEvent, properties: Record<string, unknown> = {}) {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        event,
        properties,
        sessionId: getId('kurvaup_session_id'),
        visitorId: getId('kurvaup_visitor_id'),
        timestamp: new Date().toISOString()
      })
    })
  } catch {
    // Analytics must never block UX.
  }
}

export type AnalyticsEvent = 'page_view' | 'product_view' | 'try_free_click' | 'app_open' | 'feedback_submit' | 'idea_submit' | 'return_visit'

function getVisitorId() {
  if (typeof window === 'undefined') return undefined
  let value = localStorage.getItem('kurvaup_visitor_id')
  if (!value) {
    value = crypto.randomUUID()
    localStorage.setItem('kurvaup_visitor_id', value)
  }
  return value
}

function getSessionId() {
  if (typeof window === 'undefined') return undefined
  let value = sessionStorage.getItem('kurvaup_session_id')
  if (!value) {
    value = crypto.randomUUID()
    sessionStorage.setItem('kurvaup_session_id', value)
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
        sessionId: getSessionId(),
        visitorId: getVisitorId(),
        timestamp: new Date().toISOString()
      })
    })
  } catch {
    // Analytics must never block UX.
  }
}

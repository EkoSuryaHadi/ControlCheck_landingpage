import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

const allowed = new Set(['page_view','product_view','try_free_click','app_open','feedback_submit','idea_submit','return_visit'])

export async function POST(req: NextRequest) {
  const supabase = createAdminClient()
  if (!supabase) return NextResponse.json({ ok: false, error: 'Analytics is not configured' }, { status: 503 })
  const body = await req.json().catch(() => null)
  if (!body || !allowed.has(body.event)) return NextResponse.json({ ok: false, error: 'Invalid event' }, { status: 400 })

  const { error } = await supabase.from('analytics_events').insert({
    event_name: body.event,
    product_slug: typeof body.properties?.product === 'string' ? body.properties.product : null,
    session_id: typeof body.sessionId === 'string' ? body.sessionId : null,
    visitor_id: typeof body.visitorId === 'string' ? body.visitorId : null,
    path: typeof body.properties?.path === 'string' ? body.properties.path : null,
    properties: body.properties || {},
    referrer: req.headers.get('referer'),
    user_agent: req.headers.get('user-agent')
  })
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

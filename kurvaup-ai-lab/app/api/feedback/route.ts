import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const supabase = createAdminClient()
  if (!supabase) return NextResponse.json({ ok:false, error:'Database is not configured' }, { status:503 })
  const body = await req.json().catch(() => null)
  if (!body?.message || String(body.message).trim().length < 5) return NextResponse.json({ ok:false, error:'Feedback is too short' }, { status:400 })
  const { error } = await supabase.from('feedback').insert({
    product_slug: body.product || null,
    name: body.name || null,
    email: body.email || null,
    rating: Number(body.rating) || null,
    message: String(body.message).trim()
  })
  if (error) return NextResponse.json({ ok:false, error:error.message }, { status:500 })
  return NextResponse.json({ ok:true })
}

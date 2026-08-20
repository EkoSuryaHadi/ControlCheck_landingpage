import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const supabase = createAdminClient()
  if (!supabase) return NextResponse.json({ ok:false, error:'Database is not configured' }, { status:503 })
  const body = await req.json().catch(() => null)
  if (!body?.problem || String(body.problem).trim().length < 10) return NextResponse.json({ ok:false, error:'Please describe the problem in more detail' }, { status:400 })
  const { error } = await supabase.from('product_ideas').insert({
    name: body.name || null,
    email: body.email || null,
    role: body.role || null,
    problem: String(body.problem).trim()
  })
  if (error) return NextResponse.json({ ok:false, error:error.message }, { status:500 })
  return NextResponse.json({ ok:true })
}

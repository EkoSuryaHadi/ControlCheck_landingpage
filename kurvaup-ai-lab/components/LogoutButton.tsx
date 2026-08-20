'use client'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function LogoutButton() {
  const router = useRouter()
  return <button className="btn-secondary" onClick={async()=>{ const supabase=createClient(); await supabase.auth.signOut(); router.push('/login'); router.refresh() }}>Sign Out</button>
}

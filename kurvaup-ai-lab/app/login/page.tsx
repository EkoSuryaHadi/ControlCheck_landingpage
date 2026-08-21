'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [message,setMessage] = useState('')
  const [loading,setLoading] = useState(false)
  const router = useRouter()

  async function submit(e:FormEvent) {
    e.preventDefault(); setLoading(true); setMessage('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) return setMessage(error.message)
    const requestedNext = new URLSearchParams(window.location.search).get('next') || '/admin/dashboard'
    const next = requestedNext === '/admin' ? '/admin/dashboard' : requestedNext
    router.push(next); router.refresh()
  }

  return <main className="mx-auto flex min-h-[75vh] max-w-md items-center px-6 py-16"><div className="card w-full p-7"><p className="text-sm font-semibold text-glow">ADMIN ACCESS</p><h1 className="mt-2 text-3xl font-semibold">KurvaUp AI Lab</h1><p className="mt-2 text-sm text-white/50">Sign in with an authorized Supabase account.</p><form onSubmit={submit} className="mt-7 space-y-4"><input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/><input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/><button className="btn-primary w-full justify-center" disabled={loading}>{loading?'Signing in...':'Sign In'}</button>{message&&<p className="text-sm text-red-300">{message}</p>}</form></div></main>
}

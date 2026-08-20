'use client'
import { FormEvent, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

export default function SubmitIdea(){
  const [state,setState]=useState({name:'',email:'',role:'',problem:''})
  const [status,setStatus]=useState('')
  async function submit(e:FormEvent){
    e.preventDefault(); setStatus('Sending...')
    const res=await fetch('/api/ideas',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(state)})
    const data=await res.json().catch(()=>({}))
    if(!res.ok){setStatus(data.error||'Could not submit idea.');return}
    await trackEvent('idea_submit',{path:'/submit-idea'})
    setStatus('Idea received. Thank you for helping shape the lab.')
    setState({name:'',email:'',role:'',problem:''})
  }
  return <main className="mx-auto max-w-3xl px-6 py-20"><p className="text-sm font-semibold text-glow">SUBMIT AN IDEA</p><h1 className="mt-2 text-5xl font-semibold">What should we build next?</h1><p className="mt-4 text-white/55">Describe a repetitive workflow, reporting pain point, or business problem that AI could help solve.</p><form onSubmit={submit} className="card mt-10 space-y-4 p-6"><div className="grid gap-4 md:grid-cols-2"><input className="input" placeholder="Name (optional)" value={state.name} onChange={e=>setState({...state,name:e.target.value})}/><input className="input" type="email" placeholder="Email (optional)" value={state.email} onChange={e=>setState({...state,email:e.target.value})}/></div><input className="input" placeholder="Role / industry (optional)" value={state.role} onChange={e=>setState({...state,role:e.target.value})}/><textarea className="textarea" required minLength={10} placeholder="What problem should we solve?" value={state.problem} onChange={e=>setState({...state,problem:e.target.value})}/><button className="btn-primary">Submit Idea</button>{status&&<p className="text-sm text-white/60">{status}</p>}</form></main>
}

'use client'
import { FormEvent, useState } from 'react'
import { products } from '@/data/products'
import { trackEvent } from '@/lib/analytics'

export default function Feedback(){
  const [state,setState]=useState({name:'',email:'',product:'',rating:'5',message:''})
  const [status,setStatus]=useState('')
  async function submit(e:FormEvent){
    e.preventDefault(); setStatus('Sending...')
    const res=await fetch('/api/feedback',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(state)})
    const data=await res.json().catch(()=>({}))
    if(!res.ok){setStatus(data.error||'Could not send feedback.');return}
    await trackEvent('feedback_submit',{product:state.product||undefined,path:'/feedback'})
    setStatus('Thank you. Your feedback has been recorded.')
    setState({name:'',email:'',product:'',rating:'5',message:''})
  }
  return <main className="mx-auto max-w-3xl px-6 py-20"><p className="text-sm font-semibold text-glow">FEEDBACK</p><h1 className="mt-2 text-5xl font-semibold">Help us improve</h1><p className="mt-4 text-white/55">Tell us what worked, what did not, and what would make the product more useful.</p><form onSubmit={submit} className="card mt-10 space-y-4 p-6"><div className="grid gap-4 md:grid-cols-2"><input className="input" placeholder="Name (optional)" value={state.name} onChange={e=>setState({...state,name:e.target.value})}/><input className="input" type="email" placeholder="Email (optional)" value={state.email} onChange={e=>setState({...state,email:e.target.value})}/></div><div className="grid gap-4 md:grid-cols-2"><select className="input" value={state.product} onChange={e=>setState({...state,product:e.target.value})}><option value="">General feedback</option>{products.map(p=><option value={p.slug} key={p.slug}>{p.name}</option>)}</select><select className="input" value={state.rating} onChange={e=>setState({...state,rating:e.target.value})}>{[5,4,3,2,1].map(n=><option value={n} key={n}>{n} / 5</option>)}</select></div><textarea className="textarea" required minLength={5} placeholder="Your feedback" value={state.message} onChange={e=>setState({...state,message:e.target.value})}/><button className="btn-primary">Send Feedback</button>{status&&<p className="text-sm text-white/60">{status}</p>}</form></main>
}

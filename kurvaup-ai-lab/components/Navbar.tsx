import Link from 'next/link'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight">KurvaUp <span className="text-glow">AI Lab</span></Link>
        <nav className="hidden gap-7 text-sm text-white/70 md:flex">
          <Link href="/products">Products</Link><Link href="/#categories">Categories</Link><Link href="/about">About</Link><Link href="/feedback">Feedback</Link>
        </nav>
        <Link href="/products" className="btn-secondary py-2">Explore Products</Link>
      </div>
    </header>
  )
}

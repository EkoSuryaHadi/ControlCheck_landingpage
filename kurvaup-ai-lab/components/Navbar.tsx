import Link from 'next/link'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#101715] text-[#edf0e8]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight">KurvaUp <span className="text-[#c0dc9c]">↗</span></Link>
        <nav className="hidden gap-7 text-sm text-white/70 md:flex">
          <Link href="/#products">Solutions</Link><Link href="/#approach">Approach</Link><Link href="/#case-studies">Selected work</Link><Link href="/about">About</Link>
        </nav>
        <Link href="/submit-idea" className="hidden border border-[#c0dc9c]/40 px-4 py-2 text-sm text-[#c0dc9c] md:block">Let’s talk ↗</Link>
        <details className="relative md:hidden">
          <summary className="cursor-pointer px-3 py-3 text-sm">Menu</summary>
          <nav aria-label="Mobile" className="absolute right-0 top-full flex w-60 flex-col border border-white/20 bg-[#101715] p-3 text-sm [&>a]:p-3">
            <Link href="/#products">Solutions</Link><Link href="/#approach">Approach</Link><Link href="/#case-studies">Selected work</Link><Link href="/about">About</Link><Link href="/submit-idea">Discuss your challenge ↗</Link>
          </nav>
        </details>
      </div>
    </header>
  )
}

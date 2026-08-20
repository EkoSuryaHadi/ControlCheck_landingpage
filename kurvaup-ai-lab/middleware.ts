import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) return response

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      }
    }
  })

  const { data: { user } } = await supabase.auth.getUser()
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLogin = request.nextUrl.pathname === '/login'

  if (isAdminRoute && !user) {
    const redirect = request.nextUrl.clone()
    redirect.pathname = '/login'
    redirect.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(redirect)
  }
  if (isLogin && user) {
    const redirect = request.nextUrl.clone()
    redirect.pathname = '/admin/dashboard'
    return NextResponse.redirect(redirect)
  }
  return response
}

export const config = { matcher: ['/admin/:path*', '/login'] }

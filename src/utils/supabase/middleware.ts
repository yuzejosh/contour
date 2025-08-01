import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function middleware(request: NextRequest) {
  // Only run middleware on protected routes
  const { pathname } = request.nextUrl
  
  // Skip middleware for non-protected routes
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/login') ||
    pathname.startsWith('/reset-password') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }
  
  // Create a response with the same request headers
  const res = NextResponse.next()
  
  // Check if user is authenticated
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // If user is not authenticated, redirect to login
  if (!user) {
    const redirectUrl = new URL('/login', request.url)
    return NextResponse.redirect(redirectUrl)
  }
  
  return res
}
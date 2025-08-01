import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

// Add specific paths that need authentication middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - Auth routes (/login, /reset-password, etc.)
     * - Static files (/_next, /favicon.ico, etc.)
     * - API routes (/api/*)
     */
    '/((?!_next|login|reset-password|verify|auth|images|api|favicon.ico).*)',
  ],
}
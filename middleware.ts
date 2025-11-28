import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if path already contains language prefix
  const pathnameHasLocale = /^\/(en|zh)/.test(pathname)

  // If root path, redirect to /en
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url))
  }

  // Continue with other paths
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except api, _next/static, _next/image, favicon.ico, img, animations
    '/((?!api|_next/static|_next/image|favicon.ico|img|animations).*)',
  ],
}

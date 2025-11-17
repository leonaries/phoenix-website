import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 检查路径是否已经包含语言前缀
  const pathnameHasLocale = /^\/(en|zh)/.test(pathname)
  
  // 如果是根路径，重定向到 /en
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url))
  }
  
  // 其他路径继续
  return NextResponse.next()
}

export const config = {
  matcher: [
    // 匹配所有路径除了 api, _next/static, _next/image, favicon.ico, img, animations
    '/((?!api|_next/static|_next/image|favicon.ico|img|animations).*)',
  ],
}

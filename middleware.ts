import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Přesměrování velkých písmen na malá
  const lowercasePath = pathname.toLowerCase()
  if (pathname !== lowercasePath) {
    return NextResponse.redirect(
      new URL(lowercasePath, request.url),
      { status: 301 }
    )
  }

  // Přidání CORS hlaviček
  const response = NextResponse.next()
  
  // Povolíme přístup z Ghost CMS a sslip.io
  const allowedOrigins = [
    'http://194.164.72.131:2368',
    'https://ghost-dso8k808400okgkc80wss8s0.194.164.72.131.sslip.io',
    'http://localhost:2368',
    'http://localhost:3000'
  ]
  
  const origin = request.headers.get('origin')
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  } else {
    response.headers.set('Access-Control-Allow-Origin', '*')
  }
  
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  
  // Cache-Control pro statický obsah
  if (request.nextUrl.pathname.startsWith('/_next/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  // Cache-Control pro API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

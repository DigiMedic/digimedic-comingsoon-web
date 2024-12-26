import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Povolíme všechny požadavky na Ghost API a externí formuláře
  const ghostApiUrl = process.env.NEXT_PUBLIC_GHOST_URL || 'http://194.164.72.131:2368'
  
  // Vytvoříme response headers
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  })

  // Pokud je to OPTIONS požadavek, vrátíme pouze headers
  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, { headers })
  }

  // Pro ostatní požadavky přidáme headers a pokračujeme
  const response = NextResponse.next()
  
  // Přidáme CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  // Povolíme mixed content a externí formuláře
  response.headers.set('Content-Security-Policy', `
    default-src 'self';
    img-src 'self' ${ghostApiUrl} data: blob: http: https:;
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://opnform.com;
    style-src 'self' 'unsafe-inline';
    font-src 'self' data:;
    frame-src 'self' https://opnform.com;
    connect-src 'self' ${ghostApiUrl} https://opnform.com;
    form-action 'self' https://opnform.com;
  `.replace(/\s+/g, ' ').trim())

  return response
}

// Nastavíme, na které cesty se má middleware aplikovat
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

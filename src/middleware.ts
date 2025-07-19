import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/_next/') || pathname.startsWith('/images/')) {
    return NextResponse.next()
  }

  const isProtectedPath = pathname.startsWith('/usr')

  if (isProtectedPath && !token) {
    const loginUrl = new URL('/', req.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/usr/:path*', '/_next/static/:path*', '/_next/image/:path*', '/images/:path*'],
}

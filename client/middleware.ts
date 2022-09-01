import { NextRequest, NextResponse } from 'next/server'
import { verify } from './utils/checkJwt'
const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  const jwt = req.cookies.get('jwt')
  const { pathname } = req.nextUrl
  if (PUBLIC_FILE.test(pathname)) return NextResponse.next()

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/room')) {
    if (jwt === undefined) {
      req.nextUrl.pathname = '/'
      return NextResponse.redirect(req.nextUrl)
    }
    try {
      await verify(jwt)
      return NextResponse.next()
    } catch (e) {
      req.nextUrl.pathname = '/'
      return NextResponse.redirect(req.nextUrl)
    }
  }
  if (pathname.startsWith('/') && jwt) {
    req.nextUrl.pathname = '/rooms'
    return NextResponse.redirect(req.nextUrl)
  }
  return NextResponse.next()
}

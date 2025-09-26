import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@/src/shared/utils/session'
import { decrypt } from './src/shared/utils/auth.crypto'

const protectedRoutes = [
  '/cms/main',
  '/cms/users',
  '/cms/activity-logs',
  '/cms/configs',
  '/cms/master-data',
  '/cms/order-report-admin',
  '/cms/order-report-channel',
]
const publicRoutes = ['/pw0wl']

function isClientRoute(path: string) {
  return path.startsWith('/th/') && !/\.[^/]+$/.test(path)
}

async function handleClientRoute(req: NextRequest) {
  const session = await getIronSession(await cookies(), sessionOptions)
  const sessionData = (session as any)?.usrData?.data
  const token = sessionData?.jwt
  if (!token) {
    return NextResponse.redirect(new URL('https://app.tidlor.com/main', req.url))
  }
  return null
}

async function getSessionFromCookie(resNext: NextResponse) {
  const CMIWL_CMS_COOKIE_NAME = `${process.env.APP_ENV}_cmiwl_cms_token`
  const CMIWL_CMS_COOKIE = (await cookies()).get(CMIWL_CMS_COOKIE_NAME)
  let session: any = {}
  try {
    if (CMIWL_CMS_COOKIE) {
      session = JSON.parse((await decrypt(CMIWL_CMS_COOKIE.value, process.env.PORTAL_API_KEY ?? '')) ?? '{}')
      const newPayload = {
        userName: session?.userName,
        perms: session?.permissions,
      }
      const jsonStr = JSON.stringify(newPayload)
      const base64 = Buffer.from(jsonStr, 'utf-8').toString('base64')
      const encoded = encodeURIComponent(base64)
      resNext.cookies.set('cmiwl_cms_me', encoded)
    }
  } catch (error) {
    console.error(`Error decrypting session cookie:`, error)
  }
  return session
}

function handleRouteAuthorization(path: string, session: any, req: NextRequest) {
  const allowedPaths = session?.routes || []
  if (allowedPaths.length > 0) {
    const isAuthorized = allowedPaths.some((route: string) => path.endsWith(route))
    if (!isAuthorized && (path.startsWith('/pw0wl') || path.startsWith('/cms'))) {
      if (path.startsWith('/cms')) {
        return NextResponse.redirect(new URL('/pw0wl', req.url))
      }
      return NextResponse.redirect(new URL('/cms/main', req.url))
    }
  }
  return null
}

async function checkInsurer() {
  const session = await getIronSession(await cookies(), sessionOptions)
  const insurers = (session as any)?.insurers || []
  const checkInsurer = insurers.every((insurer: any) => !insurer.active)
  return checkInsurer
}

export default async function middleware(req: NextRequest) {
  const resNext = NextResponse.next()
  const path = req.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.includes(path)
  const session = await getSessionFromCookie(resNext)
  const usrAgent = req.headers.get('user-agent')

  if (isProtectedRoute && session?.uag !== usrAgent) {
    return NextResponse.redirect(new URL('/pw0wl', req.url))
  }

  if (path === '/pw0wl' && session?.uag === usrAgent) {
    return NextResponse.redirect(new URL('/cms/main', req.url))
  }

  const routeAuthRedirect = handleRouteAuthorization(path, session, req)
  if (routeAuthRedirect) return routeAuthRedirect

  if (publicRoutes.includes(path) || path.startsWith('/cms/')) {
    return resNext
  }

  if (path !== '/th/VIB-Error' && !path.startsWith('/launch')) {
    const isAllowed = await checkInsurer()
    if (isAllowed) {
      return NextResponse.redirect(new URL('/th/VIB-Error', req.url))
    }
  }

  if (path === '/') {
    return NextResponse.redirect(new URL('/th/VehicleCTP', req.url))
  }

  if (isClientRoute(path)) {
    const clientRedirect = await handleClientRoute(req)
    if (clientRedirect) return clientRedirect
  }

  return resNext
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
}

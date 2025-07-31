import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from './src/shared/utils/auth.crypto';

const protectedRoutes = [
    '/cms/main',
    '/cms/users',
    '/cms/configs',
];
const publicRoutes = ['/pw0wl'];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    if (path === '/') {
        return NextResponse.next();
    }

    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const CMIWL_CMS_COOKIE_NAME = `${process.env.APP_ENV}_cmiwl_cms_token`;
    const CMIWL_CMS_COOKIE = cookies().get(CMIWL_CMS_COOKIE_NAME);

    let session: any = {};
    try {
        if (CMIWL_CMS_COOKIE) {
            session = JSON.parse(await decrypt(CMIWL_CMS_COOKIE.value, process.env.PORTAL_API_KEY ?? '') ?? '{}');
        }
    } catch (error) {
        console.error(`Error decrypting session cookie:`, error);
    }

    const usrAgent = req.headers.get('user-agent');

    if (isProtectedRoute && session?.uag !== usrAgent) {
        const response = NextResponse.redirect(new URL('/pw0wl', req.url));
        response.cookies.set(CMIWL_CMS_COOKIE_NAME, '', {
            path: '/',
            expires: new Date(0),
        });
        return response;
    }

    if (path === '/pw0wl' && session?.uag === usrAgent) {
        return NextResponse.redirect(new URL('/cms/main', req.url));
    }

    const allowedPaths = session?.routes || [];
    if (allowedPaths.length > 0) {
        const isAuthorized = allowedPaths.some((route: string) => path.endsWith(route));
        if (!isAuthorized && (path.startsWith('/pw0wl') || path.startsWith('/cms'))) {
            return NextResponse.redirect(new URL('/cms/main', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

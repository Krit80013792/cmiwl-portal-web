import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { rsaDecrypt } from './src/shared/utils/crypto';

/**
 * Generates a random CSRF token.
 * The token is a 32-byte string, converted into a hexadecimal string.
 *
 * @returns A promise that resolves to the generated CSRF token.
 */
async function generateCsrfToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
};

//* Specify protected and public routes
const protectedRoutes = [
    '/cms/main',
];
const publicRoutes = ['/pw0wl'];

/**
 * Middleware to protect routes based on user authentication and session.
 * It handles:
 * - Redirecting unauthenticated users to the login page.
 * - Redirecting authenticated users to the dashboard if they try to access a public route.
 * - Generating and setting a CSRF token for user download items.
 * 
 * @param {NextRequest} req - The incoming Next.js request object.
 * @returns The response object, which can be modified for redirects or to set cookies.
 */
export default async function middleware(req: NextRequest) {
    //* Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);
    //* Decrypt the session from the cookie
    const cookieName = `${process.env.APP_ENV}_ag_token`;
    const cookie = (cookies()).get(cookieName);
    const session = JSON.parse(await rsaDecrypt(cookie?.value ?? '') ?? '{}');
    const uag = req.headers.get('user-agent');
    //* Redirect to /login if the user is not authenticated
    if (
        isProtectedRoute &&
        session?.uag !== uag
    ) {
        return NextResponse.redirect(new URL('/pw0wl', req.nextUrl));
    }
    //* Redirect to /dashboard if the user is authenticated
    if (
        isPublicRoute &&
        session?.uag === uag &&
        !req.nextUrl.pathname.startsWith('/cms/main')
    ) {
        return NextResponse.redirect(new URL('/cms/main', req.nextUrl));
    }

    //* Create CSRF for user download items
    const res = NextResponse.next();
    let csrfToken = req.cookies.get("nextCsrfToken")?.value;
    if (!csrfToken) {
        csrfToken = await generateCsrfToken();
        res.cookies.set("nextCsrfToken", csrfToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: "/",
        });
    }

    return res;
};

/**
 * Configuration for the middleware to match specific routes.
 * This ensures that the middleware is executed on specific routes while excluding certain paths like API and static assets.
 */
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

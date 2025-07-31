import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateApiKey, validateAuth } from './auth';
import { decrypt } from '../utils/auth.crypto';

/**
 * Middleware function to protect routes by requiring authentication.
 *
 * @param handler - The request handler function to execute if authentication succeeds.
 * @returns A function that processes the request and returns a response.
 */
export function AuthGuard(handler: (poReq: NextRequest) => Promise<NextResponse>) {
    return async (poReq: NextRequest) => {
        try {
            const isValidApiKey = await validateApiKey(poReq);
            if (!isValidApiKey) {
                return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
            }
            const user = await validateAuth(poReq);
            if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            (poReq as any).user = user;
            return handler(poReq);
        } catch (error) {
            console.error(`Error AuthGuard :`, error);
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    };
};

export async function authGuard() {
    const cookie = cookies().get(`${process.env.APP_ENV}_cmiwl_cms_token`);

    if (!cookie?.value) {
        throw new Error('Unauthorized');
    }

    try {
        const decrypted = await decrypt(cookie.value, process.env.PORTAL_API_KEY ?? '');
        const user = JSON.parse(decrypted);

        return {
            user,
            permissions: user.permissions || [],
            roles: user.roles || [],
        };
    } catch (error) {
        console.error(`Error AuthGuard :`, error);
        throw new Error('Unauthorized');
    }
};

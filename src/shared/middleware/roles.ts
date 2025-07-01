import { rsaDecrypt } from '../utils/crypto';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware to authorize requests based on user roles.
 *
 * @param {string[]} parAllowedRoles - The list of roles that are permitted to access the endpoint.
 * @param {(poReq: NextRequest) => Promise<NextResponse>} handler - The request handler function to execute if the user has the required role.
 * @returns A function that processes the request and enforces role-based access control.
 */
export function Roles(parAllowedRoles: string[], handler: (poReq: NextRequest) => Promise<NextResponse>) {
    return async (poReq: NextRequest) => {
        const user = (poReq as any).user;
        const role = await rsaDecrypt(user.role as string);
        if (!user || !parAllowedRoles.includes(role)) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }
        return handler(poReq);
    };
};

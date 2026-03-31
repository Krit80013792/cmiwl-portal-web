//* app/api/v1/auth/signout/route.ts
import { rsaEncrypt } from '@/src/shared/utils/crypto';
import { validateApiKey } from '@/src/shared/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import { serializeRequest } from '@/src/shared/utils/serializeRequest';
import { authGuard } from '@/src/shared/middleware/auth.guard';
import { TxActivityLogger } from '@/src/shared/middleware/logging/TxActivityLogger';

/**
 * api/v1/auth/signout
 */
export async function POST(poReq: NextRequest) {
    const ROUTE = 'api/v1/auth/signout';
    const METHOD = 'POST';
    const ACTION = 'signout';

    const isValidApiKey = await validateApiKey(poReq);
    if (!isValidApiKey) {
        return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 });
    }

    let user: any;
    try {
        const auth = await authGuard();
        user = auth?.user;
    } catch {
        return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 });
    }

    const reqLog = await serializeRequest(poReq, {});

    try {
        const response = NextResponse.json({ message: 'Credentials are valid!' });
        const token = (await rsaEncrypt('signout')) as string;
        response.cookies.set(`cmiwl_cms_me`, '', {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            expires: new Date(0),
            maxAge: 0,
            path: '/',
        });
        response.cookies.set(`${process.env.APP_ENV}_cmiwl_cms_token`, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            expires: new Date(0),
            maxAge: 0,
            path: '/'
        });

        await TxActivityLogger.log({
            sUserName: user?.userName,
            sUserGroupName: user?.userGroupName,
            sUserRoleName: user?.userRoleName,
            sRoute: ROUTE,
            sMethod: METHOD,
            sAction: ACTION,
            sStatus: 'success',
            sRequestMsg: JSON.stringify(reqLog),
            sResponseMsg: JSON.stringify({}),
            sChannel: 'CMS',
        } as any);

        return response;
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : JSON.stringify(error);
        console.error(`Error ${METHOD} :`, errorMsg);

        await TxActivityLogger.log({
            sUserName: user?.userName,
            sUserGroupName: user?.userGroupName,
            sUserRoleName: user?.userRoleName,
            sRoute: ROUTE,
            sMethod: METHOD,
            sAction: ACTION,
            sStatus: 'failed',
            sRequestMsg: JSON.stringify(reqLog),
            sResponseMsg: errorMsg,
            sChannel: 'CMS',
        } as any);

        return new NextResponse(JSON.stringify({ message: `Internal Server Error` }), { status: 500 });
    }
};

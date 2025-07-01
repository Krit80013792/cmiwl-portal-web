import { md5Hash, rsaEncrypt, rsaDecrypt } from '@/src/shared/utils/crypto';
import { validateApiKey } from '@/src/shared/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import { createJWT } from '@/src/shared/utils/jwt';

export async function POST(req: NextRequest) {
    try {
        const isValidApiKey = await validateApiKey(req);
        if (!isValidApiKey) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }
        const body = await req.json();
        const deCryptedBodyData = await rsaDecrypt(body.data);
        const usrHash = await md5Hash(deCryptedBodyData.usr);
        const pwHash = await md5Hash(deCryptedBodyData.pw);
        const rootUsr = process.env.ROOT_USR;
        const rootPw = process.env.ROOT_PW;

        if (usrHash === rootUsr && pwHash === rootPw) {
            const response = NextResponse.json({ message: 'Credentials are valid!' });
            const jwtToken = await createJWT({ role: await rsaEncrypt('Administrator') });
            const token = (await rsaEncrypt(
                JSON.stringify({
                    author: process.env.BASE_URL,
                    uag: req.headers.get('user-agent')
                })
            )) as string;
            response.cookies.set(`${process.env.APP_ENV}_ag_token`, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 14400, //* 4 hrs (4 * 60 * 60)
                path: '/'
            });
            const access = Buffer.from(JSON.stringify({ token: jwtToken }), 'binary').toString('base64');
            response.cookies.set(`${process.env.APP_ENV}_ag_access`, access, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 14400, //* 4 hrs (4 * 60 * 60)
                path: '/'
            });
            return response;
        } else {
            return new NextResponse(JSON.stringify({ message: 'Invalid user data' }), { status: 404 });
        }
    } catch (error) {
        console.error(`Error POST :`, error);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}

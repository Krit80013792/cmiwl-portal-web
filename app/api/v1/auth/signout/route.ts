import { rsaEncrypt } from '@/src/shared/utils/crypto';
import { validateApiKey } from '@/src/shared/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const isValidApiKey = await validateApiKey(req);
        if (!isValidApiKey) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }

        const response = NextResponse.json({ message: 'Credentials are valid!' });
        const token = (await rsaEncrypt('signout')) as string;
        response.cookies.set(`${process.env.APP_ENV}_cmiwl_cms_token`, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0),
            maxAge: 0,
            path: '/'
        });
        return response;
    } catch (error) {
        console.error(`Error POST :`, error);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};

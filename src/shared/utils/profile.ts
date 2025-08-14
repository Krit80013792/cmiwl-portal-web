'use server';
import { cookies } from 'next/headers';
import { decrypt } from './auth.crypto';
import { rsaEncrypt } from './crypto';

export async function Menus() {
    let menus: any[] = [];
    let b64 = Buffer.from(JSON.stringify(menus), 'binary').toString('base64');
    try {
        const cookie = cookies().get(`${process.env.APP_ENV}_cmiwl_cms_token`);
        if (!cookie) {
            throw new Error('Authentication token not found');
        }
        const decrypted = await decrypt(cookie.value, process.env.PORTAL_API_KEY ?? '');
        const user = JSON.parse(decrypted);
        b64 = Buffer.from(JSON.stringify(user?.resources), 'binary').toString('base64');
        return b64;
    } catch (error) {
        console.error(`Error Menus :`, error);
        return b64;
    }
};

export async function ApiRoute() {
    const config = {
        "ak": await rsaEncrypt(process.env.PORTAL_API_KEY ?? ''),
        "au": Buffer.from('/api/v1/users', 'binary').toString('base64'),
        "aug": Buffer.from('/api/v1/user-groups', 'binary').toString('base64'),
        "aur": Buffer.from('/api/v1/user-roles', 'binary').toString('base64'),
        "ar": Buffer.from('/api/v1/resources', 'binary').toString('base64'),
        "aal": Buffer.from('/api/v1/activity-logs', 'binary').toString('base64'),
        "amc": Buffer.from('/api/v1/master/channel', 'binary').toString('base64'),
        "acf": Buffer.from('/api/v1/configs', 'binary').toString('base64'),
    };
    const b64 = Buffer.from(JSON.stringify(config), 'binary').toString('base64');
    return b64;
};

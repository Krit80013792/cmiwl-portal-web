'use server';
import { rsaEncrypt } from './crypto';

export async function config() {
    const config = {
        "pk": Buffer.from(process.env.PORTAL_RSA_PUB_KEY ?? '', 'binary').toString('base64'),
        "ak": await rsaEncrypt(process.env.PORTAL_API_KEY ?? ''),
        "asi": Buffer.from('/api/v1/auth/signin', 'binary').toString('base64'),
        "aso": Buffer.from('/api/v1/auth/signout', 'binary').toString('base64'),
        "cmsm": Buffer.from('/cms/main', 'binary').toString('base64'),
        "ath": Buffer.from('/pw0wl', 'binary').toString('base64'),
    };
    const b64 = Buffer.from(JSON.stringify(config), 'binary').toString('base64');
    return b64;
};

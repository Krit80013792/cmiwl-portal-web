import { cookies } from 'next/headers';
import { decrypt } from '../utils/auth.crypto';

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

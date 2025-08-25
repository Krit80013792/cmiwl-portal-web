import { cookies } from 'next/headers';

const CSRF_COOKIE_NAME = "nextCsrfToken";

export async function verifyCsrfToken(receivedToken?: string) {
    const storedToken = (await cookies()).get(CSRF_COOKIE_NAME)?.value;
    return receivedToken && storedToken && receivedToken === storedToken;
};

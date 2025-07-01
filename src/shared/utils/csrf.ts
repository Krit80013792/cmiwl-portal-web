import { cookies } from 'next/headers';

const CSRF_COOKIE_NAME = "nextCsrfToken";

export function verifyCsrfToken(receivedToken?: string) {
    const storedToken = cookies().get(CSRF_COOKIE_NAME)?.value;
    return receivedToken && storedToken && receivedToken === storedToken;
};

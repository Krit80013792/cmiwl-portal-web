export function clientCookie(): { userName: string; perms: any[] } {
    const match = document.cookie.match(/(?:^|; )cmiwl_cms_me=([^;]*)/);
    if (match) {
        try {
            const decoded = decodeURIComponent(match[1]);
            const jsonStr = Buffer.from(decoded, 'base64').toString('utf-8');
            const parsed = JSON.parse(jsonStr);
            return {
                userName: parsed?.userName || '',
                perms: parsed?.perms || [],
            };
        } catch {

        }
    }
    return { userName: '', perms: [] };
};

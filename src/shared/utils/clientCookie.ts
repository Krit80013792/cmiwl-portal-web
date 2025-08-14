export function clientCookie(): { userName: string; perms: any[] } {
    const match = document.cookie.match(/(?:^|; )cmiwl_cms_me=([^;]*)/);

    if (!match) {
        return { userName: '', perms: [] };
    }

    try {
        const decoded = decodeURIComponent(match[1]);
        const base64Part = decoded.includes('.') ? decoded.split('.')[0] : decoded;

        let jsonStr = '';
        try {
            jsonStr = Buffer.from(base64Part, 'base64').toString('utf-8');
        } catch {
            return { userName: '', perms: [] };
        }

        const cleaned = jsonStr.trim();
        const firstBrace = cleaned.indexOf('{');
        const lastBrace = cleaned.lastIndexOf('}');
        if (firstBrace < 0 || lastBrace < 0) {
            return { userName: '', perms: [] };
        }

        const jsonOnly = cleaned.slice(firstBrace, lastBrace + 1);
        const parsed = JSON.parse(jsonOnly);

        return {
            userName: parsed?.userName || '',
            perms: parsed?.perms || [],
        };
    } catch {
        return { userName: '', perms: [] };
    }
};

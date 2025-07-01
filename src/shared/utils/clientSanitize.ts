import DOMPurify from 'dompurify';

export const sanitize = (dirty: string): string => {
    return DOMPurify.sanitize(dirty, {
        USE_PROFILES: { html: true },
    });
};

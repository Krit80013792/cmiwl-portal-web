import { authGuard } from '../../src/shared/middleware/auth.guard';
import { decrypt } from '../../src/shared/utils/auth.crypto';
import { cookies } from 'next/headers';

jest.mock('next/headers', () => ({
    cookies: jest.fn(),
}));

jest.mock('../../src/shared/utils/auth.crypto', () => ({
    decrypt: jest.fn(),
}));

describe('authGuard', () => {
    const mockCookies = cookies as jest.Mock;
    const mockDecrypt = decrypt as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.APP_ENV = 'test';
        process.env.PORTAL_API_KEY = 'secret';
    });

    it('Should throw Unauthorized if cookie is missing', async () => {
        mockCookies.mockReturnValue({ get: jest.fn().mockReturnValue(undefined) });
        await expect(authGuard()).rejects.toThrow('Unauthorized');
    });

    it('Should return user, permissions, and roles when valid cookie is present', async () => {
        const fakeUser = { id: '1', permissions: ['READ'], roles: ['ADMIN'] };
        mockCookies.mockReturnValue({
            get: jest.fn().mockReturnValue({ value: 'ciphertext' }),
        });
        mockDecrypt.mockResolvedValue(JSON.stringify(fakeUser));

        const result = await authGuard();
        expect(result).toEqual({ user: fakeUser, permissions: ['READ'], roles: ['ADMIN'] });
    });

    it('Should return empty arrays if permissions and roles are missing', async () => {
        const fakeUser = { id: '2' };
        mockCookies.mockReturnValue({
            get: jest.fn().mockReturnValue({ value: 'ciphertext' }),
        });
        mockDecrypt.mockResolvedValue(JSON.stringify(fakeUser));

        const result = await authGuard();
        expect(result).toEqual({ user: fakeUser, permissions: [], roles: [] });
    });

    it('Should throw Unauthorized if decrypt fails', async () => {
        mockCookies.mockReturnValue({
            get: jest.fn().mockReturnValue({ value: 'ciphertext' }),
        });
        mockDecrypt.mockRejectedValue(new Error('Decryption failed'));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        await expect(authGuard()).rejects.toThrow('Unauthorized');
        consoleSpy.mockRestore();
    });
});

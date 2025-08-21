import { encrypt, decrypt } from '../../src/shared/utils/auth.crypto';

describe('auth.crypto utils', () => {
    const secret = 'super-secret-key';
    const plainText = 'Hello World!';

    it('Should encrypt and decrypt text correctly', async () => {
        const cipher = await encrypt(plainText, secret);
        expect(typeof cipher).toBe('string');
        expect(cipher).not.toEqual(plainText);

        const decrypted = await decrypt(cipher, secret);
        expect(decrypted).toBe(plainText);
    });

    it('Should produce different ciphertext for the same text due to random IV', async () => {
        const cipher1 = await encrypt(plainText, secret);
        const cipher2 = await encrypt(plainText, secret);
        expect(cipher1).not.toEqual(cipher2);

        const decrypted1 = await decrypt(cipher1, secret);
        const decrypted2 = await decrypt(cipher2, secret);
        expect(decrypted1).toBe(plainText);
        expect(decrypted2).toBe(plainText);
    });

    it('Should throw if using wrong secret key', async () => {
        const cipher = await encrypt(plainText, secret);
        await expect(decrypt(cipher, 'wrong-secret')).rejects.toThrow();
    });

    it('Should throw if ciphertext is tampered', async () => {
        const cipher = await encrypt(plainText, secret);

        // Break the ciphertext (flip a character)
        const tampered = cipher.slice(0, -2) + 'AA';

        await expect(decrypt(tampered, secret)).rejects.toThrow();
    });
});

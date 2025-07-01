import forge from 'node-forge';

/**
 * Encrypts data using RSA encryption with a public key.
 * 
 * @param {string} data - The plaintext data to encrypt.
 * @returns {Promise<string | null>} The encrypted data in base64 format, or null if an error occurs.
 */
export async function rsaEncrypt(data: string): Promise<string | null> {
    try {
        const envpublicKey = process.env.RSA_PUB_KEY ?? '';
        const publicKey = forge.pki.publicKeyFromPem(envpublicKey);
        const encryptedData = publicKey.encrypt(JSON.stringify(data), 'RSA-OAEP');
        return Buffer.from(encryptedData, 'binary').toString('base64');
    } catch (error) {
        console.error(`Error rsaEncrypt :`, error);
        return null;
    }
};

/**
 * Decrypts RSA-encrypted data using a private key.
 * 
 * @param {string} encryptedData - The encrypted data in base64 format.
 * @returns {Promise<any>} The decrypted data as a JSON-parsed object, or null if an error occurs.
 */
export async function rsaDecrypt(encryptedData: string): Promise<any> {
    try {
        if (!encryptedData) return null;
        const envprivateKey = process.env.RSA_PRI_KEY ?? '';
        const privateKey = forge.pki.privateKeyFromPem(envprivateKey);
        const decodedData = Buffer.from(encryptedData, 'base64').toString('binary');
        const decrypted = privateKey.decrypt(decodedData, 'RSA-OAEP');
        return JSON.parse(decrypted);
    } catch (error) {
        console.error(`Error rsaDecrypt :`, error);
        return null;
    }
};

/**
 * Generates an MD5 hash from the provided data.
 * 
 * @param {string} data - The input string to hash.
 * @returns {Promise<string | null>} The MD5 hash as a hexadecimal string, or null if an error occurs.
 */
export async function md5Hash(data: string): Promise<string | null> {
    try {
        const md5Hash = forge.md.md5.create();
        md5Hash.update(data);
        return md5Hash.digest().toHex();
    } catch (error) {
        console.error(`Error md5Hash :`, error);
        return null;
    }
};

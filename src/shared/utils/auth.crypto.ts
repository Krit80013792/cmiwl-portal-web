//* utils/auth.crypto.ts

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const IV_LENGTH = 12;

export async function encrypt(text: string, secret: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));

  const key = await getKey(secret, ['encrypt']);
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(text)
  );

  const encryptedBytes = new Uint8Array(encryptedBuffer);
  const result = new Uint8Array(IV_LENGTH + encryptedBytes.length);
  result.set(iv, 0);
  result.set(encryptedBytes, IV_LENGTH);
  return btoa(String.fromCharCode(...result));
};

export async function decrypt(ciphertext: string, secret: string): Promise<string> {
  const data = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
  const iv = data.slice(0, IV_LENGTH);
  const encryptedData = data.slice(IV_LENGTH);

  const key = await getKey(secret, ['decrypt']);
  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encryptedData
  );

  return decoder.decode(decryptedBuffer);
};

async function getKey(secret: string, usages: KeyUsage[]): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    await crypto.subtle.digest('SHA-256', encoder.encode(secret)),
    { name: 'AES-GCM' },
    false,
    usages
  );
  return keyMaterial;
};

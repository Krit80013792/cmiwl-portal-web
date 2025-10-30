import { SignJWT, JWTPayload, jwtVerify } from 'jose'

/**
 * Creates a JSON Web Token (JWT) using the provided payload.
 *
 * @param {JWTPayload} poPayload - The payload data to be encoded into the JWT.
 * @returns {Promise<string>} The signed JWT as a string.
 */
export async function createJWT(poPayload: JWTPayload, keyVersion = 'v1'): Promise<string> {
  const secrets: Record<string, string | undefined> = {
    v1: process.env.JWT_SECRET_V1,
    v2: process.env.JWT_SECRET_V2, // For rotation
  }

  const secret = new TextEncoder().encode(secrets[keyVersion])
  const token = await new SignJWT({ ...poPayload, keyVersion, aud: process.env.BASE_URL })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('4h')
    .sign(secret)
  return token
}

/**
 * Verifies and decodes a JSON Web Token (JWT).
 *
 * @param {string} psToken - The JWT string to be verified.
 * @returns {Promise<object | null>} The decoded payload if verification succeeds, otherwise null.
 */
export async function verifyJWT(psToken: string): Promise<object | null> {
  try {
    const secret = new TextEncoder().encode(process.env.PORTAL_API_KEY)
    const { payload } = await jwtVerify(psToken, secret, {
      audience: process.env.BASE_URL,
    })
    return payload
  } catch (error) {
    console.error(`Error verifyJWT :`, error)
    return null
  }
}

import { rsaDecrypt } from "../utils/crypto";
import { NextRequest } from 'next/server';
import { verifyJWT } from "../utils/jwt";
import { JWTPayload } from "jose";

/**
 * Validates the API key and checks for forbidden User-Agent headers.
 *
 * @param {NextRequest} poReq - The incoming HTTP request.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the API key is valid, otherwise `false`.
 */
export const validateApiKey = async (poReq: NextRequest): Promise<boolean> => {

    const forbiddenAgents = [
        "Postman",
        "curl",
        "wget",
        "Python",
        "Java",
        "php",
        "Go-http-client",
        "HttpClient",
        "Burp"
    ];

    const userAgent = poReq.headers.get("User-Agent");

    if (forbiddenAgents.some(agent => userAgent?.includes(agent))) {
        return false;
    }

    const hApiKey = poReq.headers.get('x-api-key') ?? '';
    const deApiKey = await rsaDecrypt(hApiKey);
    const validApiKey = process.env.PORTAL_API_KEY;
    if (!deApiKey || deApiKey !== validApiKey) {
        return false;
    }
    return true;
};

/**
 * Validates the authentication token from the request cookies.
 *
 * @param {NextRequest} poReq - The incoming HTTP request.
 * @returns {Promise<JWTPayload | null>} A promise that resolves to the JWT payload if valid, otherwise `null`.
 */
export async function validateAuth(poReq: NextRequest): Promise<JWTPayload | null> {
    try {
        const cookie = poReq.cookies.get(`${process.env.APP_ENV}_ag_access`);
        if (!cookie) {
            return null;
        }
        const de = JSON.parse(Buffer.from(cookie.value, 'base64').toString('binary'));
        if (!de.token) {
            return null;
        }
        const payload = await verifyJWT(de.token) as JWTPayload;
        return payload;
    } catch (error) {
        console.error(`Error validateAuth :`, error);
        return null;
    }
};

import { httpClient, HttpMethod } from "../client/httpClient.service";

/**
 * Signs in a user.
 * @param paConf - Configuration object containing API key and server details.
 * @param paAuthModel - Authentication model containing credentials (e.g., username, password).
 * @returns Promise<any> - The authentication response from the server.
 */
export async function signIn(paConf: any, paAuthModel: any) {
    const sEndpoint = Buffer.from(paConf?.asi, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.POST, paConf, { data: paAuthModel });
};

/**
 * Signs out a user.
 * @param paConf - Configuration object containing API key and server details.
 * @returns Promise<any> - The server response for the sign-out request.
 */
export async function signOut(paConf: any) {
    const sEndpoint = Buffer.from(paConf?.aso, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.POST, paConf);
};

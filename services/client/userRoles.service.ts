import { httpClient, HttpMethod } from './httpClient.service';
import { UserRoleDTO } from "@/src/application/dtos/UserRoleDTO";

export async function createUserRole(paConf: any, poUserRole: UserRoleDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.aur, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.POST, paConf, poUserRole);
};

export async function getUserRoles(paConf: any): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.aur, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.GET, paConf);
};

export async function getUserRoleById(paConf: any, psType: string): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.aur, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.GET, paConf, null, psType);
};

export async function updateUserRole(paConf: any, poUserRole: UserRoleDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.aur, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.PATCH, paConf, poUserRole);
};

export async function deleteUserRole(paConf: any, poUserRole: UserRoleDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.aur, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.DELETE, paConf, poUserRole);
};

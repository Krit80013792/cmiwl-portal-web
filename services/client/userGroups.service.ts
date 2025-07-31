import { httpClient, HttpMethod } from './httpClient.service';
import { UserGroupDTO } from "@/src/application/dtos/UserGroupDTO";

export async function createUserGroup(paConf: any, poUserGroup: UserGroupDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.aug, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.POST, paConf, poUserGroup);
};

export async function getUserGroups(paConf: any): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.aug, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.GET, paConf);
};

export async function getUserGroupById(paConf: any, psType: string): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.aug, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.GET, paConf, null, psType);
};

export async function updateUserGroup(paConf: any, poUserGroup: UserGroupDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.aug, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.PATCH, paConf, poUserGroup);
};

export async function deleteUserGroup(paConf: any, poUserGroup: UserGroupDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.aug, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.DELETE, paConf, poUserGroup);
};

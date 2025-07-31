import { httpClient, HttpMethod } from './httpClient.service';
import { UserDTO } from "@/src/application/dtos/UserDTO";

export async function createUser(paConf: any, poUser: UserDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.au, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.POST, paConf, poUser);
};

export async function getUsers(paConf: any): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.au, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.GET, paConf);
};

export async function getUserById(paConf: any, psType: string): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.au, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.GET, paConf, null, psType);
};

export async function updateUser(paConf: any, poUser: UserDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.au, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.PATCH, paConf, poUser);
};

export async function deleteUser(paConf: any, poUser: UserDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.au, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.DELETE, paConf, poUser);
};

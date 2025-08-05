import { httpClient, HttpMethod } from './httpClient.service';
import { ResourceDTO } from "@/src/application/dtos/ResourceDTO";

export async function createResource(paConf: any, poResource: ResourceDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.ar, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.POST, paConf, poResource);
};

export async function getResources(paConf: any): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.ar, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.GET, paConf);
};

export async function getResourceById(paConf: any, psType: string): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.ar, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.GET, paConf, null, psType);
};

export async function updateResource(paConf: any, poResource: ResourceDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.ar, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.PATCH, paConf, poResource);
};

export async function deleteResource(paConf: any, poResource: ResourceDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.ar, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.DELETE, paConf, poResource);
};

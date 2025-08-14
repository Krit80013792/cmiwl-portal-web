import { httpClient, HttpMethod } from './httpClient.service';
import { ConfigDTO } from "@/src/application/dtos/ConfigDTO";

export async function createConfig(paConf: any, poConfig: ConfigDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.acf, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.POST, paConf, poConfig);
};

export async function getConfigs(paConf: any, psConditions: string): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.acf, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.GET, paConf, null, psConditions);
};

export async function getConfigById(paConf: any, psType: string): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.acf, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.GET, paConf, null, psType);
};

export async function updateConfig(paConf: any, poConfig: ConfigDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.acf, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.PATCH, paConf, poConfig);
};

export async function deleteConfig(paConf: any, poConfig: ConfigDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.acf, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.DELETE, paConf, poConfig);
};

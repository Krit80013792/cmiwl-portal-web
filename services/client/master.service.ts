import { httpClient, HttpMethod } from './httpClient.service';
import { MasterChannelDTO } from "@/src/application/dtos/MasterChannelDTO";

export async function getMasterChannels(paConf: any): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.amc, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.GET, paConf);
};

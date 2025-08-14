import { httpClient, HttpMethod } from './httpClient.service';
import { TxActivityLogDTO } from "@/src/application/dtos/TxActivityLogDTO";

export async function createTxActivityLog(paConf: any, poTxActivityLog: TxActivityLogDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.aal, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.POST, paConf, poTxActivityLog);
};

export async function getTxActivityLogs(paConf: any, psConditions: string): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.aal, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.GET, paConf, null, psConditions);
};

export async function getTxActivityLogById(paConf: any, psType: string): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.aal, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.GET, paConf, null, psType);
};

export async function updateTxActivityLog(paConf: any, poTxActivityLog: TxActivityLogDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.aal, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.PATCH, paConf, poTxActivityLog);
};

export async function deleteTxActivityLog(paConf: any, poTxActivityLog: TxActivityLogDTO): Promise<Response> {
    const sEndpoint = Buffer.from(paConf?.aal, 'base64').toString('binary');
    return await httpClient(sEndpoint, HttpMethod.DELETE, paConf, poTxActivityLog);
};

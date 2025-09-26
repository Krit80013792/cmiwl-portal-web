import { httpClient, HttpMethod } from './httpClient.service'

export async function getMasterDataByEndpoint(paConf: any, psBaseUrl: string, psEndpoint: string): Promise<Response> {
  const sEndpoint = `${Buffer.from(psBaseUrl, 'base64').toString('binary')}/${psEndpoint}`
  return await httpClient(sEndpoint, HttpMethod.GET, paConf)
}

export async function syncMasterDataByEndpoint(paConf: any, psBaseUrl: string, psEndpoint: string): Promise<Response> {
  const sEndpoint = `${Buffer.from(psBaseUrl, 'base64').toString('binary')}/sync/${psEndpoint}`
  return await httpClient(sEndpoint, HttpMethod.PATCH, paConf)
}

export async function updateMasterDataByEndpoint(
  paConf: any,
  psBaseUrl: string,
  psEndpoint: string,
  payload: any,
): Promise<Response> {
  const sEndpoint = `${Buffer.from(psBaseUrl, 'base64').toString('binary')}/${psEndpoint}`
  return await httpClient(sEndpoint, HttpMethod.PATCH, paConf, payload)
}

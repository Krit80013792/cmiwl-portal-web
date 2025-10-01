import { httpClient, HttpMethod } from './httpClient.service'

export async function getCMIApiLogs(paConf: any, psConditions: string): Promise<Response> {
  const sEndpoint = Buffer.from(paConf?.acal, 'base64').toString('binary')
  return await httpClient(sEndpoint, HttpMethod.GET, paConf, null, psConditions)
}

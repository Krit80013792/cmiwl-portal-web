import { ICMIApiLogs } from '../../domain/models/CMIApiLogsModel'

export interface IFindAllParams {
  pdStartDate: Date
  pdEndDate: Date
  psChannel: string
  psName: string
  psLicensePlate?: string
  psOrderNo?: string
}

export interface ICMIApiLogsRepository {
  findAll(params: IFindAllParams): Promise<ICMIApiLogs[]>
  findById(psId: string): Promise<ICMIApiLogs | null>
}

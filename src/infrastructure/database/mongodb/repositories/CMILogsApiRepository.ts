import { CMIApiLogsEntity } from '../../../../domain/entities/CMIApiLogsEntity'
import { ICMIApiLogs } from '../../../../domain/models/CMIApiLogsModel'
import { ICMIApiLogsRepository, IFindAllParams } from '../../../../application/interfaces/ICMIApiLogsRepository'
import { FilterQuery } from 'mongoose'

export class CMIApiLogsRepository implements ICMIApiLogsRepository {
  async findAll(params: IFindAllParams): Promise<ICMIApiLogs[]> {
    const { pdStartDate, pdEndDate, psChannel, psName, psLicensePlate, psOrderNo, psOrderStatus } = params
    const targetStartDate = new Date(pdStartDate)
    const targetEndDate = new Date(pdEndDate)
    const startOfDay = new Date(targetStartDate.setUTCHours(0, 0, 0, 0))
    const endOfDay = new Date(targetEndDate.setUTCHours(23, 59, 59, 999))
    const query: FilterQuery<ICMIApiLogs> = {
      channel: { $in: [...psChannel.split(',')] },
      requestDate: { $gte: startOfDay, $lte: endOfDay },
      orderStatus: { $in: psOrderStatus ? [...psOrderStatus.split(',')] : [] },
    }

    const orConditions = []
    if (psName) orConditions.push({ name: { $regex: psName, $options: 'i' } })
    if (psLicensePlate) orConditions.push({ licensePlate: { $regex: psLicensePlate, $options: 'i' } })
    if (psOrderNo) orConditions.push({ orderNo: { $regex: psOrderNo, $options: 'i' } })

    if (orConditions.length > 0) {
      query.$or = orConditions
    }
    return await CMIApiLogsEntity.find(query).sort({ createdAt: -1 })
  }

  async findById(psId: string): Promise<ICMIApiLogs | null> {
    return await CMIApiLogsEntity.findOne({ _id: psId })
  }
}

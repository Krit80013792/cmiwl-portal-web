import { CMIApiLogsEntity } from '../../../../domain/entities/CMIApiLogsEntity'
import { ICMIApiLogs } from '../../../../domain/models/CMIApiLogsModel'
import { ICMIApiLogsRepository, IFindAllParams } from '../../../../application/interfaces/ICMIApiLogsRepository'

export class CMIApiLogsRepository implements ICMIApiLogsRepository {
  async findAll(params: IFindAllParams): Promise<ICMIApiLogs[]> {
    const { pdStartDate, pdEndDate, psChannel, psName, psLicensePlate, psOrderNo } = params
    const targetStartDate = new Date(pdStartDate)
    const targetEndDate = new Date(pdEndDate)
    const startOfDay = new Date(targetStartDate.setUTCHours(0, 0, 0, 0))
    const endOfDay = new Date(targetEndDate.setUTCHours(23, 59, 59, 999))
    const query: any = {
      sChannel: psChannel,
      dRequestDate: { $gte: startOfDay, $lte: endOfDay },
      $or: [
        { sName: { $regex: psName, $options: 'i' } },
        { sLicensePlate: { $regex: psLicensePlate, $options: 'i' } },
        { sOrderNo: { $regex: psOrderNo, $options: 'i' } },
      ],
    }

    return await CMIApiLogsEntity.find(query).sort({ createdAt: -1 })
  }

  async findById(psId: string): Promise<ICMIApiLogs | null> {
    return await CMIApiLogsEntity.findOne({ _id: psId })
  }
}

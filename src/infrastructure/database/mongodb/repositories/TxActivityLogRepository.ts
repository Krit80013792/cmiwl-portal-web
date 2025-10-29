import { ITxActivityLogRepository } from '@/src/application/interfaces/ITxActivityLogRepository'
import { TxActivityLogsEntity } from '@/src/domain/entities/TxActivityLogsEntity'
import { ITxActivityLog } from '@/src/domain/models/TxActivityLogModel'

export class TxActivityLogRepository implements ITxActivityLogRepository {
  async create(poTxLog: Partial<ITxActivityLog>): Promise<ITxActivityLog> {
    const newTxLog = new TxActivityLogsEntity(poTxLog)
    return await newTxLog.save()
  }

  async findAll(psStartDate: string, psEndDate: string, psAction: string): Promise<ITxActivityLog[]> {
    const targetStartDate = new Date(psStartDate)
    const targetEndDate = new Date(psEndDate)
    const startOfDay = new Date(targetStartDate.setUTCHours(0, 0, 0, 0))
    const endOfDay = new Date(targetEndDate.setUTCHours(23, 59, 59, 999))

    const query: any = {
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    }

    if (psAction && psAction.trim() !== '') {
      query.sAction = psAction
    }

    return await TxActivityLogsEntity.find(query).sort({ createdAt: -1 })
  }

  async findActions(): Promise<ITxActivityLog[]> {
    return await TxActivityLogsEntity.distinct('sAction')
  }

  async findByGroupName(psGroupName: string): Promise<ITxActivityLog[]> {
    return await TxActivityLogsEntity.find({ sUserGroupName: psGroupName }).sort({ createdAt: -1 })
  }

  async findByChannel(psChannel: string): Promise<ITxActivityLog[]> {
    return await TxActivityLogsEntity.find({ sChannel: psChannel }).sort({ createdAt: -1 })
  }

  async findById(psId: string): Promise<ITxActivityLog | null> {
    return await TxActivityLogsEntity.findById(psId)
  }

  async update(psId: string, poTxLog: Partial<ITxActivityLog>): Promise<ITxActivityLog | null> {
    return await TxActivityLogsEntity.findByIdAndUpdate(psId, poTxLog, { new: true })
  }

  async deleteOne(psId: string): Promise<ITxActivityLog | null> {
    return await TxActivityLogsEntity.findByIdAndDelete(psId)
  }
}

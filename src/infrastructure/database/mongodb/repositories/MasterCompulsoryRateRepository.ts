import { MasterCompulsoryRateEntity } from '@/src/domain/entities/MasterCompulsoryRateEntity'
import { IMasterCompulsoryRate } from '@/src/domain/models/MasterCompulsoryRateModel'
import { IMasterCompulsoryRateRepository } from '@/src/application/interfaces/IMasterCompulsoryRateRepository'

export class MasterCompulsoryRateRepository implements IMasterCompulsoryRateRepository {
  async create(poMasterCompulsoryRate: Partial<IMasterCompulsoryRate>): Promise<IMasterCompulsoryRate> {
    const newMasterCompulsoryRate = new MasterCompulsoryRateEntity(poMasterCompulsoryRate)
    return await newMasterCompulsoryRate.save()
  }

  async findAll(): Promise<IMasterCompulsoryRate[]> {
    return await MasterCompulsoryRateEntity.find()
  }

  async findById(psId: string): Promise<IMasterCompulsoryRate | null> {
    return await MasterCompulsoryRateEntity.findById(psId)
  }

  async update(
    psId: string,
    poMasterCompulsoryRate: Partial<IMasterCompulsoryRate>,
  ): Promise<IMasterCompulsoryRate | null> {
    return await MasterCompulsoryRateEntity.findByIdAndUpdate(psId, poMasterCompulsoryRate, { new: true })
  }

  async deleteOne(psId: string): Promise<IMasterCompulsoryRate | null> {
    return await MasterCompulsoryRateEntity.findByIdAndDelete(psId)
  }
}

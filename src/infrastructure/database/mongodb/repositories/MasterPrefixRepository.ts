import { MasterPrefixEntity } from '@/src/domain/entities/MasterPrefixEntity'
import { IMasterPrefix } from '@/src/domain/models/MasterPrefixModel'
import { IMasterPrefixRepository } from '@/src/application/interfaces/IMasterPrefixRepository'

export class MasterPrefixRepository implements IMasterPrefixRepository {
  async create(poMasterPrefix: Partial<IMasterPrefix>): Promise<IMasterPrefix> {
    const newMasterPrefix = new MasterPrefixEntity(poMasterPrefix)
    return await newMasterPrefix.save()
  }

  async findAll(): Promise<IMasterPrefix[]> {
    return await MasterPrefixEntity.find()
  }

  async findById(psId: string): Promise<IMasterPrefix | null> {
    return await MasterPrefixEntity.findById(psId)
  }

  async update(psId: string, poMasterPrefix: Partial<IMasterPrefix>): Promise<IMasterPrefix | null> {
    return await MasterPrefixEntity.findByIdAndUpdate(psId, poMasterPrefix, { new: true })
  }

  async deleteOne(psId: string): Promise<IMasterPrefix | null> {
    return await MasterPrefixEntity.findByIdAndDelete(psId)
  }
}

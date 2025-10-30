import { MasterChannelEntity } from '@/src/domain/entities/MasterChannelEntity'
import { IMasterChannel } from '@/src/domain/models/MasterChannelModel'
import { IMasterChannelRepository } from '@/src/application/interfaces/IMasterChannelRepository'

export class MasterChannelRepository implements IMasterChannelRepository {
  async create(poMasterChannel: Partial<IMasterChannel>): Promise<IMasterChannel> {
    const newMasterChannel = new MasterChannelEntity(poMasterChannel)
    return await newMasterChannel.save()
  }

  async findAll(): Promise<IMasterChannel[]> {
    return await MasterChannelEntity.find()
  }

  async findById(psId: string): Promise<IMasterChannel | null> {
    return await MasterChannelEntity.findById(psId)
  }

  async findByMasterChannelName(psName: string): Promise<IMasterChannel | null> {
    return await MasterChannelEntity.findOne({ DisplayName: psName })
  }

  async update(psId: string, poMasterChannel: Partial<IMasterChannel>): Promise<IMasterChannel | null> {
    return await MasterChannelEntity.findByIdAndUpdate(psId, poMasterChannel, { new: true })
  }

  async deleteOne(psId: string): Promise<IMasterChannel | null> {
    return await MasterChannelEntity.findByIdAndDelete(psId)
  }
}

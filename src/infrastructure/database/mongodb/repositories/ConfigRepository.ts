import { IConfigRepository } from '@/src/application/interfaces/IConfigRepository'
import { ConfigsEntity } from '@/src/domain/entities/ConfigsEntity'
import { IConfig } from '@/src/domain/models/ConfigModel'

export class ConfigRepository implements IConfigRepository {
  async create(poConfig: Partial<IConfig>): Promise<IConfig> {
    const newConfig = new ConfigsEntity(poConfig)
    return await newConfig.save()
  }

  async findAll(): Promise<IConfig[]> {
    return await ConfigsEntity.find()
  }

  async findById(psId: string): Promise<IConfig | null> {
    return await ConfigsEntity.findById(psId)
  }

  async findByConfigName(psName: string): Promise<IConfig | null> {
    return await ConfigsEntity.findOne({ sConfigName: psName })
  }

  async findByChannelCode(psCode: string): Promise<IConfig[]> {
    return await ConfigsEntity.find({ sConfigByChannel: psCode })
  }

  async update(psId: string, poConfig: Partial<IConfig>): Promise<IConfig | null> {
    return await ConfigsEntity.findByIdAndUpdate(psId, poConfig, { new: true })
  }

  async deleteOne(psId: string): Promise<IConfig | null> {
    return await ConfigsEntity.findByIdAndDelete(psId)
  }
}

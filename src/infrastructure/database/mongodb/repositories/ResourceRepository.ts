import { IResourceRepository } from '@/src/application/interfaces/IResourceRepository'
import { ResourcesEntity } from '@/src/domain/entities/ResourcesEntity'
import { IResource } from '@/src/domain/models/ResourceModel'

export class ResourceRepository implements IResourceRepository {
  async create(poResource: Partial<IResource>): Promise<IResource> {
    const newResource = new ResourcesEntity(poResource)
    return await newResource.save()
  }

  async findAll(): Promise<IResource[]> {
    return await ResourcesEntity.find().sort({ nResourceOrder: 1 })
  }

  async findById(psResourceId: string): Promise<IResource | null> {
    return await ResourcesEntity.findOne({ sResourceId: psResourceId })
  }

  async findByIds(psIds: any[]): Promise<boolean> {
    const found = await ResourcesEntity.find({
      sResourceId: { $in: psIds },
    }).select('sResourceId')
    const foundIds = new Set(found.map((r) => r.sResourceId))
    const missing = psIds.filter((id) => !foundIds.has(id))
    if (missing.length > 0) {
      return false
    }
    return true
  }

  async findByResourceName(psName: string): Promise<IResource | null> {
    return await ResourcesEntity.findOne({ sResourceName: psName })
  }

  async findMultipleByResourceNames(psNames: string[]): Promise<IResource[]> {
    return await ResourcesEntity.find({ sResourceName: { $in: psNames } })
  }

  async update(psId: string, poResource: Partial<IResource>): Promise<IResource | null> {
    return await ResourcesEntity.findByIdAndUpdate(psId, poResource, { new: true })
  }

  async deleteOne(psId: string): Promise<IResource | null> {
    return await ResourcesEntity.findByIdAndDelete(psId)
  }
}

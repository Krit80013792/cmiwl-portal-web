import { UserPermissionsEntity } from '@/src/domain/entities/UserPermissionsEntity'
import { IUserPermission } from '@/src/domain/models/UserPermissionModel'
import { IUserPermissionRepository } from '@/src/application/interfaces/IUserPermissionRepository'

export class UserPermissionRepository implements IUserPermissionRepository {
  async create(poUserPermission: Partial<IUserPermission>): Promise<IUserPermission> {
    const newUserPermission = new UserPermissionsEntity(poUserPermission)
    return await newUserPermission.save()
  }

  async findAll(): Promise<IUserPermission[]> {
    return await UserPermissionsEntity.find().sort({ createdAt: -1 })
  }

  async findById(psId: string): Promise<IUserPermission | null> {
    return await UserPermissionsEntity.findById(psId)
  }

  async update(psId: string, poUserPermission: Partial<IUserPermission>): Promise<IUserPermission | null> {
    return await UserPermissionsEntity.findByIdAndUpdate(psId, poUserPermission, { new: true })
  }

  async deleteOne(psId: string): Promise<IUserPermission | null> {
    return await UserPermissionsEntity.findByIdAndDelete(psId)
  }
}

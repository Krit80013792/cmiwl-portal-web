import mongoose from 'mongoose'
import { UserRolesEntity } from '@/src/domain/entities/UserRolesEntity'
import { IUserRole } from '@/src/domain/models/UserRoleModel'
import { IUserRoleRepository } from '@/src/application/interfaces/IUserRoleRepository'

export class UserRoleRepository implements IUserRoleRepository {
  async create(poUserRole: Partial<IUserRole>): Promise<IUserRole> {
    const newUserRole = new UserRolesEntity(poUserRole)
    return await newUserRole.save()
  }

  async findAll(): Promise<IUserRole[]> {
    return await UserRolesEntity.find().sort({ sUserRoleName: 1 })
  }

  async findById(psId: string): Promise<IUserRole | null> {
    return await UserRolesEntity.findOne({ sUserRoleId: psId })
  }

  async findByUserRoleName(psId: string, psUserRoleName: string): Promise<IUserRole | null> {
    const query: any = {
      sUserRoleName: psUserRoleName,
    }
    if (psId && mongoose.Types.ObjectId.isValid(psId)) {
      query._id = { $ne: new mongoose.Types.ObjectId(psId) }
    }
    return await UserRolesEntity.findOne(query)
  }

  async update(psId: string, poUserRole: Partial<IUserRole>): Promise<IUserRole | null> {
    return await UserRolesEntity.findByIdAndUpdate(psId, poUserRole, { new: true })
  }

  async deleteOne(psId: string): Promise<IUserRole | null> {
    return await UserRolesEntity.findByIdAndDelete(psId)
  }
}

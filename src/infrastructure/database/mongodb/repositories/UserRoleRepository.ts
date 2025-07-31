import { UserRolesEntity } from '../../../../domain/entities/UserRolesEntity';
import { IUserRole } from '../../../../domain/models/UserRoleModel';
import { IUserRoleRepository } from '../../../../application/interfaces/IUserRoleRepository';

export class UserRoleRepository implements IUserRoleRepository {
    async create(poUserRole: Partial<IUserRole>): Promise<IUserRole> {
        const newUserRole = new UserRolesEntity(poUserRole);
        return await newUserRole.save();
    };

    async findAll(): Promise<IUserRole[]> {
        return await UserRolesEntity.find().sort({ createdAt: -1 });
    };

    async findById(psId: string): Promise<IUserRole | null> {
        return await UserRolesEntity.findOne({ sUserRoleId: psId });
    };

    async findByUserRoleName(psUserRoleName: string): Promise<IUserRole | null> {
        return await UserRolesEntity.findOne({ sUserRoleName: psUserRoleName });
    };

    async update(psId: string, poUserRole: Partial<IUserRole>): Promise<IUserRole | null> {
        return await UserRolesEntity.findByIdAndUpdate(psId, poUserRole, { new: true });
    };

    async deleteOne(psId: string): Promise<IUserRole | null> {
        return await UserRolesEntity.findByIdAndDelete(psId);
    };
};

import { UserGroupsEntity } from '../../../../domain/entities/UserGroupsEntity';
import { IUserGroup } from '../../../../domain/models/UserGroupModel';
import { IUserGroupRepository } from '../../../../application/interfaces/IUserGroupRepository';

export class UserGroupRepository implements IUserGroupRepository {
    async create(poUserGroup: Partial<IUserGroup>): Promise<IUserGroup> {
        const newUserGroup = new UserGroupsEntity(poUserGroup);
        return await newUserGroup.save();
    };

    async findAll(): Promise<IUserGroup[]> {
        return await UserGroupsEntity.find().sort({ createdAt: -1 });
    };

    async findById(psId: string): Promise<IUserGroup | null> {
        return await UserGroupsEntity.findById(psId);
    };

    async findByUserGroupName(psUserGroupName: string): Promise<IUserGroup | null> {
        return await UserGroupsEntity.findOne({ sUserGroupName: psUserGroupName });
    };

    async update(psId: string, poUserGroup: Partial<IUserGroup>): Promise<IUserGroup | null> {
        return await UserGroupsEntity.findByIdAndUpdate(psId, poUserGroup, { new: true });
    };

    async deleteOne(psId: string): Promise<IUserGroup | null> {
        return await UserGroupsEntity.findByIdAndDelete(psId);
    };
};

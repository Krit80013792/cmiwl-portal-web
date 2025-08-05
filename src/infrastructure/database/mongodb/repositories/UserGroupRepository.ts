import mongoose from 'mongoose';
import { UserGroupsEntity } from '../../../../domain/entities/UserGroupsEntity';
import { IUserGroup } from '../../../../domain/models/UserGroupModel';
import { IUserGroupRepository } from '../../../../application/interfaces/IUserGroupRepository';

export class UserGroupRepository implements IUserGroupRepository {
    async create(poUserGroup: Partial<IUserGroup>): Promise<IUserGroup> {
        const newUserGroup = new UserGroupsEntity(poUserGroup);
        return await newUserGroup.save();
    };

    async findAll(): Promise<IUserGroup[]> {
        return await UserGroupsEntity.find().sort({ sUserGroupName: 1 });
    };

    async findById(psId: string): Promise<IUserGroup | null> {
        return await UserGroupsEntity.findOne({ sUserGroupId: psId });
    };

    async findByUserGroupName(psId: string, psUserGroupName: string): Promise<IUserGroup | null> {
        const query: any = {
            sUserGroupName: psUserGroupName,
        };
        if (psId && mongoose.Types.ObjectId.isValid(psId)) {
            query._id = { $ne: new mongoose.Types.ObjectId(psId) };
        }
        return await UserGroupsEntity.findOne(query);
    };

    async update(psId: string, poUserGroup: Partial<IUserGroup>): Promise<IUserGroup | null> {
        return await UserGroupsEntity.findByIdAndUpdate(psId, poUserGroup, { new: true });
    };

    async deleteOne(psId: string): Promise<IUserGroup | null> {
        return await UserGroupsEntity.findByIdAndDelete(psId);
    };
};

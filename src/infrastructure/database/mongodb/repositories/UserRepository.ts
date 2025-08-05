import { UsersEntity } from '../../../../domain/entities/UsersEntity';
import { IUser } from '../../../../domain/models/UserModel';
import { IUserRepository } from '../../../../application/interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
    async create(poUser: Partial<IUser>): Promise<IUser> {
        const newUser = new UsersEntity(poUser);
        return await newUser.save();
    };

    async findAll(psUserId: string): Promise<IUser[]> {
        return await UsersEntity.find({ sUserId: { $ne: psUserId } }).sort({ createdAt: -1 });
    };

    async findById(psId: string): Promise<IUser | null> {
        return await UsersEntity.findOne({ bIsActive: true, sUserId: psId });
    };

    async findByUsername(psUserName: string): Promise<IUser | null> {
        return await UsersEntity.findOne({ bIsActive: true, sUserName: psUserName });
    };

    async findByStatus(pbStatus: boolean): Promise<IUser[]> {
        return await UsersEntity.find({ bIsActive: pbStatus }).sort({ createdAt: -1 });
    };

    async findByUserGroupId(psUserGroupId: string): Promise<IUser[]> {
        return await UsersEntity.find({ sUserGroupId: psUserGroupId });
    };

    async findByUserRoleId(psUserRoleId: string): Promise<IUser[]> {
        return await UsersEntity.find({ sUserRoleId: psUserRoleId });
    };

    async verification(psUserName: string, psPassword: string): Promise<IUser | null> {
        return await UsersEntity.findOne({ bIsActive: true, sUserName: psUserName, sPassword: psPassword });
    };

    async update(psId: string, poUser: Partial<IUser>): Promise<IUser | null> {
        return await UsersEntity.findByIdAndUpdate(psId, poUser, { new: true });
    };

    async updateUserGroupName(psUserGroupId: string, psUserGroupName: string) {
        return await UsersEntity.updateMany(
            { sUserGroupId: psUserGroupId },
            { $set: { sUserGroupName: psUserGroupName } });
    };

    async updateUserRoleName(psUserRoleId: string, psUserRoleName: string) {
        return await UsersEntity.updateMany(
            { sUserRoleId: psUserRoleId },
            { $set: { sUserRoleName: psUserRoleName } });
    };

    async deleteOne(psId: string): Promise<IUser | null> {
        return await UsersEntity.findByIdAndDelete(psId);
    };
};

import { UsersEntity } from '../../../../domain/entities/UsersEntity';
import { IUser } from '../../../../domain/models/UserModel';
import { IUserRepository } from '../../../../application/interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
    async create(poUser: Partial<IUser>): Promise<IUser> {
        const newUser = new UsersEntity(poUser);
        return await newUser.save();
    };

    async findAll(): Promise<IUser[]> {
        return await UsersEntity.find().sort({ createdAt: -1 });
    };

    async findById(psId: string): Promise<IUser | null> {
        return await UsersEntity.findById(psId);
    };

    async findByUsername(psUserName: string): Promise<IUser | null> {
        return await UsersEntity.findOne({ bIsActive: true, sUserName: psUserName });
    };

    async findByStatus(pbStatus: boolean): Promise<IUser[]> {
        return await UsersEntity.find({ bIsActive: pbStatus }).sort({ createdAt: -1 });
    };

    async verification(psUserName: string, psPassword: string): Promise<IUser | null> {
        return await UsersEntity.findOne({ bIsActive: true, sUserName: psUserName, sPassword: psPassword });
    };

    async update(psId: string, poUser: Partial<IUser>): Promise<IUser | null> {
        return await UsersEntity.findByIdAndUpdate(psId, poUser, { new: true });
    };

    async deleteOne(psId: string): Promise<IUser | null> {
        return await UsersEntity.findByIdAndDelete(psId);
    };
};

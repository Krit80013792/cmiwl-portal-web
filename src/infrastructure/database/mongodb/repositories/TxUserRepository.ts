import { TxUsersEntity } from '../../../../domain/entities/TxUsersEntity';
import { ITxUser } from '../../../../domain/models/TxUserModel';
import { ITxUserRepository } from '../../../../application/interfaces/ITxUserRepository';

export class TxUserRepository implements ITxUserRepository {
    async create(poTxUser: Partial<ITxUser>): Promise<ITxUser> {
        const newTxUser = new TxUsersEntity(poTxUser);
        return await newTxUser.save();
    };

    async findAll(): Promise<ITxUser[]> {
        return await TxUsersEntity.find().sort({ createdAt: -1 });
    };

    async findById(psId: string): Promise<ITxUser | null> {
        return await TxUsersEntity.findById(psId);
    };

    async update(psId: string, poTxUser: Partial<ITxUser>): Promise<ITxUser | null> {
        return await TxUsersEntity.findByIdAndUpdate(psId, poTxUser, { new: true });
    };

    async deleteOne(psId: string): Promise<ITxUser | null> {
        return await TxUsersEntity.findByIdAndDelete(psId);
    };
};

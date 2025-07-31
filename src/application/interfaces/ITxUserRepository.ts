import { ITxUser } from '../../domain/models/TxUserModel';

export interface ITxUserRepository {
    create(poTxUser: Partial<ITxUser>): Promise<ITxUser>;
    findAll(): Promise<ITxUser[]>;
    findById(psId: string): Promise<ITxUser | null>;
    update(psId: string, poTxUser: Partial<ITxUser>): Promise<ITxUser | null>;
    deleteOne(psId: string): Promise<ITxUser | null>;
};
 
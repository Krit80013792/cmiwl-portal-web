import { IUser } from '../../domain/models/UserModel';

export interface IUserRepository {
    create(poUser: Partial<IUser>): Promise<IUser>;
    findAll(): Promise<IUser[]>;
    findById(psId: string): Promise<IUser | null>;
    findByStatus(pbStatus: boolean): Promise<IUser[]>;
    update(psId: string, poUser: Partial<IUser>): Promise<IUser | null>;
    deleteOne(psId: string): Promise<IUser | null>;
};

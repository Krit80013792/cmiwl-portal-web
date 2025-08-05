import { IUser } from '../../domain/models/UserModel';

export interface IUserRepository {
    create(poUser: Partial<IUser>): Promise<IUser>;
    findAll(psUserId: string): Promise<IUser[]>;
    findById(psId: string): Promise<IUser | null>;
    findByUsername(psUserName: string): Promise<IUser | null>;
    findByStatus(pbStatus: boolean): Promise<IUser[]>;
    findByUserGroupId(psUserGroupId: string): Promise<IUser[]>;
    findByUserRoleId(psUserGroupId: string): Promise<IUser[]>;
    verification(psUserName: string, psPassword: string): Promise<IUser | null>;
    update(psId: string, poUser: Partial<IUser>): Promise<IUser | null>;
    updateUserGroupName(psUserGroupId: string, psUserGroupName: string): any;
    updateUserRoleName(psUserRoleId: string, psUserRoleName: string): any;
    deleteOne(psId: string): Promise<IUser | null>;
};

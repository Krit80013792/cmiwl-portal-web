import { IUserGroup } from '../../domain/models/UserGroupModel';

export interface IUserGroupRepository {
    create(poUserGroup: Partial<IUserGroup>): Promise<IUserGroup>;
    findAll(): Promise<IUserGroup[]>;
    findById(psId: string): Promise<IUserGroup | null>;
    findByUserGroupName(psId: string, psUserGroupName: string): Promise<IUserGroup | null>;
    update(psId: string, poUserGroup: Partial<IUserGroup>): Promise<IUserGroup | null>;
    deleteOne(psId: string): Promise<IUserGroup | null>;
};

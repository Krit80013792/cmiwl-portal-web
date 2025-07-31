import { IUserPermission } from '../../domain/models/UserPermissionModel';

export interface IUserPermissionRepository {
    create(poUserPermission: Partial<IUserPermission>): Promise<IUserPermission>;
    findAll(): Promise<IUserPermission[]>;
    findById(psId: string): Promise<IUserPermission | null>;
    update(psId: string, poUserPermission: Partial<IUserPermission>): Promise<IUserPermission | null>;
    deleteOne(psId: string): Promise<IUserPermission | null>;
};

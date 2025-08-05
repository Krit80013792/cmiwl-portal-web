import { IUserRole } from '../../domain/models/UserRoleModel';

export interface IUserRoleRepository {
    create(poUserRole: Partial<IUserRole>): Promise<IUserRole>;
    findAll(): Promise<IUserRole[]>;
    findById(psId: string): Promise<IUserRole | null>;
    findByUserRoleName(psId: string, psUserRoleName: string): Promise<IUserRole | null>;
    update(psId: string, poUserRole: Partial<IUserRole>): Promise<IUserRole | null>;
    deleteOne(psId: string): Promise<IUserRole | null>;
};

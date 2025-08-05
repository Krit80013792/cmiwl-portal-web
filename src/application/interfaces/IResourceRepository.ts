import { IResource } from '../../domain/models/ResourceModel';

export interface IResourceRepository {
    create(poResource: Partial<IResource>): Promise<IResource>;
    findAll(): Promise<IResource[]>;
    findById(psResourceId: string): Promise<IResource | null>;
    findByIds(psId: any[]): Promise<boolean>;
    findByResourceName(psName: string): Promise<IResource | null>;
    findMultipleByResourceNames(psNames: string[]): Promise<IResource[]>;
    update(psId: string, poResource: Partial<IResource>): Promise<IResource | null>;
    deleteOne(psId: string): Promise<IResource | null>;
};

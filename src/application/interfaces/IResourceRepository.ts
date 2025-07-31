import { IResource } from '../../domain/models/ResourceModel';

export interface IResourceRepository {
    create(poResource: Partial<IResource>): Promise<IResource>;
    findAll(): Promise<IResource[]>;
    findById(psId: string): Promise<IResource | null>;
    findByResourceName(psName: string): Promise<IResource | null>;
    findMultipleByResourceNames(psNames: string[]): Promise<IResource[]>;
    update(psId: string, poResource: Partial<IResource>): Promise<IResource | null>;
    deleteOne(psId: string): Promise<IResource | null>;
};

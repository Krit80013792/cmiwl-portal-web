import { ResourcesEntity } from '../../../../domain/entities/ResourcesEntity';
import { IResource } from '../../../../domain/models/ResourceModel';
import { IResourceRepository } from '../../../../application/interfaces/IResourceRepository';

export class ResourceRepository implements IResourceRepository {
    async create(poResource: Partial<IResource>): Promise<IResource> {
        const newResource = new ResourcesEntity(poResource);
        return await newResource.save();
    };

    async findAll(): Promise<IResource[]> {
        return await ResourcesEntity.find();
    };

    async findById(psId: string): Promise<IResource | null> {
        return await ResourcesEntity.findById(psId);
    };

    async findByResourceName(psName: string): Promise<IResource | null> {
        return await ResourcesEntity.findOne({ sResourceName: psName });
    };

    async findMultipleByResourceNames(psNames: string[]): Promise<IResource[]> {
        return await ResourcesEntity.find({ sResourceName: { $in: psNames } });
    };

    async update(psId: string, poResource: Partial<IResource>): Promise<IResource | null> {
        return await ResourcesEntity.findByIdAndUpdate(psId, poResource, { new: true });
    };

    async deleteOne(psId: string): Promise<IResource | null> {
        return await ResourcesEntity.findByIdAndDelete(psId);
    };
};

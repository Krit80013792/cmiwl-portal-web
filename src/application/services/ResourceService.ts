//* src/application/services/ResourceService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection';
import { IResourceRepository } from '../interfaces/IResourceRepository';
import { IResource } from '../../domain/models/ResourceModel';
import { ResourceDTO } from '../dtos/ResourceDTO';
import { BaseResponse } from '../../domain/common/BaseResponse';

export class ResourceService {

    constructor(private readonly resourceRepository: IResourceRepository) { }

    private mapToDTO(resource: IResource): ResourceDTO {
        return {
            id: resource._id.toString(), //* Convert MongoDB ObjectId to string
            resourceId: resource.sResourceId,
            resourceOrder: resource.nResourceOrder,
            resourceName: resource.sResourceName,
            resourcePolicy: resource.sResourcePolicy,
            resourceDescription: resource.sResourceDescription,
            resourceLabel: resource.sResourceLabel,
            resourceIcon: resource.sResourceIcon,
            resourcePathTo: resource.sResourcePathTo,
            childrenItems: resource.arChildrenItems ? resource.arChildrenItems.map(this.mapToDTO) : [], //* Map children items recursively
            createdBy: resource.createdBy,
            updatedBy: resource.updatedBy,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
        } as ResourceDTO;
    };

    private mapToDomain(dto: ResourceDTO): IResource {
        return {
            _id: dto.id,
            sResourceId: dto.resourceId,
            nResourceOrder: dto.resourceOrder,
            sResourceName: dto.resourceName,
            sResourcePolicy: dto.resourcePolicy,
            sResourceDescription: dto.resourceDescription,
            sResourceLabel: dto.resourceLabel,
            sResourceIcon: dto.resourceIcon,
            sResourcePathTo: dto.resourcePathTo,
            arChildrenItems: dto.childrenItems ? dto.childrenItems.map(child => this.mapToDomain(child)) : [], //* Map children items recursively
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
        } as IResource;
    };

    async createResource(poResource: Partial<ResourceDTO>): Promise<BaseResponse<ResourceDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oResource = this.mapToDomain(poResource as ResourceDTO);

            const resourceExists = await this.resourceRepository.findByResourceName(oResource?.sResourceName);
            if (resourceExists) {
                return {
                    statusCode: 409,
                    message: 'Resource already exists',
                    data: null,
                };
            }

            const oNewResource = await this.resourceRepository.create(oResource);
            return {
                statusCode: 201,
                message: 'Resource created successfully',
                data: this.mapToDTO(oNewResource),
            };
        } catch (error) {
            console.error(`Error createResource :`, error);
            return {
                statusCode: 500,
                message: 'Failed to create Resource',
                data: null,
            };
        }
    };

    async getResources(): Promise<BaseResponse<ResourceDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oResources = await this.resourceRepository.findAll();
            return {
                statusCode: oResources ? 200 : 404,
                message: oResources ? 'Resources found' : 'Resources not found',
                data: oResources ? oResources.map(this.mapToDTO.bind(this)) : null,
            };
        } catch (error) {
            console.error(`Error getResources :`, error);
            return {
                statusCode: 500,
                message: 'Failed to get Resources',
                data: null,
            };
        }
    };

    async getResourceById(psResourceId: string): Promise<BaseResponse<ResourceDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oResource = await this.resourceRepository.findById(psResourceId);
            return {
                statusCode: oResource ? 200 : 404,
                message: oResource ? 'Resource found' : 'Resource not found',
                data: oResource ? this.mapToDTO(oResource) : null,
            };
        } catch (error) {
            console.error(`Error getResourceById:`, error);
            return {
                statusCode: 500,
                message: 'Failed to get Resource',
                data: null,
            };
        }
    };

    async getMultipleByResourceNames(psResourceNames: string[]): Promise<BaseResponse<ResourceDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oResources = await this.resourceRepository.findMultipleByResourceNames(psResourceNames);
            return {
                statusCode: oResources ? 200 : 404,
                message: oResources ? 'Resources found' : 'Resources not found',
                data: oResources ? oResources.map(this.mapToDTO.bind(this)) : null,
            };
        } catch (error) {
            console.error(`Error getMultipleByResourceNames:`, error);
            return {
                statusCode: 500,
                message: 'Failed to get Resources',
                data: null,
            };
        }
    };

    async updateResource(psId: string, poResource: Partial<ResourceDTO>): Promise<BaseResponse<ResourceDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oResource = this.mapToDomain(poResource as ResourceDTO);
            const oUpdatedResource = await this.resourceRepository.update(psId, oResource);
            return {
                statusCode: oUpdatedResource ? 200 : 404,
                message: oUpdatedResource ? 'Resource updated' : 'Resource not found',
                data: oUpdatedResource ? this.mapToDTO(oUpdatedResource) : null,
            };
        } catch (error) {
            console.error(`Error updateResource:`, error);
            return {
                statusCode: 500,
                message: 'Failed to update Resource',
                data: null,
            };
        }
    };

    async deleteResource(psId: string): Promise<BaseResponse<ResourceDTO | null>> {
        try {
            await MongoDBConnectionService();
            const deletedResource = await this.resourceRepository.deleteOne(psId);
            return {
                statusCode: deletedResource ? 200 : 404,
                message: deletedResource ? 'Resource deleted' : 'Resource not found',
                data: deletedResource ? this.mapToDTO(deletedResource) : null,
            };
        } catch (error) {
            console.error(`Error deleteResource:`, error);
            return {
                statusCode: 500,
                message: 'Failed to delete Resource',
                data: null,
            };
        }
    };
};

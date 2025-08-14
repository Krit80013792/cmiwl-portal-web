//* src/application/services/UserRoleService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection';
import { IUserRoleRepository } from '../interfaces/IUserRoleRepository';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IResourceRepository } from '../interfaces/IResourceRepository';
import { IUserRole } from '../../domain/models/UserRoleModel';
import { UserRoleDTO } from '../dtos/UserRoleDTO';
import { BaseResponse } from '../../domain/common/BaseResponse';
import { v4 as uuidv4 } from 'uuid';
import { mapUserRolesPermissions } from '@/src/shared/utils/mapUserRolesPermissions';

export class UserRoleService {

    constructor(
        private readonly userRoleRepository: IUserRoleRepository,
        private readonly userRepository: IUserRepository,
        private readonly resourceRepository: IResourceRepository,
    ) { }

    private mapToDTO(userRole: IUserRole): UserRoleDTO {
        return {
            id: userRole._id.toString(), //* Convert MongoDB ObjectId to string
            userRoleId: userRole.sUserRoleId,
            userRoleName: userRole.sUserRoleName,
            userRoleDescription: userRole.sUserRoleDescription,
            userRolePermissions: userRole.arUserRolePermissions,
            resources: userRole.arResources,
            createdBy: userRole.createdBy,
            updatedBy: userRole.updatedBy,
            createdAt: userRole.createdAt,
            updatedAt: userRole.updatedAt,
        } as UserRoleDTO;
    };

    private mapToDomain(dto: UserRoleDTO): IUserRole {
        return {
            _id: dto.id,
            sUserRoleId: dto.userRoleId,
            sUserRoleName: dto.userRoleName,
            sUserRoleDescription: dto.userRoleDescription,
            arUserRolePermissions: dto.userRolePermissions,
            arResources: dto.resources,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
        } as IUserRole;
    };

    //* @(users:create)
    async createUserRole(poUserRole: Partial<UserRoleDTO>): Promise<BaseResponse<UserRoleDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oUserRole = this.mapToDomain(poUserRole as UserRoleDTO);

            const userRoleExists = await this.userRoleRepository.findByUserRoleName('', oUserRole?.sUserRoleName);
            if (userRoleExists) {
                return {
                    statusCode: 409,
                    message: 'UserRole already exists',
                    data: null,
                };
            }

            const resourceIds = poUserRole?.permissionsMap?.map(r => r.resourceId) ?? [];
            const foundAll = await this.resourceRepository.findByIds(resourceIds);
            if (!foundAll) {
                return {
                    statusCode: 404,
                    message: 'Resources not found',
                    data: null,
                };
            }

            oUserRole.sUserRoleId = uuidv4(); //* Generate a new UUID for the userRoleId
            oUserRole.arUserRolePermissions = [];
            oUserRole.arResources = [];

            const { arUserRolePermissions, arResources } = await mapUserRolesPermissions(poUserRole, this.resourceRepository);

            oUserRole.arUserRolePermissions = arUserRolePermissions;
            oUserRole.arResources = arResources;

            const oNewUserRole = await this.userRoleRepository.create(oUserRole);
            return {
                statusCode: 201,
                message: 'UserRole created successfully',
                data: this.mapToDTO(oNewUserRole),
            };
        } catch (error) {
            console.error(`Error createUserRole :`, error);
            return {
                statusCode: 500,
                message: 'Failed to create UserRole',
                data: null,
            };
        }
    };

    //* @(users:read)
    async getUserRoles(): Promise<BaseResponse<UserRoleDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oUserRoles = await this.userRoleRepository.findAll();
            return {
                statusCode: oUserRoles ? 200 : 404,
                message: oUserRoles ? 'UserRoles found' : 'UserRoles not found',
                data: oUserRoles ? oUserRoles.map(this.mapToDTO.bind(this)) : null,
            };
        } catch (error) {
            console.error(`Error getUserRoles :`, error);
            return {
                statusCode: 500,
                message: 'Failed to get UserRoles',
                data: null,
            };
        }
    };

    //* @(users:read)
    async getUserRoleById(psId: string): Promise<BaseResponse<UserRoleDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oUserRole = await this.userRoleRepository.findById(psId);
            return {
                statusCode: oUserRole ? 200 : 404,
                message: oUserRole ? 'UserRole found' : 'UserRole not found',
                data: oUserRole ? this.mapToDTO(oUserRole) : null,
            };
        } catch (error) {
            console.error(`Error getUserRoleById:`, error);
            return {
                statusCode: 500,
                message: 'Failed to get UserRole',
                data: null,
            };
        }
    };

    //* @(users:update)
    async updateUserRole(psId: string, poUserRole: Partial<UserRoleDTO>): Promise<BaseResponse<UserRoleDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oUserRole = this.mapToDomain(poUserRole as UserRoleDTO);

            const userRoleExists = await this.userRoleRepository.findByUserRoleName(psId, oUserRole?.sUserRoleName);
            if (userRoleExists) {
                return {
                    statusCode: 409,
                    message: 'UserRole already exists',
                    data: null,
                };
            }

            const resourceIds = poUserRole?.permissionsMap?.map(r => r.resourceId) ?? [];
            const foundAll = await this.resourceRepository.findByIds(resourceIds);
            if (!foundAll) {
                return {
                    statusCode: 404,
                    message: 'Resources not found',
                    data: null,
                };
            }

            oUserRole.arUserRolePermissions = [];
            oUserRole.arResources = [];

            const { arUserRolePermissions, arResources } = await mapUserRolesPermissions(poUserRole, this.resourceRepository);

            oUserRole.arUserRolePermissions = arUserRolePermissions;
            oUserRole.arResources = arResources;

            const oUpdatedUserRole = await this.userRoleRepository.update(psId, oUserRole);
            if (oUpdatedUserRole) {
                //* Update user role name in users if it has changed
                await this.userRepository.updateUserRoleName(oUpdatedUserRole?.sUserRoleId, oUpdatedUserRole?.sUserRoleName);
            }

            return {
                statusCode: oUpdatedUserRole ? 200 : 404,
                message: oUpdatedUserRole ? 'UserRole updated' : 'UserRole not found',
                data: oUpdatedUserRole ? this.mapToDTO(oUpdatedUserRole) : null,
            };
        } catch (error) {
            console.error(`Error updateUserRole:`, error);
            return {
                statusCode: 500,
                message: 'Failed to update UserRole',
                data: null,
            };
        }
    };

    //* @(users:delete)
    async deleteUserRole(psId: string, psUserRoleId: string): Promise<BaseResponse<UserRoleDTO | null>> {
        try {
            await MongoDBConnectionService();

            const userRoleExists = await this.userRepository.findByUserRoleId(psUserRoleId);
            if (userRoleExists.length > 0) {
                return {
                    statusCode: 409,
                    message: 'UserRole is currently in use',
                    data: null,
                };
            }

            const deletedUserRole = await this.userRoleRepository.deleteOne(psId);
            return {
                statusCode: deletedUserRole ? 200 : 404,
                message: deletedUserRole ? 'UserRole deleted' : 'UserRole not found',
                data: deletedUserRole ? this.mapToDTO(deletedUserRole) : null,
            };
        } catch (error) {
            console.error(`Error deleteUserRole:`, error);
            return {
                statusCode: 500,
                message: 'Failed to delete UserRole',
                data: null,
            };
        }
    };
};

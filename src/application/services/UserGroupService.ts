//* src/application/services/UserGroupService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection';
import { IUserGroupRepository } from '../interfaces/IUserGroupRepository';
import { IUserGroup } from '../../domain/models/UserGroupModel';
import { UserGroupDTO } from '../dtos/UserGroupDTO';
import { BaseResponse } from '../../domain/common/BaseResponse';

export class UserGroupService {

    constructor(private readonly userGroupRepository: IUserGroupRepository) { }

    private mapToDTO(userGroup: IUserGroup): UserGroupDTO {
        return {
            id: userGroup._id.toString(), //* Convert MongoDB ObjectId to string
            userGroupId: userGroup.sUserGroupId,
            userGroupName: userGroup.sUserGroupName,
            createdBy: userGroup.createdBy,
            updatedBy: userGroup.updatedBy,
            createdAt: userGroup.createdAt,
            updatedAt: userGroup.updatedAt,
        } as UserGroupDTO;
    };

    private mapToDomain(dto: UserGroupDTO): IUserGroup {
        return {
            _id: dto.id,
            sUserGroupId: dto.userGroupId,
            sUserGroupName: dto.userGroupName,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
        } as IUserGroup;
    };

    //* @(users:create)
    async createUserGroup(poUserGroup: Partial<UserGroupDTO>): Promise<BaseResponse<UserGroupDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oUserGroup = this.mapToDomain(poUserGroup as UserGroupDTO);

            const userGroupExists = await this.userGroupRepository.findByUserGroupName(oUserGroup?.sUserGroupName);
            if (userGroupExists) {
                return {
                    statusCode: 409,
                    message: 'UserGroup already exists',
                    data: null,
                };
            }

            const oNewUserGroup = await this.userGroupRepository.create(oUserGroup);
            return {
                statusCode: 201,
                message: 'UserGroup created successfully',
                data: this.mapToDTO(oNewUserGroup),
            };
        } catch (error) {
            console.error(`Error createUserGroup :`, error);
            return {
                statusCode: 500,
                message: 'Failed to create UserGroup',
                data: null,
            };
        }
    };

    //* @(users:read)
    async getUserGroups(): Promise<BaseResponse<UserGroupDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oUserGroups = await this.userGroupRepository.findAll();
            return {
                statusCode: oUserGroups ? 200 : 404,
                message: oUserGroups ? 'UserGroups found' : 'UserGroups not found',
                data: oUserGroups ? oUserGroups.map(this.mapToDTO.bind(this)) : null,
            };
        } catch (error) {
            console.error(`Error getUserGroups :`, error);
            return {
                statusCode: 500,
                message: 'Failed to get UserGroups',
                data: null,
            };
        }
    };

    //* @(users:read)
    async getUserGroupById(psId: string): Promise<BaseResponse<UserGroupDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oUserGroup = await this.userGroupRepository.findById(psId);
            return {
                statusCode: oUserGroup ? 200 : 404,
                message: oUserGroup ? 'UserGroup found' : 'UserGroup not found',
                data: oUserGroup ? this.mapToDTO(oUserGroup) : null,
            };
        } catch (error) {
            console.error(`Error getUserGroupById:`, error);
            return {
                statusCode: 500,
                message: 'Failed to get UserGroup',
                data: null,
            };
        }
    };

    //* @(users:update)
    async updateUserGroup(psId: string, poUserGroup: Partial<UserGroupDTO>): Promise<BaseResponse<UserGroupDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oUserGroup = this.mapToDomain(poUserGroup as UserGroupDTO);
            const oUpdatedUserGroup = await this.userGroupRepository.update(psId, oUserGroup);
            return {
                statusCode: oUpdatedUserGroup ? 200 : 404,
                message: oUpdatedUserGroup ? 'UserGroup updated' : 'UserGroup not found',
                data: oUpdatedUserGroup ? this.mapToDTO(oUpdatedUserGroup) : null,
            };
        } catch (error) {
            console.error(`Error updateUserGroup:`, error);
            return {
                statusCode: 500,
                message: 'Failed to update UserGroup',
                data: null,
            };
        }
    };

    //* @(users:delete)
    async deleteUserGroup(psId: string): Promise<BaseResponse<UserGroupDTO | null>> {
        try {
            await MongoDBConnectionService();
            const deletedUserGroup = await this.userGroupRepository.deleteOne(psId);
            return {
                statusCode: deletedUserGroup ? 200 : 404,
                message: deletedUserGroup ? 'UserGroup deleted' : 'UserGroup not found',
                data: deletedUserGroup ? this.mapToDTO(deletedUserGroup) : null,
            };
        } catch (error) {
            console.error(`Error deleteUserGroup:`, error);
            return {
                statusCode: 500,
                message: 'Failed to delete UserGroup',
                data: null,
            };
        }
    };
};

//* src/application/services/UserService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IUserGroupRepository } from '../interfaces/IUserGroupRepository';
import { IUserRoleRepository } from '../interfaces/IUserRoleRepository';
import { IUser } from '../../domain/models/UserModel';
import { UserDTO } from '../dtos/UserDTO';
import { BaseResponse } from '../../domain/common/BaseResponse';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export class UserService {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly userGroupRepository: IUserGroupRepository,
        private readonly userRoleRepository: IUserRoleRepository
    ) { }

    private mapToDTO(user: IUser): UserDTO {
        return {
            id: user._id.toString(),
            userId: user.sUserId,
            userName: user.sUserName,
            password: user.sPassword,
            userGroupId: user.sUserGroupId,
            userGroupName: user.sUserGroupName,
            userRoleId: user.sUserRoleId,
            userRoleName: user.sUserRoleName,
            isActive: user.bIsActive,
            createdBy: user.createdBy,
            updatedBy: user.updatedBy,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    };

    private mapToDomain(dto: UserDTO): IUser {
        return {
            _id: dto.id,
            sUserId: dto.userId,
            sUserName: dto.userName,
            sPassword: dto.password,
            sUserGroupId: dto.userGroupId,
            sUserGroupName: dto.userGroupName,
            sUserRoleId: dto.userRoleId,
            sUserRoleName: dto.userRoleName,
            bIsActive: dto.isActive,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
        } as IUser;
    };

    //* @(users:create)
    async createUser(poUser: Partial<UserDTO>): Promise<BaseResponse<UserDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oUser = this.mapToDomain(poUser as UserDTO);

            const userExists = await this.userRepository.findByUsername(oUser?.sUserName);
            if (userExists) {
                return {
                    statusCode: 409,
                    message: 'User already exists',
                    data: null,
                };
            }

            const userGroupExists = await this.userGroupRepository.findById(oUser?.sUserGroupId);
            if (!userGroupExists) {
                return {
                    statusCode: 404,
                    message: 'User Group doesn\'t exists',
                    data: null,
                };
            }

            const userRoleExists = await this.userRoleRepository.findById(oUser?.sUserRoleId);
            if (!userRoleExists) {
                return {
                    statusCode: 404,
                    message: 'User Role doesn\'t exists',
                    data: null,
                };
            }

            oUser.sUserId = uuidv4(); //* Generate a new UUID for the userId
            oUser.sPassword = await bcrypt.hash(oUser.sPassword, 10); //* Hash the password before saving
            oUser.sUserGroupId = userGroupExists?.sUserGroupId;
            oUser.sUserGroupName = userGroupExists?.sUserGroupName;
            oUser.sUserRoleId = userRoleExists?.sUserRoleId;
            oUser.sUserRoleName = userRoleExists?.sUserRoleName;

            const oNewUser = await this.userRepository.create(oUser);
            return {
                statusCode: 201,
                message: 'User created successfully',
                data: this.mapToDTO(oNewUser),
            };
        } catch (error) {
            console.error(`Error createUser:`, error);
            return {
                statusCode: 500,
                message: 'Failed to create User',
                data: null,
            };
        }
    };

    //* @(users:read)
    async getUsers(psUserId: string): Promise<BaseResponse<UserDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oUsers = await this.userRepository.findAll(psUserId);
            return {
                statusCode: oUsers ? 200 : 404,
                message: oUsers ? 'Users found' : 'Users not found',
                data: oUsers ? oUsers.map(this.mapToDTO.bind(this)) : null,
            };
        } catch (error) {
            console.error(`Error getUsers :`, error);
            return {
                statusCode: 500,
                message: 'Failed to get Users',
                data: null,
            };
        }
    };

    //* @(users:read)
    async getUserById(psId: string): Promise<BaseResponse<UserDTO | null>> {
        try {
            await MongoDBConnectionService();
            const user = await this.userRepository.findById(psId);
            return {
                statusCode: user ? 200 : 404,
                message: user ? 'User found' : 'User not found',
                data: user ? this.mapToDTO(user) : null,
            };
        } catch (error) {
            console.error(`Error getUserById:`, error);
            return {
                statusCode: 500,
                message: 'Failed to get user',
                data: null,
            };
        }
    };

    //* @(users:read)
    async getUserByName(psName: string): Promise<BaseResponse<UserDTO | null>> {
        try {
            await MongoDBConnectionService();
            const user = await this.userRepository.findByUsername(psName);
            return {
                statusCode: user ? 200 : 404,
                message: user ? 'User found' : 'User not found',
                data: user ? this.mapToDTO(user) : null,
            };
        } catch (error) {
            console.error(`Error getUserByName:`, error);
            return {
                statusCode: 500,
                message: 'Failed to get user',
                data: null,
            };
        }
    };

    //* @(users:read)
    async getUserByStatus(pbStatus: boolean): Promise<BaseResponse<UserDTO[]>> {
        try {
            await MongoDBConnectionService();
            const users = await this.userRepository.findByStatus(pbStatus);
            return {
                statusCode: 200,
                message: 'Users fetched successfully',
                data: users.map(this.mapToDTO),
            };
        } catch (error) {
            console.error(`Error getUserByStatus:`, error);
            return {
                statusCode: 500,
                message: 'Failed to fetch users',
                data: [],
            };
        }
    };

    async verification(psUserName: string, psPassword: string): Promise<BaseResponse<UserDTO | null>> {
        try {
            await MongoDBConnectionService();
            const user = await this.userRepository.findByUsername(psUserName);
            if (!user) {
                return {
                    statusCode: 401,
                    message: 'Invalid username or password',
                    data: null,
                };
            }

            const isPasswordMatch = await bcrypt.compare(psPassword, user.sPassword);
            if (!isPasswordMatch) {
                return {
                    statusCode: 401,
                    message: 'Invalid username or password',
                    data: null,
                };
            }

            return {
                statusCode: 200,
                message: 'User verified',
                data: this.mapToDTO(user),
            };
        } catch (error) {
            console.error(`Error verification:`, error);
            return {
                statusCode: 500,
                message: 'Failed to verify user',
                data: null,
            };
        }
    };

    //* @(users:update)
    async updateUser(psId: string, poUser: Partial<UserDTO>): Promise<BaseResponse<UserDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oUser = this.mapToDomain(poUser as UserDTO);

            const userExists = await this.userRepository.findById(oUser?.sUserId);
            if (!userExists) {
                return {
                    statusCode: 409,
                    message: 'User doesn\'t exists',
                    data: null,
                };
            }

            const userGroupExists = await this.userGroupRepository.findById(oUser?.sUserGroupId);
            if (!userGroupExists) {
                return {
                    statusCode: 404,
                    message: 'User Group doesn\'t exists',
                    data: null,
                };
            }

            const userRoleExists = await this.userRoleRepository.findById(oUser?.sUserRoleId);
            if (!userRoleExists) {
                return {
                    statusCode: 404,
                    message: 'User Role doesn\'t exists',
                    data: null,
                };
            }

            oUser.sUserGroupId = userGroupExists?.sUserGroupId;
            oUser.sUserGroupName = userGroupExists?.sUserGroupName;
            oUser.sUserRoleId = userRoleExists?.sUserRoleId;
            oUser.sUserRoleName = userRoleExists?.sUserRoleName;
            oUser.createdBy = userExists?.createdBy;

            const oUpdatedUser = await this.userRepository.update(oUser?._id, oUser);
            return {
                statusCode: oUpdatedUser ? 200 : 404,
                message: oUpdatedUser ? 'User updated' : 'User not found',
                data: oUpdatedUser ? this.mapToDTO(oUpdatedUser) : null,
            };
        } catch (error) {
            console.error(`Error updateUser:`, error);
            return {
                statusCode: 500,
                message: 'Failed to update user',
                data: null,
            };
        }
    };

    //* @(users:delete)
    async deleteUser(psId: string): Promise<BaseResponse<UserDTO | null>> {
        try {
            await MongoDBConnectionService();
            const deletedUser = await this.userRepository.deleteOne(psId);
            return {
                statusCode: deletedUser ? 200 : 404,
                message: deletedUser ? 'User deleted' : 'User not found',
                data: deletedUser ? this.mapToDTO(deletedUser) : null,
            };
        } catch (error) {
            console.error(`Error deleteUser:`, error);
            return {
                statusCode: 500,
                message: 'Failed to delete user',
                data: null,
            };
        }
    };
};

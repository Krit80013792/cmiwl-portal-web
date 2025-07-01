import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IUser } from '../../domain/models/UserModel';
import { UserDTO } from '../dtos/UserDTO';

export class UserService {

    constructor(private readonly userRepository: IUserRepository) { }

    private mapToDTO(user: IUser): UserDTO {
        return {
            id: user._id.toString(), //* Convert MongoDB ObjectId to string
            userId: user.sUserId,
            userName: user.sUserName,
            userGroup: user.sUserGroup,
            userRole: user.sUserRole,
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
            sUserGroup: dto.userGroup,
            sUserRole: dto.userRole,
            bIsActive: dto.isActive,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
        } as IUser;
    };

    async createUser(poUser: Partial<UserDTO>): Promise<UserDTO | null> {
        try {
            await MongoDBConnectionService();
            const oUser = this.mapToDomain(poUser as UserDTO);
            const oNewUser = await this.userRepository.create(oUser);
            return this.mapToDTO(oNewUser);
        } catch (error) {
            console.error(`Error createUser :`, error);
            return null;
        }
    };

    async getUserById(psId: string): Promise<UserDTO | null> {
        try {
            await MongoDBConnectionService();
            const user = await this.userRepository.findById(psId);
            return user ? this.mapToDTO(user) : null;
        } catch (error) {
            console.error(`Error getUserById :`, error);
            return null;
        }
    };

    async getUserByStatus(pbStatus: boolean): Promise<UserDTO[]> {
        try {
            await MongoDBConnectionService();
            const users = await this.userRepository.findByStatus(pbStatus);
            return users.map(this.mapToDTO);
        } catch (error) {
            console.error(`Error getUserByStatus :`, error);
            return [];
        }
    };

    async updateUser(psId: string, poUser: Partial<UserDTO>): Promise<UserDTO | null> {
        try {
            await MongoDBConnectionService();
            const oUser = this.mapToDomain(poUser as UserDTO);
            const oUpdatedUser = await this.userRepository.update(psId, oUser);
            return oUpdatedUser ? this.mapToDTO(oUpdatedUser) : null;
        } catch (error) {
            console.error(`Error updateUser :`, error);
            return null;
        }
    };

    async deleteUser(psId: string): Promise<UserDTO | null> {
        try {
            await MongoDBConnectionService();
            const deletedUser = await this.userRepository.deleteOne(psId);
            return deletedUser ? this.mapToDTO(deletedUser) : null;
        } catch (error) {
            console.error(`Error deleteUser :`, error);
            return null;
        }
    };
};

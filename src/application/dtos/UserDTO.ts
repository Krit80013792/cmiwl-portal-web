export interface UserDTO {
    id: string; //* MongoDB ObjectId
    userId: string; //* uuid
    userName: string;
    password: string;
    userGroupId: string; //* uuid
    userGroupName: string;
    userRoleId: string; //* uuid
    userRoleName: string;
    isActive: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};

export type SafeUserDTO = Omit<UserDTO, 'password'>;

export interface UserPermissionDTO {
    id: string; //* MongoDB ObjectId
    userPermissionCode: string;
    userPermissionName: string;
    userPermissionDescription: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};

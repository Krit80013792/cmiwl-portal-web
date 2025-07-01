export interface UserDTO {
    id: string; //* This is the MongoDB ObjectId
    userId: string;
    userName: string;
    userGroup: string;
    userRole: string;
    isActive: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};

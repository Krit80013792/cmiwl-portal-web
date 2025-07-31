import { Document } from 'mongoose';

export interface IUser extends Document {
    _id: string; //* MongoDB ObjectId
    sUserId: string; //* uuid
    sUserName: string;
    sPassword: string;
    sUserGroupId: string; //* uuid
    sUserGroupName: string;
    sUserRoleId: string; //* uuid
    sUserRoleName: string;
    bIsActive: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};

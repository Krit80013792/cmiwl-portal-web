import { Document } from 'mongoose';

export interface IUser extends Document {
    _id: string; //* MongoDB ObjectId
    sUserId: string;
    sUserName: string;
    sPassword: string;
    sUserGroup: string;
    sUserRole: string;
    bIsActive: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};

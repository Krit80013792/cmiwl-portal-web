import { Document } from 'mongoose';

export interface IUserPermission extends Document {
    _id: string; //* MongoDB ObjectId
    sUserPermissionCode: string;
    sUserPermissionName: string;
    sUserPermissionDescription: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};

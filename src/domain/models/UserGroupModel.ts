import { Document } from 'mongoose';

export interface IUserGroup extends Document {
    _id: string; //* MongoDB ObjectId
    sUserGroupId: string; //* uuid
    sUserGroupName: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};

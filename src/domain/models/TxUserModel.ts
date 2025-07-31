import { Document } from 'mongoose';

export interface ITxUser extends Document {
    _id: string; //* MongoDB ObjectId
    sUserId: string; //* uuid
    sUserName: string;
    sUserGroupName: string;
    sUserRoleName: string;
    sSessionId: string; //* uuid without dashes
    sToken: string;
    createdAt: Date;
    updatedAt: Date;
};

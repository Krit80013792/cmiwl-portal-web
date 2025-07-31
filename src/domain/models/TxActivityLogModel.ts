import { Document } from 'mongoose';

export interface ITxActivityLog extends Document {
    _id: string; //* MongoDB ObjectId
    sUserName: string;
    sUserGroupName: string;
    sUserRoleName: string;
    sRoute: string;
    sMethod: string; //* e.g., 'GET', 'POST', 'PATCH', 'PUT', 'DELETE'
    sAction: string;
    sStatus: string;
    sRequestMsg: string;
    sResponseMsg: string;
    sChannel: string; //* e.g., 'CMS', 'NTLAPP', 'HEY', 'TIDLOH'
    createdAt: Date;
    updatedAt: Date;
};

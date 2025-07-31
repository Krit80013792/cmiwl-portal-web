import { Document } from 'mongoose';

export interface IUserRole extends Document {
    _id: string; //* MongoDB ObjectId
    sUserRoleId: string; //* uuid
    sUserRoleName: string;
    sUserRoleDescription: string;
    arUserRolePermissions: string[]; //* Array of permission e.g., ["users:create", "pages:read"]
    arResources: string[];
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};

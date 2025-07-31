import mongoose, { Schema } from 'mongoose';
import { IUserRole } from '../models/UserRoleModel';

const UserRolesSchema: Schema = new Schema(
    {
        sUserRoleId: { type: String, required: true, unique: true }, //* uuid
        sUserRoleName: { type: String, required: true },
        sUserRoleDescription: { type: String, required: false, default: '' },
        arUserRolePermissions: { type: [String], required: true }, //* Array of permission e.g., ["users:create", "pages:read"]
        arResources: { type: [String], required: true, default: [] },
        createdBy: { type: String, required: true },
        updatedBy: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: 'CMSUserRoles',
    }
);

export const UserRolesEntity = mongoose.models.CMSUserRoles || mongoose.model<IUserRole>('CMSUserRoles', UserRolesSchema);

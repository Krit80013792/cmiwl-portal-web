import mongoose, { Schema } from 'mongoose';
import { IUserPermission } from '../models/UserPermissionModel';

const UserPermissionsSchema: Schema = new Schema(
    {
        sUserPermissionCode: { type: String, required: true },
        sUserPermissionName: { type: String, required: true },
        sUserPermissionDescription: { type: String, required: false, default: '' },
        createdBy: { type: String, required: true },
        updatedBy: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: 'CMSUserPermissions',
    }
);

export const UserPermissionsEntity = mongoose.models.CMSUserPermissions || mongoose.model<IUserPermission>('CMSUserPermissions', UserPermissionsSchema);

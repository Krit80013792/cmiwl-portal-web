import mongoose, { Schema } from 'mongoose';
import { IUserGroup } from '../models/UserGroupModel';

const UserGroupsSchema: Schema = new Schema(
    {
        sUserGroupId: { type: String, required: true, unique: true }, //* uuid
        sUserGroupName: { type: String, required: true },
        createdBy: { type: String, required: true },
        updatedBy: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: 'CMSUserGroups',
    }
);

export const UserGroupsEntity = mongoose.models.CMSUserGroups || mongoose.model<IUserGroup>('CMSUserGroups', UserGroupsSchema);

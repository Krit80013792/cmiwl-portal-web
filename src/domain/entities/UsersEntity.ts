import mongoose, { Schema } from 'mongoose';
import { IUser } from '../models/UserModel';

const UsersSchema: Schema = new Schema(
    {
        sUserId: { type: String, required: true, unique: true }, //* uuid
        sUserName: { type: String, required: true },
        sPassword: { type: String, required: true },
        sUserGroupId: { type: String, required: true, },
        sUserGroupName: { type: String, required: true, },
        sUserRoleId: { type: String, required: true, },
        sUserRoleName: { type: String, required: true, },
        bIsActive: { type: Boolean, default: true },
        createdBy: { type: String, required: true },
        updatedBy: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: 'CMSUsers',
    }
);

export const UsersEntity = mongoose.models.CMSUsers || mongoose.model<IUser>('CMSUsers', UsersSchema);

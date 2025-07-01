import mongoose, { Schema } from 'mongoose';
import { IUser } from '../models/UserModel';

const UserSchema: Schema = new Schema(
    {
        sUserId: { type: String, required: true, unique: true },
        sUserName: { type: String, required: true },
        sPassword: { type: String, required: true },
        sUserGroup: { type: String, required: true },
        sUserRole: { type: String, required: true },
        bIsActive: { type: Boolean, default: true },
        createdBy: { type: String, required: true },
        updatedBy: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export const UsersEntity = mongoose.models.Users || mongoose.model<IUser>('Users', UserSchema);

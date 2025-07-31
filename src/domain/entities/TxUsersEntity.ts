import mongoose, { Schema } from 'mongoose';
import { ITxUser } from '../models/TxUserModel';

const TxUsersSchema: Schema = new Schema(
    {
        sUserId: { type: String, required: true, unique: true }, //* uuid
        sUserName: { type: String, required: true },
        sUserGroupName: { type: String, required: true, },
        sUserRoleName: { type: String, required: true, },
        sSessionId: { type: String, required: true }, //* uuid without dashes
        sToken: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: 'CMSTxUsers',
    }
);

export const TxUsersEntity = mongoose.models.CMSTxUsers || mongoose.model<ITxUser>('CMSTxUsers', TxUsersSchema);

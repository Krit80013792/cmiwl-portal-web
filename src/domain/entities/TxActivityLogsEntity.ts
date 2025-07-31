import mongoose, { Schema } from 'mongoose';
import { ITxActivityLog } from '../models/TxActivityLogModel';

const TxActivityLogsSchema: Schema = new Schema(
    {
        sUserName: { type: String, required: false },
        sUserGroupName: { type: String, required: false, },
        sUserRoleName: { type: String, required: false, },
        sRoute: { type: String, required: false },
        sMethod: { type: String, required: false },
        sAction: { type: String, required: false },
        sStatus: { type: String, required: false },
        sRequestMsg: { type: String, required: false },
        sResponseMsg: { type: String, required: false },
        sChannel: { type: String, required: false },
    },
    {
        timestamps: true,
        collection: 'CMSTxActivityLogs',
    }
);

export const TxActivityLogsEntity = mongoose.models.CMSTxActivityLogs || mongoose.model<ITxActivityLog>('CMSTxActivityLogs', TxActivityLogsSchema);

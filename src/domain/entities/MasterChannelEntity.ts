import mongoose, { Schema } from 'mongoose';
import { IMasterChannel } from '../models/MasterChannelModel';

const MasterChannelSchema: Schema = new Schema(
    {
        Ck: { type: String, required: true, unique: true }, //* uuid
        SaleChannel: { type: String, required: true },
        TransChannel: { type: String, required: true },
        DisplayName: { type: String, required: true },
        KeyCode: { type: String, required: true },
        Active: { type: Boolean, required: true },
    },
    {
        collection: 'MasterChannel',
    }
);

export const MasterChannelEntity = mongoose.models.MasterChannel || mongoose.model<IMasterChannel>('MasterChannel', MasterChannelSchema);

import mongoose, { Schema } from 'mongoose';
import { IMasterPrefix } from '../models/MasterPrefixModel';

const MasterPrefixSchema: Schema = new Schema(
    {
        PrefixNameTH: { type: String, required: true },
        PrefixNameEN: { type: String, required: true },
        CodeName: { type: String, required: true },
        Channel: { type: String, required: true },
        Active: { type: Boolean, required: true },
        ItemOrder: { type: Number, required: true },
    },
    {
        collection: 'MasterPrefix',
    }
);

export const MasterPrefixEntity = mongoose.models.MasterPrefix || mongoose.model<IMasterPrefix>('MasterPrefix', MasterPrefixSchema);

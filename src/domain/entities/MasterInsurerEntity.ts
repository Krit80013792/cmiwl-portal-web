import mongoose, { Schema } from 'mongoose';
import { IMasterInsurer } from '../models/MasterInsurerModel';

const MasterInsurerSchema: Schema = new Schema(
    {
        Channel: { type: String, required: true },
        InsurerCode: { type: String, required: true },
        InsurerShortName: { type: String, required: true },
        InsurerFullName: { type: String, required: true },
        InsurerImgPath: { type: String, required: true },
        Active: { type: Boolean, required: true },
    },
    {
        collection: 'MasterInsurer',
    }
);

export const MasterInsurerEntity = mongoose.models.MasterInsurer || mongoose.model<IMasterInsurer>('MasterInsurer', MasterInsurerSchema);

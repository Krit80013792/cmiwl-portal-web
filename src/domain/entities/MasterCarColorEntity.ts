import mongoose, { Schema } from 'mongoose';
import { IMasterCarColor } from '../models/MasterCarColorModel';

const MasterCarColorSchema: Schema = new Schema(
    {
        CarColorId: { type: String, required: true },
        CarColorNameTh: { type: String, required: true },
        CarColorNameEn: { type: String, required: true },
        CreateDate: { type: Date, required: true },
        CreateBy: { type: String, required: true },
    },
    {
        collection: 'MasterCarColor',
    }
);

export const MasterCarColorEntity = mongoose.models.MasterCarColor || mongoose.model<IMasterCarColor>('MasterCarColor', MasterCarColorSchema);

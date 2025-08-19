import mongoose, { Schema } from 'mongoose';
import { IMasterCompulsoryType } from '../models/MasterCompulsoryTypeModel';

const MasterCompulsoryTypeSchema: Schema = new Schema(
    {
        DisplayName: { type: String, required: true },
        CarTypeKey: { type: String, required: true },
        CategoryGroup: { type: String, required: true },
        Channel: { type: String, required: true },
        ImagePath: { type: String, required: true },
        Active: { type: Boolean, required: true },
        ItemOrder: { type: Number, required: true },
    },
    {
        collection: 'MasterCompulsoryType',
    }
);

export const MasterCompulsoryTypeEntity = mongoose.models.MasterCompulsoryType || mongoose.model<IMasterCompulsoryType>('MasterCompulsoryType', MasterCompulsoryTypeSchema);

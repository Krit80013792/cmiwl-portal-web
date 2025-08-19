import mongoose, { Schema } from 'mongoose';
import { IMasterCompulsoryGroup } from '../models/MasterCompulsoryGroupModel';

const MasterCompulsoryGroupSchema: Schema = new Schema(
    {
        DisplayName: { type: String, required: true },
        CategoryGroup: { type: String, required: true },
        CategoryText: { type: String, required: true },
        CategoryImgText: { type: String, required: true },
        CategoryImgPath: { type: String, required: true },
        Channel: { type: String, required: true },
        Active: { type: Boolean, required: true },
    },
    {
        collection: 'MasterCompulsoryGroup',
    }
);

export const MasterCompulsoryGroupEntity = mongoose.models.MasterCompulsoryGroup || mongoose.model<IMasterCompulsoryGroup>('MasterCompulsoryGroup', MasterCompulsoryGroupSchema);

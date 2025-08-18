import mongoose, { Schema } from 'mongoose';
import { IMasterCarBrand } from '../models/MasterCarBrandModel';

const MasterCarBrandSchema: Schema = new Schema(
    {
        CarBrandId: { type: String, required: true },
        CarBrandName: { type: String, required: true },
        CarTypeKey: { type: String, required: true },
        InsurerCode: { type: String, required: true },
        CreateDate: { type: Date, required: true },
        CreateBy: { type: String, required: true },
    },
    {
        collection: 'MasterCarBrand',
    }
);

export const MasterCarBrandEntity = mongoose.models.MasterCarBrand || mongoose.model<IMasterCarBrand>('MasterCarBrand', MasterCarBrandSchema);

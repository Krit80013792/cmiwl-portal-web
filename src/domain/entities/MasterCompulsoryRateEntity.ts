import mongoose, { Schema } from 'mongoose';
import { IMasterCompulsoryRate } from '../models/MasterCompulsoryRateModel';

const MasterCompulsoryRateSchema: Schema = new Schema(
    {
        Channel: { type: String, required: true },
        CarType: { type: Number, required: true },
        CarTypeName: { type: String, required: true },
        CmiCarTypeCode: { type: String, required: true },
        CmiCarTypeName: { type: String, required: true },
        CmiCarTypeRoryor: { type: String, required: true },
        CmiSubCarTypeCode: { type: String, required: true },
        TypeOfUseCode: { type: String, required: true },
        TypeOfUseDetail: { type: String, required: true },
        CmiCategorySubType: { type: String, required: true },
        CmiSubCarTypeDetail: { type: String, required: true },
        Min: { type: Number, required: true },
        Max: { type: Number, required: true },
        IsEvType: { type: Boolean, required: true },
        CmiCoverage: { type: String, required: true },
        DisplayDetail: { type: String, required: true },
        BodyType: { type: String, required: true },
        UseOfMotor: { type: String, required: true },
        CreateDate: { type: Date, required: true },
        CreateBy: { type: String, required: true },
    },
    {
        collection: 'MasterCompulsoryRate',
    }
);

export const MasterCompulsoryRateEntity = mongoose.models.MasterCompulsoryRate || mongoose.model<IMasterCompulsoryRate>('MasterCompulsoryRate', MasterCompulsoryRateSchema);

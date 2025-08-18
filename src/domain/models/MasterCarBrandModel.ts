import { Document } from 'mongoose';

export interface IMasterCarBrand extends Document {
    _id: string; //* MongoDB ObjectId
    CarBrandId: string;
    CarBrandName: string;
    CarTypeKey: string;
    InsurerCode: string;
    CreateDate: Date;
    CreateBy: string;
};

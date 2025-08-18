import { Document } from 'mongoose';

export interface IMasterInsurer extends Document {
    _id: string; //* MongoDB ObjectId
    Channel: string;
    InsurerCode: string;
    InsurerShortName: string;
    InsurerFullName: string;
    InsurerImgPath: string;
    Active: boolean;
};

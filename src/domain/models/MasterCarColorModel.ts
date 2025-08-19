import { Document } from 'mongoose';

export interface IMasterCarColor extends Document {
    _id: string; //* MongoDB ObjectId
    CarColorId: string;
    CarColorNameTh: string;
    CarColorNameEn: string;
    CreateDate: Date;
    CreateBy: string;
};

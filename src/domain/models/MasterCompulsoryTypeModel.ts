import { Document } from 'mongoose';

export interface IMasterCompulsoryType extends Document {
    _id: string; //* MongoDB ObjectId
    DisplayName: string;
    CarTypeKey: string;
    CategoryGroup: string;
    Channel: string;
    ImagePath: string;
    Active: boolean;
    ItemOrder: number;
};

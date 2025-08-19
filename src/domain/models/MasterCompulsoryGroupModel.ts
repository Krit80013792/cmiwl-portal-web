import { Document } from 'mongoose';

export interface IMasterCompulsoryGroup extends Document {
    _id: string; //* MongoDB ObjectId
    DisplayName: string;
    CategoryGroup: string;
    CategoryText: string;
    CategoryImgText: string;
    CategoryImgPath: string;
    Channel: string;
    Active: boolean;
};

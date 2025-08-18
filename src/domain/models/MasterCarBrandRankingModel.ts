import { Document } from 'mongoose';

export interface IMasterCarBrandRanking extends Document {
    _id: string; //* MongoDB ObjectId
    CarBrandID: string;
    CarBrandName: string;
    ImagePath: string;
    Ranking: number;
    Channel: string;
    Active: boolean;
};

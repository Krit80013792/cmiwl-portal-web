import { Document } from 'mongoose';

export interface IMasterPrefix extends Document {
    _id: string; //* MongoDB ObjectId
    PrefixNameTH: string;
    PrefixNameEN: string;
    CodeName: string;
    Channel: string;
    Active: boolean;
    ItemOrder: number;
};

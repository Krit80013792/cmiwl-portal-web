import { Document } from 'mongoose';

export interface IMasterChannel extends Document {
    _id: string; //* MongoDB ObjectId
    Ck: string; //* uuid
    SaleChannel: string;
    TransChannel: string;
    DisplayName: string;
    KeyCode: string;
    Active: boolean;
};

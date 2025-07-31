import { Document } from 'mongoose';

export interface IConfig extends Document {
    _id: string; //* MongoDB ObjectId
    sConfigId: string; //* uuid
    sConfigName: string;
    sConfigKey: string;
    sConfigValue: string;
    sConfigDescription: string;
    sConfigByChannel: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};

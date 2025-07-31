import mongoose, { Schema } from 'mongoose';
import { IConfig } from '../models/ConfigModel';

const ConfigsSchema: Schema = new Schema(
    {
        sConfigId: { type: String, required: true, unique: true }, //* uuid
        sConfigName: { type: String, required: true },
        sConfigKey: { type: String, required: true },
        sConfigValue: { type: String, required: true },
        sConfigDescription: { type: String, required: false, default: '' },
        sConfigByChannel: { type: String, required: true },
        createdBy: { type: String, required: true },
        updatedBy: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: 'CMSConfigs',
    }
);

export const ConfigsEntity = mongoose.models.CMSConfigs || mongoose.model<IConfig>('CMSConfigs', ConfigsSchema);

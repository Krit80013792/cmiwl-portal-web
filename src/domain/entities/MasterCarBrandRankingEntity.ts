import mongoose, { Schema } from 'mongoose';
import { IMasterCarBrandRanking } from '../models/MasterCarBrandRankingModel';

const MasterCarBrandRankingSchema: Schema = new Schema(
    {
        CarBrandID: { type: String, required: true },
        CarBrandName: { type: String, required: true },
        ImagePath: { type: String, required: true },
        Ranking: { type: Number, required: true },
        Channel: { type: String, required: true },
        Active: { type: Boolean, required: true },
    },
    {
        collection: 'MasterCarBrandRanking',
    }
);

export const MasterCarBrandRankingEntity = mongoose.models.MasterCarBrandRanking || mongoose.model<IMasterCarBrandRanking>('MasterCarBrandRanking', MasterCarBrandRankingSchema);

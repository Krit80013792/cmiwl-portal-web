import { MasterCarBrandRankingEntity } from '../../../../domain/entities/MasterCarBrandRankingEntity';
import { IMasterCarBrandRanking } from '../../../../domain/models/MasterCarBrandRankingModel';
import { IMasterCarBrandRankingRepository } from '../../../../application/interfaces/IMasterCarBrandRankingRepository';

export class MasterCarBrandRankingRepository implements IMasterCarBrandRankingRepository {
    async create(poMasterCarBrandRanking: Partial<IMasterCarBrandRanking>): Promise<IMasterCarBrandRanking> {
        const newMasterCarBrandRanking = new MasterCarBrandRankingEntity(poMasterCarBrandRanking);
        return await newMasterCarBrandRanking.save();
    };

    async findAll(): Promise<IMasterCarBrandRanking[]> {
        return await MasterCarBrandRankingEntity.find();
    };

    async findById(psId: string): Promise<IMasterCarBrandRanking | null> {
        return await MasterCarBrandRankingEntity.findById(psId);
    };

    async update(psId: string, poMasterCarBrandRanking: Partial<IMasterCarBrandRanking>): Promise<IMasterCarBrandRanking | null> {
        return await MasterCarBrandRankingEntity.findByIdAndUpdate(psId, poMasterCarBrandRanking, { new: true });
    };

    async deleteOne(psId: string): Promise<IMasterCarBrandRanking | null> {
        return await MasterCarBrandRankingEntity.findByIdAndDelete(psId);
    };
};

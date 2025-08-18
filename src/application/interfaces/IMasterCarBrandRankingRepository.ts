import { IMasterCarBrandRanking } from "@/src/domain/models/MasterCarBrandRankingModel";

export interface IMasterCarBrandRankingRepository {
    create(poMasterCarBrandRanking: Partial<IMasterCarBrandRanking>): Promise<IMasterCarBrandRanking>;
    findAll(): Promise<IMasterCarBrandRanking[]>;
    findById(psId: string): Promise<IMasterCarBrandRanking | null>;
    update(psId: string, poMasterCarBrandRanking: Partial<IMasterCarBrandRanking>): Promise<IMasterCarBrandRanking | null>;
    deleteOne(psId: string): Promise<IMasterCarBrandRanking | null>;
};

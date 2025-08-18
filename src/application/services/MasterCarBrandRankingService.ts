//* src/application/services/MasterCarBrandService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection';
import { IMasterCarBrandRankingRepository } from '../interfaces/IMasterCarBrandRankingRepository';
import { IMasterCarBrandRanking } from '../../domain/models/MasterCarBrandRankingModel';
import { MasterCarBrandRankingDTO } from '../dtos/MasterCarBrandRankingDTO';
import { BaseResponse } from '../../domain/common/BaseResponse';

export class MasterCarBrandRankingService {

    constructor(private readonly masterCarBrandRankingRepository: IMasterCarBrandRankingRepository) { }

    private mapToDTO(masterCarBrandRanking: IMasterCarBrandRanking): MasterCarBrandRankingDTO {
        return {
            id: masterCarBrandRanking._id.toString(), //* Convert MongoDB ObjectId to string
            carBrandID: masterCarBrandRanking.CarBrandID,
            carBrandName: masterCarBrandRanking.CarBrandName,
            imagePath: masterCarBrandRanking.ImagePath,
            ranking: masterCarBrandRanking.Ranking,
            channel: masterCarBrandRanking.Channel,
            active: masterCarBrandRanking.Active,
        } as MasterCarBrandRankingDTO;
    };

    private mapToDomain(dto: MasterCarBrandRankingDTO): IMasterCarBrandRanking {
        return {
            _id: dto.id,
            CarBrandID: dto.carBrandID,
            CarBrandName: dto.carBrandName,
            ImagePath: dto.imagePath,
            Ranking: dto.ranking,
            Channel: dto.channel,
            Active: dto.active,
        } as IMasterCarBrandRanking;
    };

    async getMasterCarBrandsRanking(): Promise<BaseResponse<MasterCarBrandRankingDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oMasterCarBrandsRanking = await this.masterCarBrandRankingRepository.findAll();
            return {
                statusCode: oMasterCarBrandsRanking ? 200 : 404,
                message: oMasterCarBrandsRanking ? 'MasterCarBrandsRanking found' : 'MasterCarBrandsRanking not found',
                data: oMasterCarBrandsRanking ? oMasterCarBrandsRanking.map(this.mapToDTO.bind(this)) : null,
            };
        } catch (error) {
            console.error(`Error getMasterCarBrandsRanking :`, error);
            return {
                statusCode: 500,
                message: 'Failed to get MasterCarBrandsRanking',
                data: null,
            };
        }
    };
};

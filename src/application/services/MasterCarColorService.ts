//* src/application/services/MasterCarColorService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection';
import { IMasterCarColorRepository } from '../interfaces/IMasterCarColorRepository';
import { IMasterCarColor } from '../../domain/models/MasterCarColorModel';
import { MasterCarColorDTO } from '../dtos/MasterCarColorDTO';
import { BaseResponse } from '../../domain/common/BaseResponse';

export class MasterCarColorService {

    constructor(private readonly masterCarColorRepository: IMasterCarColorRepository) { }

    private mapToDTO(masterCarColor: IMasterCarColor): MasterCarColorDTO {
        return {
            id: masterCarColor._id.toString(), //* Convert MongoDB ObjectId to string
            carColorId: masterCarColor.CarColorId,
            carColorNameTh: masterCarColor.CarColorNameTh,
            carColorNameEn: masterCarColor.CarColorNameEn,
            createDate: masterCarColor.CreateDate,
            createBy: masterCarColor.CreateBy,
        } as MasterCarColorDTO;
    };

    private mapToDomain(dto: MasterCarColorDTO): IMasterCarColor {
        return {
            _id: dto.id,
            CarColorId: dto.carColorId,
            CarColorNameTh: dto.carColorNameTh,
            CarColorNameEn: dto.carColorNameEn,
            CreateDate: dto.createDate,
            CreateBy: dto.createBy,
        } as IMasterCarColor;
    };

    async getMasterCarColors(): Promise<BaseResponse<MasterCarColorDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oMasterCarColors = await this.masterCarColorRepository.findAll();
            return {
                statusCode: oMasterCarColors ? 200 : 404,
                message: oMasterCarColors ? 'MasterCarColors found' : 'MasterCarColors not found',
                data: oMasterCarColors ? oMasterCarColors.map(this.mapToDTO.bind(this)) : null,
            };
        } catch (error) {
            console.error(`Error getMasterCarColors :`, error);
            return {
                statusCode: 500,
                message: 'Failed to get MasterCarColors',
                data: null,
            };
        }
    };
};

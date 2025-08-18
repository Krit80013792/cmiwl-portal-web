//* src/application/services/MasterCarBrandService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection';
import { IMasterCarBrandRepository } from '../interfaces/IMasterCarBrandRepository';
import { IMasterCarBrand } from '../../domain/models/MasterCarBrandModel';
import { MasterCarBrandDTO } from '../dtos/MasterCarBrandDTO';
import { BaseResponse } from '../../domain/common/BaseResponse';

export class MasterCarBrandService {

    constructor(private readonly masterCarBrandRepository: IMasterCarBrandRepository) { }

    private mapToDTO(masterCarBrand: IMasterCarBrand): MasterCarBrandDTO {
        return {
            id: masterCarBrand._id.toString(), //* Convert MongoDB ObjectId to string
            carBrandId: masterCarBrand.CarBrandId,
            carBrandName: masterCarBrand.CarBrandName,
            carTypeKey: masterCarBrand.CarTypeKey,
            insurerCode: masterCarBrand.InsurerCode,
            createDate: masterCarBrand.CreateDate,
            createBy: masterCarBrand.CreateBy,
        } as MasterCarBrandDTO;
    };

    private mapToDomain(dto: MasterCarBrandDTO): IMasterCarBrand {
        return {
            _id: dto.id,
            CarBrandId: dto.carBrandId,
            CarBrandName: dto.carBrandName,
            CarTypeKey: dto.carTypeKey,
            InsurerCode: dto.insurerCode,
            CreateDate: dto.createDate,
            CreateBy: dto.createBy,
        } as IMasterCarBrand;
    };

    async getMasterCarBrands(): Promise<BaseResponse<MasterCarBrandDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oMasterCarBrands = await this.masterCarBrandRepository.findAll();
            return {
                statusCode: oMasterCarBrands ? 200 : 404,
                message: oMasterCarBrands ? 'MasterCarBrands found' : 'MasterCarBrands not found',
                data: oMasterCarBrands ? oMasterCarBrands.map(this.mapToDTO.bind(this)) : null,
            };
        } catch (error) {
            console.error(`Error getMasterCarBrands :`, error);
            return {
                statusCode: 500,
                message: 'Failed to get MasterCarBrands',
                data: null,
            };
        }
    };
};

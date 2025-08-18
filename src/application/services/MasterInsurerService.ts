//* src/application/services/MasterInsurerService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection';
import { IMasterInsurerRepository } from '../interfaces/IMasterInsurerRepository';
import { IMasterInsurer } from '../../domain/models/MasterInsurerModel';
import { MasterInsurerDTO } from '../dtos/MasterInsurerDTO';
import { BaseResponse } from '../../domain/common/BaseResponse';

export class MasterInsurerService {

    constructor(private readonly masterInsurerRepository: IMasterInsurerRepository) { }

    private mapToDTO(masterInsurer: IMasterInsurer): MasterInsurerDTO {
        return {
            id: masterInsurer._id.toString(), //* Convert MongoDB ObjectId to string
            channel: masterInsurer.Channel,
            insurerCode: masterInsurer.InsurerCode,
            insurerShortName: masterInsurer.InsurerShortName,
            insurerFullName: masterInsurer.InsurerFullName,
            insurerImgPath: masterInsurer.InsurerImgPath,
            active: masterInsurer.Active,
        } as MasterInsurerDTO;
    };

    private mapToDomain(dto: MasterInsurerDTO): IMasterInsurer {
        return {
            _id: dto.id,
            Channel: dto.channel,
            InsurerCode: dto.insurerCode,
            InsurerShortName: dto.insurerShortName,
            InsurerFullName: dto.insurerFullName,
            InsurerImgPath: dto.insurerImgPath,
            Active: dto.active,
        } as IMasterInsurer;
    };

    async getMasterInsurers(): Promise<BaseResponse<MasterInsurerDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oMasterInsurers = await this.masterInsurerRepository.findAll();
            return {
                statusCode: oMasterInsurers ? 200 : 404,
                message: oMasterInsurers ? 'MasterInsurers found' : 'MasterInsurers not found',
                data: oMasterInsurers ? oMasterInsurers.map(this.mapToDTO.bind(this)) : null,
            };
        } catch (error) {
            console.error(`Error getMasterInsurers :`, error);
            return {
                statusCode: 500,
                message: 'Failed to get MasterInsurers',
                data: null,
            };
        }
    };
};

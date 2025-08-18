//* src/application/services/MasterPrefixService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection';
import { IMasterPrefixRepository } from '../interfaces/IMasterPrefixRepository';
import { IMasterPrefix } from '../../domain/models/MasterPrefixModel';
import { MasterPrefixDTO } from '../dtos/MasterPrefixDTO';
import { BaseResponse } from '../../domain/common/BaseResponse';

export class MasterPrefixService {

    constructor(private readonly masterPrefixRepository: IMasterPrefixRepository) { }

    private mapToDTO(masterPrefix: IMasterPrefix): MasterPrefixDTO {
        return {
            id: masterPrefix._id.toString(), //* Convert MongoDB ObjectId to string
            prefixNameTH: masterPrefix.PrefixNameTH,
            prefixNameEN: masterPrefix.PrefixNameEN,
            codeName: masterPrefix.CodeName,
            channel: masterPrefix.Channel,
            active: masterPrefix.Active,
            itemOrder: masterPrefix.ItemOrder,
        } as MasterPrefixDTO;
    };

    private mapToDomain(dto: MasterPrefixDTO): IMasterPrefix {
        return {
            _id: dto.id,
            PrefixNameTH: dto.prefixNameTH,
            PrefixNameEN: dto.prefixNameEN,
            CodeName: dto.codeName,
            Channel: dto.channel,
            Active: dto.active,
            ItemOrder: dto.itemOrder,
        } as IMasterPrefix;
    };

    async getMasterPrefixs(): Promise<BaseResponse<MasterPrefixDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oMasterPrefixs = await this.masterPrefixRepository.findAll();
            return {
                statusCode: oMasterPrefixs ? 200 : 404,
                message: oMasterPrefixs ? 'MasterPrefixs found' : 'MasterPrefixs not found',
                data: oMasterPrefixs ? oMasterPrefixs.map(this.mapToDTO.bind(this)) : null,
            };
        } catch (error) {
            console.error(`Error getMasterPrefixs :`, error);
            return {
                statusCode: 500,
                message: 'Failed to get MasterPrefixs',
                data: null,
            };
        }
    };
};

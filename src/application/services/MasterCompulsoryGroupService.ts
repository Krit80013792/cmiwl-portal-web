//* src/application/services/MasterCompulsoryGroupService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection';
import { IMasterCompulsoryGroupRepository } from '../interfaces/IMasterCompulsoryGroupRepository';
import { IMasterCompulsoryGroup } from '../../domain/models/MasterCompulsoryGroupModel';
import { MasterCompulsoryGroupDTO } from '../dtos/MasterCompulsoryGroupDTO';
import { BaseResponse } from '../../domain/common/BaseResponse';

export class MasterCompulsoryGroupService {

    constructor(private readonly masterCompulsoryGroupRepository: IMasterCompulsoryGroupRepository) { }

    private mapToDTO(masterCompulsoryGroup: IMasterCompulsoryGroup): MasterCompulsoryGroupDTO {
        return {
            id: masterCompulsoryGroup._id.toString(), //* Convert MongoDB ObjectId to string
            displayName: masterCompulsoryGroup.DisplayName,
            categoryGroup: masterCompulsoryGroup.CategoryGroup,
            categoryText: masterCompulsoryGroup.CategoryText,
            categoryImgText: masterCompulsoryGroup.CategoryImgText,
            categoryImgPath: masterCompulsoryGroup.CategoryImgPath,
            channel: masterCompulsoryGroup.Channel,
            active: masterCompulsoryGroup.Active,
        } as MasterCompulsoryGroupDTO;
    };

    private mapToDomain(dto: MasterCompulsoryGroupDTO): IMasterCompulsoryGroup {
        return {
            _id: dto.id,
            DisplayName: dto.displayName,
            CategoryGroup: dto.categoryGroup,
            CategoryText: dto.categoryText,
            CategoryImgText: dto.categoryImgText,
            CategoryImgPath: dto.categoryImgPath,
            Channel: dto.channel,
            Active: dto.active,
        } as IMasterCompulsoryGroup;
    };

    async getMasterCompulsoryGroups(): Promise<BaseResponse<MasterCompulsoryGroupDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oMasterCompulsoryGroups = await this.masterCompulsoryGroupRepository.findAll();
            return {
                statusCode: oMasterCompulsoryGroups ? 200 : 404,
                message: oMasterCompulsoryGroups ? 'MasterCompulsoryGroups found' : 'MasterCompulsoryGroups not found',
                data: oMasterCompulsoryGroups ? oMasterCompulsoryGroups.map(this.mapToDTO.bind(this)) : null,
            };
        } catch (error) {
            console.error(`Error getMasterCompulsoryGroups :`, error);
            return {
                statusCode: 500,
                message: 'Failed to get MasterCompulsoryGroups',
                data: null,
            };
        }
    };
};

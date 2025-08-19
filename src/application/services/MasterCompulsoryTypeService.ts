//* src/application/services/MasterCompulsoryTypeService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection';
import { IMasterCompulsoryTypeRepository } from '../interfaces/IMasterCompulsoryTypeRepository';
import { IMasterCompulsoryType } from '../../domain/models/MasterCompulsoryTypeModel';
import { MasterCompulsoryTypeDTO } from '../dtos/MasterCompulsoryTypeDTO';
import { BaseResponse } from '../../domain/common/BaseResponse';

export class MasterCompulsoryTypeService {

    constructor(private readonly masterCompulsoryTypeRepository: IMasterCompulsoryTypeRepository) { }

    private mapToDTO(masterCompulsoryType: IMasterCompulsoryType): MasterCompulsoryTypeDTO {
        return {
            id: masterCompulsoryType._id.toString(), //* Convert MongoDB ObjectId to string
            displayName: masterCompulsoryType.DisplayName,
            carTypeKey: masterCompulsoryType.CarTypeKey,
            categoryGroup: masterCompulsoryType.CategoryGroup,
            channel: masterCompulsoryType.Channel,
            imagePath: masterCompulsoryType.ImagePath,
            active: masterCompulsoryType.Active,
            itemOrder: masterCompulsoryType.ItemOrder,
        } as MasterCompulsoryTypeDTO;
    };

    private mapToDomain(dto: MasterCompulsoryTypeDTO): IMasterCompulsoryType {
        return {
            _id: dto.id,
            DisplayName: dto.displayName,
            CarTypeKey: dto.carTypeKey,
            CategoryGroup: dto.categoryGroup,
            Channel: dto.channel,
            ImagePath: dto.imagePath,
            Active: dto.active,
            ItemOrder: dto.itemOrder,
        } as IMasterCompulsoryType;
    };

    async getMasterCompulsoryTypes(): Promise<BaseResponse<MasterCompulsoryTypeDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oMasterCompulsoryTypes = await this.masterCompulsoryTypeRepository.findAll();
            return {
                statusCode: oMasterCompulsoryTypes ? 200 : 404,
                message: oMasterCompulsoryTypes ? 'MasterCompulsoryTypes found' : 'MasterCompulsoryTypes not found',
                data: oMasterCompulsoryTypes ? oMasterCompulsoryTypes.map(this.mapToDTO.bind(this)) : null,
            };
        } catch (error) {
            console.error(`Error getMasterCompulsoryTypes :`, error);
            return {
                statusCode: 500,
                message: 'Failed to get MasterCompulsoryTypes',
                data: null,
            };
        }
    };
};

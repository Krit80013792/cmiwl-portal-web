//* src/application/services/MasterChannelService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection';
import { IMasterChannelRepository } from '../interfaces/IMasterChannelRepository';
import { IMasterChannel } from '../../domain/models/MasterChannelModel';
import { MasterChannelDTO } from '../dtos/MasterChannelDTO';
import { BaseResponse } from '../../domain/common/BaseResponse';

export class MasterChannelService {

    constructor(private readonly masterChannelRepository: IMasterChannelRepository) { }

    private mapToDTO(masterChannel: IMasterChannel): MasterChannelDTO {
        return {
            id: masterChannel._id.toString(), //* Convert MongoDB ObjectId to string
            ck: masterChannel.Ck,
            saleChannel: masterChannel.SaleChannel,
            transChannel: masterChannel.TransChannel,
            displayName: masterChannel.DisplayName,
            keyCode: masterChannel.KeyCode,
            active: masterChannel.Active,
        } as MasterChannelDTO;
    };

    private mapToDomain(dto: MasterChannelDTO): IMasterChannel {
        return {
            _id: dto.id,
            Ck: dto.ck,
            SaleChannel: dto.saleChannel,
            TransChannel: dto.transChannel,
            DisplayName: dto.displayName,
            KeyCode: dto.keyCode,
            Active: dto.active,
        } as IMasterChannel;
    };

    async createMasterChannel(poMasterChannel: Partial<MasterChannelDTO>): Promise<BaseResponse<MasterChannelDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oMasterChannel = this.mapToDomain(poMasterChannel as MasterChannelDTO);

            const masterChannelExists = await this.masterChannelRepository.findByMasterChannelName(oMasterChannel?.DisplayName);
            if (masterChannelExists) {
                return {
                    statusCode: 409,
                    message: 'MasterChannel already exists',
                    data: null,
                };
            }

            const oNewMasterChannel = await this.masterChannelRepository.create(oMasterChannel);
            return {
                statusCode: 201,
                message: 'MasterChannel created successfully',
                data: this.mapToDTO(oNewMasterChannel),
            };
        } catch (error) {
            console.error(`Error createMasterChannel :`, error);
            return {
                statusCode: 500,
                message: 'Failed to create MasterChannel',
                data: null,
            };
        }
    };

    async getMasterChannels(): Promise<BaseResponse<MasterChannelDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oMasterChannels = await this.masterChannelRepository.findAll();
            return {
                statusCode: oMasterChannels ? 200 : 404,
                message: oMasterChannels ? 'MasterChannels found' : 'MasterChannels not found',
                data: oMasterChannels ? oMasterChannels.map(this.mapToDTO.bind(this)) : null,
            };
        } catch (error) {
            console.error(`Error getMasterChannels :`, error);
            return {
                statusCode: 500,
                message: 'Failed to get MasterChannels',
                data: null,
            };
        }
    };

    async getMasterChannelById(psMasterChannelId: string): Promise<BaseResponse<MasterChannelDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oMasterChannel = await this.masterChannelRepository.findById(psMasterChannelId);
            return {
                statusCode: oMasterChannel ? 200 : 404,
                message: oMasterChannel ? 'MasterChannel found' : 'MasterChannel not found',
                data: oMasterChannel ? this.mapToDTO(oMasterChannel) : null,
            };
        } catch (error) {
            console.error(`Error getMasterChannelById:`, error);
            return {
                statusCode: 500,
                message: 'Failed to get MasterChannel',
                data: null,
            };
        }
    };

    async updateMasterChannel(psId: string, poMasterChannel: Partial<MasterChannelDTO>): Promise<BaseResponse<MasterChannelDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oMasterChannel = this.mapToDomain(poMasterChannel as MasterChannelDTO);
            const oUpdatedMasterChannel = await this.masterChannelRepository.update(psId, oMasterChannel);
            return {
                statusCode: oUpdatedMasterChannel ? 200 : 404,
                message: oUpdatedMasterChannel ? 'MasterChannel updated' : 'MasterChannel not found',
                data: oUpdatedMasterChannel ? this.mapToDTO(oUpdatedMasterChannel) : null,
            };
        } catch (error) {
            console.error(`Error updateMasterChannel:`, error);
            return {
                statusCode: 500,
                message: 'Failed to update MasterChannel',
                data: null,
            };
        }
    };

    async deleteMasterChannel(psId: string): Promise<BaseResponse<MasterChannelDTO | null>> {
        try {
            await MongoDBConnectionService();
            const deletedMasterChannel = await this.masterChannelRepository.deleteOne(psId);
            return {
                statusCode: deletedMasterChannel ? 200 : 404,
                message: deletedMasterChannel ? 'MasterChannel deleted' : 'MasterChannel not found',
                data: deletedMasterChannel ? this.mapToDTO(deletedMasterChannel) : null,
            };
        } catch (error) {
            console.error(`Error deleteMasterChannel:`, error);
            return {
                statusCode: 500,
                message: 'Failed to delete MasterChannel',
                data: null,
            };
        }
    };
};

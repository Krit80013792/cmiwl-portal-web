//* src/application/services/ConfigService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection';
import { IConfigRepository } from '../interfaces/IConfigRepository';
import { IConfig } from '../../domain/models/ConfigModel';
import { ConfigDTO } from '../dtos/ConfigDTO';
import { BaseResponse } from '../../domain/common/BaseResponse';
import { v4 as uuidv4 } from 'uuid';
import { isValidJpegBase64 } from '@/src/shared/utils/utils';
import { config } from '@/src/shared/utils/config';

export class ConfigService {

    constructor(private readonly configRepository: IConfigRepository) { }

    private mapToDTO(config: IConfig): ConfigDTO {
        return {
            id: config._id.toString(), //* Convert MongoDB ObjectId to string
            configId: config.sConfigId,
            configName: config.sConfigName,
            configKey: config.sConfigKey,
            configValue: config.sConfigValue,
            configDescription: config.sConfigDescription,
            configByChannel: config.sConfigByChannel,
            createdBy: config.createdBy,
            updatedBy: config.updatedBy,
            createdAt: config.createdAt,
            updatedAt: config.updatedAt,
        } as ConfigDTO;
    };

    private mapToDomain(dto: ConfigDTO): IConfig {
        return {
            _id: dto.id,
            sConfigId: dto.configId,
            sConfigName: dto.configName,
            sConfigKey: dto.configKey,
            sConfigValue: dto.configValue,
            sConfigDescription: dto.configDescription,
            sConfigByChannel: dto.configByChannel,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
        } as IConfig;
    };

    async createConfig(poConfig: Partial<ConfigDTO>): Promise<BaseResponse<ConfigDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oConfig = this.mapToDomain(poConfig as ConfigDTO);

            try {
                const configValue = JSON.parse(oConfig?.sConfigValue);
                if (!isValidJpegBase64(configValue?.oicCertImg) || !isValidJpegBase64(configValue?.oicCertElectronicImg)) {
                    return {
                        statusCode: 400,
                        message: 'Invalid data format',
                        data: null,
                    };
                }
            } catch {
                return {
                    statusCode: 400,
                    message: 'Invalid data format',
                    data: null,
                };
            }

            // const configExists = await this.configRepository.findByConfigName(oConfig?.sConfigName);
            // if (configExists) {
            //     return {
            //         statusCode: 409,
            //         message: 'Config already exists',
            //         data: null,
            //     };
            // }

            oConfig.sConfigId = uuidv4(); //* Generate a new UUID for the configId

            const oNewConfig = await this.configRepository.create(oConfig);
            return {
                statusCode: 201,
                message: 'Config created successfully',
                data: this.mapToDTO(oNewConfig),
            };
        } catch (error) {
            console.error(`Error createConfig :`, error);
            return {
                statusCode: 500,
                message: 'Failed to create Config',
                data: null,
            };
        }
    };

    async getConfigs(): Promise<BaseResponse<ConfigDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oConfigs = await this.configRepository.findAll();
            return {
                statusCode: oConfigs ? 200 : 404,
                message: oConfigs ? 'Configs found' : 'Configs not found',
                data: oConfigs ? oConfigs.map(this.mapToDTO.bind(this)) : null,
            };
        } catch (error) {
            console.error(`Error getConfigs :`, error);
            return {
                statusCode: 500,
                message: 'Failed to get Configs',
                data: null,
            };
        }
    };

    async getConfigById(psConfigId: string): Promise<BaseResponse<ConfigDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oConfig = await this.configRepository.findById(psConfigId);
            return {
                statusCode: oConfig ? 200 : 404,
                message: oConfig ? 'Config found' : 'MasterChannel not found',
                data: oConfig ? this.mapToDTO(oConfig) : null,
            };
        } catch (error) {
            console.error(`Error getConfigById:`, error);
            return {
                statusCode: 500,
                message: 'Failed to get Config',
                data: null,
            };
        }
    };

    async getConfigByChannelCode(psCode: string): Promise<BaseResponse<ConfigDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oConfigs = await this.configRepository.findByChannelCode(psCode);
            return {
                statusCode: oConfigs ? 200 : 404,
                message: oConfigs ? 'Configs found' : 'Configs not found',
                data: oConfigs ? oConfigs.map(this.mapToDTO.bind(this)) : null,
            };
        } catch (error) {
            console.error(`Error getConfigByChannelCode :`, error);
            return {
                statusCode: 500,
                message: 'Failed to get Configs',
                data: null,
            };
        }
    };

    async updateConfig(psId: string, poConfig: Partial<ConfigDTO>): Promise<BaseResponse<ConfigDTO | null>> {
        try {
            await MongoDBConnectionService();
            const oConfig = this.mapToDomain(poConfig as ConfigDTO);

            try {
                const configValue = JSON.parse(oConfig?.sConfigValue);
                if (!isValidJpegBase64(configValue?.oicCertImg) || !isValidJpegBase64(configValue?.oicCertElectronicImg)) {
                    return {
                        statusCode: 400,
                        message: 'Invalid data format',
                        data: null,
                    };
                }
            } catch {
                return {
                    statusCode: 400,
                    message: 'Invalid data format',
                    data: null,
                };
            }

            const oUpdatedConfig = await this.configRepository.update(psId, oConfig);
            return {
                statusCode: oUpdatedConfig ? 200 : 404,
                message: oUpdatedConfig ? 'Config updated' : 'Config not found',
                data: oUpdatedConfig ? this.mapToDTO(oUpdatedConfig) : null,
            };
        } catch (error) {
            console.error(`Error updateConfig:`, error);
            return {
                statusCode: 500,
                message: 'Failed to update Config',
                data: null,
            };
        }
    };

    async deleteConfig(psId: string): Promise<BaseResponse<ConfigDTO | null>> {
        try {
            await MongoDBConnectionService();
            const deletedConfig = await this.configRepository.deleteOne(psId);
            return {
                statusCode: deletedConfig ? 200 : 404,
                message: deletedConfig ? 'Config deleted' : 'Config not found',
                data: deletedConfig ? this.mapToDTO(deletedConfig) : null,
            };
        } catch (error) {
            console.error(`Error deleteConfig:`, error);
            return {
                statusCode: 500,
                message: 'Failed to delete Config',
                data: null,
            };
        }
    };
};

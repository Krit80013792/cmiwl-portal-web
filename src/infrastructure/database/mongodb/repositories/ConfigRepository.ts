import { ConfigsEntity } from '../../../../domain/entities/ConfigsEntity';
import { IConfig } from '../../../../domain/models/ConfigModel';
import { IConfigRepository } from '../../../../application/interfaces/IConfigRepository';

export class ConfigRepository implements IConfigRepository {
    async create(poConfig: Partial<IConfig>): Promise<IConfig> {
        const newConfig = new ConfigsEntity(poConfig);
        return await newConfig.save();
    };

    async findAll(): Promise<IConfig[]> {
        return await ConfigsEntity.find();
    };

    async findById(psId: string): Promise<IConfig | null> {
        return await ConfigsEntity.findById(psId);
    };

    async update(psId: string, poConfig: Partial<IConfig>): Promise<IConfig | null> {
        return await ConfigsEntity.findByIdAndUpdate(psId, poConfig, { new: true });
    };

    async deleteOne(psId: string): Promise<IConfig | null> {
        return await ConfigsEntity.findByIdAndDelete(psId);
    };
};

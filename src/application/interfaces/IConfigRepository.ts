import { IConfig } from '../../domain/models/ConfigModel';

export interface IConfigRepository {
    create(poConfig: Partial<IConfig>): Promise<IConfig>;
    findAll(): Promise<IConfig[]>;
    findById(psId: string): Promise<IConfig | null>;
    update(psId: string, poConfig: Partial<IConfig>): Promise<IConfig | null>;
    deleteOne(psId: string): Promise<IConfig | null>;
};

import { IMasterPrefix } from "@/src/domain/models/MasterPrefixModel";

export interface IMasterPrefixRepository {
    create(poMasterPrefix: Partial<IMasterPrefix>): Promise<IMasterPrefix>;
    findAll(): Promise<IMasterPrefix[]>;
    findById(psId: string): Promise<IMasterPrefix | null>;
    update(psId: string, poMasterPrefix: Partial<IMasterPrefix>): Promise<IMasterPrefix | null>;
    deleteOne(psId: string): Promise<IMasterPrefix | null>;
};

import { IMasterCompulsoryRate } from "@/src/domain/models/MasterCompulsoryRateModel";

export interface IMasterCompulsoryRateRepository {
    create(poMasterCompulsoryRate: Partial<IMasterCompulsoryRate>): Promise<IMasterCompulsoryRate>;
    findAll(): Promise<IMasterCompulsoryRate[]>;
    findById(psId: string): Promise<IMasterCompulsoryRate | null>;
    update(psId: string, poMasterCompulsoryRate: Partial<IMasterCompulsoryRate>): Promise<IMasterCompulsoryRate | null>;
    deleteOne(psId: string): Promise<IMasterCompulsoryRate | null>;
};

import { IMasterInsurer } from "@/src/domain/models/MasterInsurerModel";

export interface IMasterInsurerRepository {
    create(poMasterInsurer: Partial<IMasterInsurer>): Promise<IMasterInsurer>;
    findAll(): Promise<IMasterInsurer[]>;
    findById(psId: string): Promise<IMasterInsurer | null>;
    update(psId: string, poMasterInsurer: Partial<IMasterInsurer>): Promise<IMasterInsurer | null>;
    deleteOne(psId: string): Promise<IMasterInsurer | null>;
};

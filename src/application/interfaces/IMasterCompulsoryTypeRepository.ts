import { IMasterCompulsoryType } from "@/src/domain/models/MasterCompulsoryTypeModel";

export interface IMasterCompulsoryTypeRepository {
    create(poMasterCompulsoryType: Partial<IMasterCompulsoryType>): Promise<IMasterCompulsoryType>;
    findAll(): Promise<IMasterCompulsoryType[]>;
    findById(psId: string): Promise<IMasterCompulsoryType | null>;
    update(psId: string, poMasterCompulsoryType: Partial<IMasterCompulsoryType>): Promise<IMasterCompulsoryType | null>;
    deleteOne(psId: string): Promise<IMasterCompulsoryType | null>;
};

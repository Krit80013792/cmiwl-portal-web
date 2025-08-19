import { IMasterCompulsoryGroup } from "@/src/domain/models/MasterCompulsoryGroupModel";

export interface IMasterCompulsoryGroupRepository {
    create(poMasterCompulsoryGroup: Partial<IMasterCompulsoryGroup>): Promise<IMasterCompulsoryGroup>;
    findAll(): Promise<IMasterCompulsoryGroup[]>;
    findById(psId: string): Promise<IMasterCompulsoryGroup | null>;
    update(psId: string, poMasterCompulsoryGroup: Partial<IMasterCompulsoryGroup>): Promise<IMasterCompulsoryGroup | null>;
    deleteOne(psId: string): Promise<IMasterCompulsoryGroup | null>;
};

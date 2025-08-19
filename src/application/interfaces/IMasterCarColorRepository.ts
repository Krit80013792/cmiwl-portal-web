import { IMasterCarColor } from "@/src/domain/models/MasterCarColorModel";

export interface IMasterCarColorRepository {
    create(poMasterCarColor: Partial<IMasterCarColor>): Promise<IMasterCarColor>;
    findAll(): Promise<IMasterCarColor[]>;
    findById(psId: string): Promise<IMasterCarColor | null>;
    update(psId: string, poMasterCarColor: Partial<IMasterCarColor>): Promise<IMasterCarColor | null>;
    deleteOne(psId: string): Promise<IMasterCarColor | null>;
};

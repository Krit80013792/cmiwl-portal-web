import { IMasterCarBrand } from "@/src/domain/models/MasterCarBrandModel";

export interface IMasterCarBrandRepository {
    create(poMasterCarBrand: Partial<IMasterCarBrand>): Promise<IMasterCarBrand>;
    findAll(): Promise<IMasterCarBrand[]>;
    findById(psId: string): Promise<IMasterCarBrand | null>;
    update(psId: string, poMasterCarBrand: Partial<IMasterCarBrand>): Promise<IMasterCarBrand | null>;
    deleteOne(psId: string): Promise<IMasterCarBrand | null>;
};

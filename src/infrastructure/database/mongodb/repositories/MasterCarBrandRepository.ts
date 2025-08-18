import { MasterCarBrandEntity } from '../../../../domain/entities/MasterCarBrandEntity';
import { IMasterCarBrand } from '../../../../domain/models/MasterCarBrandModel';
import { IMasterCarBrandRepository } from '../../../../application/interfaces/IMasterCarBrandRepository';

export class MasterCarBrandRepository implements IMasterCarBrandRepository {
    async create(poMasterCarBrand: Partial<IMasterCarBrand>): Promise<IMasterCarBrand> {
        const newMasterCarBrand = new MasterCarBrandEntity(poMasterCarBrand);
        return await newMasterCarBrand.save();
    };

    async findAll(): Promise<IMasterCarBrand[]> {
        return await MasterCarBrandEntity.find();
    };

    async findById(psId: string): Promise<IMasterCarBrand | null> {
        return await MasterCarBrandEntity.findById(psId);
    };

    async update(psId: string, poMasterCarBrand: Partial<IMasterCarBrand>): Promise<IMasterCarBrand | null> {
        return await MasterCarBrandEntity.findByIdAndUpdate(psId, poMasterCarBrand, { new: true });
    };

    async deleteOne(psId: string): Promise<IMasterCarBrand | null> {
        return await MasterCarBrandEntity.findByIdAndDelete(psId);
    };
};

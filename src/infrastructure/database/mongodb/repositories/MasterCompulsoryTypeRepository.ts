import { MasterCompulsoryTypeEntity } from '../../../../domain/entities/MasterCompulsoryTypeEntity';
import { IMasterCompulsoryType } from '../../../../domain/models/MasterCompulsoryTypeModel';
import { IMasterCompulsoryTypeRepository } from '../../../../application/interfaces/IMasterCompulsoryTypeRepository';

export class MasterCompulsoryTypeRepository implements IMasterCompulsoryTypeRepository {
    async create(poMasterCompulsoryType: Partial<IMasterCompulsoryType>): Promise<IMasterCompulsoryType> {
        const newMasterCompulsoryType = new MasterCompulsoryTypeEntity(poMasterCompulsoryType);
        return await newMasterCompulsoryType.save();
    };

    async findAll(): Promise<IMasterCompulsoryType[]> {
        return await MasterCompulsoryTypeEntity.find();
    };

    async findById(psId: string): Promise<IMasterCompulsoryType | null> {
        return await MasterCompulsoryTypeEntity.findById(psId);
    };

    async update(psId: string, poMasterCompulsoryType: Partial<IMasterCompulsoryType>): Promise<IMasterCompulsoryType | null> {
        return await MasterCompulsoryTypeEntity.findByIdAndUpdate(psId, poMasterCompulsoryType, { new: true });
    };

    async deleteOne(psId: string): Promise<IMasterCompulsoryType | null> {
        return await MasterCompulsoryTypeEntity.findByIdAndDelete(psId);
    };
};

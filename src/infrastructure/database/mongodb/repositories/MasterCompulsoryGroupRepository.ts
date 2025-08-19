import { MasterCompulsoryGroupEntity } from '../../../../domain/entities/MasterCompulsoryGroupEntity';
import { IMasterCompulsoryGroup } from '../../../../domain/models/MasterCompulsoryGroupModel';
import { IMasterCompulsoryGroupRepository } from '../../../../application/interfaces/IMasterCompulsoryGroupRepository';

export class MasterCompulsoryGroupRepository implements IMasterCompulsoryGroupRepository {
    async create(poMasterCompulsoryGroup: Partial<IMasterCompulsoryGroup>): Promise<IMasterCompulsoryGroup> {
        const newMasterCompulsoryGroup = new MasterCompulsoryGroupEntity(poMasterCompulsoryGroup);
        return await newMasterCompulsoryGroup.save();
    };

    async findAll(): Promise<IMasterCompulsoryGroup[]> {
        return await MasterCompulsoryGroupEntity.find();
    };

    async findById(psId: string): Promise<IMasterCompulsoryGroup | null> {
        return await MasterCompulsoryGroupEntity.findById(psId);
    };

    async update(psId: string, poMasterCompulsoryGroup: Partial<IMasterCompulsoryGroup>): Promise<IMasterCompulsoryGroup | null> {
        return await MasterCompulsoryGroupEntity.findByIdAndUpdate(psId, poMasterCompulsoryGroup, { new: true });
    };

    async deleteOne(psId: string): Promise<IMasterCompulsoryGroup | null> {
        return await MasterCompulsoryGroupEntity.findByIdAndDelete(psId);
    };
};

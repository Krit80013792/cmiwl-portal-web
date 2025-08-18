import { MasterInsurerEntity } from '../../../../domain/entities/MasterInsurerEntity';
import { IMasterInsurer } from '../../../../domain/models/MasterInsurerModel';
import { IMasterInsurerRepository } from '../../../../application/interfaces/IMasterInsurerRepository';

export class MasterInsurerRepository implements IMasterInsurerRepository {
    async create(poMasterInsurer: Partial<IMasterInsurer>): Promise<IMasterInsurer> {
        const newMasterInsurer = new MasterInsurerEntity(poMasterInsurer);
        return await newMasterInsurer.save();
    };

    async findAll(): Promise<IMasterInsurer[]> {
        return await MasterInsurerEntity.find();
    };

    async findById(psId: string): Promise<IMasterInsurer | null> {
        return await MasterInsurerEntity.findById(psId);
    };

    async update(psId: string, poMasterInsurer: Partial<IMasterInsurer>): Promise<IMasterInsurer | null> {
        return await MasterInsurerEntity.findByIdAndUpdate(psId, poMasterInsurer, { new: true });
    };

    async deleteOne(psId: string): Promise<IMasterInsurer | null> {
        return await MasterInsurerEntity.findByIdAndDelete(psId);
    };
};

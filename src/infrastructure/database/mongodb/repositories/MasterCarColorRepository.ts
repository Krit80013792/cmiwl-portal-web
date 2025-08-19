import { MasterCarColorEntity } from '../../../../domain/entities/MasterCarColorEntity';
import { IMasterCarColor } from '../../../../domain/models/MasterCarColorModel';
import { IMasterCarColorRepository } from '../../../../application/interfaces/IMasterCarColorRepository';

export class MasterCarColorRepository implements IMasterCarColorRepository {
    async create(poMasterCarColor: Partial<IMasterCarColor>): Promise<IMasterCarColor> {
        const newMasterCarColor = new MasterCarColorEntity(poMasterCarColor);
        return await newMasterCarColor.save();
    };

    async findAll(): Promise<IMasterCarColor[]> {
        return await MasterCarColorEntity.find();
    };

    async findById(psId: string): Promise<IMasterCarColor | null> {
        return await MasterCarColorEntity.findById(psId);
    };

    async update(psId: string, poMasterCarColor: Partial<IMasterCarColor>): Promise<IMasterCarColor | null> {
        return await MasterCarColorEntity.findByIdAndUpdate(psId, poMasterCarColor, { new: true });
    };

    async deleteOne(psId: string): Promise<IMasterCarColor | null> {
        return await MasterCarColorEntity.findByIdAndDelete(psId);
    };
};

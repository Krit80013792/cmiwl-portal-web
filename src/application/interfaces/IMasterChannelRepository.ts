import { IMasterChannel } from "@/src/domain/models/MasterChannelModel";

export interface IMasterChannelRepository {
    create(poConfig: Partial<IMasterChannel>): Promise<IMasterChannel>;
    findAll(): Promise<IMasterChannel[]>;
    findById(psId: string): Promise<IMasterChannel | null>;
    findByMasterChannelName(psName: string): Promise<IMasterChannel | null>;
    update(psId: string, poConfig: Partial<IMasterChannel>): Promise<IMasterChannel | null>;
    deleteOne(psId: string): Promise<IMasterChannel | null>;
};

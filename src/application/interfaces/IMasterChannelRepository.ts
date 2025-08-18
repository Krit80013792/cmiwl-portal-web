import { IMasterChannel } from "@/src/domain/models/MasterChannelModel";

export interface IMasterChannelRepository {
    create(poMasterChannel: Partial<IMasterChannel>): Promise<IMasterChannel>;
    findAll(): Promise<IMasterChannel[]>;
    findById(psId: string): Promise<IMasterChannel | null>;
    findByMasterChannelName(psName: string): Promise<IMasterChannel | null>;
    update(psId: string, poMasterChannel: Partial<IMasterChannel>): Promise<IMasterChannel | null>;
    deleteOne(psId: string): Promise<IMasterChannel | null>;
};

import { ITxActivityLog } from '../../domain/models/TxActivityLogModel';

export interface ITxActivityLogRepository {
    create(poTxLog: Partial<ITxActivityLog>): Promise<ITxActivityLog>;
    findAll(psStartDate: string, psEndDate: string, psAction: string): Promise<ITxActivityLog[]>;
    findActions(): Promise<ITxActivityLog[]>;
    findByGroupName(psGroupName: string): Promise<ITxActivityLog[]>;
    findByChannel(psChannel: string): Promise<ITxActivityLog[]>;
    findById(psId: string): Promise<ITxActivityLog | null>;
    update(psId: string, poTxLog: Partial<ITxActivityLog>): Promise<ITxActivityLog | null>;
    deleteOne(psId: string): Promise<ITxActivityLog | null>;
};

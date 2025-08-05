import { TxActivityLogsEntity } from '../../../../domain/entities/TxActivityLogsEntity';
import { ITxActivityLog } from '../../../../domain/models/TxActivityLogModel';
import { ITxActivityLogRepository } from '../../../../application/interfaces/ITxActivityLogRepository';

export class TxActivityLogRepository implements ITxActivityLogRepository {
    async create(poTxLog: Partial<ITxActivityLog>): Promise<ITxActivityLog> {
        const newTxLog = new TxActivityLogsEntity(poTxLog);
        return await newTxLog.save();
    };

    async findAll(psStartDate: string): Promise<ITxActivityLog[]> {
        const targetDate = new Date(psStartDate);
        const startOfDay = new Date(targetDate.setUTCHours(0, 0, 0, 0));
        const endOfDay = new Date(targetDate.setUTCHours(23, 59, 59, 999));
        return await TxActivityLogsEntity.find({ createdAt: { $gte: startOfDay, $lte: endOfDay } }).sort({ createdAt: -1 });
    };

    async findByGroupName(psGroupName: string): Promise<ITxActivityLog[]> {
        return await TxActivityLogsEntity.find({ sUserGroupName: psGroupName }).sort({ createdAt: -1 });
    };

    async findByChannel(psChannel: string): Promise<ITxActivityLog[]> {
        return await TxActivityLogsEntity.find({ sChannel: psChannel }).sort({ createdAt: -1 });
    };

    async findById(psId: string): Promise<ITxActivityLog | null> {
        return await TxActivityLogsEntity.findById(psId);
    };

    async update(psId: string, poTxLog: Partial<ITxActivityLog>): Promise<ITxActivityLog | null> {
        return await TxActivityLogsEntity.findByIdAndUpdate(psId, poTxLog, { new: true });
    };

    async deleteOne(psId: string): Promise<ITxActivityLog | null> {
        return await TxActivityLogsEntity.findByIdAndDelete(psId);
    };
};

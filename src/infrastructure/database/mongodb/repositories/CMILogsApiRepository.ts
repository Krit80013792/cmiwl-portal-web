import { CMIApiLogsEntity } from '../../../../domain/entities/CMIApiLogsEntity';
import { ICMIApiLogs } from '../../../../domain/models/CMIApiLogsModel';
import { ICMIApiLogsRepository } from '../../../../application/interfaces/ICMIApiLogsRepository';

export class CMIApiLogsRepository implements ICMIApiLogsRepository {
    async findAll(psStartDate: Date, psEndDate: Date): Promise<ICMIApiLogs[]> {
        const targetStartDate = new Date(psStartDate);
        const targetEndDate = new Date(psEndDate);
        const startOfDay = new Date(targetStartDate.setUTCHours(0, 0, 0, 0));
        const endOfDay = new Date(targetEndDate.setUTCHours(23, 59, 59, 999));
        const query: any = {
            dRequestDate: { $gte: startOfDay, $lte: endOfDay }
        };

        return await CMIApiLogsEntity.find(query).sort({ createdAt: -1 });
    }

    async findById(psId: string): Promise<ICMIApiLogs | null> {
        return await CMIApiLogsEntity.findOne({ _id: psId });
    }
}

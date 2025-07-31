//* src/shared/middleware/logging/TxLogger.ts
import { MongoDBConnectionService } from '@/src/infrastructure/database/mongodb/connection';
import { ITxActivityLog } from '@/src/domain/models/TxActivityLogModel';
import { TxActivityLogsEntity } from '@/src/domain/entities/TxActivityLogsEntity';

export class TxActivityLogger {
    static async log(data: ITxActivityLog): Promise<void> {
        try {
            await MongoDBConnectionService();
            await TxActivityLogsEntity.create(data);
        } catch (error) {
            console.error('TxActivityLogger error:', error);
        }
    };
};

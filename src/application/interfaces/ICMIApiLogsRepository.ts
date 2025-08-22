import { ICMIApiLogs } from '../../domain/models/CMIApiLogsModel';

export interface ICMIApiLogsRepository {
    findAll(psStartDate: Date, psEndDate: Date): Promise<ICMIApiLogs[]>;
    findById(psId: string): Promise<ICMIApiLogs | null>;
};

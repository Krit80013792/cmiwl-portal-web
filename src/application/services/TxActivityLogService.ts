//* src/application/services/TxActivityLogService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection';
import { ITxActivityLogRepository } from '../interfaces/ITxActivityLogRepository';
import { ITxActivityLog } from '../../domain/models/TxActivityLogModel';
import { TxActivityLogDTO } from '../dtos/TxActivityLogDTO';
import { BaseResponse } from '../../domain/common/BaseResponse';

export class TxActivityLogService {

    constructor(private readonly txActivityLogRepository: ITxActivityLogRepository) { }

    private mapToDTO(txActivityLog: ITxActivityLog): TxActivityLogDTO {
        return {
            id: txActivityLog._id.toString(), //* Convert MongoDB ObjectId to string
            userName: txActivityLog.sUserName,
            userGroupName: txActivityLog.sUserGroupName,
            userRoleName: txActivityLog.sUserRoleName,
            route: txActivityLog.sRoute,
            method: txActivityLog.sMethod,
            action: txActivityLog.sAction,
            status: txActivityLog.sStatus,
            requestMsg: txActivityLog.sRequestMsg,
            responseMsg: txActivityLog.sResponseMsg,
            channel: txActivityLog.sChannel,
            createdAt: txActivityLog.createdAt,
            updatedAt: txActivityLog.updatedAt,
        } as TxActivityLogDTO;
    };

    private mapToDomain(dto: TxActivityLogDTO): ITxActivityLog {
        return {
            _id: dto.id,
            sUserName: dto.userName,
            sUserGroupName: dto.userGroupName,
            sUserRoleName: dto.userRoleName,
            sRoute: dto.route,
            sMethod: dto.method,
            sAction: dto.action,
            sStatus: dto.status,
            sRequestMsg: dto.requestMsg,
            sResponseMsg: dto.responseMsg,
            sChannel: dto.channel,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
        } as ITxActivityLog;
    };

    async getTxActivityLogs(psStartDate: string): Promise<BaseResponse<TxActivityLogDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oTxActivityLogs = await this.txActivityLogRepository.findAll(psStartDate);
            return {
                statusCode: oTxActivityLogs ? 200 : 404,
                message: oTxActivityLogs ? 'TxActivityLogs found' : 'TxActivityLogs not found',
                data: oTxActivityLogs ? oTxActivityLogs.map(this.mapToDTO.bind(this)) : null,
            };
        } catch (error) {
            console.error(`Error getTxActivityLogs :`, error);
            return {
                statusCode: 500,
                message: 'Failed to get TxActivityLogs',
                data: null,
            };
        }
    };
};

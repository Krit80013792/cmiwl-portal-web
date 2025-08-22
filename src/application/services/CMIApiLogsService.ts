//* src/application/services/CMIApiLogsService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection';
import { ICMIApiLogsRepository } from '../interfaces/ICMIApiLogsRepository';
import { ICMIApiLogs } from '../../domain/models/CMIApiLogsModel';
import { CMIApiLogsDTO } from '../dtos/CMIApiLogsDTO';
import { BaseResponse } from '../../domain/common/BaseResponse';

export class CMIApiLogsService {
    constructor(private readonly CMIApiLogsRepository: ICMIApiLogsRepository) {}

    private mapToDTO(data: ICMIApiLogs): CMIApiLogsDTO {
        return {
            id: data?._id.toString(),
            itemID: data.sItemID,
            refNo: data.sRefNo,
            apiName: data.sApiName,
            headerStatus: data.sHeaderStatus,
            requestDate: data.dRequestDate,
            request: data.sRequest,
            name: data.sName,
            lastName: data.sLastName,
            email: data.sEmail,
            tel: data.sTel,
            licensePlate: data.sLicensePlate,
            channel: data.sChannel,
            orderNo: data.sOrderNo,
            orderStatus: data.sOrderStatus,
            paymentNo: data.sPaymentNo,
            insOrderNo: data.sInsOrderNo,
            message: data.sMessage,
            responseDate: data.dResponseDate,
            response: data.sResponse,
            remark: data.sRemark,
            createdBy: data.createdBy,
            updatedBy: data.updatedBy,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
    }
    
    async getCMIApiLogs(psStartDate: string, psEndDate: string): Promise<BaseResponse<CMIApiLogsDTO[] | null>> {
        try {
            await MongoDBConnectionService();
            const oCMILogs = await this.CMIApiLogsRepository.findAll(new Date(psStartDate), new Date(psEndDate));
            return {
                statusCode: oCMILogs ? 200 : 404,
                message: oCMILogs ? 'CMILogs found' : 'CMILogs not found',
                data: oCMILogs ? oCMILogs.map(this.mapToDTO.bind(this)) : null
            };
        } catch (error) {
            console.error(`Error getCMIApiLogs:`, error);
            return {
                statusCode: 500,
                message: 'Failed to get CMILogs',
                data: null
            };
        }
    }
}

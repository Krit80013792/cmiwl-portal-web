//* src/application/services/CMIApiLogsService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection'
import { ICMIApiLogsRepository, IFindAllParams } from '../interfaces/ICMIApiLogsRepository'
import { ICMIApiLogs } from '../../domain/models/CMIApiLogsModel'
import { CMIApiLogsDTO } from '../dtos/CMIApiLogsDTO'
import { BaseResponse } from '../../domain/common/BaseResponse'

export class CMIApiLogsService {
  constructor(private readonly CMIApiLogsRepository: ICMIApiLogsRepository) {}

  private mapToDTO(data: ICMIApiLogs): CMIApiLogsDTO {
    return {
      id: data?._id.toString(),
      itemID: data.itemID,
      refNo: data.refNo,
      apiName: data.apiName,
      headerStatus: data.headerStatus,
      requestDate: data.requestDate,
      request: data.request,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      tel: data.tel,
      licensePlate: data.licensePlate,
      channel: data.channel,
      orderNo: data.orderNo,
      orderStatus: data.orderStatus,
      paymentNo: data.paymentNo,
      insOrderNo: data.insOrderNo,
      message: data.message,
      responseDate: data.responseDate,
      response: data.response,
      remark: data.remark,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      detail: {
        chassisNo: data?.detail?.chassisNo,
        carType: data?.detail?.carType,
        carBrandName: data?.detail?.carBrandName,
        carModelName: data?.detail?.carModelName,
        provinceName: data?.detail?.provinceName,
        effectiveDate: data?.detail?.effectiveDate,
        expiredDate: data?.detail?.expiredDate,
        techMessage: data?.detail?.techMessage,
        paymentDate: data?.detail?.paymentDate,
        paymentChannel: data?.detail?.paymentChannel,
        paymentStatus: data?.detail?.paymentStatus,
        paymentMessage: data?.detail?.paymentMessage,
        paymentResultDate: data?.detail?.paymentResultDate,
        paymentResultStatus: data?.detail?.paymentResultStatus,
        paymentNo: data?.detail?.paymentNo,
        amount: data?.detail?.amount,
        policyResultDate: data?.detail?.policyResultDate,
        policyNo: data?.detail?.policyNo,
        covernote: data?.detail?.covernote,
        partnerCode: data?.detail?.partnerCode,
        partnerRefNo: data?.detail?.partnerRefNo,
        insOrderNo: data?.detail?.insOrderNo,
        crossRunningNo: data?.detail?.crossRunningNo,
        runningNo: data?.detail?.runningNo,
        documentResultDate: data?.detail?.documentResultDate,
        documentNo: data?.detail?.documentNo,
        transactionNo: data?.detail?.transactionNo,
        fileAttatchmentNo: data?.detail?.fileAttatchmentNo,
        fileAttatchmentCode: data?.detail?.fileAttatchmentCode,
        fileAttatchmentName: data?.detail?.fileAttatchmentName,
        fileIndex: data?.detail?.fileIndex,
      },
    }
  }

  async getCMIApiLogs(params: IFindAllParams): Promise<BaseResponse<CMIApiLogsDTO[] | null>> {
    try {
      const { pdStartDate, pdEndDate, psChannel, psName, psLicensePlate, psOrderNo, psOrderStatus } = params
      await MongoDBConnectionService()
      const oCMILogs: ICMIApiLogs[] = await this.CMIApiLogsRepository.findAll({
        pdStartDate,
        pdEndDate,
        psChannel,
        psName,
        psLicensePlate,
        psOrderNo,
        psOrderStatus,
      })

      const plainCMILogs = oCMILogs.map((doc) => (doc.toObject ? doc.toObject() : doc))
      return {
        statusCode: plainCMILogs ? 200 : 404,
        message: plainCMILogs ? 'CMILogs found' : 'CMILogs not found',
        data: plainCMILogs ? plainCMILogs.map(this.mapToDTO.bind(this)) : null,
      }
    } catch (error) {
      console.error(`Error getCMIApiLogs:`, error)
      return {
        statusCode: 500,
        message: 'Failed to get CMILogs',
        data: null,
      }
    }
  }
}

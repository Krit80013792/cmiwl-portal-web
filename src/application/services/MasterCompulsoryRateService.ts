//* src/application/services/MasterCompulsoryRateService.ts
import { MongoDBConnectionService } from '../../infrastructure/database/mongodb/connection'
import { IMasterCompulsoryRateRepository } from '../interfaces/IMasterCompulsoryRateRepository'
import { IMasterCompulsoryRate } from '../../domain/models/MasterCompulsoryRateModel'
import { MasterCompulsoryRateDTO } from '../dtos/MasterCompulsoryRateDTO'
import { BaseResponse } from '../../domain/common/BaseResponse'

export class MasterCompulsoryRateService {
  constructor(private readonly masterCompulsoryRateRepository: IMasterCompulsoryRateRepository) {}

  private mapToDTO(masterCompulsoryRate: IMasterCompulsoryRate): MasterCompulsoryRateDTO {
    return {
      id: masterCompulsoryRate._id.toString(), //* Convert MongoDB ObjectId to string
      channel: masterCompulsoryRate.Channel,
      carType: masterCompulsoryRate.CarType,
      carTypeName: masterCompulsoryRate.CarTypeName,
      cmiCarTypeCode: masterCompulsoryRate.CmiCarTypeCode,
      cmiCarTypeName: masterCompulsoryRate.CmiCarTypeName,
      cmiCarTypeRoryor: masterCompulsoryRate.CmiCarTypeRoryor,
      subCarType: masterCompulsoryRate.subCarType,
      typeOfUseCode: masterCompulsoryRate.TypeOfUseCode,
      typeOfUseDetail: masterCompulsoryRate.TypeOfUseDetail,
      cmiCategorySubType: masterCompulsoryRate.CmiCategorySubType,
      cmiSubCarTypeDetail: masterCompulsoryRate.CmiSubCarTypeDetail,
      min: masterCompulsoryRate.Min,
      max: masterCompulsoryRate.Max,
      isEvType: masterCompulsoryRate.IsEvType,
      cmiCoverage: masterCompulsoryRate.CmiCoverage,
      displayDetail: masterCompulsoryRate.DisplayDetail,
      bodyType: masterCompulsoryRate.BodyType,
      useOfMotor: masterCompulsoryRate.UseOfMotor,
      createDate: masterCompulsoryRate.CreateDate,
      createBy: masterCompulsoryRate.CreateBy,
    } as MasterCompulsoryRateDTO
  }

  private mapToDomain(dto: MasterCompulsoryRateDTO): IMasterCompulsoryRate {
    return {
      _id: dto.id,
      Channel: dto.channel,
      CarType: dto.carType,
      CarTypeName: dto.carTypeName,
      CmiCarTypeCode: dto.cmiCarTypeCode,
      CmiCarTypeName: dto.cmiCarTypeName,
      CmiCarTypeRoryor: dto.cmiCarTypeRoryor,
      subCarType: dto.subCarType,
      TypeOfUseCode: dto.typeOfUseCode,
      TypeOfUseDetail: dto.typeOfUseDetail,
      CmiCategorySubType: dto.cmiCategorySubType,
      CmiSubCarTypeDetail: dto.cmiSubCarTypeDetail,
      Min: dto.min,
      Max: dto.max,
      IsEvType: dto.isEvType,
      CmiCoverage: dto.cmiCoverage,
      DisplayDetail: dto.displayDetail,
      BodyType: dto.bodyType,
      UseOfMotor: dto.useOfMotor,
      CreateDate: dto.createDate,
      CreateBy: dto.createBy,
    } as IMasterCompulsoryRate
  }

  async getMasterCompulsoryRates(): Promise<BaseResponse<MasterCompulsoryRateDTO[] | null>> {
    try {
      await MongoDBConnectionService()
      const oMasterCompulsoryRates = await this.masterCompulsoryRateRepository.findAll()
      return {
        statusCode: oMasterCompulsoryRates ? 200 : 404,
        message: oMasterCompulsoryRates ? 'MasterCompulsoryRates found' : 'MasterCompulsoryRates not found',
        data: oMasterCompulsoryRates ? oMasterCompulsoryRates.map(this.mapToDTO.bind(this)) : null,
      }
    } catch (error) {
      console.error(`Error getMasterCompulsoryRates :`, error)
      return {
        statusCode: 500,
        message: 'Failed to get MasterCompulsoryRates',
        data: null,
      }
    }
  }
}

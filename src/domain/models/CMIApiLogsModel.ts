import { Document } from 'mongoose'

export interface ICMIApiLogs extends Document {
  _id: string //* MongoDB ObjectId
  itemID: string // uuid
  refNo: string
  apiName: string
  headerStatus: string
  requestDate: Date
  request: string
  name: string
  lastName: string
  tel: string
  email: string
  channel: string
  orderNo: string
  orderStatus: string
  paymentNo: string
  licensePlate: string
  insOrderNo: string
  message: string
  responseDate: Date
  response: string
  remark: string
  createdBy: string
  updatedBy: string
  createdAt: Date
  updatedAt: Date
  detail?: {
    chassisNo?: string
    carType?: string
    carBrandName?: string
    carModelName?: string
    provinceName?: string
    effectiveDate?: Date
    expiredDate?: Date
    techMessage?: string
    paymentDate?: Date
    paymentChannel?: string
    paymentStatus?: string
    paymentMessage?: string
    paymentResultDate?: Date
    paymentResultStatus?: string
    paymentNo?: string
    amount?: number
    policyResultDate?: Date
    policyNo?: string
    covernote?: string
    partnerCode?: string
    partnerRefNo?: string
    insOrderNo?: string
    crossRunningNo?: string
    runningNo?: string
    documentResultDate?: Date
    documentNo?: string
    transactionNo?: string
    fileAttatchmentNo?: string
    fileAttatchmentCode?: string
    fileAttatchmentName?: string
    fileIndex?: string
  }
}

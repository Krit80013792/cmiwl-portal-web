import mongoose, { Schema } from 'mongoose'
import { ICMIApiLogs } from '../models/CMIApiLogsModel'

const CMIApiLogsSchema: Schema = new Schema(
  {
    sItemID: { type: String, required: true, unique: true }, // uuid
    sRefNo: { type: String, required: true },
    sApiName: { type: String, required: true },
    sHeaderStatus: { type: String, required: true },
    dRequestDate: { type: Date, required: true },
    sRequest: { type: String, required: true },
    sName: { type: String, required: true },
    sLastName: { type: String, required: true },
    sTel: { type: String, required: true },
    sEmail: { type: String, required: true },
    sChannel: { type: String, required: true },
    sOrderNo: { type: String, required: true },
    sOrderStatus: { type: String, required: true },
    sPaymentNo: { type: String, required: true },
    sLicensePlate: { type: String, required: true },
    sInsOrderNo: { type: String, required: true },
    sMessage: { type: String, required: true },
    dResponseDate: { type: Date, required: true },
    sResponse: { type: String, required: true },
    sRemark: { type: String, required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'CMIApiLogs',
  },
)

export const CMIApiLogsEntity =
  mongoose.models.CMIApiLogs || mongoose.model<ICMIApiLogs>('CMIApiLogs', CMIApiLogsSchema)

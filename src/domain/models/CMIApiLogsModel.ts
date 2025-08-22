
import { Document } from 'mongoose';

export interface ICMIApiLogs extends Document {
    _id: string; //* MongoDB ObjectId
    sItemID: string; // uuid
    sRefNo: string;
    sApiName: string;
    sHeaderStatus: string;
    dRequestDate: Date;
    sRequest: string;
    sName: string;
    sLastName: string;
    sTel: string;
    sEmail: string;
    sChannel: string;
    sOrderNo: string;
    sOrderStatus: string;
    sPaymentNo: string;
    sLicensePlate: string;
    sInsOrderNo: string;
    sMessage: string;
    dResponseDate: Date;
    sResponse: string;
    sRemark: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};

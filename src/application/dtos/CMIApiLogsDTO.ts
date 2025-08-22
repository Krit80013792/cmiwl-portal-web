export interface CMIApiLogsDTO {
    id: string; //* MongoDB ObjectId
    itemID: string;
    refNo: string;
    apiName: string;
    headerStatus: string;
    requestDate: Date;
    request: string;
    name: string;
    lastName: string;
    email: string;
    tel: string;
    licensePlate: string;
    channel: string;
    orderNo: string;
    orderStatus: string;
    paymentNo: string;
    insOrderNo: string;
    message: string;
    responseDate: Date;
    response: string;
    remark: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};

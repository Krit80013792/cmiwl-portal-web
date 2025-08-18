export interface MasterCarBrandDTO {
    id: string; //* MongoDB ObjectId
    carBrandId: string;
    carBrandName: string;
    carTypeKey: string;
    insurerCode: string;
    createDate: Date;
    createBy: string;
};

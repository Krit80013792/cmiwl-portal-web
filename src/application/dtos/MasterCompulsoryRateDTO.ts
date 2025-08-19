export interface MasterCompulsoryRateDTO {
    id: string; //* MongoDB ObjectId
    channel: string;
    carType: number;
    carTypeName: string;
    cmiCarTypeCode: string;
    cmiCarTypeName: string;
    cmiCarTypeRoryor: string;
    cmiSubCarTypeCode: string;
    typeOfUseCode: string;
    typeOfUseDetail: string;
    cmiCategorySubType: string;
    cmiSubCarTypeDetail: string;
    min: number;
    max: number;
    isEvType: boolean;
    cmiCoverage: string;
    displayDetail: string;
    bodyType: string;
    useOfMotor: string;
    createDate: Date;
    createBy: string;
};

import { Document } from 'mongoose';

export interface IMasterCompulsoryRate extends Document {
    _id: string; //* MongoDB ObjectId
    Channel: string;
    CarType: number;
    CarTypeName: string;
    CmiCarTypeCode: string;
    CmiCarTypeName: string;
    CmiCarTypeRoryor: string;
    CmiSubCarTypeCode: string;
    TypeOfUseCode: string;
    TypeOfUseDetail: string;
    CmiCategorySubType: string;
    CmiSubCarTypeDetail: string;
    Min: number;
    Max: number;
    IsEvType: boolean;
    CmiCoverage: string;
    DisplayDetail: string;
    BodyType: string;
    UseOfMotor: string;
    CreateDate: Date;
    CreateBy: string;
};

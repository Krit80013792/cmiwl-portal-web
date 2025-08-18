export interface MasterInsurerDTO {
    id: string; //* MongoDB ObjectId
    channel: string;
    insurerCode: string;
    insurerShortName: string;
    insurerFullName: string;
    insurerImgPath: string;
    active: boolean;
};

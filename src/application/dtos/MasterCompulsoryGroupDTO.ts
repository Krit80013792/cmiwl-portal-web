export interface MasterCompulsoryGroupDTO {
    id: string; //* MongoDB ObjectId
    displayName: string;
    categoryGroup: string;
    categoryText: string;
    categoryImgText: string;
    categoryImgPath: string;
    channel: string;
    active: boolean;
};

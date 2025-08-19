export interface MasterCompulsoryTypeDTO {
    id: string; //* MongoDB ObjectId
    displayName: string;
    carTypeKey: string;
    categoryGroup: string;
    channel: string;
    imagePath: string;
    active: boolean;
    itemOrder: number;
};

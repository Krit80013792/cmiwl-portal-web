export interface MasterPrefixDTO {
    id: string; //* MongoDB ObjectId
    prefixNameTH: string;
    prefixNameEN: string;
    codeName: string;
    channel: string;
    active: boolean;
    itemOrder: number;
};

export interface MasterChannelDTO {
    id: string; //* MongoDB ObjectId
    ck: string; //* uuid
    saleChannel: string;
    transChannel: string;
    displayName: string;
    keyCode: string;
    active: boolean;
};

export type SafeMasterChannelDTO = Omit<MasterChannelDTO, 'ck'>;

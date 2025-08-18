export interface MasterCarBrandRankingDTO {
    id: string; //* MongoDB ObjectId
    carBrandID: string;
    carBrandName: string;
    imagePath: string;
    ranking: number;
    channel: string;
    active: boolean;
};

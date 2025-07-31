export interface ConfigDTO extends Document {
    id: string; //* MongoDB ObjectId
    configId: string; //* uuid
    configName: string;
    configKey: string;
    configValue: string;
    configDescription: string;
    configByChannel: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};

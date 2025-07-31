export interface UserGroupDTO {
    id: string; //* MongoDB ObjectId
    userGroupId: string; //* uuid
    userGroupName: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};

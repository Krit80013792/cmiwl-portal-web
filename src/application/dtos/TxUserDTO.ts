export interface TxUserDTO {
    id: string; //* MongoDB ObjectId
    userId: string; //* uuid
    userName: string;
    userGroupName: string;
    userRoleName: string;
    sessionId: string; //* uuid without dashes
    token: string;
    createdAt: Date;
    updatedAt: Date;
};

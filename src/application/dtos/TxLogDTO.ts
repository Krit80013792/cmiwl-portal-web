export interface TxLogDTO {
    id: string; //* MongoDB ObjectId
    userName: string;
    userGroupName: string;
    userRoleName: string;
    route: string;
    method: string; //* e.g., 'GET', 'POST', 'PATCH', 'PUT', 'DELETE'
    action: string;
    status: string;
    requestMsg: string;
    responseMsg: string;
    channel: string; //* e.g., 'CMS', 'NTLAPP', 'HEY', 'TIDLOH'
    createdAt: Date;
    updatedAt: Date;
};

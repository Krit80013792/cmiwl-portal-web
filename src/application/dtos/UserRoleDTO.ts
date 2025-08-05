export interface UserRoleDTO {
    id: string; //* MongoDB ObjectId
    userRoleId: string; //* uuid
    userRoleName: string;
    userRoleDescription: string;
    userRolePermissions: string[]; //* Array of permission e.g., ["users:create", "pages:read"]
    resources: string[];
    permissionsMap: any[];
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface UserRoleDTO extends Document {
    id: string; //* MongoDB ObjectId
    userRoleId: string; //* uuid
    userRoleName: string;
    userRoleDescription: string;
    userRolePermissions: string[]; //* Array of permission e.g., ["users:create", "pages:read"]
    resources: string[];
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
};

import { UserDTO } from '@/src/application/dtos/UserDTO';
import { UserGroupDTO } from '@/src/application/dtos/UserGroupDTO';
import { UserRoleDTO } from '@/src/application/dtos/UserRoleDTO';

export const statusOptions = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false },
];

export const emptyUser: UserDTO = {
    id: "",
    userId: "",
    userName: "",
    password: "",
    userGroupId: "",
    userGroupName: "",
    userRoleId: "",
    userRoleName: "",
    isActive: true,
    createdBy: "",
    updatedBy: "",
    createdAt: new Date,
    updatedAt: new Date,
} as UserDTO;

export const emptyUserGroup: UserGroupDTO = {
    id: "",
    userGroupId: "",
    userGroupName: "",
    createdBy: "",
    updatedBy: "",
    createdAt: new Date,
    updatedAt: new Date,
} as UserGroupDTO;

export const emptyUserRole: UserRoleDTO = {
    id: "",
    userRoleId: "",
    userRoleName: "",
    userRoleDescription: "",
    userRolePermissions: [''],
    resources: [''],
    permissionsMap: [],
    createdBy: "",
    updatedBy: "",
    createdAt: new Date,
    updatedAt: new Date,
} as UserRoleDTO;

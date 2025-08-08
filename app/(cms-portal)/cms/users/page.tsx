/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import LoadingComponent from '@/layout/components/loading/LoadingComponent';
import { Toast } from 'primereact/toast';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { ApiRoute } from '@/src/shared/utils/profile';
import { createUser, updateUser, deleteUser, getUsers } from '@/services/client/users.service';
import { createUserGroup, updateUserGroup, deleteUserGroup, getUserGroups } from '@/services/client/userGroups.service';
import { createUserRole, updateUserRole, deleteUserRole, getUserRoles } from '@/services/client/userRoles.service';
import { getResources } from '@/services/client/resources.service';
import { UserDTO } from '@/src/application/dtos/UserDTO';
import { UserGroupDTO } from '@/src/application/dtos/UserGroupDTO';
import { UserRoleDTO } from '@/src/application/dtos/UserRoleDTO';
import { convertDate, generateRandomPw, mapResourcesToEmptyPermissions, mapRoleToPermissions } from '@/src/shared/utils/utils';
import { clientCookie } from '@/src/shared/utils/clientCookie';
import { statusOptions, emptyUser, emptyUserGroup, emptyUserRole } from '@/src/shared/objects/shared.objs';

const UsersPage = () => {

    const toast = useRef<Toast>(null);
    const dtUsers = useRef<DataTable<any>>(null);
    const dtUserGroups = useRef<DataTable<any>>(null);
    const dtUserRoles = useRef<DataTable<any>>(null);
    const [clientPerms, setClientPerms] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [userGroups, setUserGroups] = useState<UserGroupDTO[]>([]);
    const [userRoles, setUserRoles] = useState<UserRoleDTO[]>([]);
    const [resourcesPermissions, setResourcesPermissions] = useState<any[]>([]);
    const [userDialog, setUserDialog] = useState(false);
    const [userGroupDialog, setUserGroupDialog] = useState(false);
    const [userRoleDialog, setUserRoleDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUserGroupDialog, setDeleteUserGroupDialog] = useState(false);
    const [deleteUserRoleDialog, setDeleteUserRoleDialog] = useState(false);
    const [user, setUser] = useState<UserDTO>(emptyUser);
    const [userGroup, setUserGroup] = useState<UserGroupDTO>(emptyUserGroup);
    const [userRole, setUserRole] = useState<UserRoleDTO>(emptyUserRole);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [selectedUserGroups, setSelectedUserGroups] = useState(null);
    const [selectedUserRoles, setSelectedUserRoles] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [usersFilters, setUsersFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterUsersValue, setGlobalFilterUsersValue] = useState('');
    const [userGroupsFilters, setUserGroupsFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterUserGroupsValue, setGlobalFilterUserGroupsValue] = useState('');
    const [userRolesFilters, setUserRolesFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterUserRolesValue, setGlobalFilterUserRolesValue] = useState('');
    const [password, setPassword] = useState('');

    const setApiRoute = async (): Promise<any> => {
        const c = await ApiRoute();
        const de = JSON.parse(Buffer.from(c, 'base64').toString('binary'));
        return de;
    };

    useEffect(() => {
        const cc = clientCookie();
        setClientPerms(cc?.perms);

        setLoading(true);
        const getData = async () => {
            const route = await setApiRoute();
            const resUsers = await getUsers(route);
            const usersData = await resUsers.json();
            const resUserGroups = await getUserGroups(route);
            const userGroupsData = await resUserGroups.json();
            const resUserRoles = await getUserRoles(route);
            const userRolesData = await resUserRoles.json();
            setUsers(usersData?.data);
            setUserGroups(userGroupsData?.data);
            setUserRoles(userRolesData?.data);
            setLoading(false);
        };
        getData();
    }, []);

    const openNewUser = () => {
        setUser(emptyUser);
        setPassword('');
        setSubmitted(false);
        setUserDialog(true);
    };

    const openNewUserGroup = () => {
        setUserGroup(emptyUserGroup);
        setSubmitted(false);
        setUserGroupDialog(true);
    };

    const openNewUserRole = () => {
        setLoading(true);
        const getData = async () => {
            const route = await setApiRoute();
            const resResources = await getResources(route);
            const resourcesData = await resResources.json();
            setLoading(false);

            setResourcesPermissions(mapResourcesToEmptyPermissions(resourcesData?.data));
        };
        getData();

        setUserRole(emptyUserRole);
        setSubmitted(false);
        setUserRoleDialog(true);
    };

    const hideUserDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const hideUserGroupDialog = () => {
        setSubmitted(false);
        setUserGroupDialog(false);
    };

    const hideDeleteUserGroupDialog = () => {
        setDeleteUserGroupDialog(false);
    };

    const hideUserRoleDialog = () => {
        setSubmitted(false);
        setUserRoleDialog(false);
    };

    const hideDeleteUserRoleDialog = () => {
        setDeleteUserRoleDialog(false);
    };

    const saveUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(false);
        setLoading(true);

        const oUser = { ...user };

        if (oUser?.userId) {
            if (!oUser.userGroupId ||
                !oUser.userRoleId) {
                setSubmitted(true);
                setUserDialog(true);
                setLoading(false);
                return;
            }
            await handleUpdateUser(oUser);
        } else {
            if (!oUser.userName ||
                !oUser.password ||
                !oUser.userGroupId ||
                !oUser.userRoleId ||
                !allValidPw) {
                setSubmitted(true);
                setUserDialog(true);
                setLoading(false);
                return;
            }
            await handleInsertUser(oUser);
        }
        setLoading(false);
    };

    const saveUserGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(false);
        setLoading(true);

        const oUserGroup = { ...userGroup };

        if (oUserGroup?.userGroupId) {
            if (!oUserGroup.userGroupName) {
                setSubmitted(true);
                setUserGroupDialog(true);
                setLoading(false);
                return;
            }
            await handleUpdateUserGroup(oUserGroup);
        } else {
            if (!oUserGroup.userGroupName) {
                setSubmitted(true);
                setUserGroupDialog(true);
                setLoading(false);
                return;
            }
            await handleInsertUserGroup(oUserGroup);
        }
        setLoading(false);
    };

    const saveUserRole = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(false);
        setLoading(true);

        const oUserRole = { ...userRole };
        oUserRole.permissionsMap = resourcesPermissions;

        if (oUserRole?.userRoleId) {
            if (!oUserRole.userRoleName) {
                setSubmitted(true);
                setUserRoleDialog(true);
                setLoading(false);
                return;
            }
            await handleUpdateUserRole(oUserRole);
        } else {
            if (!oUserRole.userRoleName) {
                setSubmitted(true);
                setUserRoleDialog(true);
                setLoading(false);
                return;
            }
            await handleInsertUserRole(oUserRole);
        }
        setLoading(false);
    };

    const handleUpdateUser = async (poUser: UserDTO) => {
        const route = await setApiRoute();
        const res = await updateUser(route, poUser);
        if (res?.status === 409) {
            const body = await res.json();
            toast.current?.show({ severity: 'warn', summary: 'Warning', detail: body?.message, life: 5000 });
            return;
        }
        if (res?.ok) {
            const resUsers = await getUsers(route);
            const usersData = await resUsers.json();
            setUsers(usersData?.data);
            setUserDialog(false);
            setUser(emptyUser);
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 5000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to update User', life: 5000 });
        }
    };

    const handleUpdateUserGroup = async (poUserGroup: UserGroupDTO) => {
        const route = await setApiRoute();
        const res = await updateUserGroup(route, poUserGroup);
        if (res?.status === 409) {
            const body = await res.json();
            toast.current?.show({ severity: 'warn', summary: 'Warning', detail: body?.message, life: 5000 });
            return;
        }
        if (res?.ok) {
            const resUserGroups = await getUserGroups(route);
            const userGroupsData = await resUserGroups.json();
            setUserGroups(userGroupsData?.data);
            setUserGroupDialog(false);
            setUserGroup(emptyUserGroup);

            const resUsers = await getUsers(route);
            const usersData = await resUsers.json();
            setUsers(usersData?.data);

            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Group Updated', life: 5000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to update User Group', life: 5000 });
        }
    };

    const handleUpdateUserRole = async (poUserRole: UserRoleDTO) => {
        const route = await setApiRoute();
        const res = await updateUserRole(route, poUserRole);
        if (res?.status === 409) {
            const body = await res.json();
            toast.current?.show({ severity: 'warn', summary: 'Warning', detail: body?.message, life: 5000 });
            return;
        }
        if (res?.ok) {
            const resUserRoles = await getUserRoles(route);
            const userRolesData = await resUserRoles.json();
            setUserRoles(userRolesData?.data);
            setUserRoleDialog(false);
            setUserRole(emptyUserRole);

            const resUsers = await getUsers(route);
            const usersData = await resUsers.json();
            setUsers(usersData?.data);

            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Role Updated', life: 5000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to update User Role', life: 5000 });
        }
    };

    const handleInsertUser = async (poUser: UserDTO) => {
        const route = await setApiRoute();
        const res = await createUser(route, poUser);
        if (res?.status === 409) {
            const body = await res.json();
            toast.current?.show({ severity: 'warn', summary: 'Warning', detail: body?.message, life: 5000 });
            return;
        }
        if (res?.ok) {
            const resUsers = await getUsers(route);
            const usersData = await resUsers.json();
            setUsers(usersData?.data);
            setUserDialog(false);
            setUser(emptyUser);
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 5000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to create User', life: 5000 });
        }
    };

    const handleInsertUserGroup = async (poUserGroup: UserGroupDTO) => {
        const route = await setApiRoute();
        const res = await createUserGroup(route, poUserGroup);
        if (res?.status === 409) {
            const body = await res.json();
            toast.current?.show({ severity: 'warn', summary: 'Warning', detail: body?.message, life: 5000 });
            return;
        }
        if (res?.ok) {
            const resUserGroups = await getUserGroups(route);
            const userGroupsData = await resUserGroups.json();
            setUserGroups(userGroupsData?.data);
            setUserGroupDialog(false);
            setUserGroup(emptyUserGroup);
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Group Created', life: 5000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to create User Group', life: 5000 });
        }
    };

    const handleInsertUserRole = async (poUserRole: UserRoleDTO) => {
        const route = await setApiRoute();
        const res = await createUserRole(route, poUserRole);
        if (res?.status === 409) {
            const body = await res.json();
            toast.current?.show({ severity: 'warn', summary: 'Warning', detail: body?.message, life: 5000 });
            return;
        }
        if (res?.ok) {
            const resUserRoles = await getUserRoles(route);
            const userRolesData = await resUserRoles.json();
            setUserRoles(userRolesData?.data);
            setUserRoleDialog(false);
            setUserRole(emptyUserRole);
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Role Created', life: 5000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to create User Role', life: 5000 });
        }
    };

    const editUser = (poUser: UserDTO) => {
        const transformedUser = {
            ...poUser,
        };

        setUser(transformedUser);
        setUserDialog(true);
    };

    const editUserGroup = (poUserGroup: UserGroupDTO) => {
        const transformedUserGroup = {
            ...poUserGroup,
        };

        setUserGroup(transformedUserGroup);
        setUserGroupDialog(true);
    };

    const editUserRole = (poUserRole: UserRoleDTO) => {
        const transformedUserRole = {
            ...poUserRole,
        };

        setLoading(true);
        const getData = async () => {
            const route = await setApiRoute();
            const resResources = await getResources(route);
            const resourcesData = await resResources.json();
            setLoading(false);

            setResourcesPermissions(mapRoleToPermissions(resourcesData?.data, transformedUserRole));
        };
        getData();

        setUserRole(transformedUserRole);
        setUserRoleDialog(true);
    };

    const confirmDeleteUser = (poUser: UserDTO) => {
        setUser(poUser);
        setDeleteUserDialog(true);
    };

    const confirmDeleteUserGroup = (poUserGroup: UserGroupDTO) => {
        setUserGroup(poUserGroup);
        setDeleteUserGroupDialog(true);
    };

    const confirmDeleteUserRole = (poUserRole: UserRoleDTO) => {
        setUserRole(poUserRole);
        setDeleteUserRoleDialog(true);
    };

    const handleDeleteUser = async () => {
        const oUser = { ...user };
        if (oUser?.id) {
            await toDeleteUser(oUser);
        }
    };

    const handleDeleteUserGroup = async () => {
        const oUserGroup = { ...userGroup };
        if (oUserGroup?.id) {
            await toDeleteUserGroup(oUserGroup);
        }
    };

    const handleDeleteUserRole = async () => {
        const oUserRole = { ...userRole };
        if (oUserRole?.id) {
            await toDeleteUserRole(oUserRole);
        }
    };

    const toDeleteUser = async (paUser: any) => {
        setDeleteUserDialog(false);
        setLoading(true);
        const route = await setApiRoute();
        const res = await deleteUser(route, paUser);
        if (res?.ok) {
            const resUsers = await getUsers(route);
            const usersData = await resUsers.json();
            setUsers(usersData?.data);
            setUser(emptyUser);
            setSelectedUsers(null);
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 5000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete User', life: 5000 });
        }
        setLoading(false);
    };

    const toDeleteUserGroup = async (paUserGroup: any) => {
        setDeleteUserGroupDialog(false);
        setLoading(true);
        const route = await setApiRoute();
        const res = await deleteUserGroup(route, paUserGroup);
        if (res?.status === 409) {
            const body = await res.json();
            toast.current?.show({ severity: 'warn', summary: 'Warning', detail: body?.message, life: 5000 });
            setLoading(false);
            return;
        }
        if (res?.ok) {
            const resUserGroups = await getUserGroups(route);
            const userGroupsData = await resUserGroups.json();
            setUserGroups(userGroupsData?.data);
            setUserGroup(emptyUserGroup);
            setSelectedUserGroups(null);
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Group Deleted', life: 5000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete User Group', life: 5000 });
        }
        setLoading(false);
    };

    const toDeleteUserRole = async (paUserRole: any) => {
        setDeleteUserRoleDialog(false);
        setLoading(true);
        const route = await setApiRoute();
        const res = await deleteUserRole(route, paUserRole);
        if (res?.status === 409) {
            const body = await res.json();
            toast.current?.show({ severity: 'warn', summary: 'Warning', detail: body?.message, life: 5000 });
            setLoading(false);
            return;
        }
        if (res?.ok) {
            const resUserRoles = await getUserRoles(route);
            const userRolesData = await resUserRoles.json();
            setUserRoles(userRolesData?.data);
            setUserRole(emptyUserRole);
            setSelectedUserRoles(null);
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Role Deleted', life: 5000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete User Role', life: 5000 });
        }
        setLoading(false);
    };

    const userNameBodyTemplate = (rowData: UserDTO) => {
        return (
            <>
                <span className="p-column-title">Username</span>
                {rowData?.userName}
            </>
        );
    };

    const userGroupNameBodyTemplate = (rowData: UserDTO) => {
        return (
            <>
                <span className="p-column-title">Group</span>
                {rowData?.userGroupName}
            </>
        );
    };

    const userRoleNameBodyTemplate = (rowData: UserDTO) => {
        return (
            <>
                <span className="p-column-title">Role</span>
                {rowData?.userRoleName}
            </>
        );
    };

    const userRoleDescriptionBodyTemplate = (rowData: UserRoleDTO) => {
        return (
            <>
                <span className="p-column-title">Description</span>
                {rowData?.userRoleDescription}
            </>
        );
    };

    const createDateBodyTemplate = (rowData: UserDTO) => {
        return (
            <>
                <span className="p-column-title">Create Date</span>
                {convertDate(rowData?.createdAt)}
            </>
        );
    };

    const createByBodyTemplate = (rowData: UserDTO) => {
        return (
            <>
                <span className="p-column-title">Create By</span>
                {rowData?.createdBy}
            </>
        );
    };

    const statusBodyTemplate = (rowData: UserDTO) => {
        const badgeClass = rowData.isActive ? 'success' : 'danger';
        return (
            <>
                <span className="p-column-title">Status</span>
                <Badge value={rowData.isActive ? 'Active' : 'Inactive'} severity={badgeClass} />
            </>
        );
    };

    const actionUsersBodyTemplate = (rowData: UserDTO) => {
        return (
            <>
                {(clientPerms ?? []).includes('users:update') && (
                    <Button icon="pi pi-pencil" rounded text severity="secondary" className="mr-2" onClick={() => editUser(rowData)} />
                )}
                {(clientPerms ?? []).includes('users:delete') && (
                    <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDeleteUser(rowData)} />
                )}
            </>
        );
    };

    const actionUserGroupsBodyTemplate = (rowData: UserGroupDTO) => {
        return (
            <>
                {(clientPerms ?? []).includes('users:update') && (
                    <Button icon="pi pi-pencil" rounded text severity="secondary" className="mr-2" onClick={() => editUserGroup(rowData)} />
                )}
                {(clientPerms ?? []).includes('users:delete') && (
                    <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDeleteUserGroup(rowData)} />
                )}
            </>
        );
    };

    const actionUserRolesBodyTemplate = (rowData: UserRoleDTO) => {
        return (
            <>
                {(clientPerms ?? []).includes('users:update') && (
                    <Button icon="pi pi-pencil" rounded text severity="secondary" className="mr-2" onClick={() => editUserRole(rowData)} />
                )}
                {(clientPerms ?? []).includes('users:delete') && (
                    <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDeleteUserRole(rowData)} />
                )}
            </>
        );
    };

    const userDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideUserDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveUser} />
        </>
    );

    const userGroupDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideUserGroupDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveUserGroup} />
        </>
    );

    const userRoleDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideUserRoleDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveUserRole} />
        </>
    );

    const deleteUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={handleDeleteUser} />
        </>
    );

    const deleteUserGroupDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteUserGroupDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={handleDeleteUserGroup} />
        </>
    );

    const deleteUserRoleDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteUserRoleDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={handleDeleteUserRole} />
        </>
    );

    const handleUserNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const regex = /^[a-zA-Z0-9]*$/;
        if (!regex.test(e.key)) {
            e.preventDefault();
        }
    };

    const onInputUserNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const sVal = (e.target && e.target.value) || '';
        let oUser = { ...user };
        oUser.userName = sVal;
        setUser(oUser);
    };

    const onInputGroupNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const sVal = (e.target && e.target.value) || '';
        let oUserGroup = { ...userGroup };
        oUserGroup.userGroupName = sVal;
        setUserGroup(oUserGroup);
    };

    const onInputRoleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const sVal = (e.target && e.target.value) || '';
        let oUserRole = { ...userRole };
        oUserRole.userRoleName = sVal;
        setUserRole(oUserRole);
    };

    const onInputRoleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const sVal = (e.target && e.target.value) || '';
        let oUserRole = { ...userRole };
        oUserRole.userRoleDescription = sVal;
        setUserRole(oUserRole);
    };

    const validatePassword = (pw: string) => ({
        hasUpper: /[A-Z]/.test(pw),
        hasLower: /[a-z]/.test(pw),
        hasNumber: /\d/.test(pw), //* 0-9
        hasSpecial: /[!@#$*\-_?]/.test(pw),
        isValidLength: pw.length >= 8 && pw.length <= 15,
    });

    const passwordRules = validatePassword(password);

    const allValidPw = Object.values(passwordRules).every(Boolean);

    const onInputPasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const sVal = (e.target && e.target.value) || '';
        setPassword(sVal);
        let oUser = { ...user };
        oUser.password = sVal;
        setUser(oUser);
    };

    const onRandomPw = () => {
        const sPw = generateRandomPw();
        setPassword(sPw);
        let oUser = { ...user };
        oUser.password = sPw;
        setUser(oUser);
    };

    const onDropdownUserGroupChange = (e: any) => {
        const sVal = e.value;
        let oUser = { ...user };
        oUser.userGroupId = sVal;
        setUser(oUser);
    };

    const onDropdownUserRoleChange = (e: any) => {
        const sVal = e.value;
        let oUser = { ...user };
        oUser.userRoleId = sVal;
        setUser(oUser);
    };

    const onDropdownStatusChange = (e: any) => {
        const bVal = e.value;
        let oUser = { ...user };
        oUser.isActive = bVal;
        setUser(oUser);
    };

    const onGlobalFilterUsersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...usersFilters };
        (_filters['global'] as any).value = value;
        setUsersFilters(_filters);
        setGlobalFilterUsersValue(value);
    };

    const renderUsersTableHeader = () => {
        return (
            <div className="flex justify-content-between">
                <span className="p-input-icon-left">
                    <strong>Manage Users</strong>
                </span>
                <span className="p-input-icon-right">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterUsersValue} onChange={onGlobalFilterUsersChange} placeholder="Search by Username" />
                </span>
            </div>
        );
    };

    const usersTableHeader = renderUsersTableHeader();

    const onGlobalFilterUserGroupsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...userGroupsFilters };
        (_filters['global'] as any).value = value;
        setUserGroupsFilters(_filters);
        setGlobalFilterUserGroupsValue(value);
    };

    const renderUserGroupsTableHeader = () => {
        return (
            <div className="flex justify-content-between">
                <span className="p-input-icon-left">
                    {(clientPerms ?? []).includes('users:create') && (
                        <Button label="New Group" icon="pi pi-plus" severity="secondary" className="mr-2" onClick={openNewUserGroup} />
                    )}
                </span>
                <span className="p-input-icon-right">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterUserGroupsValue} onChange={onGlobalFilterUserGroupsChange} placeholder="Search by Group name" />
                </span>
            </div>
        );
    };

    const userGroupsTableHeader = renderUserGroupsTableHeader();

    const onGlobalFilterUserRolesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...userRolesFilters };
        (_filters['global'] as any).value = value;
        setUserRolesFilters(_filters);
        setGlobalFilterUserRolesValue(value);
    };

    const renderUserRolesTableHeader = () => {
        return (
            <div className="flex justify-content-between">
                <span className="p-input-icon-left">
                    {(clientPerms ?? []).includes('users:create') && (
                        <Button label="New Role" icon="pi pi-plus" severity="secondary" className="mr-2" onClick={openNewUserRole} />
                    )}
                </span>
                <span className="p-input-icon-right">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterUserRolesValue} onChange={onGlobalFilterUserRolesChange} placeholder="Search by Role name" />
                </span>
            </div>
        );
    };

    const userRolesTableHeader = renderUserRolesTableHeader();

    const onPermissionChange = (rowIndex: number, perm: keyof any['permissions'], checked: boolean) => {
        const updated = [...resourcesPermissions];
        updated[rowIndex].permissions[perm] = checked;
        setResourcesPermissions(updated);
    };

    const permissionCheckboxTemplate = (perm: keyof any['permissions']) => (rowData: any, { rowIndex }: { rowIndex: number }) => {
        return (
            <Checkbox
                checked={rowData.permissions[perm]}
                onChange={(e) => onPermissionChange(rowIndex, perm, e.checked!)}
            />
        );
    };

    return (
        <>
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <Toast ref={toast} />
                        <h5><i className="pi pi-users" style={{ fontSize: '2rem' }}></i><strong> Users</strong></h5>
                    </div>

                    {loading &&
                        <LoadingComponent />
                    }

                    <div className="card">
                        <div className="p-toolbar p-component mb-4">
                            <div className="my-2">
                                {(clientPerms ?? []).includes('users:create') && (
                                    <Button label="New User" icon="pi pi-plus" severity="info" className="mr-2" onClick={openNewUser} />
                                )}
                            </div>
                        </div>
                        <Dialog visible={userDialog} style={{ width: '450px' }} header="User" modal maximizable className="p-fluid" footer={userDialogFooter} onHide={hideUserDialog}>

                            {!user?.userId && (
                                <>
                                    <div className="field">
                                        <label htmlFor="username"><span style={{ color: "red" }}>*</span> Username </label>
                                        <InputText
                                            id="username"
                                            name="username"
                                            value={user?.userName}
                                            onKeyDown={handleUserNameKeyDown}
                                            onChange={(e) => onInputUserNameChange(e, 'value')}
                                            required
                                            className={classNames({
                                                'p-invalid': submitted && !user.userName
                                            })}
                                        />
                                        {submitted && !user.userName && <small className="p-invalid">Username is required.</small>}
                                    </div>
                                    <div className="field">
                                        <label htmlFor="password"><span style={{ color: "red" }}>*</span> Password </label>
                                        <div className="p-inputgroup flex-1">
                                            <InputText
                                                id="password"
                                                name="password"
                                                value={user?.password}
                                                onChange={(e) => onInputPasswordChange(e, 'value')}
                                                required
                                                className={classNames({
                                                    'p-invalid': submitted && !user.password
                                                })}
                                            />
                                            <Button icon="pi pi-replay" label="Random" severity="secondary" onClick={onRandomPw} />
                                        </div>
                                        {submitted && !allValidPw && <small className="p-invalid">Password is invalid.</small>}

                                        <ul style={{ listStyleType: 'none', padding: 0, marginTop: '0.5rem' }}>
                                            <li style={{ color: passwordRules.hasUpper ? 'green' : 'red' }}>
                                                {passwordRules.hasUpper ? '✔' : '✖'} ตัวอักษรพิมพ์ใหญ่ A-Z อย่างน้อย 1 ตัว
                                            </li>
                                            <li style={{ color: passwordRules.hasLower ? 'green' : 'red' }}>
                                                {passwordRules.hasLower ? '✔' : '✖'} ตัวอักษรพิมพ์เล็ก a-z อย่างน้อย 1 ตัว
                                            </li>
                                            <li style={{ color: passwordRules.hasNumber ? 'green' : 'red' }}>
                                                {passwordRules.hasNumber ? '✔' : '✖'} ตัวเลข 0-9 อย่างน้อย 1 ตัว
                                            </li>
                                            <li style={{ color: passwordRules.hasSpecial ? 'green' : 'red' }}>
                                                {passwordRules.hasSpecial ? '✔' : '✖'} อักษรพิเศษ !@#$*-_? อย่างน้อย 1 ตัว
                                            </li>
                                            <li style={{ color: passwordRules.isValidLength ? 'green' : 'red' }}>
                                                {passwordRules.isValidLength ? '✔' : '✖'} ความยาวไม่ต่ำกว่า 8 ตัวอักษร แต่ไม่เกิน 15 ตัวอักษร
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            )}

                            <div className="field">
                                <label htmlFor="userGroup"><span style={{ color: "red" }}>*</span> Group </label>
                                <Dropdown
                                    inputId="userGroup"
                                    value={user?.userGroupId}
                                    onChange={(e) => onDropdownUserGroupChange(e)}
                                    required
                                    className={classNames({
                                        'p-invalid': submitted && !user.userGroupId
                                    })}
                                    options={
                                        Array.isArray(userGroups)
                                            ? userGroups.map(item => ({
                                                label: item.userGroupName,
                                                value: item.userGroupId,
                                            }))
                                            : []
                                    }
                                    placeholder="Select user group"
                                />
                                {submitted && !user.userGroupId && <small className="p-invalid">Group is required.</small>}
                            </div>
                            <div className="field">
                                <label htmlFor="userRole"><span style={{ color: "red" }}>*</span> Role </label>
                                <Dropdown
                                    inputId="userRole"
                                    value={user?.userRoleId}
                                    onChange={(e) => onDropdownUserRoleChange(e)}
                                    required
                                    className={classNames({
                                        'p-invalid': submitted && !user.userRoleId
                                    })}
                                    options={
                                        Array.isArray(userRoles)
                                            ? userRoles.map(item => ({
                                                label: item.userRoleName,
                                                value: item.userRoleId,
                                            }))
                                            : []
                                    }
                                    placeholder="Select user role"
                                />
                                {submitted && !user.userRoleId && <small className="p-invalid">Role is required.</small>}
                            </div>
                            <div className="field">
                                <label htmlFor="status"><span style={{ color: "red" }}>*</span> Status </label>
                                <Dropdown
                                    id="status"
                                    value={user?.isActive}
                                    onChange={(e) => onDropdownStatusChange(e)}
                                    options={statusOptions}
                                    placeholder="Select Status"
                                />
                            </div>
                        </Dialog>

                        <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {user && (<span>Are you sure you want to delete <b>{user?.userName}</b>?</span>)}
                            </div>
                        </Dialog>
                    </div>

                    {!loading && users?.length > 0 && (
                        <div className="card">
                            <DataTable
                                ref={dtUsers}
                                value={users}
                                selection={selectedUsers}
                                onSelectionChange={(e) => setSelectedUsers(e.value)}
                                dataKey="userId"
                                paginator
                                rows={20}
                                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                                className="p-datatable-sm"
                                scrollable
                                scrollHeight="600px"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
                                loading={loading}
                                filters={usersFilters}
                                globalFilterFields={['userName', 'userGroupName', 'userRoleName']}
                                emptyMessage="No Users found."
                                header={usersTableHeader}
                            >
                                <Column header="Username" body={userNameBodyTemplate} field="userName" sortable></Column>
                                <Column header="Group" body={userGroupNameBodyTemplate} field="userGroupName" sortable></Column>
                                <Column header="Role" body={userRoleNameBodyTemplate} field="userRoleName" sortable></Column>
                                <Column header="Create Date" body={createDateBodyTemplate} field="createdAt" sortable headerStyle={{ minWidth: '8rem' }}></Column>
                                <Column header="Create By" body={createByBodyTemplate} field="createdBy" sortable headerStyle={{ minWidth: '8rem' }}></Column>
                                <Column header="Status" body={statusBodyTemplate} field="isActive" sortable></Column>
                                <Column body={actionUsersBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                            </DataTable>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid">
                <div className="col-12 md:col-6">
                    <div className="card">
                        <DataTable
                            ref={dtUserGroups}
                            value={userGroups}
                            selection={selectedUserGroups}
                            onSelectionChange={(e) => setSelectedUserGroups(e.value)}
                            dataKey="userGroupId"
                            paginator
                            rows={20}
                            rowsPerPageOptions={[5, 10, 20, 50, 100]}
                            className="p-datatable-sm"
                            scrollable
                            scrollHeight="600px"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} User Groups"
                            filters={userGroupsFilters}
                            globalFilterFields={['userGroupName']}
                            emptyMessage="No User Groups found."
                            header={userGroupsTableHeader}
                        >
                            <Column header="Group" body={userGroupNameBodyTemplate} field="userGroupName" sortable></Column>
                            <Column header="Create Date" body={createDateBodyTemplate} field="createdAt" sortable headerStyle={{ minWidth: '8rem' }}></Column>
                            <Column header="Create By" body={createByBodyTemplate} field="createdBy" sortable headerStyle={{ minWidth: '8rem' }}></Column>
                            <Column body={actionUserGroupsBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        </DataTable>

                        <Dialog visible={userGroupDialog} style={{ width: '450px' }} header="Group" modal maximizable className="p-fluid" footer={userGroupDialogFooter} onHide={hideUserGroupDialog}>
                            <div className="field">
                                <label htmlFor="groupname"><span style={{ color: "red" }}>*</span> Group name </label>
                                <InputText
                                    id="groupname"
                                    name="groupname"
                                    value={userGroup?.userGroupName}
                                    onChange={(e) => onInputGroupNameChange(e, 'value')}
                                    required
                                    className={classNames({
                                        'p-invalid': submitted && !userGroup.userGroupName
                                    })}
                                />
                                {submitted && !userGroup.userGroupName && <small className="p-invalid">Group name is required.</small>}
                            </div>
                        </Dialog>

                        <Dialog visible={deleteUserGroupDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserGroupDialogFooter} onHide={hideDeleteUserGroupDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {userGroup && (<span>Are you sure you want to delete <b>{userGroup?.userGroupName}</b>?</span>)}
                            </div>
                        </Dialog>
                    </div>
                </div>
                <div className="col-12 md:col-6">
                    <div className="card">
                        <DataTable
                            ref={dtUserRoles}
                            value={userRoles}
                            selection={selectedUserRoles}
                            onSelectionChange={(e) => setSelectedUserRoles(e.value)}
                            dataKey="userRoleId"
                            paginator
                            rows={20}
                            rowsPerPageOptions={[5, 10, 20, 50, 100]}
                            className="p-datatable-sm"
                            scrollable
                            scrollHeight="600px"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} User Roles"
                            filters={userRolesFilters}
                            globalFilterFields={['userRoleName']}
                            emptyMessage="No User Roles found."
                            header={userRolesTableHeader}
                        >
                            <Column header="Role" body={userRoleNameBodyTemplate} field="userRoleName" sortable></Column>
                            <Column header="Description" body={userRoleDescriptionBodyTemplate} field="userRoleDescription" sortable></Column>
                            <Column header="Create Date" body={createDateBodyTemplate} field="createdAt" sortable headerStyle={{ minWidth: '8rem' }}></Column>
                            <Column header="Create By" body={createByBodyTemplate} field="createdBy" sortable headerStyle={{ minWidth: '8rem' }}></Column>
                            <Column body={actionUserRolesBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        </DataTable>

                        <Dialog visible={userRoleDialog} style={{ width: '900px' }} header="Role" modal maximizable className="p-fluid" footer={userRoleDialogFooter} onHide={hideUserRoleDialog}>
                            <div className="field col-6">
                                <label htmlFor="rolename"><span style={{ color: "red" }}>*</span> Role name </label>
                                <InputText
                                    id="rolename"
                                    name="rolename"
                                    value={userRole?.userRoleName}
                                    onChange={(e) => onInputRoleNameChange(e, 'value')}
                                    required
                                    className={classNames({
                                        'p-invalid': submitted && !userRole.userRoleName
                                    })}
                                />
                                {submitted && !userRole.userRoleName && <small className="p-invalid">Role name is required.</small>}
                            </div>
                            <div className="field col-6">
                                <label htmlFor="roledescription"> Role Description </label>
                                <InputText
                                    id="roledescription"
                                    name="roledescription"
                                    value={userRole?.userRoleDescription}
                                    onChange={(e) => onInputRoleDescriptionChange(e, 'value')}
                                />
                            </div>
                            <div className="field col-12">
                                <label htmlFor="roledescription"> Permissions </label>
                                <DataTable value={resourcesPermissions} dataKey="resourceId">
                                    <Column field="resourceLabel" header="Menu" />
                                    <Column field="resourceDescription" header="Description" />
                                    <Column header="Create" body={permissionCheckboxTemplate('create')} />
                                    <Column header="Read" body={permissionCheckboxTemplate('read')} />
                                    <Column header="Update" body={permissionCheckboxTemplate('update')} />
                                    <Column header="Delete" body={permissionCheckboxTemplate('delete')} />
                                </DataTable>
                            </div>
                        </Dialog>

                        <Dialog visible={deleteUserRoleDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserRoleDialogFooter} onHide={hideDeleteUserRoleDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {userRole && (<span>Are you sure you want to delete <b>{userRole?.userRoleName}</b>?</span>)}
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UsersPage;

/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import LoadingComponent from '@/layout/components/loading/LoadingComponent';
import { Toast } from 'primereact/toast';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { ApiRoute } from '@/src/shared/utils/profile';
import { getUserById, createUser, updateUser, deleteUser, getUsers } from '@/services/client/users.service';
import { UserDTO } from '@/src/application/dtos/UserDTO';
import { UserGroupDTO } from '@/src/application/dtos/UserGroupDTO';
import { UserRoleDTO } from '@/src/application/dtos/UserRoleDTO';
import { convertDate } from '@/src/shared/utils/utils';

const UsersPage = () => {

    const statusOptions = [
        { label: 'Active', value: true },
        { label: 'Inactive', value: false },
    ];

    const emptyUser: UserDTO = {
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

    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [userGroups, setUserGroups] = useState<UserGroupDTO[]>([]);
    const [userRoles, setUserRoles] = useState<UserRoleDTO[]>([]);
    const [userDialog, setUserDialog] = useState(false);
    const [deleteNewsDialog, setDeleteNewsDialog] = useState(false);
    const [deleteNewssDialog, setDeleteNewssDialog] = useState(false);
    const [user, setUser] = useState<UserDTO>(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const setApiRoute = async (): Promise<any> => {
        const c = await ApiRoute();
        const de = JSON.parse(Buffer.from(c, 'base64').toString('binary'));
        return de;
    };

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            const route = await setApiRoute();
            const res = await getUsers(route);
            const usersData = await res.json();
            setUsers(usersData?.data);
            setLoading(false);
        };
        getData();
    }, []);

    const openNewUser = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    };

    const hideUserDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    };

    // const hideDeleteNewsDialog = () => {
    //     setDeleteNewsDialog(false);
    // };

    // const hideDeleteNewssDialog = () => {
    //     setDeleteNewssDialog(false);
    // };

    const saveUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(false);

        const oUser = { ...user };
        console.info(oUser);
        if (!oUser.userName ||
            !oUser.password ||
            !oUser.userGroupId ||
            !oUser.userRoleId) {
            setSubmitted(true);
            setUserDialog(true);
            return;
        }

        setLoading(true);
        //setUserDialog(false);

        // oNews.newsFullContent = sanitize(oNews.newsFullContent);
        // oNews.newsFooterContent = sanitize(oNews.newsFooterContent);

        // oNews.aListImages = [];
        // setNews(oNews);

        // if (oNews.newsId) {
        //     await handleUpdateNews(oNews);
        // } else {
        //     await handleInsertNews(oNews);
        // }
        setLoading(false);
    };

    // const isValidImgType = () => {
    //     const sFileTypeMain = fileMain[0]?.type.toString().toLowerCase();
    //     const sFileTypeThumbnail = fileThumbnail[0]?.type.toString().toLowerCase();
    //     if ((sFileTypeMain !== 'image/jpg' && sFileTypeMain !== 'image/jpeg') ||
    //         (sFileTypeThumbnail !== 'image/jpg' && sFileTypeThumbnail !== 'image/jpeg')) {
    //         return false;
    //     }
    //     return true;
    // };

    // const handleUpdateNews = async (poNews: NewsDTO) => {
    //     const sFileTypeThumbnail = fileThumbnail[0]?.type.toString().toLowerCase();
    //     if (sFileTypeThumbnail) {
    //         if (!isValidImgType()) {
    //             toast.current?.show({ severity: 'warn', summary: 'Warning', detail: 'Only .jpg files are allowed', life: 5000 });
    //             return;
    //         }
    //     }

    //     poNews.newsImageName = fileNameMain?.split('.')[0] ?? poNews.newsImageName;
    //     poNews.newsImagePath = fileB64Main ?? poNews.newsImagePath;
    //     poNews.newsImageThumbnailName = fileNameThumbnail?.split('.')[0] ?? poNews.newsImageThumbnailName;
    //     poNews.newsImageThumbnailPath = fileB64Thumbnail ?? poNews.newsImageThumbnailPath;

    //     const conf = await setConfAsync();
    //     const res = await updateNews(conf, poNews);
    //     if (res.status === 409) {
    //         const body = await res.json();
    //         toast.current?.show({ severity: 'warn', summary: 'Warning', detail: body?.message, life: 5000 });
    //         return;
    //     }
    //     if (res.ok) {
    //         const conf = await setConfAsync();
    //         const res = await getNewsByType(conf, 'type=news');
    //         const dataNews = await res.json();
    //         setNewss(dataNews?.data);
    //         setNewsDialog(false);
    //         setNews(emptyNews);
    //         onCancelMainFile();
    //         onCancelThumbnailFile();
    //         toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'News Updated', life: 5000 });
    //     } else {
    //         toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to update News', life: 5000 });
    //     }
    // };

    // const handleInsertNews = async (poNews: NewsDTO) => {
    //     if (!isValidImgType()) {
    //         toast.current?.show({ severity: 'warn', summary: 'Warning', detail: 'Only .jpg files are allowed', life: 5000 });
    //         return;
    //     }
    //     if (!fileB64Thumbnail) {
    //         toast.current?.show({ severity: 'warn', summary: 'Warning', detail: 'Please select News image', life: 5000 });
    //         return;
    //     }

    //     poNews.newsImageName = fileNameMain?.split('.')[0] ?? poNews.newsImageName;
    //     poNews.newsImagePath = fileB64Main ?? poNews.newsImagePath;
    //     poNews.newsImageThumbnailName = fileNameThumbnail?.split('.')[0] ?? poNews.newsImageThumbnailName;
    //     poNews.newsImageThumbnailPath = fileB64Thumbnail ?? poNews.newsImageThumbnailPath;

    //     const conf = await setConfAsync();
    //     const res = await createNews(conf, poNews);
    //     if (res.status === 409) {
    //         const body = await res.json();
    //         toast.current?.show({ severity: 'warn', summary: 'Warning', detail: body?.message, life: 5000 });
    //         return;
    //     }
    //     if (res.ok) {
    //         const conf = await setConfAsync();
    //         const res = await getNewsByType(conf, 'type=news');
    //         const dataNews = await res.json();
    //         setNewss(dataNews?.data);
    //         setNewsDialog(false);
    //         setNews(emptyNews);
    //         onCancelMainFile();
    //         onCancelThumbnailFile();
    //         toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'News Created', life: 5000 });
    //     } else {
    //         toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to create News', life: 5000 });
    //     }
    // };

    // const editNews = (poNews: NewsDTO) => {
    //     const transformedNews = {
    //         ...poNews,
    //         sPostDate: poNews.sPostDate ? new Date(poNews.sPostDate) : null,
    //     };

    //     setNews(transformedNews);
    //     setNewsDialog(true);
    // };

    // const confirmDeleteNews = (poNews: NewsDTO) => {
    //     setNews(poNews);
    //     setDeleteNewsDialog(true);
    // };

    // const handleDeleteNews = async () => {
    //     const oNews = { ...news };
    //     if (oNews.newsId) {
    //         await toDeleteNews(oNews);
    //     }
    // };

    // const confirmDeleteSelected = () => {
    //     setDeleteNewssDialog(true);
    // };

    // const handleDeleteSelectedNewss = async () => {
    //     if (selectedNewss) {
    //         await toDeleteNews(selectedNewss);
    //     }
    // };

    // const toDeleteNews = async (paNews: any) => {
    //     setDeleteNewsDialog(false);
    //     setDeleteNewssDialog(false);
    //     setLoading(true);
    //     const conf = await setConfAsync();
    //     const res = await deleteNews(conf, paNews);
    //     if (res.ok) {
    //         const res = await getNewsByType(conf, 'type=news');
    //         const dataNews = await res.json();
    //         setNewss(dataNews?.data);
    //         setNews(emptyNews);
    //         setSelectedNewss(null);
    //         toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'News Deleted', life: 5000 });
    //     } else {
    //         toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete News', life: 5000 });
    //     }
    //     setLoading(false);
    // };

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

    // const actionBodyTemplate = (rowData: NewsDTO) => {
    //     return (
    //         <>
    //             <Button icon="pi pi-pencil" rounded text severity="secondary" className="mr-2" onClick={() => editNews(rowData)} />
    //             <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDeleteNews(rowData)} />
    //         </>
    //     );
    // };

    const userDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideUserDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveUser} />
        </>
    );

    // const deleteNewsDialogFooter = (
    //     <>
    //         <Button label="No" icon="pi pi-times" text onClick={hideDeleteNewsDialog} />
    //         <Button label="Yes" icon="pi pi-check" text onClick={handleDeleteNews} />
    //     </>
    // );

    // const deleteNewssDialogFooter = (
    //     <>
    //         <Button label="No" icon="pi pi-times" text onClick={hideDeleteNewssDialog} />
    //         <Button label="Yes" icon="pi pi-check" text onClick={handleDeleteSelectedNewss} />
    //     </>
    // );

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

    const onInputPasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const sVal = (e.target && e.target.value) || '';
        let oUser = { ...user };
        oUser.password = sVal;
        setUser(oUser);
    };

    function generateRandomPw(length: number = 14): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        return password;
    };

    const onRandomPw = () => {
        const sPw = generateRandomPw();
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

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };
        (_filters['global'] as any).value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderTableHeader = () => {
        return (
            <div className="flex justify-content-between">
                <span className="p-input-icon-left">

                </span>
                <span className="p-input-icon-right">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search by Username" />
                </span>
            </div>
        );
    };

    const tableHeader = renderTableHeader();

    return (
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
                            <Button label="New User" icon="pi pi-plus" severity="info" className="mr-2" onClick={openNewUser} />
                            {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedNewss || !(selectedNewss as any).length} /> */}
                        </div>
                    </div>
                    <Dialog visible={userDialog} style={{ width: '450px' }} header="User" modal maximizable className="p-fluid" footer={userDialogFooter} onHide={hideUserDialog}>
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

                            {submitted && !user.password && <small className="p-invalid">Password is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="userGroup"><span style={{ color: "red" }}>*</span> Group </label>
                            <Dropdown
                                inputId="userGroup"
                                value={user?.userGroupId}
                                onChange={(e) => onDropdownUserGroupChange(e)}
                                options={userGroups}
                                placeholder="Select user group"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="userRole"><span style={{ color: "red" }}>*</span> Role </label>
                            <Dropdown
                                inputId="userRole"
                                value={user?.userRoleId}
                                onChange={(e) => onDropdownUserRoleChange(e)}
                                options={userRoles}
                                placeholder="Select user role"
                            />
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

                    {/* <Dialog visible={deleteNewsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteNewsDialogFooter} onHide={hideDeleteNewsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {news && (<span>Are you sure you want to delete <b>News</b>?</span>)}
                        </div>
                    </Dialog> */}

                    {/* <Dialog visible={deleteNewssDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteNewssDialogFooter} onHide={hideDeleteNewssDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {news && <span>Are you sure you want to delete the selected News?</span>}
                        </div>
                    </Dialog> */}
                </div>

                {!loading && users?.length > 0 && (
                    <div className="card">
                        <DataTable
                            ref={dt}
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
                            filters={filters}
                            globalFilterFields={['userName', 'userGroupName', 'userRoleName']}
                            emptyMessage="No Users found."
                            header={tableHeader}
                        >
                            <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                            <Column header="Username" body={userNameBodyTemplate} field="userName" sortable></Column>
                            <Column header="Group" body={userGroupNameBodyTemplate} field="userGroupName" sortable></Column>
                            <Column header="Role" body={userRoleNameBodyTemplate} field="userRoleName" sortable></Column>
                            <Column header="Create Date" body={createDateBodyTemplate} field="createdAt" sortable headerStyle={{ minWidth: '8rem' }}></Column>
                            <Column header="Create By" body={createByBodyTemplate} field="createdBy" sortable headerStyle={{ minWidth: '8rem' }}></Column>
                            <Column header="Status" body={statusBodyTemplate} field="isActive" sortable></Column>
                            {/* <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column> */}
                        </DataTable>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersPage;

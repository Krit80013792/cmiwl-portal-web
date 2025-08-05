/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import LoadingComponent from '@/layout/components/loading/LoadingComponent';
import { Toast } from 'primereact/toast';
import { Badge } from 'primereact/badge';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { ApiRoute } from '@/src/shared/utils/profile';
import { getTxActivityLogs } from '@/services/client/txActivityLogs.service';
import { TxActivityLogDTO } from '@/src/application/dtos/TxActivityLogDTO';
import { formatDateToYMD } from '@/src/shared/utils/utils';
import { clientCookie } from '@/src/shared/utils/clientCookie';

const ActivityLogsPage = () => {

    const toast = useRef<Toast>(null);
    const dtActivityLogs = useRef<DataTable<any>>(null);
    const [clientPerms, setClientPerms] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [activityLogs, setActivityLogs] = useState<TxActivityLogDTO[]>([]);
    const [filterDate, setFilterDate] = useState<Date>(new Date);
    const [detailDialog, setDetailDialog] = useState(false);
    const [detail, setDetail] = useState<any>();
    const [logsFilters, setLogsFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

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
            const startDate = formatDateToYMD(new Date);
            const resActivityLogs = await getTxActivityLogs(route, `startDate=${startDate}`);
            const activityLogsData = await resActivityLogs.json();
            setActivityLogs(activityLogsData?.data);
            setLoading(false);
        };
        getData();
    }, []);

    const statusBodyTemplate = (rowData: TxActivityLogDTO) => {
        const badgeClass = rowData?.status === 'success' ? 'success' : 'danger';
        return (
            <>
                <span className="p-column-title">Status</span>
                <Badge value={rowData?.status === 'success' ? 'success' : 'failed'} severity={badgeClass} />
            </>
        );
    };

    const openRequest = (rowData: TxActivityLogDTO) => {
        setDetailDialog(true);
        setDetail(rowData?.requestMsg);
    };

    const actionRequestTemplate = (rowData: TxActivityLogDTO) => {
        return (
            <Button icon="pi pi-file" rounded text severity="secondary" className="mr-2" onClick={() => openRequest(rowData)} />
        );
    };

    const openResponse = (rowData: TxActivityLogDTO) => {
        setDetailDialog(true);
        setDetail(rowData?.responseMsg);
    };

    const actionResponseTemplate = (rowData: TxActivityLogDTO) => {
        return (
            <Button icon="pi pi-file" rounded text severity="secondary" className="mr-2" onClick={() => openResponse(rowData)} />
        );
    };

    const hideDetailDialog = () => {
        setDetailDialog(false);
    };

    const createDateBodyTemplate = (rowData: TxActivityLogDTO) => {
        return (
            <>
                <span className="p-column-title">Date</span>
                {rowData?.createdAt}
            </>
        );
    };

    const onInputStartDateChange = (date: any) => {
        if (!date) return;
        setFilterDate(date?.value);
    };

    const onSearchClick = () => {
        setLoading(true);
        const getData = async () => {
            const route = await setApiRoute();
            const startDate = formatDateToYMD(filterDate);
            const resActivityLogs = await getTxActivityLogs(route, `startDate=${startDate}`);
            const activityLogsData = await resActivityLogs.json();
            setActivityLogs(activityLogsData?.data);
            setLoading(false);
        };
        getData();
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...logsFilters };
        (_filters['global'] as any).value = value;
        setLogsFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderTableHeader = () => {
        return (
            <div className="flex justify-content-between">
                <span className="p-input-icon-left">
                    <strong>CMS Activity Logs</strong>
                </span>
                <span className="p-input-icon-right">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search by Username" />
                </span>
            </div>
        );
    };

    const logsTableHeader = renderTableHeader();

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <h5><i className="pi pi-list" style={{ fontSize: '2rem' }}></i><strong> CMS Activity Logs</strong></h5>
                </div>

                {loading &&
                    <LoadingComponent />
                }

                <div className="card p-fluid">
                    <div className="field grid">
                        <label htmlFor="requestdate" className="col-12 mb-2 md:col-2 md:mb-0"> Date: </label>
                        <div className="col-12 md:col-3">
                            <Calendar
                                inputId="startDate"
                                value={filterDate}
                                onChange={(e) => onInputStartDateChange(e)}
                                dateFormat="yy-mm-dd"
                                showIcon
                            />
                        </div>
                    </div>
                    <div className="field grid">
                        <div className="col-12 md:col-4">

                        </div>
                        <div className="col-12 md:col-2">
                            <Button label="Reset" icon="pi pi-replay" severity="secondary" className="mr-2" />
                        </div>
                        <div className="col-12 md:col-2">
                            <Button label="Search" icon="pi pi-search" severity="success" className="mr-2" onClick={onSearchClick} />
                        </div>
                        <div className="col-12 md:col-4">

                        </div>
                    </div>
                </div>

                <div className="card">
                    <DataTable
                        ref={dtActivityLogs}
                        value={activityLogs}
                        dataKey="id"
                        paginator
                        rows={20}
                        rowsPerPageOptions={[5, 10, 20, 50, 100]}
                        className="p-datatable-sm"
                        scrollable
                        scrollHeight="600px"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Records"
                        loading={loading}
                        filters={logsFilters}
                        globalFilterFields={['userName', 'userGroupName', 'userRoleName']}
                        emptyMessage="Data not found."
                        header={logsTableHeader}
                    >
                        <Column header="Username" field="userName" sortable />
                        <Column header="Group" field="userGroupName" sortable />
                        <Column header="Role" field="userRoleName" sortable />
                        <Column header="Route" field="route" sortable />
                        <Column header="Method" field="method" sortable />
                        <Column header="Action" field="action" sortable />
                        <Column header="Status" body={statusBodyTemplate} field="status" sortable />
                        <Column header="Request" body={actionRequestTemplate} />
                        <Column header="Response" body={actionResponseTemplate} />
                        <Column header="Date" body={createDateBodyTemplate} field="createdAt" sortable />
                    </DataTable>

                    <Dialog visible={detailDialog} style={{ width: '900px' }} header="Detail" modal maximizable className="p-fluid" onHide={hideDetailDialog}>
                        <div className="field col-12">
                            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                {JSON.stringify(detail, null, 2)}
                            </pre>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default ActivityLogsPage;

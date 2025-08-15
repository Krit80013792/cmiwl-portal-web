/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import LoadingComponent from '@/layout/components/loading/LoadingComponent';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { ApiRoute } from '@/src/shared/utils/profile';
import { getMasterDataByEndpoint, syncMasterDataByEndpoint } from '@/services/client/master-data.service';
import { clientCookie } from '@/src/shared/utils/clientCookie';

const MasterDataPage = () => {

    const tabs = [
        {
            name: 'car-brands', label: 'Car Brands',
            columns: [
                { field: 'brand', header: 'Brand' },
                { field: 'country', header: 'Country' }
            ]
        },
        {
            name: 'car-brands-ranking', label: 'Car Brands Ranking',
            columns: [
                { field: 'brand', header: 'Brand' },
                { field: 'rank', header: 'Rank' }
            ]
        },
        {
            name: 'car-colors', label: 'Car Colors',
            columns: [
                { field: 'color', header: 'Color' },
                { field: 'hex', header: 'Hex Code' }
            ]
        },
        {
            name: 'channels', label: 'Channels',
            columns: [
                { field: 'displayName', header: 'Name' },
                { field: 'keyCode', header: 'Code' }
            ]
        },
        {
            name: 'compulsory-groups', label: 'Compulsory Groups',
            columns: [
                { field: 'group', header: 'Group' },
                { field: 'description', header: 'Description' }
            ]
        },
        {
            name: 'compulsory-rates', label: 'Compulsory Rates',
            columns: [
                { field: 'rate', header: 'Rate' },
                { field: 'description', header: 'Description' }
            ]
        },
        {
            name: 'compulsory-types', label: 'Compulsory Types',
            columns: [
                { field: 'type', header: 'Type' },
                { field: 'description', header: 'Description' }
            ]
        },
        {
            name: 'insurers', label: 'Insurers',
            columns: [
                { field: 'name', header: 'Name' },
                { field: 'license', header: 'License No.' }
            ]
        },
        {
            name: 'prefix', label: 'Prefix',
            columns: [
                { field: 'prefix', header: 'Prefix' },
                { field: 'gender', header: 'Gender' }
            ]
        }
    ];

    const toast = useRef<Toast>(null);
    const [loading, setLoading] = useState(false);
    const [clientPerms, setClientPerms] = useState<string[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [dataMap, setDataMap] = useState<{ [key: string]: any[] }>({});
    const [confirmSyncDialog, setConfirmSyncDialog] = useState(false);
    const [tabName, setTabName] = useState<string>('');

    const setApiRoute = async (): Promise<any> => {
        const c = await ApiRoute();
        const de = JSON.parse(Buffer.from(c, 'base64').toString('binary'));
        return de;
    };

    useEffect(() => {
        const cc = clientCookie();
        setClientPerms(cc?.perms);
    }, []);

    const fetchData = async (tabName: string) => {
        if (!tabName) return;
        setLoading(true);
        try {
            const route = await setApiRoute();
            const res = await getMasterDataByEndpoint(route, route?.amd, tabName);
            const resData = await res.json();
            setDataMap(prev => ({ ...prev, [tabName]: resData?.data }));
        } catch {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: `Failed to load ${tabName}` });
        }
        setLoading(false);
    };

    const handleTabChange = (e: any) => {
        const tabName = tabs[e?.index]?.name;
        setActiveIndex(e.index);
        fetchData(tabName);
    };

    const handleSync = async () => {
        toast.current?.show({ severity: 'info', summary: 'Sync', detail: `Syncing ${tabName}...` });

        setLoading(true);
        try {
            const route = await setApiRoute();
            const res = await syncMasterDataByEndpoint(route, route?.amd, tabName);
            if (!res?.ok) {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: `Failed to sync ${tabName}` });
                return;
            }
            const resData = await res.json();
            fetchData(tabName); //* reload data
        } catch {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: `Failed to sync ${tabName}` });
        }
        finally {
            setLoading(false);
            setConfirmSyncDialog(false);
        }
    };

    const onOpenConfirmSync = (tabName: string) => {
        setTabName(tabName);
        setConfirmSyncDialog(true);
    };

    const confirmSyncDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={() => setConfirmSyncDialog(false)} />
            <Button label="Yes" icon="pi pi-check" text onClick={handleSync} />
        </>
    );

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <h5><i className="pi pi-table" style={{ fontSize: '2rem' }}></i><strong> Master Data</strong></h5>
                </div>

                {loading &&
                    <LoadingComponent />
                }

                <div className="card">
                    <Accordion onTabChange={handleTabChange} activeIndex={activeIndex}>
                        {tabs.map((tab, idx) => (
                            <AccordionTab key={tab?.name} header={tab?.label}>

                                {(clientPerms ?? []).includes('master-data:update') && (
                                    <div className="mb-3">
                                        <Button
                                            label="Sync Master"
                                            icon="pi pi-refresh"
                                            severity="danger"
                                            outlined
                                            onClick={() => onOpenConfirmSync(tab?.name)}
                                        />
                                    </div>
                                )}

                                <DataTable value={dataMap[tab?.name] ?? []} paginator rows={10} className="p-datatable-sm" scrollable scrollHeight="600px">
                                    {tab.columns.map(col => (
                                        <Column key={col?.field} field={col?.field} header={col?.header} />
                                    ))}
                                </DataTable>

                                <Dialog visible={confirmSyncDialog} style={{ width: '450px' }} header="Confirm" modal footer={confirmSyncDialogFooter} onHide={() => setConfirmSyncDialog(false)}>
                                    <div className="flex align-items-center justify-content-center">
                                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                        {tabName && (<span>Are you sure you want to sync master data <b>{tabName}</b>?</span>)}
                                    </div>
                                </Dialog>
                            </AccordionTab>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default MasterDataPage;

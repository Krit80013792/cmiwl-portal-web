/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import LoadingComponent from '@/layout/components/loading/LoadingComponent';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const OrderReportAdminPage = () => {

    const toast = useRef<Toast>(null);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <h5><i className="pi pi-table" style={{ fontSize: '2rem' }}></i><strong> Order Report Admin</strong></h5>
                </div>

                <div className="card p-fluid">
                    <div className="field grid">
                        <label htmlFor="channel" className="col-12 mb-2 md:col-2 md:mb-0"> Channel: </label>
                        <div className="col-12 md:col-6">
                            <Dropdown
                                inputId="newsType"
                                //value={news.newsType}
                                //onChange={(e) => onDropdownTypeChange(e, 'newsType')}
                                //options={newsTypeOptions}
                                placeholder="Select Channel"
                            />
                        </div>
                    </div>
                    <div className="field grid">
                        <label htmlFor="requestdate" className="col-12 mb-2 md:col-2 md:mb-0"> วันที่เริ่มทำรายการ: </label>
                        <div className="col-12 md:col-3">
                            <Calendar
                                inputId="startDate"
                                //value={news.sPostDate}
                                //onChange={(e) => onInputPostDateChange(e, 'postDate')}
                                dateFormat="yy-mm-dd"
                                showIcon
                            />
                        </div>
                    </div>
                    <div className="field grid">
                        <label htmlFor="enddate" className="col-12 mb-2 md:col-2 md:mb-0"> วันที่สิ้นสุดทำรายการ: </label>
                        <div className="col-12 md:col-3">
                            <Calendar
                                inputId="endDate"
                                //value={news.sPostDate}
                                //onChange={(e) => onInputPostDateChange(e, 'postDate')}
                                dateFormat="yy-mm-dd"
                                showIcon
                            />
                        </div>
                    </div>
                    <div className="field grid">
                        <label htmlFor="name" className="col-12 mb-2 md:col-2 md:mb-0"> ชื่อ: </label>
                        <div className="col-12 md:col-6">
                            <InputText
                                id="name" />
                        </div>
                    </div>
                    <div className="field grid">
                        <label htmlFor="licenseplate" className="col-12 mb-2 md:col-2 md:mb-0"> ทะเบียนรถ: </label>
                        <div className="col-12 md:col-6">
                            <InputText
                                id="licenseplate" />
                        </div>
                    </div>
                    <div className="field grid">
                        <label htmlFor="orderNo" className="col-12 mb-2 md:col-2 md:mb-0"> หมายเลข Order: </label>
                        <div className="col-12 md:col-6">
                            <InputText
                                id="orderNo" />
                        </div>
                    </div>
                    <div className="field grid">
                        <div className="col-12 md:col-4">

                        </div>
                        <div className="col-12 md:col-2">
                            <Button label="Reset" icon="pi pi-replay" severity="secondary" className="mr-2" />
                        </div>
                        <div className="col-12 md:col-2">
                            <Button label="Search" icon="pi pi-search" severity="success" className="mr-2" />
                        </div>
                        <div className="col-12 md:col-4">

                        </div>
                    </div>
                </div>

                <div className="card">
                    <DataTable
                        //ref={dt}
                        //value={newss}
                        //selection={selectedNewss}
                        //onSelectionChange={(e) => setSelectedNewss(e.value)}
                        dataKey="newsId"
                        paginator
                        rows={20}
                        rowsPerPageOptions={[5, 10, 20, 50, 100]}
                        className="p-datatable-sm"
                        scrollable
                        scrollHeight="600px"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Records"
                        //loading={loading}
                        //filters={filters}
                        globalFilterFields={['newsPageName', 'newsHeaderContent']}
                        emptyMessage="Data not found."
                    //header={tableHeader}
                    >
                        <Column header="Actions" headerStyle={{ minWidth: '10rem' }} />
                        <Column header="วันที่ทำรายการ" field="itemID" sortable />
                        <Column header="ชื่อ" field="refNo" sortable />
                        <Column header="นามสกุล" field="api_name" sortable />
                        <Column header="เบอร์โทร" field="headerStatus" sortable />
                        <Column header="Email" field="requestDate" sortable />
                        <Column header="Channel" field="request" sortable />
                        <Column header="OrderNo" field="request" sortable />
                        <Column header="OrderStatus" field="request" sortable />
                        <Column header="PaymentNO" field="request" sortable />
                        <Column header="ทะเบียนรถ" field="request" sortable />
                        <Column header="insOrderNo" field="request" sortable />
                        <Column header="message" field="request" sortable />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default OrderReportAdminPage;

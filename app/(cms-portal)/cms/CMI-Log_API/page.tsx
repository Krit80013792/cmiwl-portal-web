/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const CmiLogApi = () => {
    
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>
                        <i className="pi pi-list" style={{ fontSize: '2rem' }}></i>
                        <strong> CMI-Log_API</strong>
                    </h5>
                </div>

                <div className="card p-fluid">
                    <div className="field grid">
                        <label htmlFor="api_name" className="col-12 mb-2 md:col-2 md:mb-0"> api_name: </label>
                        <div className="col-12 md:col-6">
                            <Dropdown
                                inputId="newsType"
                                //value={news.newsType}
                                //onChange={(e) => onDropdownTypeChange(e, 'newsType')}
                                //options={newsTypeOptions}
                                placeholder="Select api_name"
                            />
                        </div>
                    </div>
                    <div className="field grid">
                        <label htmlFor="requestdate" className="col-12 mb-2 md:col-2 md:mb-0"> requestdate: </label>
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
                        <div className="col-12 mb-2 md:col-2 md:mb-0"></div>
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
                        <label htmlFor="request" className="col-12 mb-2 md:col-2 md:mb-0"> request: </label>
                        <div className="col-12 md:col-3">
                            <Dropdown
                                inputId="request"
                                //value={news.newsType}
                                //onChange={(e) => onDropdownTypeChange(e, 'newsType')}
                                //options={newsTypeOptions}
                                placeholder="Select request"
                            />
                        </div>
                        <div className="col-12 md:col-3">
                            <InputText
                                id="request" />
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
                        <Column header="ItemID" field="itemID" sortable />
                        <Column header="RefNo" field="refNo" sortable />
                        <Column header="api_name" field="api_name" sortable />
                        <Column header="headerStatus" field="headerStatus" sortable />
                        <Column header="requestDate" field="requestDate" sortable />
                        <Column header="request" field="request" sortable />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default CmiLogApi;

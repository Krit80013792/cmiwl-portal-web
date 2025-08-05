/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import LoadingComponent from '@/layout/components/loading/LoadingComponent';
import { Toast } from 'primereact/toast';

const MasterDataPage = () => {

    const toast = useRef<Toast>(null);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <h5><i className="pi pi-table" style={{ fontSize: '2rem' }}></i><strong> Master Data</strong></h5>
                </div>
            </div>
        </div>
    );
};

export default MasterDataPage;

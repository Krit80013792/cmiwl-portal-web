/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';

const MainPage = () => {

    const toast = useRef<Toast>(null);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <h5><i className="pi pi-home" style={{ fontSize: '2rem' }}></i><strong> Home</strong></h5>
                </div>
            </div>
        </div>
    );
};

export default MainPage;

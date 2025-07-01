/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useRef } from 'react';
import AppFooter from './AppFooter';
import AppTopbar from './AppTopbar';
import { ChildContainerProps, AppTopbarRef } from '@/types';

const Layout = ({ children }: ChildContainerProps) => {
    const topbarRef = useRef<AppTopbarRef>(null);

    return (
        <div className="page-areegator position-relative">
            <AppTopbar ref={topbarRef} />
            {children}
            <AppFooter />
        </div>
    );
};

export default Layout;

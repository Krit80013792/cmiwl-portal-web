/* eslint-disable @next/next/no-img-element */

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import Image from 'next/image';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { getCMSConfigAsync } from '@/src/shared/utils/config';
import { signOut } from '@/services/client/auth.service';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const router = useRouter();
    const toast = useRef<Toast>(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    const onSignOut = () => {
        setConfirmDialog(true);
    };

    const setConfAsync = async (): Promise<any> => {
        const c = await getCMSConfigAsync();
        const de = JSON.parse(Buffer.from(c, 'base64').toString('binary'));
        return de;
    };

    const onConfirmSignOut = async () => {
        const conf = await setConfAsync();
        const res = await signOut(conf);
        if (res.ok) {
            router.push('/pw0wl');
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to sign out', life: 5000 });
        }
    };

    const hideConfirmDialog = () => {
        setConfirmDialog(false);
    };

    const confirmDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideConfirmDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={onConfirmSignOut} />
        </>
    );

    return (
        <div className="layout-topbar">
            <Link href="/cms/main" className="layout-topbar-logo">
                {/* <Image id="js-logo" className="logo" src="/images/logo.png" width={100} height={40} alt="areegator" priority /> */}
                CMI
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <Link href="#" onClick={onSignOut}>
                    <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-sign-out"></i>
                        <span>Sign out</span>
                    </button>
                </Link>
            </div>

            <Dialog visible={confirmDialog} style={{ width: '450px' }} header="Confirm" modal footer={confirmDialogFooter} onHide={hideConfirmDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>Are you sure you want to sign out?</span>
                </div>
            </Dialog>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;

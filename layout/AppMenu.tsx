/* eslint-disable @next/next/no-img-element */

import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const model: AppMenuItem[] = [
        {
            label: 'HOME',
            items: [{ label: 'Home', icon: 'pi pi-fw pi-home', to: '/cms/main' }]
        },
        {
            label: 'MENU',
            items: [
                { label: 'CMI-Log_API', icon: 'pi pi-fw pi-list', to: '/cms/CMI-Log_API' },
                { label: 'CMI-Log_BusinessValidation', icon: 'pi pi-fw pi-list', to: '/cms/CMI-Log_BusinessValidation' },
                { label: 'CMI-Log_BusinessValidationAddress', icon: 'pi pi-fw pi-list', to: '/cms/CMI-Log_BusinessValidationAddress' },
                { label: 'CMI-Log_BusinessValidationDetail', icon: 'pi pi-fw pi-list', to: '/cms/CMI-Log_BusinessValidationDetail' },
                { label: 'CMI-Master_CarBrandRanking', icon: 'pi pi-fw pi-list', to: '/cms/CMI-Master_CarBrandRanking' },
            ]
        },
        {
            label: 'CUSTOM',
            items: [
                { label: 'Order Report Admin', icon: 'pi pi-fw pi-table', to: '/cms/order-report-admin' },
                { label: 'Order Report NTLAPP', icon: 'pi pi-fw pi-table', to: '/cms/order-report-ntlapp' },
            ]
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;

/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';
import { Menus } from '@/src/shared/utils/profile';
import { clientCookie } from '@/src/shared/utils/clientCookie';

const AppMenu = () => {

    const [menus, setMenus] = useState<AppMenuItem[]>([]);
    const [userName, setUserName] = useState<string>('');

    const getMenus = async (): Promise<any> => {
        const m = await Menus();
        const de = JSON.parse(Buffer.from(m, 'base64').toString('binary'));
        return de;
    };

    useEffect(() => {
        const cc = clientCookie();
        setUserName(cc?.userName ?? 'Guest');

        const getData = async () => {
            const menus = await getMenus();
            setMenus(menus);
        };
        getData();
    }, []);

    return (
        <MenuProvider>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <i className="pi pi-user mr-2" style={{ fontSize: '2.5rem' }}></i><br /><br />
                <strong>{userName}</strong>
            </div>
            <br />

            <ul className="layout-menu">
                {menus.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;

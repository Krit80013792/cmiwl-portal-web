/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';
import { Menus } from '@/src/shared/utils/profile';

const AppMenu = () => {

    const [menus, setMenus] = useState<AppMenuItem[]>([]);

    const getMenus = async (): Promise<any> => {
        const m = await Menus();
        const de = JSON.parse(Buffer.from(m, 'base64').toString('binary'));
        return de;
    };

    useEffect(() => {
        const getData = async () => {
            const menus = await getMenus();
            setMenus(menus);
        };
        getData();
    }, []);

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {menus.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;

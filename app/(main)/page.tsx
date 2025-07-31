/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

import { UserGroupRepository } from '@/src/infrastructure/database/mongodb/repositories/UserGroupRepository';
import { UserGroupService } from '@/src/application/services/UserGroupService';
import { UserGroupDTO } from '@/src/application/dtos/UserGroupDTO';

import { UserRoleRepository } from '@/src/infrastructure/database/mongodb/repositories/UserRoleRepository';
import { UserRoleService } from '@/src/application/services/UserRoleService';
import { UserRoleDTO } from '@/src/application/dtos/UserRoleDTO';

import { UserRepository } from '@/src/infrastructure/database/mongodb/repositories/UserRepository';
import { UserService } from '@/src/application/services/UserService';
import { UserDTO } from '@/src/application/dtos/UserDTO';

import { ResourceRepository } from '@/src/infrastructure/database/mongodb/repositories/ResourceRepository';
import { ResourceService } from '@/src/application/services/ResourceService';
import { ResourceDTO } from '@/src/application/dtos/ResourceDTO';

import { TxActivityLogger } from '@/src/shared/middleware/logging/TxActivityLogger';

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'ต่อ พ.ร.บ. รถยนต์ออนไลน์ (ประกันภาคบังคับ) กับติดล้อ',
        description: 'พ.ร.บ. รถยนต์ ต่อง่าย สะดวก รวดเร็วกับเว็บติดล้อ ประกันภัยภาคบังคับคุ้มครองทั้งคุณและบุคคลภายนอก ต่อพ.ร.บ. ออนไลน์รับกรมธรรม์อิเล็กทรอนิกส์ทันทีที่นี่'
    };
}

export default async function MainPage() {

    // const userGroupService = new UserGroupService(new UserGroupRepository());

    // const userGroups: Partial<UserGroupDTO>[] = [
    //     {
    //         userGroupId: uuidv4(),
    //         userGroupName: 'ADMINISTRATOR',
    //         createdBy: 'System',
    //         updatedBy: 'System',
    //     },
    //     {
    //         userGroupId: uuidv4(),
    //         userGroupName: 'INSAPPSUPPORT',
    //         createdBy: 'System',
    //         updatedBy: 'System',
    //     },
    //     {
    //         userGroupId: uuidv4(),
    //         userGroupName: 'HEYGOODY',
    //         createdBy: 'System',
    //         updatedBy: 'System',
    //     },
    //     {
    //         userGroupId: uuidv4(),
    //         userGroupName: 'NTLAPP',
    //         createdBy: 'System',
    //         updatedBy: 'System',
    //     },
    //     {
    //         userGroupId: uuidv4(),
    //         userGroupName: 'PRAKANTIDLOH',
    //         createdBy: 'System',
    //         updatedBy: 'System',
    //     },
    // ];

    // for (const userGroup of userGroups) {
    //     const result = await userGroupService.createUserGroup(userGroup);
    //     if (result) {
    //         console.log(`Created userGroup: ${userGroup.userGroupId}`);
    //     } else {
    //         console.log(`Failed to create userGroup: ${userGroup.userGroupId}`);
    //     }
    // }

    //#################################################################################################

    // const userRoleService = new UserRoleService(new UserRoleRepository());

    // const userRoles: Partial<UserRoleDTO>[] = [
    //     {
    //         userRoleId: uuidv4(),
    //         userRoleName: 'Administrator',
    //         userRoleDescription: 'NTL IT SEC, ผู้ดูแลระบบ, จัดการผู้ใช้งาน',
    //         userRolePermissions: [
    //             'main:read',
    //             'users:create',
    //             'users:read',
    //             'users:update',
    //             'users:delete',
    //         ],
    //         resources: ['main', 'users'],
    //         createdBy: 'System',
    //         updatedBy: 'System',
    //     }
    // ];

    // for (const role of userRoles) {
    //     const result = await userRoleService.createUserRole(role);
    //     if (result) {
    //         console.log(`Created userRole: ${role.userRoleId}`);
    //     } else {
    //         console.log(`Failed to create userRole: ${role.userRoleId}`);
    //     }
    // }

    //#################################################################################################

    // const userService = new UserService(new UserRepository());

    // const users: Partial<UserDTO>[] = [
    //     {
    //         userId: uuidv4(),
    //         userName: 'administrator',
    //         password: await bcrypt.hash('P@ssw0rdNTL1234', 10),
    //         userGroupId: '10325a4b-dd48-4cdc-b9c4-17f7d0c06676',
    //         userGroupName: 'ADMINISTRATOR',
    //         userRoleId: '7efacb59-5c5a-40ac-9ddd-c64799cd494a',
    //         userRoleName: 'Administrator',
    //         isActive: true,
    //         createdBy: 'System',
    //         updatedBy: 'System',
    //     }
    // ];

    // for (const user of users) {
    //     const result = await userService.createUser(user);
    //     if (result) {
    //         console.log(`Created user: ${user.userId}`);
    //     } else {
    //         console.log(`Failed to create user: ${user.userId}`);
    //     }
    // }

    //#################################################################################################

    // const resourceService = new ResourceService(new ResourceRepository());

    // const resource: Partial<ResourceDTO> =
    // {
    //     resourceId: uuidv4(),
    //     resourceOrder: 2,
    //     resourceName: 'users',
    //     resourcePolicy: 'protected',
    //     resourceDescription: 'ผู้ใช้งาน',
    //     resourceLabel: 'Users',
    //     resourceIcon: 'pi pi-fw pi-users',
    //     resourcePathTo: '/cms/users',
    //     childrenItems: [],
    //     createdBy: 'CF305481',
    //     updatedBy: 'CF305481'
    // };
    // const createdResource = await resourceService.createResource(resource);
    // console.info('Created Resource:', createdResource);

    return (
        <main>

        </main>
    );
}

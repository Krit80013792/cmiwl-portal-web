//* app/(main)/launch/page.tsx
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ITxActivityLog } from '@/src/domain/models/TxActivityLogModel';
import { TxActivityLogger } from '@/src/shared/middleware/logging/TxActivityLogger';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

type Props = {
    searchParams?: {
        ck?: string;
        token?: string;
    };
};

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'ต่อ พ.ร.บ. รถยนต์ออนไลน์ (ประกันภาคบังคับ) กับติดล้อ',
        description: 'พ.ร.บ. รถยนต์ ต่อง่าย สะดวก รวดเร็วกับเว็บติดล้อ ประกันภัยภาคบังคับคุ้มครองทั้งคุณและบุคคลภายนอก ต่อพ.ร.บ. ออนไลน์รับกรมธรรม์อิเล็กทรอนิกส์ทันทีที่นี่'
    };
}

export default async function LaunchPage({ searchParams }: Props) {
    const ck = searchParams?.ck ?? '';
    const token = searchParams?.token ?? '';

    // await TxLogger.log({
    //     id: '',
    //     sUserName: '',
    //     sUserGroupName: '',
    //     sUserRoleName: '',
    //     sRoute: '/launch',
    //     sMethod: 'GET',
    //     sAction: 'launch',
    //     sStatus: 'success',
    //     sRequestMsg: `/launch?ck=${ck}&token=${token}`,
    //     sResponseMsg: '',
    //     sChannel: 'CXM',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    // } as ITxLog);

    if (ck && token) {
        return redirect('/th/intro-channel');
    }

    return (
        <main>
            <p>ck: {ck}</p>
            <p>token: {token}</p>
        </main>
    );
};

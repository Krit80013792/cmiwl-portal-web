/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/src/shared/utils/session';
import { getConfigs } from '@/services/server/actions/configs.action';
import InsurerListComponent from '@/cmi-layout/components/InsurerListComponent';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'ต่อ พ.ร.บ. รถยนต์ออนไลน์ (ประกันภาคบังคับ) กับติดล้อ',
        description: 'พ.ร.บ. รถยนต์ ต่อง่าย สะดวก รวดเร็วกับเว็บติดล้อ ประกันภัยภาคบังคับคุ้มครองทั้งคุณและบุคคลภายนอก ต่อพ.ร.บ. ออนไลน์รับกรมธรรม์อิเล็กทรอนิกส์ทันทีที่นี่'
    };
}

export default async function Insurers() {

    const session = await getIronSession(cookies(), sessionOptions);
    const sessionData = (session as any)?.usrData?.data;
    const channel = sessionData?.prefill?.channel;

    const configs = await getConfigs();
    const channelConfig = configs?.find(c => c.configByChannel === channel?.channelCode);

    return (
        <main>
            <div className="container pt-48">
                <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_Insurers">
                    <div className="pt-4">
                        <h1 className="mb-12 fs-18 text-black"><strong className="f-bd">เลือกบริษัทประกัน</strong></h1>
                    </div>
                </div>
            </div>
            <div className="container pb-20"></div>
            <InsurerListComponent />
        </main>
    );
}

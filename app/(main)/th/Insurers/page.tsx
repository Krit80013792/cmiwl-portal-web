/* eslint-disable @next/next/no-img-element */

import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'ต่อ พ.ร.บ. รถยนต์ออนไลน์ (ประกันภาคบังคับ) กับติดล้อ',
        description: 'พ.ร.บ. รถยนต์ ต่อง่าย สะดวก รวดเร็วกับเว็บติดล้อ ประกันภัยภาคบังคับคุ้มครองทั้งคุณและบุคคลภายนอก ต่อพ.ร.บ. ออนไลน์รับกรมธรรม์อิเล็กทรอนิกส์ทันทีที่นี่'
    };
}

export default async function Insurers() {

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
            <div className="container pb-20">
                <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VIBError$btnHomePage" value="VIB" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VIBError_btnHomePage" className="btn btn-primary fs-6 d-flex justify-content-center align-items-center mx-auto mb-0" />
            </div>
        </main>
    );
}

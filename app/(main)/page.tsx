/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'ต่อ พ.ร.บ. รถยนต์ออนไลน์ (ประกันภาคบังคับ) กับติดล้อ',
        description: 'พ.ร.บ. รถยนต์ ต่อง่าย สะดวก รวดเร็วกับเว็บติดล้อ ประกันภัยภาคบังคับคุ้มครองทั้งคุณและบุคคลภายนอก ต่อพ.ร.บ. ออนไลน์รับกรมธรรม์อิเล็กทรอนิกส์ทันทีที่นี่'
    };
}

export default async function MainPage() {


    return (
        <main>

        </main>
    );
}

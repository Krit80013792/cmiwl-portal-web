/* eslint-disable @next/next/no-img-element */

import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface IntrooProps {
    readonly searchParams: { cus_id?: string };
};

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'ต่อ พ.ร.บ. รถยนต์ออนไลน์ (ประกันภาคบังคับ) กับติดล้อ',
        description: 'พ.ร.บ. รถยนต์ ต่อง่าย สะดวก รวดเร็วกับเว็บติดล้อ ประกันภัยภาคบังคับคุ้มครองทั้งคุณและบุคคลภายนอก ต่อพ.ร.บ. ออนไลน์รับกรมธรรม์อิเล็กทรอนิกส์ทันทีที่นี่'
    };
}

export default async function Introo({ searchParams }: IntrooProps) {

    console.log(searchParams?.cus_id);
    if (searchParams?.cus_id) {
        redirect(`/th/intro-channel`);
    } else {
        redirect('/th/intro-channel');
    }

    return (
        <main>

        </main>
    );
}

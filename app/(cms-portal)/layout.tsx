import { Metadata } from 'next';
import React, { Suspense } from 'react';
import { LayoutProvider } from '../../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../../styles/layout/layout.scss';
//import '../../styles/demo/Demos.scss';
import Layout from '../../layout/layout';

interface RootLayoutProps {
    readonly children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'ระบบเสนอขายประกันออนไลน์อารีเกเตอร์',
    description: 'ระบบเสนอขายประกันออนไลน์ สมัครง่ายภายใน 5 นาที ฟรีไม่มีค่าใช้จ่าย ไม่ต้องมีคนค้ำ พร้อมให้เช็คเบี้ยประกันออนไลน์ตลอด 24 ชม. เพื่อโอกาสทางการขายที่มากขึ้นกว่าเดิม'
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning style={{ fontSize: '12px' }}>
            <head>
                <link id="theme-css" href={`/themes/lara-light-blue/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <Suspense>
                    <PrimeReactProvider>
                        <LayoutProvider>
                            <Layout>{children}</Layout>
                        </LayoutProvider>
                    </PrimeReactProvider>
                </Suspense>
            </body>
        </html>
    );
}

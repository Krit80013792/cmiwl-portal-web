import { Metadata } from 'next'
import React, { Suspense } from 'react'
import { LayoutProvider } from '../../layout/context/layoutcontext'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import '../../styles/layout/layout.scss'
import Layout from '../../layout/layout'

interface RootLayoutProps {
  readonly children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'ต่อ พ.ร.บ. รถยนต์ออนไลน์ (ประกันภาคบังคับ) กับติดล้อ',
  description:
    'พ.ร.บ. รถยนต์ ต่อง่าย สะดวก รวดเร็วกับเว็บติดล้อ ประกันภัยภาคบังคับคุ้มครองทั้งคุณและบุคคลภายนอก ต่อพ.ร.บ. ออนไลน์รับกรมธรรม์อิเล็กทรอนิกส์ทันทีที่นี่',
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning style={{ fontSize: '11px' }}>
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
  )
}

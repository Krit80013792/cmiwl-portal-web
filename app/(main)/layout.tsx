import React from 'react'
import Script from 'next/script'
import { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { LayoutProvider } from '../../cmi-layout/context/layoutcontext'
import { PrimeReactProvider } from 'primereact/api'
import Providers from '@/stores/providers'

interface AppLayoutProps {
  readonly children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'ต่อ พ.ร.บ. รถยนต์ออนไลน์ (ประกันภาคบังคับ) กับติดล้อ',
  description:
    'พ.ร.บ. รถยนต์ ต่อง่าย สะดวก รวดเร็วกับเว็บติดล้อ ประกันภัยภาคบังคับคุ้มครองทั้งคุณและบุคคลภายนอก ต่อพ.ร.บ. ออนไลน์รับกรมธรรม์อิเล็กทรอนิกส์ทันทีที่นี่',
  keywords:
    'พ.ร.บ. รถยนต์ ต่อง่าย สะดวก รวดเร็วกับเว็บติดล้อ ประกันภัยภาคบังคับคุ้มครองทั้งคุณและบุคคลภายนอก ต่อพ.ร.บ. ออนไลน์รับกรมธรรม์อิเล็กทรอนิกส์ทันทีที่นี่',
  robots: 'max-image-preview:large',
  openGraph: {
    title: 'ต่อ พ.ร.บ. รถยนต์ออนไลน์ (ประกันภาคบังคับ) กับติดล้อ',
    description:
      'พ.ร.บ. รถยนต์ ต่อง่าย สะดวก รวดเร็วกับเว็บติดล้อ ประกันภัยภาคบังคับคุ้มครองทั้งคุณและบุคคลภายนอก ต่อพ.ร.บ. ออนไลน์รับกรมธรรม์อิเล็กทรอนิกส์ทันทีที่นี่',
    type: 'website',
    url: 'https://cmiwl.tidlortech.com/',
    images: [
      {
        url: 'https://cmiwl.tidlortech.com/',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ต่อ พ.ร.บ. รถยนต์ออนไลน์ (ประกันภาคบังคับ) กับติดล้อ',
    description:
      'พ.ร.บ. รถยนต์ ต่อง่าย สะดวก รวดเร็วกับเว็บติดล้อ ประกันภัยภาคบังคับคุ้มครองทั้งคุณและบุคคลภายนอก ต่อพ.ร.บ. ออนไลน์รับกรมธรรม์อิเล็กทรอนิกส์ทันทีที่นี่',
    images: [
      {
        url: 'https://cmiwl.tidlortech.com/',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
        <link id="global-css1" href={`/themes/cmi/css/global.css`} rel="stylesheet" />
        <link id="bootstrap-css" href={`/custom/plugin/bootstrap/bootstrap.min.css`} rel="stylesheet" />
        <link id="global-css2" href={`/themes/cmi/css/global.css`} rel="stylesheet" />
        <link id="style-css" href={`/themes/cmi/css/style-default.css`} rel="stylesheet" />
        <link id="custom-css" href={`/themes/cmi/css/custom-select2.css`} rel="stylesheet" />
        <link id="select2-css" href={`/custom/plugin/select2/css/select2.min.css`} rel="stylesheet" />
      </head>
      <body className="LTR Chrome THTH ContentBody">
        <Providers>
          <PrimeReactProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </PrimeReactProvider>
        </Providers>
      </body>
    </html>
  )
}

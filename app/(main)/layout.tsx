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
        {/* <noscript>
                    <iframe title="ggtmg" src="https://www.googletagmanager.com/ns.html?id=GTM-TT3G8FN" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
                </noscript>
                <Script src="/themes/areegator/js/jquery.min.js" strategy="afterInteractive" />
                <Script src="/themes/areegator/js/bootstrap.min.js" strategy="afterInteractive" />
                <Script src="/themes/areegator/js/popper.min.js" strategy="afterInteractive" />
                <Script src="/themes/areegator/js/owl.carousel.min.js" strategy="afterInteractive" />
                <Script src="/themes/areegator/js/owl.min.js" strategy="afterInteractive" />
                <Script src="/themes/areegator/js/scroll.min.js" strategy="afterInteractive" />
                <Script src="/themes/areegator/js/home-video.min.js" strategy="lazyOnload" />
                <Script type="text/javascript" src="https://cdn-apac.onetrust.com/consent/8e007815-2d32-457f-bde3-815f6103a308/OtAutoBlock.js" />
                <Script src="https://cdn-apac.onetrust.com/scripttemplates/otSDKStub.js" data-language="th" type="text/javascript" data-domain-script="8e007815-2d32-457f-bde3-815f6103a308" />
                <GoogleAnalytics gaId="GTM-TT3G8FN" />
                <script
                    defer
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            name: 'areegator',
                            url: 'https://www.areegator.com',
                            logo: 'https://www.areegator.com/images/logo.png'
                        })
                    }}
                /> */}
        {/* <Script src="/custom/plugin/jquery/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/custom/plugin/bootstrap/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/custom/plugin/select2/js/select2.min.js" strategy="afterInteractive" /> */}
      </body>
    </html>
  )
}

import { Metadata } from 'next'
import React from 'react'

interface SimpleLayoutProps {
  readonly children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'ต่อ พ.ร.บ. รถยนต์ออนไลน์ (ประกันภาคบังคับ) กับติดล้อ',
  description:
    'พ.ร.บ. รถยนต์ ต่อง่าย สะดวก รวดเร็วกับเว็บติดล้อ ประกันภัยภาคบังคับคุ้มครองทั้งคุณและบุคคลภายนอก ต่อพ.ร.บ. ออนไลน์รับกรมธรรม์อิเล็กทรอนิกส์ทันทีที่นี่',
}

export default function SimpleLayout({ children }: SimpleLayoutProps) {
  return <React.Fragment>{children}</React.Fragment>
}

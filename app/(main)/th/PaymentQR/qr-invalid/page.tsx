import React from 'react'
import { Metadata } from 'next'
import MainWithDynamicStyle from '@/cmi-layout/components/MainWithDynamicStyle'
import QRInvalid from './QRInvalid'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ไม่สามารถสร้าง QR Code ได้ | ติดล้อ',
    description: 'ไม่สามารถสร้าง QR Code ได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง หรือเปลี่ยนช่องทางการชำระเงิน',
  }
}

export default async function PaymentQRError() {
  const configValue: Record<string, any> = {
    primaryColor: '#045ffc',
    secondaryColor: '#ffffff',
  }

  return (
    <MainWithDynamicStyle primaryColor={configValue.primaryColor} secondaryColor={configValue.secondaryColor}>
      <div className="head-bar">
        <div className="container d-flex align-items-center">
          <a href="/th/PaymentQR" className="back-btn">
            <img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" />
          </a>
          <p className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
        </div>
      </div>
      <QRInvalid />
    </MainWithDynamicStyle>
  )
}


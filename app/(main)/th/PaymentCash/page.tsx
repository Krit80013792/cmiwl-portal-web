import React from 'react'
import { Metadata } from 'next'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'
import MainWithDynamicStyle from '@/cmi-layout/components/MainWithDynamicStyle'
import PaymentCashComponent from './PaymentCashComponent'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ชำระค่าพ.ร.บ.รถยนต์ เงินสด | ติดล้อ',
    description: 'ชำระค่าพ.ร.บ.รถยนต์ ด้วยเงินสด | ติดล้อ',
  }
}

const PaymentCashPage = async () => {
  const { channelData } = await getDataFromSession()
  const configValue: Record<string, any> = JSON.parse(channelData?.channelConfig?.configValue ?? '{}')

  return (
    <MainWithDynamicStyle primaryColor={configValue?.primaryColor} secondaryColor={configValue?.secondaryColor}>
      <div className="head-bar">
        <div className="container d-flex align-items-center">
          <a href="/th/PaymentChannel" className="back-btn">
            <img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" />
          </a>
          <p className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
        </div>
      </div>
      <PaymentCashComponent />
    </MainWithDynamicStyle>
  )
}

export default PaymentCashPage

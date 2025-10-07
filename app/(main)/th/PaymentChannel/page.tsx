import React from 'react'
import { Metadata } from 'next'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'
import MainWithDynamicStyle from '@/cmi-layout/components/MainWithDynamicStyle'
import Payment from './_components/Payment'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'เลือกช่องทางการชำระเงินค่าพ.ร.บ.รถยนต์ | ติดล้อ',
    description: 'เลือกช่องทางการชำระเงินค่าพ.ร.บ.รถยนต์ | ติดล้อ',
  }
}

export default async function PaymentChannel() {
  const { channelData } = await getDataFromSession()
  const configValue: Record<string, any> = JSON.parse(channelData?.channelConfig?.configValue ?? '{}')
  return (
    <MainWithDynamicStyle primaryColor={configValue?.primaryColor} secondaryColor={configValue?.secondaryColor}>
      <div className="head-bar">
        <div className="container d-flex align-items-center">
          <a href="/th/ReviewSummary" className="back-btn">
            <img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" />
          </a>
          <p className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
        </div>
      </div>

      <div className="head-section bg-lightgrey pt-48">
        <div className="container">
          <div className="d-flex py-12 align-items-center">
            <div className="percent-90">
              <div className="progress-2 blue">
                <span className="progress-2-left">
                  <span className="progress-2-bar"></span>
                </span>
                <span className="progress-2-right">
                  <span className="progress-2-bar"></span>
                </span>
                <div className="progress-2-value">
                  90<span>%</span>
                </div>
              </div>
            </div>
            <div className="step-title-wrapper ms-12">
              <p className="mb-0 text-grey fs-14">ขั้นตอนที่ 3/3</p>
              <h1 className="mb-0 text-grey fs-6 f-bd">ชำระเงิน</h1>
            </div>
          </div>
        </div>
      </div>
      <Payment />
    </MainWithDynamicStyle>
  )
}

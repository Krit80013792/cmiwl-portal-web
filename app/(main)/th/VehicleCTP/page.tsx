import React from 'react'
import { Metadata } from 'next'
import MainWithDynamicStyle from '../../../../cmi-layout/components/MainWithDynamicStyle'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'
import OldVehicle from './_components/OldVehicle'
import VehicleType from './_components/VehicleType'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'เลือกประเภทรถยนต์สำหรับซื้อพ.ร.บ. รถยนต์ | ติดล้อ',
    description: 'เลือกประเภทรถยนต์สำหรับซื้อพ.ร.บ. รถยนต์ | ติดล้อ',
  }
}

export default async function VehicleCTP() {
  const { channelData, token, prefill } = await getDataFromSession()
  let configValue: any = {}
  try {
    configValue = JSON.parse(channelData?.channelConfig?.configValue ?? '{}')
  } catch {
    configValue = {}
  }
  const isProductCmiDetailValid = Object.values(prefill?.productCmiDetail || {}).every(
    (value) => value !== null && value !== undefined,
  )
  return (
    <MainWithDynamicStyle primaryColor={configValue?.primaryColor} secondaryColor={configValue?.secondaryColor}>
      <div className="head-bar">
        <div className="container d-flex align-items-center">
          <p className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
        </div>
      </div>

      <div className="container pt-48">
        {isProductCmiDetailValid && (
          <div>
            <div className="pt-4">
              <h1 className="mb-12 fs-18 text-black">
                <strong className="f-bd">เลือกรถของคุณที่ต้องการต่อ พ.ร.บ.</strong>
              </h1>
            </div>
            <OldVehicle prefill={prefill} />
            <div>
              <h2 className="mb-12 fs-18 text-black mb-0">
                <strong className="f-bd">ซื้อ พ.ร.บ. ให้รถคันอื่น</strong>
              </h2>
              <p className="mb-12 text-grey">เลือกประเภทรถที่ต้องการซื้อ พ.ร.บ.</p>
            </div>
          </div>
        )}
        {!isProductCmiDetailValid && (
          <div>
            <div className="pt-4">
              <h1 className="mb-12 fs-18 text-black">
                <strong className="f-bd">เลือกประเภทรถ</strong>
              </h1>
            </div>
          </div>
        )}
        <VehicleType data={{ token: token as string, channelData }} />
      </div>
    </MainWithDynamicStyle>
  )
}

import React from 'react'
import { Metadata } from 'next'
import MainWithDynamicStyle from '@/cmi-layout/components/MainWithDynamicStyle'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'
import Image from 'next/image'
import VehicleCategory from './_components/VehicleCategory'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'เลือกประเภทการใช้งานรถยนต์สำหรับซื้อพ.ร.บ. รถยนต์ | ติดล้อ',
    description: 'เลือกประเภทการใช้งานรถยนต์สำหรับซื้อพ.ร.บ. รถยนต์ | ติดล้อ',
  }
}

const Page = async () => {
  const { channelData, token } = await getDataFromSession()
  const configValue: Record<string, any> = JSON.parse(channelData?.channelConfig?.configValue ?? '{}')

  return (
    <MainWithDynamicStyle primaryColor={configValue?.primaryColor} secondaryColor={configValue?.secondaryColor}>
      <div className="head-bar">
        <div className="container d-flex align-items-center">
          <a href="/th/VehicleCTP" className="back-btn">
            <img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" />
          </a>
          <p
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCategory_lbHeaderBar"
            className="text-center mb-0 w-100 fs-18 f-bd"
          >
            พ.ร.บ.
          </p>
        </div>
      </div>

      <div className="container pt-48">
        <div className="pt-4">
          <h1 className="mb-12 fs-18 text-black">
            <strong id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCategory_lbTextH1" className="f-bd">
              เลือกประเภทการใช้งาน
            </strong>
          </h1>
          <VehicleCategory data={{ token: token as string, channelCode: channelData?.channelCode as string }} />
          <div className="d-flex justify-content-center">
            <Image
              alt="เลือกประเภทการใช้งาน"
              src="/cmisite/media/assets/regist-book-type-group.png"
              width={320}
              height={235}
              priority
              fetchPriority="high"
              loading="eager"
              decoding="async"
              sizes="(max-width: 768px) 90vw, 320px"
              style={{ width: '320px', height: 'auto', maxWidth: '100%' }}
            />
          </div>
        </div>
      </div>
    </MainWithDynamicStyle>
  )
}

export default Page

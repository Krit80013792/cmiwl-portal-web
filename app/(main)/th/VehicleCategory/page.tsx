import React from 'react'
import { Metadata } from 'next'
import './page.scss'
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
  const { channelData } = await getDataFromSession()
  const configValue: Record<string, any> = JSON.parse(channelData?.channelConfig?.configValue ?? '{}')

  return (
    <section id="vehicle-category-page">
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
            <VehicleCategory />
            <div className="d-flex justify-content-center">
              <Image
                alt="เลือกประเภทการใช้งาน"
                src="/assets/vehicle-category/card.svg"
                width={320}
                height={235}
                priority
              />
            </div>
          </div>
        </div>
      </MainWithDynamicStyle>
    </section>
  )
}

export default Page

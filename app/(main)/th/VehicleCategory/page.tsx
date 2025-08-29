import React from 'react'
import { Metadata } from 'next'
import VehicleCategory from '@/app/(main)/th/VehicleCategory/_components/VehicleCategory'
import MainWithDynamicStyle from '@/cmi-layout/components/MainWithDynamicStyle'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'
import { getDataFromServer } from '@/helpers/functions/getDataFromServer'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'เลือกประเภทการใช้งานรถยนต์สำหรับซื้อพ.ร.บ. รถยนต์ | ติดล้อ',
    description: 'เลือกประเภทการใช้งานรถยนต์สำหรับซื้อพ.ร.บ. รถยนต์ | ติดล้อ',
  }
}

const getCompulsoryRates = async ({
  psToken,
  psChannelCode,
  psCarTypeKey,
}: {
  psToken: string
  psChannelCode: string
  psCarTypeKey: string
}) => {
  return await getDataFromServer(`${process.env.TIDLOR_TECH_URI}/api/master-data/v1/compulsory-rate/${psCarTypeKey}`, {
    method: 'GET',
    token: psToken,
    channelCode: psChannelCode,
    cacheKey: `compulsoryRate:${psCarTypeKey}`,
  })
}

const Page = async () => {
  const { channelData, token, vehicleCategory } = await getDataFromSession()
  const configValue: Record<string, any> = JSON.parse(channelData?.channelConfig?.configValue ?? '{}')

  const resData = await getCompulsoryRates({
    psToken: token as string,
    psChannelCode: channelData?.channelCode as string,
    psCarTypeKey: vehicleCategory?.carTypeKey,
  })
  const data = resData.data.data.compulsoryRates ?? []

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
          <VehicleCategory compulsoryRates={data} />
          <div className="d-flex justify-content-center">
            <Image
              alt="เลือกประเภทการใช้งาน"
              src="/cmisite/media/assets/regist-book-type-group.png"
              width="320"
              height="235"
            />
          </div>
        </div>
      </div>
    </MainWithDynamicStyle>
  )
}

export default Page

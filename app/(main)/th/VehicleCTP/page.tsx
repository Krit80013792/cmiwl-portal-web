import React from 'react'
import { Metadata } from 'next'
import VehicleList from './_components/VehicleList'
import MainWithDynamicStyle from '../../../../cmi-layout/components/MainWithDynamicStyle'
import redis from '@/src/shared/utils/redis'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'เลือกประเภทรถยนต์สำหรับซื้อพ.ร.บ. รถยนต์ | ติดล้อ',
    description: 'เลือกประเภทรถยนต์สำหรับซื้อพ.ร.บ. รถยนต์ | ติดล้อ',
  }
}

interface BaseResponse {
  message: string
  data: any
  from: string
}

async function getCompulsoryTypes(psToken: string, psChannelCode: string): Promise<BaseResponse> {
  const cacheKey = `${psChannelCode}:CompulsoryTypes`
  // * Fecth from Redis cache first
  try {
    const cached = await redis.get(cacheKey)
    if (cached) {
      console.info('Cache hit for CompulsoryTypes')

      return {
        message: 'success',
        data: JSON.parse(cached),
        from: 'cache',
      }
    }
  } catch (e) {
    console.warn('Redis unavailable, fallback to API:', e)
  }
  //* If not found in cache, fetch from API
  try {
    const res = await fetch(`${process.env.TIDLOR_TECH_URI}/api/master-data/v1/compulsory-type`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${psToken}`,
      },
    })
    if (res?.status === 200) {
      const resData = await res.json()
      console.info('Fetched CompulsoryTypes from API')
      const data = resData?.data?.compulsoryTypes?.map((item: any) => ({
        ...item,
      }))
      return {
        message: 'success',
        data: data ?? [],
        from: 'db',
      }
    }
    return {
      message: 'failed',
      data: [],
      from: 'db',
    }
  } catch (error) {
    console.warn('API unavailable:', error)
    return {
      message: 'failed',
      data: [],
      from: '',
    }
  }
}

export default async function VehicleCTP() {
  const { channelData, token, prefillData } = await getDataFromSession()
  let configValue: any = {}
  try {
    configValue = JSON.parse(channelData?.channelConfig?.configValue ?? '{}')
  } catch {
    configValue = {}
  }
  const resData = await getCompulsoryTypes(token as string, channelData?.channelCode as string)
  const data = resData.data ?? []
  const isProductCmiDetailValid = Object.values(prefillData?.productCmiDetail || {}).every(
    (value) => value !== null && value !== undefined,
  )
  return (
    <MainWithDynamicStyle primaryColor={configValue?.primaryColor} secondaryColor={configValue?.secondaryColor}>
      <div className="head-bar">
        <div className="container d-flex align-items-center">
          <a href="/th/intro-channel" className="back-btn">
            <img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" />
          </a>
          <p
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_lbHeaderBar"
            className="text-center mb-0 w-100 fs-18 f-bd"
          >
            พ.ร.บ.
          </p>
        </div>
      </div>

      <div className="container pt-48">
        {isProductCmiDetailValid && (
          <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_zoneCusRenew">
            <div className="pt-4">
              <h1 className="mb-12 fs-18 text-black">
                <strong className="f-bd">เลือกรถของคุณที่ต้องการต่อ พ.ร.บ.</strong>
              </h1>
            </div>
            <div className="row car-select mb-4">
              <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_showCarLicense">
                <div className="col-6 pe-2">
                  <div className="pt-10 pb-2 px-12 rounded-4 choice-card text-center h-100 active">
                    <p className="mb-0 text-grey fs-22">
                      <strong className="f-bd">{`${prefillData?.productCmiDetail?.licensePrefix}${prefillData?.productCmiDetail?.licenseNo}`}</strong>
                    </p>
                    <p className="mb-0 text-center text-grey">รถยนต์</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-12 fs-18 text-black mb-0">
                <strong className="f-bd">ซื้อ พ.ร.บ. ให้รถคันอื่น</strong>
              </h2>
              <p className="mb-12 text-grey">เลือกประเภทรถที่ต้องการซื้อ พ.ร.บ.</p>
            </div>
          </div>
        )}
        {!isProductCmiDetailValid && (
          <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_zoneCusNew">
            <div className="pt-4">
              <h1 className="mb-12 fs-18 text-black">
                <strong className="f-bd">เลือกประเภทรถ</strong>
              </h1>
            </div>
          </div>
        )}
        <VehicleList
          poCompulsoryTypes={data?.sort(
            (a: { itemOrder: number }, b: { itemOrder: number }) => (a.itemOrder ?? 0) - (b.itemOrder ?? 0),
          )}
        />
      </div>
    </MainWithDynamicStyle>
  )
}

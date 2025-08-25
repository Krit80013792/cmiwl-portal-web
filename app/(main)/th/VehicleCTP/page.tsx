/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@/src/shared/utils/session'

import VehicleListComponent from '@/cmi-layout/components/VehicleListComponent'
import redis from '@/src/shared/utils/redis'

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
  //* Fecth from Redis cache first
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
    //TODO: Change this to env
    const res = await fetch('https://cmiwl-dev.tidlortech.com/api/master-data/v1/compulsory-type', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${psToken}`,
      },
    })
    if (res?.status === 401) {
      //TODO: redirect
    }
    const resData = await res.json()

    console.info('Fetched CompulsoryTypes from API')

    return {
      message: 'success',
      data: resData?.data ?? [],
      from: 'db',
    }
  } catch (e) {
    console.warn('API unavailable:', e)
    return {
      message: 'failed',
      data: [],
      from: '',
    }
  }
}

export default async function VehicleCTP() {
  const session = await getIronSession(await cookies(), sessionOptions)
  const sessionData = (session as any)?.usrData?.data
  const token = sessionData?.jwt
  const channel = sessionData?.prefill?.channel
  const typeOfData = sessionData?.prefill?.typeOfData
  console.log(typeOfData)
  const resData = await getCompulsoryTypes(token, channel?.channelCode)
  console.log(resData?.data?.compulsoryTypes)

  return (
    <main>
      <div className="head-bar">
        <div className="container d-flex align-items-center">
          {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return backOnclick();" */}
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

      {/* //TODO: Move this to seperate component */}
      {typeOfData && typeOfData === 'new' && (
        <div className="container pt-48">
          <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_zoneCusNew">
            <div className="pt-4">
              <h1 className="mb-12 fs-18 text-black">
                <strong className="f-bd">เลือกประเภทรถ</strong>
              </h1>
            </div>
          </div>
          <VehicleListComponent poCompulsoryTypes={resData?.data?.compulsoryTypes} />

          <input
            type="hidden"
            name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdftype"
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdftype"
            value={resData?.from}
          />
          <input
            type="hidden"
            name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdfSelCarGroupID"
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdfSelCarGroupID"
          />
          <input
            type="hidden"
            name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdfSelCarGroupVal"
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdfSelCarGroupVal"
          />
          <input
            type="hidden"
            name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdfSelCarType"
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdfSelCarType"
            value="0"
          />
          <input
            type="hidden"
            name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdfSelCarName"
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdfSelCarName"
            value="0"
          />
          <input
            type="hidden"
            name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdfSelCarTypeRenew"
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdfSelCarTypeRenew"
            value="0"
          />
          <input
            type="hidden"
            name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdChannelText"
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdChannelText"
            value="CXM"
          />
          {/* <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$btnSelVehicle" value="" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_btnSelVehicle" className="d-none" /> */}
          {/* <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$btnSelRenew" value="" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_btnSelRenew" className="d-none" /> */}
        </div>
      )}

      {/* //TODO: Move this to seperate component */}
      {typeOfData && typeOfData === 'renew' && (
        <div className="container pt-48">
          <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_zoneCusRenew">
            <div className="pt-4">
              <h1 className="mb-12 fs-18 text-black">
                <strong className="f-bd">เลือกรถของคุณที่ต้องการต่อ พ.ร.บ.</strong>
              </h1>
            </div>
            <div className="row car-select mb-4">
              <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_showCarLicense">
                <div className="col-6 pe-2">
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selRenew(this);" */}
                  <div
                    className="pt-10 pb-2 px-12 rounded-4 choice-card text-center h-100 active"
                    data-cartype="ไม่เกิน 40 ที่นั่ง"
                    data-cargroup="4"
                    data-cardisplayname="รถโดยสารมากกว่า 7 ที่นั่ง"
                    data-cf-modified-9c7f6b03e9a69efe3189d580-=""
                  >
                    <p className="mb-0 text-grey fs-22">
                      <strong className="f-bd">6กย 1001</strong>
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

          <VehicleListComponent />

          <input
            type="hidden"
            name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdfSelCarGroupID"
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdfSelCarGroupID"
          />
          <input
            type="hidden"
            name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdfSelCarGroupVal"
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdfSelCarGroupVal"
          />
          <input
            type="hidden"
            name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdfSelCarType"
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdfSelCarType"
            value="0"
          />
          <input
            type="hidden"
            name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdfSelCarName"
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdfSelCarName"
            value="0"
          />

          <input
            type="hidden"
            name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdfSelCarTypeRenew"
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdfSelCarTypeRenew"
            value="0"
          />

          <input
            type="hidden"
            name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdChannelText"
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdChannelText"
            value="CXM"
          />

          <input
            type="submit"
            name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$btnSelVehicle"
            value=""
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_btnSelVehicle"
            className="d-none"
          />
          <input
            type="submit"
            name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$btnSelRenew"
            value=""
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_btnSelRenew"
            className="d-none"
          />
        </div>
      )}

      {/* <script type="2d7b21b358a016e2ff53c284-text/javascript">
    const selVehicle = (element) => {
                    let carGroup = element.getAttribute('data-cargroup');
                let carGroupVal = element.getAttribute('data-cargroupval');
                let carType = element.getAttribute('data-cartype');
                let carDisplayName = element.getAttribute('data-carDisplayName');
                if (document.querySelector("[id*=showVehicle] .choice-card.active")) {document.querySelector("[id*=showVehicle] .choice-card.active").classList.remove("active"); }
                element.classList.add('active');
                document.querySelector("[id*=hdfSelCarGroupID]").value = carGroup;
                document.querySelector("[id*=hdfSelCarGroupVal]").value = carGroupVal;
                document.querySelector("[id*=hdfSelCarType]").value = carType;
                document.querySelector("[id*=hdfSelCarName]").value = carDisplayName;
                new bootstrap.Modal(document.getElementById('ModalLoading')).show();
                document.querySelector("[id*=btnSelVehicle]").click();
                PushGTMDefault('vehicle_category', 'click_vehicle', carDisplayName);
    }

                function activeVehicle(val) {
        if (document.querySelector("[id*=showVehicle] .choice-card[data-cargroup='" + val + "']")) {
                    document.querySelector("[id*=showVehicle] .choice-card[data-cargroup='" + val + "']").classList.add('active');
        }
    }
    const selRenew = (element) => {
                    // document.querySelector("[id*=hdfSelCarGroupID]").value = carGroup;
                    // document.querySelector("[id*=hdfSelCarGroupVal]").value = carGroupVal;
                    // document.querySelector("[id*=hdfSelCarType]").value = carType;
                    // document.querySelector("[id*=hdfSelCarName]").value = carDisplayName;

                    let carGroup = element.getAttribute('data-cargroup');
                let carType = element.getAttribute('data-cartype');
                let carDisplayName = element.getAttribute('data-carDisplayName');
                document.querySelector("[id*=hdfSelCarGroupID]").value = carGroup;
                document.querySelector("[id*=hdfSelCarTypeRenew]").value = carType;
                document.querySelector("[id*=hdfSelCarName]").value = carDisplayName;

                document.querySelector("[id*=hdfSelCarName]").value = 'รถยนต์';
                document.querySelector("[id*=btnSelRenew]").click();
                PushGTMDefault('vehicle_category', 'click_vehicle', 'รถยนต์');
    }

                function backOnclick()
                {
                    PushGTMEventClickBack();
                new bootstrap.Modal(document.getElementById('ModalLoading')).show();
    }

            </script> */}
    </main>
  )
}

/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { Metadata } from 'next'
import MainWithDynamicStyle from '@/cmi-layout/components/MainWithDynamicStyle'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'
// import { getDataFromServer } from '@/helpers/functions/getDataFromServer'
import CarInformationForm from './_forms/CarInformationForm'
// import { getCarColors } from './_actions'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ข้อมูลรถยนต์สำหรับซื้อพ.ร.บ. รถยนต์ | ติดล้อ',
    description: 'ข้อมูลรถยนต์สำหรับซื้อพ.ร.บ. รถยนต์ | ติดล้อ',
  }
}

const Page = async () => {
  const { channelData, token, vehicleCategory } = await getDataFromSession()
  const configValue: Record<string, any> = JSON.parse(channelData?.channelConfig?.configValue ?? '{}')

  return (
    <MainWithDynamicStyle primaryColor={configValue?.primaryColor} secondaryColor={configValue?.secondaryColor}>
      <div className="head-bar">
        <div className="container d-flex align-items-center">
          <a href="/th/VehicleCTP" className="back-btn">
            <img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" />
          </a>
          <p
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_lbHeaderBar"
            className="text-center mb-0 w-100 fs-18 f-bd"
          >
            พ.ร.บ.
          </p>
        </div>
      </div>
      <div className="head-section bg-lightgrey pt-48">
        <div className="container">
          <div className="d-flex py-12 align-items-center">
            <div className="percent-30">
              <div className="progress-2 yellow">
                <span className="progress-2-left">
                  <span className="progress-2-bar" />
                </span>
                <span className="progress-2-right">
                  <span className="progress-2-bar" />
                </span>
                <div className="progress-2-value">
                  30<span>%</span>
                </div>
              </div>
            </div>
            <div className="step-title-wrapper ms-12">
              <p className="mb-0 text-grey fs-14">ขั้นตอนที่ 1/3</p>
              <h1 className="mb-0 text-grey fs-6 f-bd">กรอกข้อมูล</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="content-section fullPage-150">
        <div className="container">
          <div className="d-flex justify-content-between pt-3 pb-12">
            <h2 className="mb-0 text-black fs-18">
              <strong>บอกข้อมูลรถของคุณกับเราหน่อย</strong>
            </h2>
          </div>
          <CarInformationForm data={{ token, vehicleCategory }} />
        </div>
      </div>
      <div className="container">
        <a
          href="/th/CustomerInformation"
          id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_btnSubmit"
          className="btn btn-primary fs-6 d-flex justify-content-center align-items-center mx-auto mb-4 f-bd"
          data-cf-modified-903f39338c6b3be20c53ec4e-=""
        >
          ดำเนินการต่อ
        </a>
      </div>
      <div
        className="modal hint-modal fade"
        id="vidHelperModal"
        aria-labelledby="exampleModalLongTitle"
        style={{ display: 'none' }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title f-bd fs-18" id="exampleModalLongTitle">
                หมายเลขตัวถังดูได้จากที่ไหนบ้าง
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ maxHeight: '314px' }}>
              <nav>
                <div className="nav nav-tabs border-0" id="nav-tab" role="tablist">
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; PushGTMDefault('car_info', 'click_hint', 'เล่มทะเบียน');PushGTMDefault('car_info', 'display', 'เล่มทะเบียน');" */}
                  <button
                    className="nav-link f-bd active"
                    id="nav-bookNumber-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-bookNumber"
                    type="button"
                    role="tab"
                    aria-controls="nav-bookNumber"
                    aria-selected="false"
                    data-cf-modified-903f39338c6b3be20c53ec4e-=""
                  >
                    เล่มทะเบียน
                  </button>
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; PushGTMDefault('car_info', 'click_hint', 'ป้ายภาษี');PushGTMDefault('car_info', 'display', 'ป้ายภาษี');" */}
                  <button
                    className="nav-link f-bd"
                    id="nav-ctp-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-ctp"
                    type="button"
                    role="tab"
                    aria-controls="nav-ctp"
                    aria-selected="true"
                    data-cf-modified-903f39338c6b3be20c53ec4e-=""
                  >
                    ป้ายภาษี
                  </button>
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; PushGTMDefault('car_info', 'click_hint', 'ตัวรถ');PushGTMDefault('car_info', 'display', 'ตัวรถ');" */}
                  <button
                    className="nav-link f-bd me-0"
                    id="nav-ctpNumber-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-ctpNumber"
                    type="button"
                    role="tab"
                    aria-controls="nav-ctpNumber"
                    aria-selected="false"
                    data-cf-modified-903f39338c6b3be20c53ec4e-=""
                  >
                    ตัวรถ
                  </button>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-bookNumber"
                  role="tabpanel"
                  aria-labelledby="nav-bookNumber-tab"
                >
                  <img
                    className="img-fluid d-block my-3 mx-auto"
                    alt="เล่มทะเบียน"
                    width="280"
                    height="226"
                    src="/assets/object/hint-book-number.png"
                  />
                </div>
                <div className="tab-pane fade" id="nav-ctp" role="tabpanel" aria-labelledby="nav-ctp-tab">
                  <img
                    className="img-fluid d-block my-3 mx-auto"
                    alt="ป้ายภาษี"
                    width="300"
                    height="226"
                    src="/assets/object/hint-ctp.png"
                  />
                </div>
                <div className="tab-pane fade" id="nav-ctpNumber" role="tabpanel" aria-labelledby="nav-ctpNumber-tab">
                  <img
                    className="img-fluid d-block my-3 mx-auto"
                    alt="ตัวรถ"
                    width="280"
                    height="226"
                    src="/assets/object/hint-ctp-number.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade modalSpinner"
        id="ModalLoading"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-transparent border-0 justify-content-center align-items-center mx-auto">
            <div className="spinner-border text-light"></div>
            <p className="text-white text-center mt-3 mb-0">
              กำลังดำเนินการ
              <br />
              กรุณารอซักครู่
            </p>
          </div>
        </div>
      </div>
    </MainWithDynamicStyle>
  )
}

export default Page

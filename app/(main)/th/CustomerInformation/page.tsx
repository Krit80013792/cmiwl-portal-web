import React from 'react'
import { Metadata } from 'next'
import MainWithDynamicStyle from '@/cmi-layout/components/MainWithDynamicStyle'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'
import CustomerInformationForm from './_forms/CustomerInformationForm'
import './page.scss'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ข้อมูลผู้เอาประกันพ.ร.บ.รถยนต์ | ติดล้อ',
    description: 'ข้อมูลผู้เอาประกันพ.ร.บ.รถยนต์ | ติดล้อ',
  }
}

const Page = async () => {
  const { channelData } = await getDataFromSession()
  const configValue: Record<string, any> = JSON.parse(channelData?.channelConfig?.configValue ?? '{}')

  return (
    <section id="customer-information">
      <MainWithDynamicStyle primaryColor={configValue?.primaryColor} secondaryColor={configValue?.secondaryColor}>
        <div className="head-bar">
          <div className="container d-flex align-items-center">
            <a href="/th/CarInformation" className="back-btn">
              <img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" />
            </a>
            <p className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
          </div>
        </div>

        <div className="head-section bg-lightgrey pt-48">
          <div className="container">
            <div className="d-flex py-12 align-items-center">
              <div className="percent-50">
                <div className="progress-2 yellow">
                  <span className="progress-2-left">
                    <span className="progress-2-bar"></span>
                  </span>
                  <span className="progress-2-right">
                    <span className="progress-2-bar"></span>
                  </span>
                  <div className="progress-2-value">
                    50<span>%</span>
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

        <CustomerInformationForm />

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
    </section>
  )
}

export default Page

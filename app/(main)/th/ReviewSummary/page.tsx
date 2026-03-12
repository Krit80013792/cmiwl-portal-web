import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import './page.scss'
import EditReview from './_components/EditReview'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'
import MainWithDynamicStyle from '@/cmi-layout/components/MainWithDynamicStyle'
import Review from './_components/Review/Review'
import Footer from './_components/Footer'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'สรุปรายละเอียดคำสั่งซื้อพ.ร.บ.รถยนต์ออนไลน์ | ติดล้อ',
    description: 'สรุปรายละเอียดคำสั่งซื้อพ.ร.บ.รถยนต์ออนไลน์ | ติดล้อ',
  }
}

export default async function ReviewSummary() {
  const { channelData } = await getDataFromSession()
  const configValue: Record<string, any> = JSON.parse(channelData?.channelConfig?.configValue ?? '{}')
  return (
    <section id='review-summary-page'>
      <MainWithDynamicStyle primaryColor={configValue?.primaryColor} secondaryColor={configValue?.secondaryColor}>
        <meta name="format-detection" content="telephone=no" />
        <div className="head-bar">
          <div className="container d-flex align-items-center">
            <a href="/th/CustomerInformation" className="back-btn">
              <img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" />
            </a>
            <p className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
          </div>
        </div>

        <div className="head-section bg-lightgrey pt-48">
          <div className="container">
            <div className="d-flex py-12 align-items-center">
              <div className="percent-80">
                <div className="progress-2 blue">
                  <span className="progress-2-left">
                    <span className="progress-2-bar"></span>
                  </span>
                  <span className="progress-2-right">
                    <span className="progress-2-bar"></span>
                  </span>
                  <div className="progress-2-value">
                    80<span>%</span>
                  </div>
                </div>
              </div>
              <div className="step-title-wrapper ms-12">
                <p className="mb-0 text-grey fs-14">ขั้นตอนที่ 2/3</p>
                <h1 className="mb-0 text-grey fs-6 f-bd">สรุปรายการ</h1>
              </div>
            </div>
          </div>
        </div>

        <div className='review-summary-container' style={{ marginTop: '32px' }}>
          <div className="content-section fullPage-100 review-summary-content">
            <div className="container">
              <div>
                <div className="d-flex justify-content-between mb-12">
                  <h2 className="mb-0 text-black fs-18">
                    <strong>สรุปรายการ</strong>
                  </h2>
                </div>
              </div>
              <div className="bg-beige rounded-4 my-3 px-12 py-12" style={{ border: '1px solid #FDCB12' }}>
                <Image
                  className="img-fluid me-2"
                  alt="กรุณาตรวจสอบข้อมูล"
                  width="24"
                  height="24"
                  src="/assets/icon/alert-circle-solid.svg"
                />
                <span className="f-bd" style={{ color: '#723E11' }}>กรุณาตรวจสอบข้อมูลก่อนชำระเงิน</span>
              </div>
              <div className="type-of-ctp">
                <div className="d-flex justify-content-between mb-12">
                  <h2 className="mb-0 text-black fs-18">
                    <strong>ประเภท พ.ร.บ.</strong>
                  </h2>
                  <EditReview psAction="vehicle_category" />
                </div>

                <Review reviewType="vehicle_category" />
              </div>

              <div className="car-info">
                <div className="d-flex justify-content-between mb-12">
                  <h2 className="mb-0 text-black fs-18">
                    <strong>รถยนต์เอาประกัน</strong>
                  </h2>
                  <EditReview psAction="car_info" />
                </div>
                <Review reviewType="car_info" />
              </div>

              <div className="coverage-date">
                <div className="d-flex justify-content-between mb-12">
                  <h2 className="mb-0 text-black fs-18">
                    <strong>ระยะเวลาความคุ้มครอง</strong>
                  </h2>
                  <EditReview psAction="coverage_date" />
                </div>
                <Review reviewType="coverage_date" />
              </div>

              <div className="customer-info">
                <div className="d-flex justify-content-between mb-12">
                  <h2 className="mb-0 text-black fs-18">
                    <strong>
                      ผู้เอาประกันภัย
                      <br className="d-block d-sm-none" />
                      และการจัดส่งกรมธรรม์
                    </strong>
                  </h2>
                  <EditReview psAction="customer_info" />
                </div>
                <Review reviewType="customer_info" />
              </div>
            </div>
          </div>

          <div className='review-summary-footer'>
            <Footer />
          </div>
        </div>

        <div
          className="modal confirm-modal fade"
          aria-labelledby="CtpPaymentErrorModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered mx-4 mx-sm-auto">
            <div className="modal-content rounded-4">
              <div className="modal-body pt-20 px-20 pb-20 text-center">
                <img
                  className="img-fluid mb-2 mx-auto"
                  alt="ไม่สามารถทำรายการได้ในขณะนี้"
                  width="80"
                  height="80"
                  src="/assets/icon/icon-error.png"
                />
                <h5 className="text-black text-center fs-18 f-bd mb-2 text-payment-error">
                  ไม่สามารถทำรายการได้ในขณะนี้
                </h5>
                <p className="text-black mb-20">กรุณาลองใหม่อีกครั้ง</p>
                <button
                  className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center me-2 closePopup-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <strong className="f-bd text-payment-error-btn">ปิด</strong>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal confirm-modal fade"
          aria-labelledby="CtpError3TimesModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered mx-4 mx-sm-auto">
            <div className="modal-content rounded-4">
              <div className="modal-body pt-20 px-20 pb-20 text-center">
                <img
                  className="img-fluid mb-2 mx-auto"
                  alt="ไม่สามารถทำรายการได้ในขณะนี้"
                  width="80"
                  height="80"
                  src="/assets/icon/icon-error.png"
                />
                <h5 className="text-black text-center fs-18 f-bd mb-2 text-payment-3Terror">
                  ขออภัย
                  <br className="d-block d-sm-none" />
                  ไม่สามารถทำรายการได้ในขณะนี้
                </h5>
                <p className="text-black mb-20">
                  กรุณาทำรายการใหม่ภายหลัง
                  <br className="d-block d-sm-none" />
                  หรือติดต่อเจ้าหน้าที่หากพบปัญหาการใช้งาน <br />
                  <span className="d-inline-block">
                    (เลขที่อ้างอิง: <span className="order-no">-</span>)
                  </span>
                </p>

                <div className="d-flex">
                  <input
                    type="submit"
                    name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$ReviewSummary$btnBackMain"
                    value="กลับหน้าหลัก"
                    className="btn btn-secondary w-100 fs-6 d-flex justify-content-center align-items-center me-2 backtoMain-btn"
                  />
                  <a
                    className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center ms-2 call-btn"
                    href="tel:1501"
                  >
                    <strong className="f-bd text-payment-3Terror-call">โทร</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal confirm-modal fade"
          aria-labelledby="serviceErrorModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered mx-4 mx-sm-auto">
            <div className="modal-content rounded-4">
              <div className="modal-body pt-20 px-20 pb-20 text-center">
                <img
                  className="img-fluid mb-2 mx-auto"
                  alt="ไม่สำเร็จ"
                  width="80"
                  height="80"
                  src="/assets/icon/icon-error.svg"
                />
                <h5 className="text-black fs-18 f-bd mb-2 text-service-error">
                  ขออภัย
                  <br />
                  ไม่สามารถทำรายการได้ในขณะนี้
                </h5>
                <p className="text-lightgrey text-center mb-20">กรุณาทำรายการใหม่ภายหลัง</p>
                <div>
                  <a
                    className="btn btn-primary w-100 fs-6 d-flex align-items-center justify-content-center me-2 me-2"
                    href="https://app.tidlor.com/main"
                    data-cf-modified-0e017922931d765566c39c08-=""
                  >
                    <strong className="f-bd text-service-error-btn">กลับหน้าหลัก</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </MainWithDynamicStyle>
    </section>
  )
}

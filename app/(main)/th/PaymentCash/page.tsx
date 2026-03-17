import React from 'react'
import { Metadata } from 'next'
import MainWithDynamicStyle from '@/cmi-layout/components/MainWithDynamicStyle'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ชำระค่าพ.ร.บ.รถยนต์ เงินสด | ติดล้อ',
    description: 'ชำระค่าพ.ร.บ.รถยนต์ ด้วยเงินสด | ติดล้อ',
  }
}

// NOTE: Hard-coded style config & mock content for now.
// If this page should use real channel config from session (like PaymentChannel),
// wire it up via `getDataFromSession` later.
const PaymentCashPage = async () => {

  return (
    <section id="payment-cash-page">
      <div className="head-bar">
        <div className="container d-flex align-items-center">
          <a href="/th/PaymentChannel" className="back-btn">
            <img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" />
          </a>
          <p className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
        </div>
      </div>

      {/* TODO: Replace mock UI with real payment cash layout.
            Current layout is a simplified, static version based on the provided screenshot.
            All numbers and labels are hard-coded just to unblock navigation from /th/PaymentChannel.
        */}
      <div className="content-section bg-lightgrey" style={{ minHeight: '100vh' }}>
        <div
          className="py-24"
          style={{ paddingTop: '32px', maxWidth: 384, margin: '0 auto' }}
        >
          <h2
            className="mb-3"
            style={{ fontWeight: 700, fontSize: '20px', color: '#1E1E1F' }}
          >
            ชำระเงิน
          </h2>

          <div
            className="rounded-4"
            style={{
              backgroundColor: '#EFF5FF',
              border: '16px solid #EFF5FF',
              padding: '16px',
              marginBottom: '16px'
            }}
          >
            <p
              className="mb-1"
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: '#414243'
              }}
            >
              พ.ร.บ. รถโดยสารไม่เกิน 7 ที่นั่ง
            </p>
            <div style={{ display: 'flex', columnGap: '16px', alignItems: 'center', marginBottom: '4px', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 16, color: '#414243' }}>เลขทะเบียน</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#414243' }}>2ขข2222</span>
            </div>
            <hr className="my-3" style={{ borderColor: '#DDDDDF' }} />
            <div className="d-flex justify-content-between align-items-center">
              <span style={{ fontSize: 16, color: '#414243' }}>ยอดที่ต้องชำระ</span>
              <div>
                <span className="f-bd" style={{ color: '#2652EA', fontSize: 24 }}>645.21</span>
                <span className="f-bd" style={{ color: '#2652EA', fontSize: 16, marginLeft: 4 }}>บาท</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p
              className="mb-2 f-bd"
              style={{ fontSize: 16, color: '#1E1E1F' }}
            >
              จำนวนเงินที่รับชำระ
            </p>
            <div
              className="rounded-4 px-3 d-flex align-items-center justify-content-end"
              style={{
                border: '1px solid #D7D7DB',
                height: 53,
                backgroundColor: '#ffffff',
              }}
            >
              <span style={{ fontSize: 32, color: '#1E1E1F', fontWeight: 700 }}>700</span>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <span style={{ fontSize: 16, color: '#414243' }}>เงินทอน</span>
              <div>
                <span style={{ fontSize: 24, fontWeight: 700, color: '#1E1E1F' }}>54.79</span>
                <span style={{ fontSize: 12, color: '#414243', marginLeft: 4 }}>บาท</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn mb-3 fs-6 f-bd"
              style={{
                width: 'fit-content',
                padding: '8px 24px',
                height: 48,
                borderRadius: 12,
                backgroundColor: '#E4EEFF',
                color: '#045ffc',
                border: 'none',
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 600, color: '#3F74F5' }}>ชำระพอดี</span>
            </button>
          </div>

          <button
            type="button"
            className="btn w-100 fs-6 f-bd"
            style={{
              height: 48,
              borderRadius: 12,
              backgroundColor: '#3F74F5',
              color: '#ffffff',
              border: 'none',
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            ยืนยันการชำระเงิน
          </button>
        </div>
      </div>
    </section>
  )
}

export default PaymentCashPage


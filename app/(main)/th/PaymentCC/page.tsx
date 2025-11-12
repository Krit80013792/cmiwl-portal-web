'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from 'primereact/button'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { paymentSlice } from '@/stores/redux/slices/paymentSlice'
import { getPaymentStatus } from './_actions'

const Page = () => {
  const route = useRouter()
  const dispatch = useDispatch()
  const prefill = useSelector((state: any) => state.prefillData)
  const payment = useSelector((state: any) => state.payment)
  const [data, setData] = useState<any>({})

  useEffect(() => {
    setData({ ...prefill, ...payment })
  }, [payment, prefill])

  const handleCheckPaymentStatus = useCallback(async () => {
    try {
      const res = await getPaymentStatus({ paymentNo: data.paymentNo })
      const paymentData = res?.data?.data
      if (paymentData?.paymentMessage === 'Paid') {
        dispatch(
          paymentSlice.actions.setPayment({
            paymentNo: data.paymentNo,
            paymentStatus: 'success',
          }),
        )
      } else if (paymentData?.paymentMessage === 'Failed') {
        dispatch(
          paymentSlice.actions.setPayment({
            paymentNo: data.paymentNo,
            paymentStatus: 'failed',
          }),
        )
      }
    } catch (error) {
      console.error('Error checking payment status:', error)
    }
  }, [data.paymentNo, dispatch])

  useEffect(() => {
    if (data.paymentStatus === 'processing') {
      const interval = setInterval(() => {
        handleCheckPaymentStatus()
      }, 5000)

      const timeout = setTimeout(
        () => {
          clearInterval(interval)
        },
        30 * 60 * 1000,
      )

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [data.paymentStatus, handleCheckPaymentStatus])

  return (
    <div className="content-section fullPage-116 pt-48">
      <div className="container text-center py-48">
        {data.paymentStatus === 'success' && (
          <div>
            <div className="content-section fullPage-92 pt-48">
              <div className="container text-center my-4">
                {/* Success Icon */}
                <div className="d-flex justify-content-center mb-4">
                  <Image alt="Success" width="80" height="80" src="/assets/icon/icon-success.png" />
                </div>

                {/* Success Message */}
                <h1 className="f-bd mb-4" style={{ color: '#4CAF50', fontSize: '24px' }}>
                  ขอบคุณที่ซื้อประกันกับเรา
                </h1>

                {/* Email Confirmation Box */}
                <div className="bg-lightgrey rounded-4 p-4 mb-3 mx-auto" style={{ maxWidth: '500px' }}>
                  <p className="text-grey mb-2 fs-14">
                    {`บริษัท วิริยะประกันภัย จำกัด (มหาชน) จะจัดส่งเอกสารกรมธรรม์ และรายละเอียดอื่นๆ ให้คุณทาง ${
                      [data?.deliveryType?.isEmail && 'อีเมล', data?.deliveryType?.isSms && 'SMS']
                        .filter(Boolean)
                        .join(', ') || '-'
                    }`}
                  </p>
                  <p className="f-bd mb-2" style={{ fontSize: '18px', color: '#333' }}>
                    {[
                      data?.deliveryType?.isEmail && `${data?.deliveryType?.policyEmail}`,
                      data?.deliveryType?.isSms && `${data?.deliveryType?.policySms}`,
                    ]
                      .filter(Boolean)
                      .join(', ') || '-'}
                  </p>
                  <p className="text-grey mb-0 fs-14">
                    ภายใน 15 นาที หากไม่พบเอกสาร
                    <br />
                    สามารถตรวจสอบได้ใน Junk Email
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div
              className="btn-footer-wraper py-3 px-3 bg-white"
              style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            >
              <div className="container">
                <Button
                  type="button"
                  outlined
                  className="btn btn-outline-primary fs-6 w-100 mb-2 d-flex text-center align-items-center justify-content-center"
                  style={{ padding: '12px' }}
                  // TODO: Update link to user's products page
                  onClick={() => route.replace('https://app.tidlor.com/main')}
                >
                  ดูผลิตภัณฑ์ของฉัน
                </Button>
                <Button
                  type="button"
                  className="btn btn-primary fs-6 w-100 d-flex text-center align-items-center justify-content-center"
                  style={{ padding: '12px' }}
                  onClick={() => route.replace('https://app.tidlor.com/main')}
                >
                  กลับหน้าหลัก
                </Button>
              </div>
            </div>
          </div>
        )}
        {data.paymentStatus === 'failed' && (
          <div>
            <div className="content-section fullPage-92 pt-48">
              <div className="container text-center my-4">
                {/* Error Icon */}
                <div className="d-flex justify-content-center mb-4">
                  <Image alt="Error" width="80" height="80" src="/assets/icon/icon-error.png" />
                </div>

                {/* Error Message */}
                <h1 className="f-bd mb-4" style={{ color: '#F44336', fontSize: '24px' }}>
                  ชำระเงินไม่สำเร็จ
                </h1>
                <div>
                  <h5 className="f-md text-grey">กรุณาลองใหม่อีกครั้ง</h5>
                  <h5 className="f-md text-grey">หรือเลือกช่องทางการชำระเงินอื่น</h5>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div
              className="btn-footer-wraper py-3 px-3 bg-white"
              style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            >
              <div className="container">
                <Button
                  type="button"
                  outlined
                  className="btn btn-outline-primary fs-6 w-100 mb-2 d-flex text-center align-items-center justify-content-center"
                  style={{ padding: '12px' }}
                  onClick={() => route.push('/th/PaymentChannel')}
                >
                  เลือกช่องทางอื่น
                </Button>
                <Button
                  type="button"
                  className="btn btn-primary fs-6 w-100 d-flex text-center align-items-center justify-content-center"
                  style={{ padding: '12px' }}
                  onClick={() => {
                    dispatch(paymentSlice.actions.setPayment({ paymentNo: null, paymentStatus: 'idle' }))
                    route.push('/th/PaymentCredit')
                  }}
                >
                  ลองอีกครั้ง
                </Button>
              </div>
            </div>
          </div>
        )}
        {data.paymentStatus === 'processing' && (
          <div>
            <div className="content-section fullPage-92 pt-48">
              <div className="container text-center my-4">
                {/* Processing Message */}
                <h1 className="f-bd mb-4" style={{ color: '#FF9800', fontSize: '24px' }}>
                  กำลังดำเนินการชำระเงิน
                </h1>
                <div>
                  <h5 className="f-md text-grey">กรุณารอสักครู่...</h5>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page

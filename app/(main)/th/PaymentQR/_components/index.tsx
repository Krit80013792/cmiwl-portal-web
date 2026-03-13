'use client'

import useLoading from '@/helpers/hooks/useLoading'
import Image from 'next/image'
import { Button } from 'primereact/button'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPaymentQrCode, getPaymentQrStatus } from '../_actions'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import Modal from '@/cmi-layout/components/Modal'
import { useModal } from '@/helpers/hooks/useModal'
import { useRouter } from 'next/navigation'
import { paymentSlice } from '@/stores/redux/slices/paymentSlice'
dayjs.locale('th')

const PaymentQRComponents = () => {
  const dispatch = useDispatch()
  const route = useRouter()
  const { modal, closeModal, openModal } = useModal()
  const { openLoading, closeLoading } = useLoading()
  const prefillData = useSelector((state: any) => state.prefillData)
  const paymentData = useSelector((state: any) => state.payment)
  const [data, setData] = useState<any>({})
  const [qrData, setQrData] = useState<any>({})
  const [isToastVisible, setIsToastVisible] = useState(false)
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setData({ ...prefillData, ...paymentData })
  }, [prefillData, paymentData])

  const showSuccessToast = useCallback(() => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
    }
    setIsToastVisible(true)
    toastTimeoutRef.current = setTimeout(() => {
      setIsToastVisible(false)
    }, 3000)
  }, [])

  useEffect(
    () => () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
      }
    },
    [],
  )

  const fetchPayment = useCallback(async () => {
    try {
      openLoading()
      if (!data?.channel?.channelOrderID) return
      const res = await getPaymentQrCode({ channelOrderID: data?.channel?.channelOrderID })
      const qrData = res?.data?.data
      const qrExpiryDate = dayjs(qrData?.qrExpiryDate)
        .add(543, 'year')
        .subtract(7, 'hour')
        .format('DD MMM YYYY - HH:mm น.')
      if (res?.data) {
        dispatch(
          paymentSlice.actions.setPayment({
            paymentNo: qrData?.paymentNo,
            paymentStatus: 'idle',
          }),
        )
        setQrData({ ...qrData, qrExpiryDate })

        const now = dayjs()
        const isAfterElevenThirty = now.hour() > 23 || (now.hour() === 23 && now.minute() >= 30)
        // todo: check this to true to test modal 
        if (isAfterElevenThirty) {
          openModal({
            hasImg: false,
            type: 'info',
            title: '',
            content: (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 24,
                  paddingRight: 24,
                  fontWeight: 700,
                  fontSize: '18px',
                  color: '#1E1E1F',
                  gap: 16,
                }}
              >
                <Image src="/assets/icon/guard.svg" alt="guard" width={54} height={54} />
                <div>
                  <span>วันเริ่มต้นความคุ้มครองจะปรับเป็น</span>
                  <span>วันถัดไป หลังชำระเงินสำเร็จ</span>
                </div>
              </div>
            ),
          })
        }
      } else {
        //todo : after finish qr layout-> uncomment this to handle error case
        // route.push('/th/PaymentQR/qr-error')
      }
    } catch (error) {
      console.error('Error fetching payment types:', error)
    } finally {
      closeLoading()
    }
  }, [openLoading, closeLoading, data?.channel?.channelOrderID])

  useEffect(() => {
    fetchPayment()
  }, [fetchPayment])

  const handleCheckPaymentStatus = useCallback(async () => {
    try {
      const res = await getPaymentQrStatus({ paymentNo: qrData?.paymentNo })
      const data = res?.data?.data
      dispatch(
        paymentSlice.actions.setPayment({
          paymentNo: qrData?.paymentNo,
          paymentStatus: data?.isPaymentSuccess ? 'success' : 'idle',
        }),
      )
      if (data?.isPaymentSuccess) {
        dispatch(paymentSlice.actions.setPayment({ paymentNo: qrData?.paymentNo, paymentStatus: 'success' }))
      } else {
        dispatch(paymentSlice.actions.setPayment({ paymentNo: qrData?.paymentNo, paymentStatus: 'idle' }))
      }

      //todo: uncomment this for qr code already invalid
      // route.push('/th/PaymentQR/qr-invalid')


    } catch (error) {
      console.error('Error checking payment status:', error)
    }
  }, [qrData?.paymentNo, dispatch])

  useEffect(() => {
    if (data.paymentStatus === 'idle' && qrData?.paymentNo) {
      const interval = setInterval(() => {
        handleCheckPaymentStatus()
      }, 10000)

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
  }, [data.paymentStatus, handleCheckPaymentStatus, qrData?.paymentNo])

  const toast = (
    <div
      style={{
        position: 'fixed',
        top: '90px',
        left: '50%',
        transform: isToastVisible ? 'translate(-50%, 0)' : 'translate(-50%, -16px)',
        zIndex: 1060,
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: isToastVisible ? 1 : 0,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 8px',
          borderRadius: 12,
          border: '1px solid #1BB05E',
          backgroundColor: '#F1FFF7',
          minWidth: 328,
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        }}
      >
        <Image src="/assets/icon/check-circle-solid.svg" alt="check-circle" width={24} height={24} />
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#1B5E20', marginBottom: 2 }}>บันทึกลงเครื่องเรียบร้อยแล้ว</div>
        </div>
      </div>
    </div>
  )

  return data.paymentStatus === 'success' ? (
    <div>
      {toast}
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
              {`บริษัท วิริยะประกันภัย จำกัด (มหาชน) จะจัดส่งเอกสารกรมธรรม์ และรายละเอียดอื่นๆ ให้คุณทาง ${[data?.channel?.isPolicyEmail && 'อีเมล', data?.channel?.isPolicySms && 'SMS']
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
      <div className="btn-footer-wraper py-3 px-3 bg-white" style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
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
  ) : data.paymentStatus === 'idle' ? (
    <div>
      <Modal {...modal} onClose={closeModal} />
      <div className="content-section fullPage-92" style={{ padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '364px', margin: '0 auto' }}>
        <div id="gradient-container"
          className="rounded-4 overflow-hidden shadow-sm"
          style={{
            width: '100%',
            borderRadius: '24px',
            position: 'relative',
          }}
        >
          {/* <div
          //todo: implement later
            style={{
              width: '182px',
              height: '182px',
              borderRadius: '1263.889px 0 0 0',
              background: 'linear-gradient(170deg, #1747BA -2.28%, rgba(31, 89, 227, 0.00) 88.33%)',
              position: 'absolute',
              zIndex: '-1',
              transform: 'rotate(-180deg)'
            }}
          >
          </div>
          <div
            style={{
              width: '292.211px',
              height: '182px',
              borderRadius: '1263.889px 0 0 0',
              background: 'linear-gradient(156deg, #1F59E3 24.17%, rgba(31, 89, 227, 0.00) 62.82%)',
              position: 'absolute',
              zIndex: '-1',
              transform: 'rotate(-180deg)'
            }}
          >
          </div> */}


          <div
            style={{ backgroundColor: '#2F80ED' }}
          >
            <div
              className="text-center text-white f-bd"
              style={{ padding: '16px 0', fontSize: '20px', fontWeight: 700 }}
            >
              {toast}
              สแกนเพื่อชำระเงิน
            </div>
            <div
              className="rounded-4 p-3 p-md-4 text-center"
              style={{
                maxWidth: 'min(100%, 340px)',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                margin: '0 18px'
              }}
            >
              {/* {qrData?.fileImage && (
                <div className="mb-2 mb-md-3">
                  <Image
                    src={qrData.fileImage}
                    unoptimized
                    priority
                    alt="QR Code"
                    width={140} height={140}
                    className="img-fluid"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
                //todo: uncomment when want real QR code
              )} */}

              <div className="mb-2 mb-md-3">
                <Image
                  src="/assets/icon/cash.svg"
                  unoptimized
                  priority
                  alt="QR Code"
                  width={140} height={140}
                  className="img-fluid"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
              <div className="text-danger fs-14" style={{ fontWeight: 400, marginBottom: '12px' }}>
                คิวอาร์โค้ดนี้จะหมดอายุ <span>{qrData?.qrExpiryDate ?? '–'}</span>
              </div>
              <p className="text-dark mb-1 fs-6">
                พ.ร.บ. <span>{data?.productCmiDetail?.compulsoryText ?? '–'}</span>
              </p>
              <p className="text-secondary mb-3 fs-14">
                เลขทะเบียน{' '}
                <span>{[data?.productCmiDetail?.licensePrefix, data?.productCmiDetail?.licenseNo].filter(Boolean).join('') || '–'}</span>
              </p>
              <div
                className="d-flex align-items-center px-3 py-2"
                style={{ backgroundColor: '#EFF5FF', justifyContent: 'center', borderRadius: '12px', height: '40px' }}
              >
                <span className="text-dark fs-14" style={{ fontWeight: 600, marginRight: '4px' }}>ยอดที่ต้องชำระ</span>
                <span className="f-bd" style={{ fontSize: '24px', color: '#2F80ED', transform: 'translateY(-2px)' }}>
                  {data?.productCmiDetail?.cmiCoverage?.total ?? '–'}{' '}
                  <span className="fs-14 f-normal">บาท</span>
                </span>
              </div>
              {true &&
                //todo: if online type -> show , offline (print docs)  not show
                <>
                  <div style={{ borderTop: '1px solid #DDD', margin: '12px 0' }}></div>
                  <p className="text-dark mb-2 fs-14" style={{ fontWeight: 600 }}>สิ่งที่คุณจะได้รับหลังจากชำระเงิน</p>
                  <section id="delivery-type-container" style={{ overflowWrap: 'anywhere' }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <Image src="/assets/icon/email-solid.svg" alt="email-solic" width={16} height={16} />
                      <div>
                        <div className="mb-1 fs-14" style={{ color: '#1E1E1F', fontWeight: '600' }}>
                          อีเมล (ภายใน 15 นาที)
                        </div>
                        <div className="text-muted fs-14 mb-0" style={{ color: '#616166', textAlign: 'start' }}>
                          {data?.deliveryType?.isEmail ? data?.deliveryType?.policyEmail : '–'}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <Image src="/assets/icon/pin-solid.svg" alt="email-solic" width={16} height={16} />
                      <div>
                        <div className="mb-1 fs-14" style={{ color: '#1E1E1F', fontWeight: '600', textAlign: 'start' }}>
                          ที่อยู่จัดส่ง (ภายใน 15 วัน)
                        </div>
                        <div className="text-muted fs-14 mb-0" style={{ color: '#616166', textAlign: 'start' }}>
                          address mock texttttttttttttttttt
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              }
            </div>
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24 }}>
          <Button
            type="button"
            outlined
            className="btn fs-6 d-flex align-items-center justify-content-center w-100"
            style={{ height: '48px', backgroundColor: '#DBE7FE', borderRadius: '12px', color: '#3F74F5' }}
            onClick={() => route.push('/th/VehicleCTP')}
          >
            กลับหน้าหลัก
          </Button>
          <Button
            type="button"
            className="btn btn-primary fs-6 d-flex align-items-center justify-content-center w-100"
            style={{
              height: '48px', borderRadius: '12px'
            }}
            onClick={() => {
              // todo: click download link
              showSuccessToast()
            }}
          >
            บันทึกคิวอาร์โค้ด
          </Button>
        </div>

      </div>


    </div >
  ) : null
}

export default PaymentQRComponents

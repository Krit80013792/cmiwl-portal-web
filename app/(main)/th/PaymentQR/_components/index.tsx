'use client'

import useLoading from '@/helpers/hooks/useLoading'
import Image from 'next/image'
import { Button } from 'primereact/button'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPaymentQrCode, getPaymentQrStatus } from '../_actions'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import Modal from '@/cmi-layout/components/Modal'
import { useModal } from '@/helpers/hooks/useModal'
import { useRouter } from 'next/navigation'
dayjs.locale('th')

const PaymentQRComponents = () => {
  const route = useRouter()
  const { modal, closeModal, openModal } = useModal()
  const { openLoading, closeLoading } = useLoading()
  const prefillData = useSelector((state: any) => state.prefillData)
  const [data, setData] = useState<any>({})
  const [qrData, setQrData] = useState<any>({})
  const [paymentStatus, setPaymentStatus] = useState<string>('success')

  useEffect(() => {
    setData(prefillData)
  }, [prefillData])

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
        setQrData({ ...qrData, qrExpiryDate })
      } else {
        openModal({
          title: 'ไม่สามารถดำเนินการต่อได้',
          content: 'กรุณาทำรายการใหม่อีกครั้ง',
          type: 'error',
          renderActions: () => {
            return (
              <div className="d-flex">
                <button
                  className="btn btn-secondary w-100 fs-6 d-flex justify-content-center align-items-center me-2"
                  onClick={() => {
                    route.push('/th/PaymentChannel')
                  }}
                  type="button"
                >
                  <strong>{'เลือกช่องทางอื่น'}</strong>
                </button>
                <button
                  className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center ms-2"
                  onClick={async () => {
                    closeModal()
                    await fetchPayment()
                  }}
                  type="button"
                >
                  <strong>{'ตกลง'}</strong>
                </button>
              </div>
            )
          },
        })
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
      if (data?.isPaymentSuccess) {
        setPaymentStatus('success')
      }
    } catch (error) {
      console.error('Error checking payment status:', error)
    }
  }, [qrData?.paymentNo])

  useEffect(() => {
    if (paymentStatus === 'idle' && qrData?.paymentNo) {
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
  }, [paymentStatus, handleCheckPaymentStatus])

  return paymentStatus === 'success' ? (
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
                [data?.channel?.isPolicyEmail && 'อีเมล', data?.channel?.isPolicySms && 'SMS']
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
  ) : paymentStatus === 'idle' ? (
    <div>
      <Modal {...modal} onClose={closeModal} />
      <div className="content-section fullPage-92 pt-48">
        <div className="container">
          <h1 className="typ-of-vehicle fs-6 text-grey mb-0 mt-3 f-bd">
            พ.ร.บ. <span>{data?.productCmiDetail?.compulsoryText}</span>
          </h1>
          <p className="registered-id text-lightgrey mb-0">
            เลขทะเบียน <span>{`${data?.productCmiDetail?.licensePrefix}-${data?.productCmiDetail?.licenseNo}`}</span>
          </p>
          <div className="d-flex justify-content-between align-items-center my-2">
            <span className="text-grey f-bd align-center">ยอดที่ต้องชำระ</span>
            <div>
              <span className="mb-0 text-start f-bd fs-26">{`${data?.productCmiDetail?.cmiCoverage?.total} `}</span>
              <span className="fs-6 f-bd">บาท/ปี</span>
            </div>
          </div>
          <div className="bg-lightgrey rounded-4 py-3 mb-12">
            <div className="text-center mb-2">
              {qrData?.fileImage && <Image src={qrData?.fileImage} priority alt="QR Code" width={152} height={213} />}
            </div>
            <div className="text-center mb-2">
              <Image className="d-inline me-1" alt="Clock" width="16" height="17" src="/assets/icon/clock.png" />
              <p className="text-red mb-0 fs-14 text-center f-bd d-inline">
                คิวอาร์โค้ดนี้มีอายุถึง <span>{qrData?.qrExpiryDate}</span>
              </p>
            </div>
            <p className="text-center text-lightgrey mb-0 fs-14">
              หากคุณชำระเงินหลังวันที่เริ่มความคุ้มครองที่เลือกไว้
              <br />
              ประกันจะเริ่มคุ้มครองเป็นวันถัดไป
              <br />
              ยกเว้นกรณีซื้อประกันล่วงหน้า
            </p>
          </div>
          <h2 className="f-bd mb-0 fs-6">หลังจากชำระเงิน</h2>
          <p className="fs-14">
            <span>กรมธรรม์อิเล็กทรอนิกส์จะถูกจัดส่งภายใน 15 นาที</span>
          </p>
        </div>

        <div className="text-center mt-12">
          <Image alt="Omise" width="150" height="24" src="/assets/object/omise.png" />
        </div>
      </div>
      <div className="btn-footer-wraper qrPayment-backHomeBTN py-20 px-20 bg-white text-center">
        <Button
          type="button"
          className="btn btn-primary fs-6 mx-auto d-flex text-center align-items-center justify-content-center"
          onClick={() => route.replace('https://app.tidlor.com/main')}
        >
          กลับหน้าหลัก
        </Button>
      </div>
    </div>
  ) : (
    <div className="content-section fullPage-116 pt-48">
      <div className="container text-center py-48">
        <div>
          <Image alt="Pending" width="80" height="80" src="/assets/icon/icon-pending.png" className="mb-3" />
        </div>
      </div>
    </div>
  )
}

export default PaymentQRComponents

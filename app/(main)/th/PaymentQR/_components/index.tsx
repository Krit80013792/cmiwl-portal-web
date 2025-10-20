'use client'

import useLoading from '@/helpers/hooks/useLoading'
import Modal from '@/cmi-layout/components/Modal'
import Image from 'next/image'
import { Button } from 'primereact/button'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPaymentQrCode } from '../_actions'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import { useModal } from '@/helpers/hooks/useModal'
dayjs.locale('th')

const PaymentQRComponents = () => {
  const { modal, openModal, closeModal } = useModal()
  const { openLoading, closeLoading } = useLoading()
  const prefillData = useSelector((state: any) => state.prefillData)
  const [data, setData] = useState<any>({})
  const [qrData, setQrData] = useState<any>({})

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
      setQrData({ ...qrData, qrExpiryDate })
    } catch (error) {
      console.error('Error fetching payment types:', error)
    } finally {
      closeLoading()
    }
  }, [openLoading, closeLoading, data?.channel?.channelOrderID])

  useEffect(() => {
    fetchPayment()
  }, [fetchPayment])

  return (
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
        >
          กลับหน้าหลัก
        </Button>
      </div>
    </div>
  )
}

export default PaymentQRComponents

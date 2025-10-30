'use client'

import { useForm } from '@/helpers/hooks/useForm'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import creditCardSchema from '../_schemas'
import { Input } from '@/cmi-layout/components/Input'
import { convertStrToFormat, getCreditCardType } from '@/helpers/functions/utils'
import Modal from '@/cmi-layout/components/Modal'
import { useModal } from '@/helpers/hooks/useModal'
import useLoading from '@/helpers/hooks/useLoading'
import { Button } from 'primereact/button'
import { useRouter } from 'next/navigation'
import { getPaymentCreditCard, getPaymentStatus } from '../_actions'

const PaymentCreditForm = () => {
  const route = useRouter()
  const { openLoading, closeLoading } = useLoading()
  const { modal, openModal, closeModal } = useModal()
  const prefillData = useSelector((state: any) => state.prefillData)
  const [data, setData] = useState<any>({})
  const [cardType, setCardType] = useState<string>('unknown')
  const [paymentStatus, setPaymentStatus] = useState<string>('idle')
  const [paymentNo, setPaymentNo] = useState<string>('')
  const { handleChange, values, errors, handleSubmit } = useForm(
    {
      creditCardNo: '',
      creditName: '',
      creditExpiry: '',
      creditCVV: '',
    },
    creditCardSchema,
  )

  useEffect(() => {
    setData(prefillData)
  }, [prefillData])

  const handlePayment = useCallback(async () => {
    try {
      openLoading()
      const res = await getPaymentCreditCard({
        channelOrderID: prefillData?.channel?.channelOrderID,
        cardNumber: values.creditCardNo.replaceAll(' ', ''),
        cardName: values.creditName,
        cardExpire: values.creditExpiry,
        cvv: values.creditCVV,
      })
      const payment = res.data.data
      if (!payment.error) {
        setPaymentNo(payment.paymentNo)
        route.push(payment.authorizeUri)
        setPaymentStatus('processing')
      } else {
        openModal({
          title: 'ชำระเงินไม่สำเร็จ',
          content: <p>กรุณาตรวจสอบข้อมูลหรือพบปัญหาการชำระเงิน กรุณาติดต่อเจ้าหน้าที่</p>,
          type: 'warning',
          hasImg: true,
          confirmOptions: {
            confirmText: 'ติดต่อเจ้าหน้าที่',
            onConfirm: () => {
              window.location.href = 'tel:02-710-3100'
            },
            onCancel: () => {},
            cancelText: 'ตรวจสอบข้อมูล',
          },
        })
      }
    } catch (error) {
      openModal({
        title: 'ชำระเงินไม่สำเร็จ',
        content: <p>กรุณาตรวจสอบข้อมูลหรือพบปัญหาการชำระเงิน กรุณาติดต่อเจ้าหน้าที่</p>,
        type: 'warning',
        hasImg: true,
        confirmOptions: {
          confirmText: 'ติดต่อเจ้าหน้าที่',
          onConfirm: () => {
            window.location.href = 'tel:02-710-3100'
          },
          onCancel: () => {},
          cancelText: 'ตรวจสอบข้อมูล',
        },
      })
    } finally {
      closeLoading()
    }
  }, [openLoading, closeLoading, data, values, prefillData])

  const handleCheckPaymentStatus = useCallback(async () => {
    try {
      const res = await getPaymentStatus({ paymentNo })
      const data = res?.data?.data
      if (data?.isPaymentSuccess) {
        setPaymentStatus('success')
      } else {
        setPaymentStatus('error')
      }
    } catch (error) {
      console.error('Error checking payment status:', error)
    }
  }, [paymentNo])

  useEffect(() => {
    if (paymentStatus === 'processing') {
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

  return paymentStatus === 'idle' ? (
    <div>
      <div className="content-section fullPage-116 pt-48">
        <form className="container">
          <div className="bg-lightgrey rounded-4 d-flex justify-content-between align-items-center mt-4 mb-4 px-12 py-12 ">
            <span className="text-grey f-bd align-center">ยอดที่ต้องชำระ</span>
            <div>
              <span className="mb-0 text-start f-bd fs-26">{data?.productCmiDetail?.cmiCoverage?.total}</span>
              <span className="fs-6 f-bd">บาท</span>
            </div>
          </div>
          <div className="mb-12">
            <Image className="me-2" alt="Visa" width="42" height="32" src="/assets/icon/visa.png" />
            <Image className="me-2" alt="Mastercard" width="42" height="32" src="/assets/icon/mastercard.png" />
            <Image alt="JCB" width="42" height="32" src="/assets/icon/jcb.png" />
          </div>
          <div className="formMain">
            <div className="form-group mb-12">
              <Input
                label="หมายเลขบัตร"
                name="creditCardNo"
                type="text"
                maxLength={19}
                placeholder="0000 0000 0000 0000"
                value={convertStrToFormat(values.creditCardNo, 'credit_card')}
                onChange={({ target: { name, value } }) => {
                  handleChange({ name, value })
                  setCardType(getCreditCardType(value))
                }}
                suffix={
                  cardType !== 'unknown' ? (
                    <Image
                      className="me-2"
                      alt={cardType}
                      width="42"
                      height="32"
                      src={`/assets/icon/${cardType}.png`}
                    />
                  ) : null
                }
                feedback={errors?.creditCardNo}
              />
            </div>
            <div className="form-group mb-12 creditname">
              <Input
                label="ชื่อผู้ถือบัตร"
                name="creditName"
                type="text"
                placeholder="กรอกชื่อผู้ถือบัตร (ภาษาอังกฤษ)"
                value={values.creditName}
                onChange={({ target: { name, value } }) => handleChange({ name, value })}
                feedback={errors?.creditName}
              />
            </div>
            <div className="d-flex">
              <div className="form-group mb-12 me-3 creditexpiry">
                <Input
                  label="วันหมดอายุ"
                  name="creditExpiry"
                  type="text"
                  maxLength={5}
                  placeholder="MM/YY"
                  value={convertStrToFormat(values.creditExpiry, 'credit_expiry')}
                  onChange={({ target: { name, value } }) => handleChange({ name, value })}
                  feedback={errors?.creditExpiry}
                />
              </div>
              <div className="form-group form-cvv creditcvv mb-12">
                <Input
                  label="CVV/CVC"
                  name="creditCVV"
                  type="text"
                  maxLength={3}
                  placeholder="000"
                  value={convertStrToFormat(values.creditCVV, 'number')}
                  onChange={({ target: { name, value } }) => handleChange({ name, value })}
                  feedback={errors?.creditCVV}
                  suffix={
                    <Image
                      alt="ตัวช่วย"
                      width="24"
                      height="24"
                      src="/assets/icon/icon-question.png"
                      onClick={() => {
                        openModal({
                          title: 'CVV/CVC',
                          content: (
                            <div className="text-center">
                              <Image
                                alt="CVV/CVC"
                                width="240"
                                height="160"
                                src="/assets/object/cvv.png"
                                className="mb-4"
                              />
                            </div>
                          ),
                          type: 'info',
                          hasImg: false,
                        })
                      }}
                    />
                  }
                />
              </div>
              <Modal {...modal} onClose={closeModal} />
            </div>
            <p className="mb-0 fs-14 text-lighgrey">
              <strong>หมายเหตุ</strong> : หากคุณชำระเงินหลังวันที่เริ่มความคุ้มครอง ที่เลือกไว้
              ประกันจะเริ่มคุ้มครองเป็นวันถัดไป ยกเว้นกรณี ซื้อประกันล่วงหน้า
            </p>
          </div>
          <div className="text-center mt-12">
            <Image alt="Omise" width="150" height="24" src="/assets/object/omise.png" />
          </div>
        </form>
      </div>
      <div className="btn-footer-wraper py-20 px-20 bg-white text-center">
        <button
          type="button"
          className="btn btn-primary fs-6 mx-auto d-flex text-center align-items-center justify-content-center"
          onClick={() => handleSubmit(handlePayment)}
        >
          ชำระเงิน
        </button>
      </div>
    </div>
  ) : (
    <div className="content-section fullPage-116 pt-48">
      <div className="container text-center py-48">
        {paymentStatus === 'success' && (
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
        {paymentStatus === 'error' && (
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
                  onClick={() => setPaymentStatus('idle')}
                >
                  ลองอีกครั้ง
                </Button>
              </div>
            </div>
          </div>
        )}
        {paymentStatus === 'processing' && (
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

export default PaymentCreditForm

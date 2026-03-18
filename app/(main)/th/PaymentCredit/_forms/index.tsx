'use client'

import { useForm } from '@/helpers/hooks/useForm'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import creditCardSchema from '../_schemas'
import { Input } from '@/cmi-layout/components/Input'
import { convertStrToFormat, getCreditCardType } from '@/helpers/functions/utils'
import Modal from '@/cmi-layout/components/Modal'
import { useModal } from '@/helpers/hooks/useModal'
import useLoading from '@/helpers/hooks/useLoading'
import { useRouter } from 'next/navigation'
import { getPaymentCreditCard } from '../_actions'
import { paymentSlice } from '@/stores/redux/slices/paymentSlice'

const PaymentCreditForm = () => {
  const route = useRouter()
  const dispatch = useDispatch()
  const { openLoading, closeLoading } = useLoading()
  const { modal, openModal, closeModal } = useModal()
  const prefillData = useSelector((state: any) => state.prefillData)
  const paymentData = useSelector((state: any) => state.payment)
  const [data, setData] = useState<any>({})
  const [cardType, setCardType] = useState<string>('unknown')
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
    setData({ ...prefillData, ...paymentData })
  }, [prefillData, paymentData])

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
        dispatch(
          paymentSlice.actions.setPayment({
            paymentNo: payment.paymentNo,
            paymentStatus: 'processing',
          }),
        )
        route.push(payment.authorizeUri)
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
            onCancel: () => { },
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
          onCancel: () => { },
          cancelText: 'ตรวจสอบข้อมูล',
        },
      })
    } finally {
      closeLoading()
    }
  }, [openLoading, closeLoading, data, values, prefillData, dispatch, openModal, route])

  return (
    <div>
      <div className="content-section fullPage-116 pt-48">
        <form className="container">
          <div
            style={{
              marginTop: '32px',
              color: '#1E1E1F',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 700,
            }}
          >
            ชำระเงิน
          </div>
          <div
            className="d-flex justify-content-between align-items-center mt-4"
            style={{ borderRadius: '16px', marginBottom: '12px', padding: '12px 16px', backgroundColor: '#EFF5FF' }}
          >
            <span style={{ color: '#1E1E1F', fontSize: '16px', fontWeight: 700 }}>ยอดที่ต้องชำระ</span>
            <div style={{ color: '#2652EA', fontWeight: 700 }}>
              <span className="mb-0 text-start" style={{ fontSize: '24px' }}>
                {data?.productCmiDetail?.cmiCoverage?.total}
              </span>
              <span className="" style={{ fontSize: '16px' }}>บาท</span>
            </div>
          </div>
          <div className="mb-12 d-flex" style={{ gap: '8px' }}>
            <Image alt="Visa" width="24" height="24" src="/assets/icon/visa.svg" />
            <Image alt="Mastercard" width="24" height="24" src="/assets/icon/mastercard.svg" />
            <Image alt="JCB" width="24" height="24" src="/assets/icon/jcb.svg" />
            <Image alt="unionpay" width="24" height="24" src="/assets/icon/unionpay.svg" />
          </div>
          <div className="formMain">
            <div className="form-group mb-12">
              <Input
                label="หมายเลขบัตร"
                name="creditCardNo"
                type="text"
                maxLength={19}
                placeholder="XXXX XXXX XXXX XXXX"
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
                          title: 'รหัส CVV/CVC',
                          content: (
                            <div className="text-center">
                              <Image
                                alt="CVV/CVC"
                                width="240"
                                height="160"
                                src="/assets/object/cvv.png"
                                className="mb-4"
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '16px',
                                  color: '#414243',
                                }}
                              >
                                <span>
                                  กรอก <span style={{ fontWeight: 700 }}>ตัวเลข 3 หลัก</span> ที่อยู่บนหลังบัตร
                                </span>
                                <span>ทางด้านขวาของแถบลายเซ็น</span>
                              </div>
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
  )
}

export default PaymentCreditForm

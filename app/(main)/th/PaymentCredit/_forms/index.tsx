'use client'

import { useForm } from '@/helpers/hooks/useForm'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
  const router = useRouter()
  //todo start: mock zone
  const [paymentDataIncorrect, setPaymentDataIncorrect] = useState<boolean>(false)
  //todo end: mock zone
  const { handleChange, values, errors, handleSubmit } = useForm(
    {
      creditCardNo: '',
      creditName: '',
      creditExpiry: '',
      creditCVV: '',
    },
    creditCardSchema,
  )

  const isExpiryInvalid = useMemo(() => {
    //todo start scenario : card expiry date invalid
    const expiry = values.creditExpiry;
    if (!expiry) return false;
    if (errors?.creditExpiry) return false;

    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(expiry)) return false;

    const [mm, yy] = expiry.split('/');
    const month = Number(mm);
    const year = Number(yy);

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    const isExpired = year < currentYear || (year === currentYear && month < currentMonth);

    return isExpired;

  }, [values.creditExpiry, errors?.creditExpiry]);

  useEffect(() => {
    if (isExpiryInvalid) {
      handleExpiryDateInvalid()
    }
  }, [isExpiryInvalid, openModal, closeModal]);

  const handleExpiryDateInvalid = useCallback(() => {
    openModal({
      hasImg: false,
      title: '',
      message: '',
      content: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#1E1E1F',
            gap: 12,
          }}
        >
          <div>
            <Image alt="QR Error" width={54} height={54} src="/assets/icon/system.svg" />
          </div>
          <div>
            <div
              style={{
                fontSize: '18px',
                color: '#1E1E1F',
                fontWeight: 700,
              }}
            >
              บัตรใบนี้หมดอายุแล้ว
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#6B6C6F' }}>
                ไม่สามารถใช้งานได้ กรุณาลองบัตรใบอื่น
              </div>
              <div style={{ fontSize: '14px', color: '#6B6C6F' }}>
                หรือเปลี่ยนช่องทางการชำระเงิน
              </div>
            </div>
          </div>
        </div>
      ),
      renderActions: () => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            fontWeight: 600,
          }}
        >
          <button
            type="button"
            style={{
              padding: '8px 24px',
              backgroundColor: '#3F74F5',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              height: 48,
            }}
            onClick={closeModal}
          >
            ลองบัตรใบอื่น
          </button>
          <button
            type="button"
            style={{
              padding: '8px 24px',
              backgroundColor: '#DBE7FE',
              color: '#2652EA',
              border: 'none',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              height: 48,
            }}
            onClick={() => route.replace('/th/PaymentChannel')}
          >
            เปลี่ยนช่องทางการชำระเงิน
          </button>
        </div>
      ),
    })
  }, [openModal, closeModal])

  const handleTransactionFailed = useCallback(() => {
    openModal({
      hasImg: false,
      title: '',
      message: '',
      content: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#1E1E1F',
            gap: 12,
          }}
        >
          <div>
            <Image alt="QR Error" width={54} height={54} src="/assets/icon/system.svg" />
          </div>
          <div>
            <div
              style={{
                fontSize: '18px',
                color: '#1E1E1F',
                fontWeight: 700,
              }}
            >
              ทำรายการไม่สำเร็จ
            </div>
            <div
              style={{
                fontSize: '18px',
                color: '#1E1E1F',
                fontWeight: 700,
              }}
            >
              พบข้อขัดข้องระหว่างทำรายการ
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#6B6C6F' }}>
                กรุณาลองอีกครั้ง
              </div>
            </div>
          </div>
        </div>
      ),
      renderActions: () => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            fontWeight: 600,
          }}
        >
          <button
            type="button"
            style={{
              padding: '8px 24px',
              backgroundColor: '#3F74F5',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              height: 48,
            }}
            onClick={closeModal}
          >
            ตกลง
          </button>
        </div>
      ),
    })
  }, [openModal, closeModal])

  const handleInsufficientCardLimit = useCallback(() => {
    openModal({
      hasImg: false,
      title: '',
      message: '',
      content: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#1E1E1F',
            gap: 12,
          }}
        >
          <div>
            <Image alt="QR Error" width={54} height={54} src="/assets/icon/system.svg" />
          </div>
          <div>
            <div
              style={{
                fontSize: '18px',
                color: '#1E1E1F',
                fontWeight: 700,
              }}
            >
              วงเงินในบัตรของคุณ
            </div>
            <div
              style={{
                fontSize: '18px',
                color: '#1E1E1F',
                fontWeight: 700,
              }}
            >
              ไม่เพียงพอสำหรับทำรายการ
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#6B6C6F' }}>
                กรุณาตรวจสอบ หรือเปลี่ยนช่องทาง
              </div>
              <div style={{ fontSize: '14px', color: '#6B6C6F' }}>
                การชำระเงิน
              </div>
            </div>
          </div>
        </div>
      ),
      renderActions: () => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            fontWeight: 600,
          }}
        >
          <button
            type="button"
            style={{
              padding: '8px 24px',
              backgroundColor: '#3F74F5',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              height: 48,
            }}

            onClick={() => route.replace('/th/PaymentChannel')}
          >
            เปลี่ยนช่องทางการชำระเงิน
          </button>
          <button
            type="button"
            style={{
              padding: '8px 24px',
              backgroundColor: '#DBE7FE',
              color: '#2652EA',
              border: 'none',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              height: 48,
            }}

            onClick={closeModal}
          >
            ปิด
          </button>
        </div>
      ),
    })
  }, [openModal, closeModal]);

  const handleDeclinedByBankOrFraud = useCallback(() => {
    openModal({
      hasImg: false,
      title: '',
      message: '',
      content: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#1E1E1F',
            gap: 12,
          }}
        >
          <div>
            <Image alt="QR Error" width={54} height={54} src="/assets/icon/system.svg" />
          </div>
          <div>
            <div
              style={{
                fontSize: '18px',
                color: '#1E1E1F',
                fontWeight: 700,
              }}
            >
              บัตรของคุณไม่สามารถทำรายการได้
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#6B6C6F' }}>
                กรุณาติดต่อธนาคารเพื่อตรวจสอบ
              </div>
              <div style={{ fontSize: '14px', color: '#6B6C6F' }}>
                หรือเปลี่ยนช่องทางการชำระเงิน
              </div>
            </div>
          </div>
        </div>
      ),
      renderActions: () => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            fontWeight: 600,
          }}
        >
          <button
            type="button"
            style={{
              padding: '8px 24px',
              backgroundColor: '#3F74F5',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              height: 48,
            }}

            onClick={() => route.replace('/th/PaymentChannel')}
          >
            เปลี่ยนช่องทางการชำระเงิน
          </button>
          <button
            type="button"
            style={{
              padding: '8px 24px',
              backgroundColor: '#DBE7FE',
              color: '#2652EA',
              border: 'none',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              height: 48,
            }}

            onClick={closeModal}
          >
            ปิด
          </button>
        </div>
      ),
    })
  }, [openModal, closeModal]);




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
        //todo start scenario 1: incorrect payment credit data
        const paymentDataIncorrect = true
        if (paymentDataIncorrect) {
          setPaymentDataIncorrect(true)
          return
        }

        //todo start scenario 2: transaction failed
        const transactionFailed = true
        if (transactionFailed) {
          handleTransactionFailed()
          return
        }
        //todo start scenario 3: insufficient card limit
        const insufficientCardLimit = true
        if (insufficientCardLimit) {
          handleInsufficientCardLimit()
          return
        }

        //todo start scenario 4: declined by bank or fraud
        const declinedByBankOrFraud = true
        if (declinedByBankOrFraud) {
          handleDeclinedByBankOrFraud()
          return
        }

        //todo start scenario 5: payment failed
        const paymentFailed = true
        if (paymentFailed) {
          router.replace('/th/PaymentCredit/payment-failed')
          return
        }
        //todo end scenario 6: peyment success 
        const paymentSuccess = true
        if (paymentSuccess) {
          router.replace('/th/PaymentCredit/success')
          return
        }


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



  useEffect(() => {
    //todo: for test each scenario
    // handleTransactionFailed()
    // handleExpiryDateInvalid()
    // handleInsufficientCardLimit()
    // handleDeclinedByBankOrFraud()
    router.replace('/th/PaymentCredit/payment-failed')
    // router.replace('/th/PaymentCredit/success')
  }, [])

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
              <span className="" style={{ fontSize: '16px' }}> บาท</span>
            </div>
          </div>
          <div className="mb-12 d-flex" style={{ gap: '8px' }}>
            <Image alt="Visa" width="24" height="24" src="/assets/icon/visa.svg" />
            <Image alt="Mastercard" width="24" height="24" src="/assets/icon/mastercard.svg" />
            <Image alt="JCB" width="24" height="24" src="/assets/icon/jcb.svg" />
            <Image alt="unionpay" width="24" height="24" src="/assets/icon/unionpay.svg" />
          </div>
          {paymentDataIncorrect && (
            <div
              className="mb-12 d-flex align-items-center"
              style={{
                gap: 12,
                padding: '10px 12px 12px',
                borderRadius: 12,
                border: '1px solid #F62D28',
                backgroundColor: '#FFFAFA',
                height: '64px'
              }}
            >
              <Image alt="warning" width="28" height="28" src="/assets/icon/alert-circle-solid-red.svg" />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#7A1F1F', fontSize: 15, fontWeight: 700 }}>ข้อมูลบัตรเครดิตไม่ถูกต้อง</span>
                <span style={{ color: '#7A1F1F', fontSize: 14, fontWeight: 400 }}>กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง</span>
              </div>
            </div>
          )}
          <div className="formMain">
            <div className="form-group mb-12">
              <Input
                autoComplete="cc-number"
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
                  <span className="d-inline-flex align-items-center" style={{ gap: 8 }}>
                    {!!values.creditCardNo && (
                      <span
                        role="button"
                        tabIndex={0}
                        aria-label="Clear card number"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleChange({ name: 'creditCardNo', value: '' })
                          setCardType('unknown')
                        }}
                        style={{ cursor: 'pointer', display: 'inline-flex' }}
                      >
                        <Image alt="Clear" width="20" height="20" src="/assets/icon/remove-circle-solid.svg" />
                      </span>
                    )}
                    {cardType !== 'unknown' ? (
                      <Image alt={cardType} width="42" height="32" src={`/assets/icon/${cardType}.svg`} />
                    ) : null}
                  </span>
                }
                feedback={errors?.creditCardNo}
              />
            </div>
            <div className="d-flex">
              <div className="form-group mb-12 me-3 creditexpiry">
                <Input
                  autoComplete="cc-exp"
                  label="วันหมดอายุ"
                  name="creditExpiry"
                  type="text"
                  maxLength={5}
                  placeholder="MM/YY"
                  value={convertStrToFormat(values.creditExpiry, 'credit_expiry')}
                  onChange={({ target: { name, value } }) => {
                    handleChange({ name, value })
                  }}
                  feedback={errors?.creditExpiry}
                  suffix={
                    !!values.creditExpiry ? (
                      <span
                        role="button"
                        tabIndex={0}
                        aria-label="Clear expiry"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleChange({ name: 'creditExpiry', value: '' })
                        }}
                        style={{ cursor: 'pointer', display: 'inline-flex' }}
                      >
                        <Image alt="Clear" width="20" height="20" src="/assets/icon/remove-circle-solid.svg" />
                      </span>
                    ) : null
                  }
                />
              </div>
              <div className="form-group form-cvv creditcvv mb-12">
                <Input
                  autoComplete="cc-csc"
                  label="CVV/CVC"
                  name="creditCVV"
                  type="text"
                  maxLength={3}
                  placeholder="000"
                  value={convertStrToFormat(values.creditCVV, 'number')}
                  onChange={({ target: { name, value } }) => handleChange({ name, value })}
                  feedback={errors?.creditCVV}
                  suffix={
                    <span className="d-inline-flex align-items-center" style={{ gap: 8 }}>
                      {!!values.creditCVV && (
                        <span
                          role="button"
                          tabIndex={0}
                          aria-label="Clear CVV"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleChange({ name: 'creditCVV', value: '' })
                          }}
                          style={{ cursor: 'pointer', display: 'inline-flex' }}
                        >
                          <Image alt="Clear" width="20" height="20" src="/assets/icon/remove-circle-solid.svg" />
                        </span>
                      )}
                      <span
                        role="button"
                        tabIndex={0}
                        aria-label="CVV help"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
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
                        style={{ cursor: 'pointer', display: 'inline-flex' }}
                      >
                        <Image alt="ตัวช่วย" width="24" height="24" src="/assets/icon/question-circle.svg" />
                      </span>
                    </span>
                  }
                />
              </div>
            </div>
            <div className="form-group mb-12 creditname">
              <Input
                label="ชื่อผู้ถือบัตร (ภาษาอังกฤษ)"
                name="creditName"
                type="text"
                placeholder="กรอกชื่อผู้ถือบัตร (ภาษาอังกฤษ)"
                value={values.creditName}
                onChange={({ target: { name, value } }) => handleChange({ name, value })}
                feedback={errors?.creditName}
                suffix={
                  !!values.creditName ? (
                    <span
                      role="button"
                      tabIndex={0}
                      aria-label="Clear cardholder name"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleChange({ name: 'creditName', value: '' })
                      }}
                      style={{ cursor: 'pointer', display: 'inline-flex' }}
                    >
                      <Image alt="Clear" width="20" height="20" src="/assets/icon/remove-circle-solid.svg" />
                    </span>
                  ) : null
                }
              />
            </div>
          </div>
          <div className="text-center" style={{ marginTop: 24 }}>
            <Image alt="Omise" width="150" height="24" src="/assets/object/Secure badge-dark.svg" />
          </div>
        </form>

        <button
          type="button"
          className="btn btn-primary fs-6 mx-auto d-flex text-center align-items-center justify-content-center"
          onClick={() => handleSubmit(handlePayment)}
          style={{
            marginTop: 24,
            backgroundColor: '#3F74F5',
            borderRadius: 12,
            height: 48,
            border: 'none'
          }}
        >
          ชำระเงิน
        </button>

      </div>

      <Modal {...modal} onClose={closeModal} />
    </div>
  )
}

export default PaymentCreditForm

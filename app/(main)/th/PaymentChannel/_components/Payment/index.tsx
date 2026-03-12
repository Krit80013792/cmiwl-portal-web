'use client'

import { useCallback, useEffect, useState } from 'react'
import { getPaymentType } from '../../_actions'
import useLoading from '@/helpers/hooks/useLoading'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { paymentSlice } from '@/stores/redux/slices/paymentSlice'

const Payment = () => {
  const dispatch = useDispatch()
  const route = useRouter()
  const { openLoading, closeLoading } = useLoading()
  const prefillData = useSelector((state: any) => state.prefillData)
  const [paymentMethodList, setPaymentMethodList] = useState<any[]>([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number | null>(null)
  const [data, setData] = useState<any>({})

  const fetchData = useCallback(async () => {
    try {
      openLoading()

      // MOCK: hardcoded payment methods for local viewing without backend
      // Comment this block out and restore the real API call when integrating.
      const mockData = [
        {
          paymentMethodId: 1,
          paymentMethodTh: 'บัตรเครดิต',
          payTypeCode: 'CRDC',
        },
        {
          paymentMethodId: 2,
          paymentMethodTh: 'QR Code',
          payTypeCode: 'QRCS',
        },
      ]
      setPaymentMethodList(mockData)

      // Real implementation:
      // const res = await getPaymentType()
      // const data = res.data.data
      // setPaymentMethodList(data ?? [])
    } catch (error) {
      console.error('Error fetching payment types:', error)
    } finally {
      closeLoading()
    }
  }, [openLoading, closeLoading])

  useEffect(() => {
    dispatch(paymentSlice.actions.clearPayment())
    setData(prefillData)
    fetchData()
  }, [fetchData, prefillData])

  return (
    <>
      <div className="content-section fullPage-182">
        <div className="container">
          <div className="bg-lightgrey rounded-4 d-flex justify-content-between align-items-center mt-3 mb-4 px-12 py-12 ">
            <span className="text-grey f-bd align-center">ยอดที่ต้องชำระ</span>
            <div>
              <span className="mb-0 text-start f-bd fs-26">{data?.productCmiDetail?.cmiCoverage?.total}</span>
              <span className="fs-6 f-bd">บาท</span>
            </div>
          </div>
          <h1 className="fs-18 text-black f-bd mb-12">เลือกช่องทางการชำระเงิน</h1>
          <div className="payment-options">
            {paymentMethodList.map((e) => {
              const isActive = selectedPaymentMethod === e.paymentMethodId ? 'active' : ''
              return (
                <div key={e.paymentMethodId}>
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod(e.paymentMethodId)}
                    className={`w-100 p-3 border-grey d-flex justify-content-between align-items-center rounded-4 mb-3 ${isActive}`}
                    style={{ border: `2px solid ${isActive ? '#045ffc' : '#c9c9c9'}` }}
                  >
                    <span className="f-bd">{e.paymentMethodTh}</span>
                    {e.payTypeCode === 'QRCS' ? (
                      <div>
                        <Image alt="QR Code" width="42" height="32" src="/assets/icon/qr.png" />
                      </div>
                    ) : (
                      <div>
                        <Image className="me-2" alt="Visa" width="42" height="32" src="/assets/icon/visa.png" />
                        <Image
                          className="me-2"
                          alt="Mastercard"
                          width="42"
                          height="32"
                          src="/assets/icon/mastercard.png"
                        />
                        <Image alt="JCB" width="42" height="32" src="/assets/icon/jcb.png" />
                      </div>
                    )}
                  </button>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-12">
            <img alt="Omise" width="150" height="24" src="/assets/object/omise.png" />
          </div>
        </div>
      </div>
      <div className="btn-footer-wraper py-20 px-20 bg-white text-center">
        <button
          type="button"
          className={`btn btn-primary fs-6 mx-auto d-flex text-center align-items-center justify-content-center ${!selectedPaymentMethod ? 'disabled' : ''}`}
          disabled={!selectedPaymentMethod}
          onClick={() => {
            if (selectedPaymentMethod === 1) {
              route.push('/th/PaymentCredit')
            } else if (selectedPaymentMethod === 2) {
              route.push('/th/PaymentQR')
            }
          }}
        >
          ดำเนินการชำระเงิน
        </button>
      </div>
    </>
  )
}

export default Payment

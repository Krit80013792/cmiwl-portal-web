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

      // todo: hardcoded payment methods for local viewing without backend
      const mockData = [
        {
          paymentMethodId: 2,
          paymentMethodTh: 'คิวอาร์โค้ด',
          payTypeCode: 'QRCS',
        },
        {
          //todo: mock
          paymentMethodId: 1,
          paymentMethodTh: 'บัตรเครดิต',
          payTypeCode: 'MOCK1',
        },
        {
          //todo: mock
          paymentMethodId: 98,
          paymentMethodTh: 'เงินสด',
          payTypeCode: 'MOCK2',
        },
        {
          //todo: mock
          paymentMethodId: 99,
          paymentMethodTh: 'หักยอดสินเชื่อ ( CV/On Top)',
          payTypeCode: 'MOCK3',
        },
      ]
      setPaymentMethodList(mockData)

      // todo: real implementation:
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
        <div className="container" style={{ maxWidth: '384px' }}>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E1E1F', marginTop: '32px' }}>ชำระเงิน</p>
          <div style={{ backgroundColor: '#EFF5FF', borderRadius: '16px' }} className="d-flex justify-content-between align-items-center mt-3 mb-4 px-12 py-12 ">
            <span className="f-bd align-center" style={{ color: '#1E1E1F' }}>ยอดที่ต้องชำระ</span>
            <div style={{ color: '#2652EA' }}>
              <span className="mb-0 text-start f-bd fs-26" style={{ marginRight: '4px' }}>{data?.productCmiDetail?.cmiCoverage?.total}</span>
              <span className="fs-6 f-bd" style={{ color: '#2652EA' }} > บาท</span>
            </div>
          </div>
          {/* <h1 className="fs-18 text-black f-bd mb-12">เลือกช่องทางการชำระเงิน</h1> */}
          <div className="payment-options">
            {paymentMethodList.map((e) => {
              const isActive = selectedPaymentMethod === e.paymentMethodId ? 'active' : ''
              return (
                <div key={e.paymentMethodId}>
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod(e.paymentMethodId)}
                    className={`w-100 border-grey d-flex align-items-center mb-3 ${isActive}`}
                    style={{ border: `1px solid ${isActive ? '#1E3FD7' : '#DDDDDF'}`, padding: '16px', gap: '8px', borderRadius: '16px', height: '56px' }}
                  >
                    {e.payTypeCode === 'QRCS' && (
                      <div>
                        <Image alt="qr-scan" width="24" height="24" src="/assets/icon/qr-scan.svg" />
                      </div>
                    )}

                    {e.payTypeCode === 'MOCK1' && (
                      <div>
                        <Image
                          alt="credit-card-solid"
                          width="24"
                          height="24"
                          src="/assets/icon/credit-card-solid.svg"
                        />
                      </div>
                    )}
                    {e.payTypeCode === 'MOCK2' && (
                      <div>
                        <Image alt="cash" width="24" height="24" src="/assets/icon/cash.svg" />
                      </div>
                    )}
                    {e.payTypeCode === 'MOCK3' && (
                      <div>
                        <Image alt="deduct-amount-solid" width="24" height="24" src="/assets/icon/deduct-amount-solid.svg" />
                      </div>
                    )}
                    <span style={{ color: '#1E1E1F', fontWeight: '600' }}>{e.paymentMethodTh}</span>
                  </button>
                </div>
              )
            })}
          </div>
          <div style={{ fontSize: '15px', color: '#414243' }}>
            <span style={{ fontWeight: '700' }}>หมายเหตุ : </span>
            <span>
              หากคุณชำระเงินหลัง 23:00 วันที่เริ่มความคุ้มครองที่เลือกไว้ จะเริ่มคุ้มครองเป็นวันถัดไป ยกเว้นกรณีซื้อประกันล่วงหน้า
            </span>
          </div>

          <button
            type="button"
            style={{
              width: '100%',
              marginTop: '24px',
              backgroundColor: '#3F74F5',
              borderRadius: '12px'
            }}
            className={`btn btn-primary fs-6 d-flex text-center align-items-center justify-content-center ${!selectedPaymentMethod ? 'disabled' : ''}`}
            disabled={!selectedPaymentMethod}
            onClick={() => {
              if (selectedPaymentMethod === 1) {
                route.push('/th/PaymentCredit')
              } else if (selectedPaymentMethod === 2) {
                route.push('/th/PaymentQR')
              }
              else if (selectedPaymentMethod === 98) {
                route.push('/th/PaymentCash')
              }
              else if (selectedPaymentMethod === 99) {
                route.push('/th/PaymentDeductAmount')
              }
            }}
          >
            <span style={{ fontSize: '18px', fontWeight: '600' }}>
              ชำระเงิน
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
export default Payment

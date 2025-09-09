'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Footer = () => {
  const prefillData = useSelector((state: any) => state.prefillData)
  const [prefill, setPrefill] = useState<any>({})

  useEffect(() => {
    setPrefill(prefillData)
  }, [prefillData])

  return (
    <div className="btn-footer-wraper bg-white text-center d-flex justify-content-between">
      <div className="container d-flex justify-content-between">
        <div className="total-price text-grey">
          <p className="mb-0 text-start f-md">ยอดชำระ</p>
          <span className="mb-0 text-start f-bd fs-26">{prefill?.productCmiDetail?.cmiCoverage?.total}</span>
          <span className="fs-6 f-bd"> บาท</span>
        </div>
        <a
          href="/th/PaymentChannel"
          className="btn btn-primary submit-summary fs-6 d-flex justify-content-center align-items-center me-0"
        >
          <strong>ยืนยัน</strong>
        </a>
      </div>
    </div>
  )
}

export default Footer

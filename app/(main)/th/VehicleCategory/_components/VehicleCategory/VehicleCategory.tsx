'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getCompulsoryRates } from '../../_actions'
import { prefillDataSlice } from '@/stores/redux/slices/prefillDataSlice'

const VehicleCategoryComponent = ({ data }: { data: { token: string; channelCode: string } }) => {
  const prefillData = useSelector((state: any) => state.prefillData)
  const dispatch = useDispatch()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [prefill, setPrefill] = useState<any>({})
  const [compulsoryRateList, setCompulsoryRateList] = useState<any>([])
  const router = useRouter()

  useEffect(() => {
    setPrefill(prefillData)
  }, [prefillData])

  const fetchData = useCallback(async () => {
    try {
      const res = await getCompulsoryRates({ token: data.token, carTypeKey: prefill?.productCmiDetail?.carTypeKey })
      setCompulsoryRateList(res?.data?.data?.compulsoryRates[0] ?? [])
    } catch (error) {
      console.error('Error fetching compulsory rates:', error)
    }
  }, [data.token, prefill?.productCmiDetail?.carTypeKey])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleCarInformation = async (rate: any, idx: number) => {
    setActiveIndex(idx)
    const compulsoryData = {
      cmiSubCarTypeCode: compulsoryRateList?.cmiSubCarTypeCode,
      cmiCoverage: {
        netPremium: compulsoryRateList?.rates[idx]?.netPremium,
        stamp: compulsoryRateList?.rates[idx]?.stamp,
        vat: compulsoryRateList?.rates[idx]?.vat,
        total: compulsoryRateList?.rates[idx]?.total,
      },
    }
    const productCmiDetail = {
      ...prefill?.productCmiDetail,
      ...compulsoryData,
    }
    dispatch(
      prefillDataSlice.actions.setPrefillData({
        ...prefill,
        productCmiDetail,
      }),
    )
    router.push(`/th/CarInformation`)
  }
  return (
    <div className="row seatamount-select mb-4">
      {compulsoryRateList?.rates?.map((e: any, i: number) => {
        const isActive = activeIndex === i
        return (
          <div className="col-6 pe-2 mb-3 " key={i} onClick={() => handleCarInformation(e, i)}>
            <div className={`px-12 py-2 rounded-4 choice-card h-100${isActive ? ' active' : ''}`}>
              <p className="mb-0 text-grey">{e.compulsoryText}</p>
              <p className="mb-0 text-grey">
                <strong className="f-bd">{e.total} บาท/ปี</strong>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default VehicleCategoryComponent

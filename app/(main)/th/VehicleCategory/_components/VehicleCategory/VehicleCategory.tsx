'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { Skeleton } from 'primereact/skeleton'
import { getCompulsoryRates } from '../../_actions'
import { prefillDataSlice } from '@/stores/redux/slices/prefillDataSlice'
import useLoading from '@/helpers/hooks/useLoading'

const VehicleCategoryComponent = () => {
  const { openLoading, closeLoading } = useLoading()
  const prefillData = useSelector((state: any) => state.prefillData)
  const dispatch = useDispatch()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [prefill, setPrefill] = useState<any>({})
  const [compulsoryRateList, setCompulsoryRateList] = useState<any>([])
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    setPrefill(prefillData)
  }, [prefillData])

  const fetchData = useCallback(async () => {
    try {
      setIsLoadingData(true)
      openLoading()
      const res = await getCompulsoryRates({ carTypeKey: prefill?.productCmiDetail?.carTypeKey })
      const compulsoryRates = res?.data?.data?.compulsoryRates || []
      if (compulsoryRates.length === 1) {
        await handleCarInformation(compulsoryRates[0], 0)
        return
      }
      setCompulsoryRateList(compulsoryRates)
    } catch (error) {
      console.error('Error fetching compulsory rates:', error)
    } finally {
      closeLoading()
      setIsLoadingData(false)
    }
  }, [prefill?.productCmiDetail?.carTypeKey, openLoading, closeLoading])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleCarInformation = async (data: any, idx: number) => {
    openLoading()
    setActiveIndex(idx)
    const compulsoryData = {
      compulsoryText: data?.rate?.compulsoryText,
      cmiCarTypeCode: data?.rate?.cmiCarTypeCode,
      subCarType: data?.cmiSubCarTypeCode,
      cmiCoverage: {
        netPremium: data?.rate?.netPremium,
        stamp: data?.rate?.stamp,
        vat: data?.rate?.vat,
        total: data?.rate?.total,
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
    <div className="vehicle-category-list row seatamount-select mb-4">
      {isLoadingData ? (
        // Skeleton loading state
        <>
          {[1, 2, 3, 4].map((item) => (
            <div className="col-6 pe-2 mb-3" key={item}>
              <div className="px-12 py-2 rounded-4 choice-card h-100">
                <Skeleton width="80%" height="1rem" className="mb-2" />
                <Skeleton width="60%" height="1.25rem" />
              </div>
            </div>
          ))}
        </>
      ) : (
        // Actual compulsory rate cards
        compulsoryRateList?.map((e: any, i: number) => {
          const isActive = activeIndex === i
          const key = i
          return (
            <div className='vehicle-category-item' key={key}>
              <button onClick={() => handleCarInformation(e, i)} type="button" className="w-100 h-100 text-start">
                <div style={{ alignItems: 'center' }} className={`px-12 py-2 rounded-4 choice-card h-100${isActive ? ' active' : ''}`}>
                  <p className="mb-0 text-grey">{e.rate.compulsoryText}</p>
                  <p className="mb-0 text-grey">
                    <strong className="f-bd">{e.rate.total.toLocaleString()} บาท/ปี</strong>
                  </p>
                </div>
              </button>
            </div>
          )
        })
      )}
    </div>
  )
}

export default VehicleCategoryComponent

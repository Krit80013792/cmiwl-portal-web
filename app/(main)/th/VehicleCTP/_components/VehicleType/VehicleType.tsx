'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { Skeleton } from 'primereact/skeleton'
import { getCompulsoryTypes, getPrefillData } from '../../_actions'
import { prefillDataSlice } from '@/stores/redux/slices/prefillDataSlice'
import useLoading from '@/helpers/hooks/useLoading'

const VehicleCategory = ({ channel }: { channel: any }) => {
  const router = useRouter()
  const { openLoading, closeLoading } = useLoading()
  const dispatch = useDispatch()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [typeList, setTypeList] = useState<any[]>([])
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true)

  const fetchData = useCallback(async () => {
    try {
      setIsLoadingData(true)
      openLoading()
      const res = await getCompulsoryTypes({ channelCode: channel?.channelCode })
      setTypeList((res?.data?.data?.compulsoryTypes ?? []).sort((a: any, b: any) => a.itemOrder - b.itemOrder))
    } catch (error) {
      console.error('Error fetching compulsory types:', error)
    } finally {
      setIsLoadingData(false)
      closeLoading()
    }
  }, [channel?.channelCode, openLoading, closeLoading])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleVehicleCategory = async (type: any, idx: number) => {
    try {
      openLoading()
      const res = await getPrefillData()
      const { prefill } = res.data.data
      setActiveIndex(idx)
      const vehicleCategory = {
        carTypeName: type.displayName,
        carTypeKey: type.carTypeKey,
        isEvType: type.isEvType,
      }
      dispatch(
        prefillDataSlice.actions.setPrefillData({
          channel,
          productCmiDetail: vehicleCategory,
          deliveryType: {
            isEmail: prefill?.deliveryType?.isEmail,
            isSms: prefill?.deliveryType?.isSms,
            policyEmail: prefill?.deliveryType?.policyEmail,
            policySms: prefill?.deliveryType?.policySms,
          },
        }),
      )

      router.push(`/th/VehicleCategory`)
    } catch (error) {
      console.error('Error handling vehicle category:', error)
    } finally {
      closeLoading()
    }
  }

  return (
    <div className="row vehicle">
      {isLoadingData ? (
        // Skeleton loading state
        <>
          {[1, 2, 3, 4].map((item) => (
            <div className="col-6 pe-2 mb-3" key={item}>
              <div className="py-12 px-3 rounded-4 choice-card text-center h-100">
                <Skeleton width="80px" height="42px" className="mb-3 mx-auto" />
                <Skeleton width="80%" height="1rem" className="mb-2 mx-auto" />
                <Skeleton width="60%" height="1rem" className="mx-auto" />
              </div>
            </div>
          ))}
        </>
      ) : (
        // Actual vehicle type cards
        typeList?.map((e: any, idx: number) => {
          const isActive = activeIndex === idx
          return (
            <div className="col-6 pe-2 mb-3" key={e.itemOrder}>
              <button onClick={() => handleVehicleCategory(e, idx)} type="button" className="w-100 h-100">
                <div className={`py-12 px-3 rounded-4 choice-card text-center h-100${isActive ? ' active' : ''}`}>
                  <Image src={`data:image/png;base64,${e.imagePath}`} alt={e.displayName} width={80} height={42} />
                  <p className="mb-0 text-center text-grey">
                    {e.displayName.split(':').map((line: string) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
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

export default VehicleCategory

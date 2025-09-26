'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { carUserDetailSlice } from '@/stores/redux/slices/carUserDetailSlice'
import Image from 'next/image'
import { getCompulsoryTypes } from '../../_actions'
import { prefillDataSlice } from '@/stores/redux/slices/prefillDataSlice'
import useLoading from '@/helpers/hooks/useLoading'

const VehicleCategory = ({ data }: { data: { channelData: any } }) => {
  const router = useRouter()
  const { openLoading, closeLoading } = useLoading()
  const dispatch = useDispatch()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [typeList, setTypeList] = useState<any[]>([])

  const fetchData = useCallback(async () => {
    try {
      openLoading()
      const res = await getCompulsoryTypes({ channelCode: data?.channelData?.channel?.channelCode })
      setTypeList(res?.data?.data?.compulsoryTypes ?? [])
    } catch (error) {
      console.error('Error fetching compulsory types:', error)
    } finally {
      closeLoading()
    }
  }, [data.channelData?.channel?.channelCode])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    dispatch(prefillDataSlice.actions.clearPrefillData())
    dispatch(carUserDetailSlice.actions.clearCarUserDetail())
  }, [dispatch])

  const handleVehicleCategory = async (type: any, idx: number) => {
    openLoading()
    setActiveIndex(idx)
    const vehicleCategory = {
      carTypeName: type.displayName,
      carTypeKey: type.carTypeKey,
      isEvType: type.isEvType,
    }
    dispatch(
      prefillDataSlice.actions.setPrefillData({
        channel: { channelOrderID: data?.channelData?.channel?.channelOrderID },
        productCmiDetail: vehicleCategory,
      }),
    )

    router.push(`/th/VehicleCategory`)
  }

  return (
    <div className="row vehicle">
      {typeList?.map((e: any, idx: number) => {
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
      })}
    </div>
  )
}

export default VehicleCategory

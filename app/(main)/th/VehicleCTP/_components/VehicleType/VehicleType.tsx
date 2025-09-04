'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { carUserDetailSlice } from '@/stores/redux/slices/carUserDetailSlice'
import Image from 'next/image'
import { getCompulsoryTypes } from '../../_actions'
import { prefillDataSlice } from '@/stores/redux/slices/prefillDataSlice'

const VehicleCategory = ({ data }: { data: { token: string; channelCode: string } }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [typeList, setTypeList] = useState<any[]>([])

  const fetchData = useCallback(async () => {
    try {
      const res = await getCompulsoryTypes({ token: data.token, channelCode: data.channelCode })
      setTypeList(res?.data?.data?.compulsoryTypes ?? [])
    } catch (error) {
      console.error('Error fetching compulsory types:', error)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    dispatch(prefillDataSlice.actions.clearPrefillData())
    dispatch(carUserDetailSlice.actions.clearCarUserDetail())
  }, [dispatch])

  const handleVehicleCategory = async (data: any, idx: number) => {
    setActiveIndex(idx)
    const vehicleCategory = {
      carTypeKey: data.carTypeKey,
      isEvType: data.isEvType,
    }
    dispatch(prefillDataSlice.actions.setPrefillData({ productCmiDetail: vehicleCategory }))

    router.push(`/th/VehicleCategory`)
    // try {
    //   await fetch('/api/v1/collect-vehicle-category', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ productCmiDetail: vehicleCategory }),
    //   })

    //   router.push(`/th/VehicleCategory`)
    // } catch (error) {
    //   console.error('Error in POST /api/v1/collect-vehicle-category:', error)
    // }
  }

  return (
    <div className="row vehicle">
      {typeList?.map((e: any, idx: number) => {
        const isActive = activeIndex === idx
        return (
          <div className="col-6 pe-2 mb-3" key={e.itemOrder}>
            <div
              className={`py-12 px-3 rounded-4 choice-card text-center h-100${isActive ? ' active' : ''}`}
              onClick={() => handleVehicleCategory(e, idx)}
            >
              <Image src={`data:image/png;base64,${e.imagePath}`} alt={e.displayName} width={80} height={42} />
              <p className="mb-0 text-center text-grey">
                {e.displayName.split(':').map((line: string, index: number) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default VehicleCategory

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { carUserDetailSlice } from '@/stores/redux/slices/carUserDetailSlice'
import Image from 'next/image'

interface VehicleListComponentProps {
  poCompulsoryTypes: any[]
}

const VehicleListComponent = ({ poCompulsoryTypes }: VehicleListComponentProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleVehicleCategory = async (data: any, idx: number) => {
    setActiveIndex(idx)
    const vehicleCategory = {
      displayName: data.displayName,
      carTypeKey: data.carTypeKey,
      categoryGroup: data.categoryGroup,
      isEvType: data.isEvType,
    }
    dispatch(carUserDetailSlice.actions.setCarUserDetail({ vehicleCategory }))

    try {
      await fetch('/api/v1/collect-vehicle-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...vehicleCategory }),
      })

      router.push(`/th/VehicleCategory`)
    } catch (error) {
      console.error('Error in POST /api/v1/collect-vehicle-category:', error)
    }
  }

  return (
    <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_showVehicle" className="row vehicle">
      {poCompulsoryTypes?.map((e: any, idx: number) => {
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

export default VehicleListComponent

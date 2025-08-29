'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const VehicleCategoryComponent = ({ compulsoryRates }: { compulsoryRates: any }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const router = useRouter()

  const handleCarInformation = async (data: any, idx: number) => {
    setActiveIndex(idx)
    const compulsoryData = {
      ...compulsoryRates[0],
      rates: compulsoryRates[0]?.rates[idx],
    }
    await fetch('/api/v1/collect-vehicle-rates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(compulsoryData),
    })
    router.push(`/th/CarInformation`)
  }
  return (
    <div
      id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCategory_showVehicleCategory"
      className="row seatamount-select mb-4"
    >
      {compulsoryRates[0]?.rates?.map((e: any, i: number) => {
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

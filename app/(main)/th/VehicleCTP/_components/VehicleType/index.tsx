'use client'

import dynamic from 'next/dynamic'

const VehicleType = dynamic(() => import('./VehicleType'), {
  ssr: false,
})

export default VehicleType

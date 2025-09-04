'use client'

import dynamic from 'next/dynamic'

const VehicleCategory = dynamic(() => import('./VehicleCategory'), {
  ssr: false,
})

export default VehicleCategory

'use client'

import dynamic from 'next/dynamic'

const OldVehicle = dynamic(() => import('./OldVehicle'), {
  ssr: false,
})

export default OldVehicle

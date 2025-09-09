'use client'

import dynamic from 'next/dynamic'

const CarInformation = dynamic(() => import('./Review'), {
  ssr: false,
})

export default CarInformation

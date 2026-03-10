'use client'
import dynamic from 'next/dynamic'

const CoverageCondition = dynamic(() => import('./CoverageCondition'), {
    ssr: false,
})

export default CoverageCondition
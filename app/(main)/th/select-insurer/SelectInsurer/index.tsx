'use client'
import dynamic from 'next/dynamic'

const SelectInsurer = dynamic(() => import('./SelectInsurer'), {
    ssr: false,
})

export default SelectInsurer
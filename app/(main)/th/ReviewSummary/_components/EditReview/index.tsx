'use client'

import dynamic from 'next/dynamic'

const EditReview = dynamic(() => import('./EditReview'), {
  ssr: false,
})

export default EditReview

/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const InsurerListComponent = () => {
  const router = useRouter()

  const handleIntroChannel = (e: React.MouseEvent<HTMLDivElement>) => {
    router.push(`/th/intro-channel`)
  }

  return (
    <>
      <div className="container pb-20" onClick={handleIntroChannel}>
        <img
          src="/cmisite/media/assets/insurers/viriyah.png"
          alt="viriyah"
          className="img-fluid d-block mx-auto mb-4"
          style={{ maxWidth: '60%', height: 'auto' }}
        />
      </div>
      <div className="container pb-20" onClick={handleIntroChannel}>
        <img
          src="/cmisite/media/assets/insurers/ergo.png"
          alt="ergo"
          className="img-fluid d-block mx-auto mb-4"
          style={{ maxWidth: '60%', height: 'auto' }}
        />
      </div>
    </>
  )
}

export default InsurerListComponent

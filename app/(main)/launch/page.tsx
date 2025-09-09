'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import LoadingComponent from '@/cmi-layout/components/loading'
import { useDispatch } from 'react-redux'

const LaunchPage = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const ck = searchParams.get('ck')
    const token = searchParams.get('token')

    if (!ck || !token) {
      return
    }

    setLoading(true)

    const fetchData = async () => {
      try {
        const res = await fetch('/api/v1/launch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ck, token }),
        })
        if (res?.ok) {
          router.push('/th/VehicleCTP')
        } else {
          console.error('Failed to fetch data.')
        }
        setLoading(false)
      } catch {
        console.error('Error fetching data.')
      }
    }

    fetchData()
  }, [searchParams, dispatch, router])

  return <main>{loading && <LoadingComponent />}</main>
}

export default LaunchPage

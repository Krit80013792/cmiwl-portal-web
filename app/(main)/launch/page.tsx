'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useLoading from '@/helpers/hooks/useLoading'

const LaunchPage = () => {
  const { openLoading, closeLoading } = useLoading()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const ck = searchParams.get('ck')
    const token = searchParams.get('token')

    if (!ck || !token) {
      return
    }

    openLoading()

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
          router.replace('/th/VehicleCTP')
        } else {
          console.error('Failed to fetch data.')
        }
      } catch {
        console.error('Error fetching data.')
      } finally {
        closeLoading()
      }
    }

    fetchData()
  }, [searchParams, router, openLoading, closeLoading])

  return <main></main>
}

export default LaunchPage

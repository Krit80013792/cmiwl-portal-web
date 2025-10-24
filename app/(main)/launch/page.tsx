'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useLoading from '@/helpers/hooks/useLoading'
import { useDispatch } from 'react-redux'
import { prefillDataSlice } from '@/stores/redux/slices/prefillDataSlice'

const LaunchPage = () => {
  const dispatch = useDispatch()
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
          const data = await res.json()
          dispatch(prefillDataSlice.actions.setPrefillData(data?.data?.prefill))
          router.replace('/th/VehicleCTP')
        } else {
          console.error('Failed to fetch data.')
          router.replace('https://app.tidlor.com/main')
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

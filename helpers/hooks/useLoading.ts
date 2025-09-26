'use client'

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadingSlice, LoadingState, selectLoading } from '@/stores/redux/slices/loadingSlice'
import type { ReduxDispatch } from '@/stores/redux/store'

export interface UseLoadingHook {
  openLoading: () => void
  closeLoading: () => void
  loading: LoadingState
}

const useLoading = (): UseLoadingHook => {
  const dispatch = useDispatch<ReduxDispatch>()
  const loading = useSelector(selectLoading)

  const openLoading = useCallback(() => {
    dispatch(loadingSlice.actions.show())
  }, [dispatch])

  const closeLoading = useCallback(() => {
    dispatch(loadingSlice.actions.hide())
  }, [dispatch])

  return {
    loading,
    openLoading,
    closeLoading,
  }
}

export default useLoading

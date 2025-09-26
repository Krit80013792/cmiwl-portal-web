import { useState, useCallback } from 'react'

export type ModalType = 'error' | 'success' | 'warning'

export interface ModalOptions {
  isOpen: boolean
  title?: string
  message?: string
  type?: ModalType
}

export function useModal(initial?: Omit<ModalOptions, 'isOpen'>) {
  const [modal, setModal] = useState<ModalOptions>({
    isOpen: false,
    ...initial,
  })

  const openModal = useCallback(
    (options?: Omit<ModalOptions, 'isOpen'>) => {
      setModal({ ...modal, ...options, isOpen: true })
    },
    [modal],
  )

  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, isOpen: false }))
  }, [])

  return { modal, openModal, closeModal }
}

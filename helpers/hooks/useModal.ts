import { useState, useCallback } from 'react'

export type ModalType = 'error' | 'success' | 'warning' | 'confirm' | 'info'

export interface ConfirmModalOptions {
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export interface ModalOptions {
  isOpen: boolean
  title?: string
  message?: string
  content?: React.ReactNode
  type?: ModalType
  confirmOptions?: ConfirmModalOptions
  hasImg?: boolean
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

  const openConfirmModal = useCallback(
    (options: {
      title?: string
      message?: string
      confirmText?: string
      cancelText?: string
      onConfirm?: () => void
      onCancel?: () => void
      hasImg?: boolean
    }) => {
      setModal({
        ...modal,
        isOpen: true,
        type: 'confirm',
        title: options.title,
        message: options.message,
        confirmOptions: {
          confirmText: options.confirmText,
          cancelText: options.cancelText,
          onConfirm: options.onConfirm,
          onCancel: options.onCancel,
        },
        hasImg: options.hasImg,
      })
    },
    [modal],
  )

  return { modal, openModal, closeModal, openConfirmModal }
}

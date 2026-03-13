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
  renderActions?: () => React.ReactNode
}

export function useModal(initial?: Omit<ModalOptions, 'isOpen'>) {
  const [modal, setModal] = useState<ModalOptions>({
    isOpen: false,
    ...initial,
  })

  const openModal = useCallback(
    (options?: Omit<ModalOptions, 'isOpen'>) => {
      setModal((prev) => ({ ...prev, ...options, isOpen: true }))
    },
    [],
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
      setModal((prev) => ({
        ...prev,
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
        renderActions: undefined,
      }))
    },
    [],
  )

  return { modal, openModal, closeModal, openConfirmModal }
}

import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Dialog } from 'primereact/dialog'

export type FormDialogProps = {}

export interface FormDialogConfig {
  title: string
  draggable: boolean
  children: React.ReactNode
}

export interface FormDialogRef {
  open: (configure: FormDialogConfig) => void
  close: () => void
}

const FormDialog = forwardRef<FormDialogRef, FormDialogProps>((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [config, setConfig] = useState<FormDialogConfig | null>(null)

  useImperativeHandle(
    ref,
    () => ({
      open: (configure: FormDialogConfig) => {
        setConfig(configure)
        setVisible(true)
      },
      close: () => setVisible(false),
    }),
    [],
  )

  const onHide = () => {
    setVisible(false)
  }

  return (
    <Dialog
      header={config?.title || 'Form Dialog'}
      visible={visible}
      style={{ width: '400px' }}
      modal
      onHide={onHide}
      draggable={config?.draggable}
    >
      {config?.children}
    </Dialog>
  )
})

export default FormDialog

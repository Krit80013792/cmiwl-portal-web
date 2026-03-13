import React from 'react'
import Link from 'next/link'
import { ModalOptions, ModalType } from '@/helpers/hooks/useModal'

const typeConfig: Record<ModalType, { imageSrc?: string; imageAlt: string; colorClass: string }> = {
  error: {
    imageSrc: '/assets/icon/icon-error.png',
    imageAlt: 'เกิดข้อผิดพลาด',
    colorClass: 'text-payment-3Terror',
  },
  success: {
    imageSrc: '/assets/icon/icon-success.png',
    imageAlt: 'สำเร็จ',
    colorClass: 'text-success',
  },
  warning: {
    imageSrc: '/assets/icon/warning.png',
    imageAlt: 'คำเตือน',
    colorClass: 'text-warning',
  },
  confirm: {
    imageSrc: '/assets/icon/icon-warning.png',
    imageAlt: 'ยืนยัน',
    colorClass: 'text-primary',
  },
  info: {
    imageSrc: '/assets/icon/system.svg',
    imageAlt: 'ข้อมูล',
    colorClass: 'text-info',
  },
}

interface Props extends ModalOptions {
  onClose: () => void
  callNumber?: string
}

const Modal: React.FC<Props> = ({
  isOpen,
  title = '',
  message = '',
  content = null,
  type = 'error',
  confirmOptions,
  onClose,
  callNumber,
  hasImg = true,
  renderActions,
}) => {
  if (!isOpen) return null

  const { imageSrc, imageAlt, colorClass } = typeConfig[type]

  const handleConfirm = () => {
    if (confirmOptions?.onConfirm) {
      confirmOptions.onConfirm()
    }
    onClose()
  }

  const handleCancel = () => {
    if (confirmOptions?.onCancel) {
      confirmOptions.onCancel()
    }
    onClose()
  }

  const renderButtons = () => {
    if (type === 'confirm') {
      return (
        <div className="d-flex">
          <button
            className="btn btn-secondary w-100 fs-6 d-flex justify-content-center align-items-center me-2"
            onClick={handleCancel}
            type="button"
          >
            <strong>{confirmOptions?.cancelText || 'ยกเลิก'}</strong>
          </button>
          <button
            className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center ms-2"
            onClick={handleConfirm}
            type="button"
          >
            <strong>{confirmOptions?.confirmText || 'ยืนยัน'}</strong>
          </button>
        </div>
      )
    } else if (type === 'info') {
      return (
        <div className="d-flex">
          <button
            className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center"
            onClick={onClose}
            type="button"
          >
            <strong>ตกลง</strong>
          </button>
        </div>
      )
    } else if (type === 'warning') {
      return (
        <div className="d-flex">
          <button
            className="btn btn-secondary w-100 fs-6 d-flex justify-content-center align-items-center me-2"
            onClick={handleCancel}
            type="button"
          >
            <strong>{confirmOptions?.cancelText || 'ยกเลิก'}</strong>
          </button>
          <button
            className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center ms-2 call-btn"
            onClick={() => {
              window.location.href = ''
              onClose()
            }}
            type="button"
          >
            <strong className="f-bd text-payment-3Terror-call">โทร</strong>
          </button>
        </div>
      )
    } else if (renderActions) {
      return renderActions()
    }

    // Original button logic for other modal types
    return (
      <div className="d-flex">
        <Link
          className="btn btn-secondary w-100 fs-6 d-flex justify-content-center align-items-center me-2 backtoMain-btn"
          href="https://app.tidlor.com/main"
        >
          กลับหน้าหลัก
        </Link>
        {callNumber ? (
          <button
            className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center ms-2 call-btn"
            onClick={() => {
              window.open(`tel:${callNumber}`, '_self')
              onClose()
            }}
            type="button"
          >
            <strong className="f-bd text-payment-3Terror-call">โทร</strong>
          </button>
        ) : (
          <button
            className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center ms-2 call-btn"
            onClick={onClose}
            type="button"
          >
            <strong className="f-bd text-payment-3Terror-call">ยกเลิก</strong>
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      className={`modal confirm-modal fade show`}
      style={{ display: 'block', backgroundColor: 'rgba(30, 30, 31, 0.80)' }}
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered mx-4 mx-sm-auto">
        <div className="modal-content rounded-4">
          <div className="modal-body pt-20 px-20 pb-20 text-center">
            {hasImg && <img className="img-fluid mb-2 mx-auto" alt={imageAlt} width="80" height="80" src={imageSrc} />}
            <h5 className={`text-black text-center fs-18 f-bd mb-2 ${colorClass}`}>
              {title.split(':').map((line, i) => {
                const key = `${line} + ${i}`
                return (
                  <React.Fragment key={key}>
                    {line}
                    <br />
                  </React.Fragment>
                )
              })}
            </h5>
            {message ? (
              <p className="text-black mb-20">
                {message.split(':').map((line, i) => {
                  const key = `${line} + ${i}`
                  return (
                    <React.Fragment key={key}>
                      {line}
                      <br />
                    </React.Fragment>
                  )
                })}
              </p>
            ) : (
              content
            )}
            <div className="mt-20">{renderButtons()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

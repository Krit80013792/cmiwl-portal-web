import React from 'react'
import Link from 'next/link'
import { ModalOptions, ModalType } from '@/helpers/hooks/useModal'

const typeConfig: Record<ModalType, { imageSrc: string; imageAlt: string; colorClass: string }> = {
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
    imageSrc: '/assets/icon/icon-warning.png',
    imageAlt: 'คำเตือน',
    colorClass: 'text-warning',
  },
}

interface Props extends ModalOptions {
  onClose: () => void
}

const Modal: React.FC<Props> = ({ isOpen, title = '', message = '', type = 'error', onClose }) => {
  if (!isOpen) return null

  const { imageSrc, imageAlt, colorClass } = typeConfig[type]

  return (
    <div className={`modal confirm-modal fade show`} style={{ display: 'block' }} aria-modal="true">
      <div className="modal-dialog modal-dialog-centered mx-4 mx-sm-auto">
        <div className="modal-content rounded-4">
          <div className="modal-body pt-20 px-20 pb-20 text-center">
            <img className="img-fluid mb-2 mx-auto" alt={imageAlt} width="80" height="80" src={imageSrc} />
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
            <p className="text-black mb-20">{message}</p>
            <div className="d-flex">
              <Link
                className="btn btn-secondary w-100 fs-6 d-flex justify-content-center align-items-center me-2 backtoMain-btn"
                href="https://app.tidlor.com/main"
              >
                กลับหน้าหลัก
              </Link>
              <button
                className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center ms-2 call-btn"
                onClick={onClose}
              >
                <strong className="f-bd text-payment-3Terror-call">ยกเลิก</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

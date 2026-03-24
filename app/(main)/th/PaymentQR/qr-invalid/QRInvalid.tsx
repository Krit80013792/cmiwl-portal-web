'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const QRError = () => {
  const router = useRouter()

  const handleRetry = () => {
    router.replace('/th/PaymentQR')
  }

  const handleChangeChannel = () => {
    router.replace('/th/PaymentChannel')
  }

  return (
    <div className="content-section fullPage-92">
      <div className="container d-flex flex-column align-items-center justify-content-center" style={{ maxWidth: '384px', minHeight: '100vh' }}>
        <div className="text-center">
          <div>
            <Image alt="QR Error" width={64} height={64} src="/assets/icon/system.svg" />
          </div>
          <p className="mb-1" style={{ fontSize: '18px', fontWeight: 700, color: '#1E1E1F', lineHeight: '26px' }}>
            QR Code หมดอายุแล้ว
          </p>
        </div>

        <div className="w-100 mt-2">
          <button
            type="button"
            onClick={handleRetry}
            className="btn btn-primary w-100 mb-2 d-flex align-items-center justify-content-center"
            style={{ height: '48px', borderRadius: '12px', backgroundColor: '#3F74F5' }}
          >
            <span style={{ fontSize: '16px', fontWeight: 600 }}>ขอใหม่อีกครั้ง</span>
          </button>
          <button
            type="button"
            onClick={handleChangeChannel}
            className="btn w-100 d-flex align-items-center justify-content-center"
            style={{
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#EEF2FF',
              borderColor: '#EEF2FF',
              color: '#3F74F5',
              fontWeight: 600,
            }}
          >
            <span style={{ fontSize: '16px' }}>เปลี่ยนช่องทางชำระเงิน</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default QRError


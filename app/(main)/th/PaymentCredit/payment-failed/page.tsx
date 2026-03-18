'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const PaymentFailedPage = () => {
    const router = useRouter()

    const handleGoToPaymentChannel = () => {
        router.replace('/th/PaymentChannel')
    }

    return (
        <div className="content-section fullPage-92">
            <div
                className="container d-flex flex-column align-items-center justify-content-center"
                style={{ maxWidth: '384px', minHeight: '100vh' }}
            >
                <div className="text-center">
                    <div style={{ marginBottom: '16px' }}>
                        <Image alt="warning" width={64} height={64} src="/assets/icon/system.svg" />
                    </div>
                    <p
                        className="mb-1"
                        style={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: '#1E1E1F',
                            lineHeight: '26px',
                        }}
                    >
                        ชำระเงินไม่สำเร็จ
                    </p>
                    <p className="mb-4" style={{ fontSize: '15px', color: '#414243' }}>
                        กรุณาลองใหม่อีกครั้งหรือเปลี่ยนช่องทาง
                        <br />
                        การชำระอื่น
                    </p>
                </div>

                <div className="w-100 mt-2">
                    <button
                        type="button"
                        onClick={handleGoToPaymentChannel}
                        className="btn btn-primary w-100 mb-2 d-flex align-items-center justify-content-center"
                        style={{ height: '48px', borderRadius: '12px', backgroundColor: '#3F74F5' }}
                    >
                        <span style={{ fontSize: '16px', fontWeight: 600 }}>ทำรายการอีกครั้ง</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentFailedPage


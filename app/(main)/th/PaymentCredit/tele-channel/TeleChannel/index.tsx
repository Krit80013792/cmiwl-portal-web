
'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from 'primereact/button'
import Modal from '@/cmi-layout/components/Modal'
import { useModal } from '@/helpers/hooks/useModal'
import { useRouter } from 'next/navigation'

const PaymentCreditTeleChannel = () => {
    const [cooldown, setCooldown] = useState<number>(0)
    const { modal, openModal, closeModal } = useModal()
    const router = useRouter()

    const handleCheckPaymentStatus = useCallback(async () => {
        closeModal()
        //todo: implement checkPaymentStatus API
        const paymentSuccess = false
        if (!paymentSuccess) {
            openModal({
                type: 'info',
                hasImg: false,
                title: '',
                content: (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingLeft: 24,
                            paddingRight: 24,
                            fontWeight: 700,
                            fontSize: '18px',
                            color: '#1E1E1F',
                            gap: 16,
                        }}
                    >
                        <Image src="/assets/icon/system.svg" alt="system" width={54} height={54} />
                        <div>
                            <div>ไม่พบรายการชำระเงิน</div>
                            <div style={{ fontSize: 15, color: '#414243', fontWeight: '400' }}>กรุณาตรวจสอบการชำระเงินอีกครั้ง</div>
                        </div>
                        <Button
                            type="button"
                            className="btn w-100 d-flex text-center align-items-center justify-content-center"
                            style={{
                                padding: '8px 24px',
                                height: '48px',
                                borderRadius: '12px',
                                backgroundColor: '#3F74F5',
                                color: '#FFFFFF',
                            }}
                            onClick={handleCheckPaymentStatus}
                        >ตรวจสอบการชำระเงินอีกครั้ง</Button>
                        <Button
                            type="button"
                            className="btn w-100 d-flex text-center align-items-center justify-content-center"
                            style={{
                                padding: '8px 24px',
                                height: '48px',
                                borderRadius: '12px',
                                backgroundColor: '#DBE7FE',
                                color: '#3F74F5',
                            }}
                            onClick={closeModal}
                        >ปิด</Button>
                    </div >
                ),
            })
            return
        }
        router.replace('/th/PaymentCredit/success')
        return


    }, [openModal, router])

    const handleResendSms = useCallback(() => {
        if (cooldown > 0) return
        // TODO: Implement resend SMS API integration when available
        setCooldown(30)
    }, [cooldown])

    useEffect(() => {
        if (cooldown <= 0) return

        const timer = setInterval(() => {
            setCooldown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [cooldown])


    return (
        <section id="payment-credit-tele-channel">
            <div className="content-section fullPage-92 pt-48">
                <Modal {...modal} onClose={closeModal} />
                <div className="container text-center py-48" style={{ maxWidth: 420 }}>
                    <div className="d-flex justify-content-center mb-4">
                        <Image alt="hour-glass" width={89} height={80} src="/assets/icon/hour-glass.svg" />
                    </div>

                    <h1 className="f-bd mb-1" style={{ fontSize: 20, color: '#1E1E1F' }}>
                        รอลูกค้าชำระเงิน
                    </h1>
                    <p className="mb-4 fs-14 text-muted" style={{ color: '#616166' }}>
                        ผ่านบัตรเครดิต/บัตรเดบิต
                    </p>

                    <div
                        className="rounded-4 text-start mx-auto mb-4"
                        style={{
                            backgroundColor: '#EFF5FF',
                            padding: '16px 20px',
                            borderRadius: '16px'
                        }}
                    >
                        <p className="mb-1 fs-14" style={{ color: '#1E1E1F', fontWeight: 600 }}>

                            {/* //todo: พ.ร.บ  */}
                            พ.ร.บ. {'รถโดยสารไม่เกิน 7 ที่นั่ง'}
                        </p>
                        <p className="mb-2 fs-16 d-flex justify-content-between" style={{ color: '#616166' }}>
                            <span>
                                เลขทะเบียน
                            </span>
                            <span style={{ fontWeight: 600, color: '#414243' }}>

                                {/* // todo: licenseText */}
                                {'2ขข2222'}</span>
                        </p>
                        <div
                            className="d-flex justify-content-between align-items-center"
                            style={{ borderTop: '1px solid #DDDDEF', paddingTop: '16px', color: '#2652EA' }}
                        >
                            <span className="fs-16" style={{ color: '#616166' }}>
                                ยอดที่ต้องชำระ
                            </span>
                            <div>
                                <span className="f-bd" style={{ fontSize: 24 }}>
                                    {/* //todo: paymentTotal */}
                                    {'645.21'}
                                </span>
                                <span className="fs-16 f-bd" style={{ marginLeft: 4 }}>บาท</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3 fs-14" style={{ color: '#1E1E1F' }}>
                        <span>ส่งลิงก์ชำระเงินผ่าน SMS ไปยังเบอร์ </span>
                        {/* //todo: sms number */}
                        <span style={{ fontWeight: 700 }}>
                            {'081-234-5678'}
                        </span>
                        <br />
                        <div style={{ fontSize: 12, fontWeight: 400, color: '#616166' }}>
                            หากลูกค้ายังไม่ได้รับ สามารถกดส่งใหม่อีกครั้งให้ที่ปุ่มด้านล่าง
                        </div>
                    </div>

                    <Button
                        type="button"
                        outlined
                        style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: cooldown === 0 ? '1px solid #9C9DA0' : 'none',
                            marginBottom: '24px',
                            backgroundColor: cooldown === 0 ? '' : '#DDDDDF',
                        }}
                        onClick={handleResendSms}
                        disabled={cooldown > 0}
                    >
                        {cooldown > 0 ? (
                            <span> กดส่ง SMS ได้อีก 0:{cooldown} วินาที</span>
                        )
                            : (
                                <span>กดส่ง SMS ให้ลูกค้าอีกครั้ง</span>
                            )
                        }
                    </Button>

                    <Button
                        type="button"
                        className="btn btn-primary w-100 d-flex text-center align-items-center justify-content-center"
                        style={{
                            padding: '12px',
                            borderRadius: '12px',
                            backgroundColor: '#3F74F5',
                            fontSize: '18px',
                            fontWeight: 600,
                        }}
                        onClick={handleCheckPaymentStatus}
                    >
                        ตรวจสอบผลการชำระเงิน
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default PaymentCreditTeleChannel
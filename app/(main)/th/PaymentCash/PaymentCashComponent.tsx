'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

const PaymentCashComponent: React.FC = () => {
    const [amount] = useState<number>(645.21)
    const [cash, setCash] = useState<number>(0)
    const router = useRouter()

    const change = useMemo(() => cash - amount, [cash, amount])
    const isConfirmDisabled = change < 0

    const handleConfirmClick = () => {
        router.push('/th/PaymentCash/success')
    }

    return (
        <div className="content-section bg-lightgrey" style={{ minHeight: '100vh' }}>
            <div className="py-24" style={{ paddingTop: '32px', maxWidth: 384, margin: '0 auto' }}>
                <h2
                    className="mb-3"
                    style={{ fontWeight: 700, fontSize: '20px', color: '#1E1E1F' }}
                >
                    ชำระเงิน
                </h2>
                <div
                    className="rounded-4"
                    style={{
                        backgroundColor: '#EFF5FF',
                        border: '16px solid #EFF5FF',
                        padding: '16px',
                        marginBottom: '16px',
                    }}
                >
                    <p className="mb-1" style={{ fontWeight: 700, fontSize: 16, color: '#414243' }}>
                        พ.ร.บ. รถโดยสารไม่เกิน 7 ที่นั่ง
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            columnGap: '16px',
                            alignItems: 'center',
                            marginBottom: '4px',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span style={{ fontSize: 16, color: '#414243' }}>เลขทะเบียน</span>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#414243' }}>2ขข2222</span>
                    </div>
                    <hr className="my-3" style={{ borderColor: '#DDDDDF' }} />
                    <div className="d-flex justify-content-between align-items-center">
                        <span style={{ fontSize: 16, color: '#414243' }}>ยอดที่ต้องชำระ</span>
                        <div>
                            <span className="f-bd" style={{ color: '#2652EA', fontSize: 24 }}>
                                {amount.toFixed(2)}
                            </span>
                            <span className="f-bd" style={{ color: '#2652EA', fontSize: 16, marginLeft: 4 }}>
                                บาท
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <p
                        className="mb-2 f-bd"
                        style={{ fontSize: 16, color: '#1E1E1F' }}
                    >
                        จำนวนเงินที่รับชำระ
                    </p>
                    <div
                        className="rounded-4 px-3 d-flex align-items-center justify-content-end"
                        style={{
                            border: '1px solid #D7D7DB',
                            height: 53,
                            backgroundColor: '#ffffff',
                        }}
                    >
                        <input
                            name="cash"
                            type="number"
                            inputMode="decimal"
                            className="border-0 text-end w-100"
                            style={{
                                fontSize: 32,
                                color: '#1E1E1F',
                                fontWeight: 700,
                                outline: 'none',
                                boxShadow: 'none',
                                backgroundColor: 'transparent',
                            }}
                            value={Number.isNaN(cash) ? '' : cash}
                            onChange={(event) => {
                                let next = event.target.value
                                // Remove leading zeros, but preserve "0" and decimals
                                if (/^0[0-9]+/.test(next)) {
                                    next = next.replace(/^0+/, '')
                                    if (next === '') next = '0'
                                }
                                const numeric = next === '' ? 0 : Number(next)
                                setCash(Number.isNaN(numeric) ? 0 : numeric)
                            }}
                        />
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <span style={{ fontSize: 16, color: '#414243' }}>เงินทอน</span>
                        <div>
                            <span style={{ fontSize: 24, fontWeight: 700, color: '#1E1E1F' }}>
                                {change.toFixed(2)}
                            </span>
                            <span style={{ fontSize: 12, color: '#414243', marginLeft: 4 }}>บาท</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        className="btn mb-3 fs-6 f-bd"
                        style={{
                            width: 'fit-content',
                            padding: '8px 24px',
                            height: 48,
                            borderRadius: 12,
                            backgroundColor: '#E4EEFF',
                            color: '#045ffc',
                            border: 'none',
                        }}
                        onClick={() => setCash(amount)}
                    >
                        <span style={{ fontSize: 18, fontWeight: 600, color: '#3F74F5' }}>ชำระพอดี</span>
                    </button>
                </div>

                <button
                    type="button"
                    className="btn w-100 fs-6 f-bd"
                    style={{
                        height: 48,
                        borderRadius: 12,
                        backgroundColor: isConfirmDisabled ? '#B5C5F7' : '#3F74F5',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: 18,
                        fontWeight: 600,
                    }}
                    disabled={isConfirmDisabled}
                    onClick={handleConfirmClick}
                >
                    ยืนยันการชำระเงิน
                </button>
            </div>
        </div>
    )
}

export default PaymentCashComponent
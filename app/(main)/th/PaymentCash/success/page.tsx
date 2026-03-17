'use client'
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "primereact/button";
import React from "react";

// Dummy data to replace data? usage, to make this standalone and fix reference errors.
// In real usage, receive these as props or via selector/hook.
const dummyData = {
    channel: {
        isPolicyEmail: true,
        isPolicySms: true,
    },
    deliveryType: {
        isEmail: true,
        isSms: true,
        policyEmail: "user@email.com",
        policySms: "0812345678",
    },
};

const PaymentCashSuccess: React.FC = () => {
    const route = useRouter();
    const data = dummyData; // replace with real data if available

    return (
        <div className="container fullPage-92">
            <div
                className="content-section fullPage-92"
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 0,
                    paddingBottom: 0,
                }}
            >
                <div className="container text-center my-4" style={{ width: '100%', maxWidth: 500 }}>
                    {/* Success Icon */}
                    <div className="d-flex justify-content-center mb-4">
                        <Image alt="Success" width="80" height="80" src="/assets/icon/icon-success.png" />
                    </div>

                    {/* Success Message */}
                    <h1 className="f-bd mb-3" style={{ color: '#1E1E1F', fontSize: '18px' }}>
                        ขอบคุณที่ซื้อประกันกับเรา
                    </h1>

                    {/* Email Confirmation Box */}
                    <div className="rounded-4 p-4 mb-3 mx-auto" style={{ maxWidth: '500px', backgroundColor: '#EFF5FF' }}>
                        <>
                            <p className="text-start text-dark mb-2 fs-14" style={{ fontWeight: 600 }}>ช่องทางรับเอกสารและกรมธรรม์</p>
                            <section id="delivery-type-container" style={{ overflowWrap: 'anywhere' }}>
                                <div style={{ display: 'flex', gap: 4 }}>
                                    <Image src="/assets/icon/email-solid.svg" alt="email-solic" width={16} height={16} />
                                    <div>
                                        <div className="mb-1 fs-14" style={{ color: '#1E1E1F', fontWeight: '600' }}>
                                            อีเมล (ภายใน 15 นาที)
                                        </div>
                                        <div className="text-muted fs-14 mb-0" style={{ color: '#616166', textAlign: 'start' }}>
                                            {data?.deliveryType?.isEmail ? data?.deliveryType?.policyEmail : '–'}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid #DDD', margin: '12px 0' }}></div>
                                <div style={{ display: 'flex', gap: 4 }}>
                                    <Image src="/assets/icon/pin-solid.svg" alt="email-solic" width={16} height={16} />
                                    <div>
                                        <div className="mb-1 fs-14" style={{ color: '#1E1E1F', fontWeight: '600', textAlign: 'start' }}>
                                            ที่อยู่จัดส่ง (ภายใน 15 วัน)
                                        </div>
                                        <div className="text-muted fs-14 mb-0" style={{ color: '#616166', textAlign: 'start' }}>
                                            address mock texttttttttttttttttt
                                        </div>

                                    </div>
                                </div>
                            </section>
                        </>
                    </div>

                    <Button
                        type="button"
                        outlined
                        className="btn fs-6 d-flex align-items-center justify-content-center w-100"
                        style={{ height: '48px', backgroundColor: '#3F74F5', borderRadius: '12px', color: '#FFFFFF' }}
                        onClick={() => route.push('/th/VehicleCTP')}
                    >
                        กลับหน้าหลัก
                    </Button>
                </div>

            </div>

        </div>
    );
};

export default PaymentCashSuccess;
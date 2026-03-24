import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'
import MainWithDynamicStyle from '@/cmi-layout/components/MainWithDynamicStyle'

export default async function MaintenancePage() {
    const { channelData } = await getDataFromSession()

    let configValue: any = {}
    try {
        configValue = JSON.parse(channelData?.channelConfig?.configValue ?? '{}')
    } catch {
        configValue = {}
    }

    return (
        <MainWithDynamicStyle primaryColor={configValue?.primaryColor} secondaryColor={configValue?.secondaryColor}>
            <div style={{ height: '100vh' }} className="container pt-48 text-center position-relative d-flex justify-content-center flex-column">
                <div className="mx-auto rounded-4 shadow-sm p-3 bg-white position-relative" style={{ maxWidth: 328 }}>
                    {/* top-left maintenance illustration */}
                    <div className="position-absolute" style={{ left: -24, top: -32 }}>
                        <Image
                            className="img-fluid"
                            alt="maintenance"
                            width={113}
                            height={93}
                            src="/assets/icon/icon_maintenance.svg"
                        />
                    </div>

                    <div className="px-3 pt-4 pb-3 rounded-4">
                        <p className="text-center f-bd fs-20 mb-0 text-primary">
                            ขอเวลาแป๊บเดียว
                            <br />
                            เรากำลังปรับปรุงระบบให้ดีขึ้น
                        </p>

                        <div
                            className="mt-3 rounded-3"

                            style={{
                                background:
                                    'linear-gradient(150deg, #62aeff 0%, #ff67c2 35%, #959aff 75%, #62efff 100%)',
                                padding: '2px'
                            }}
                        >
                            <div className="bg-white rounded-3 px-3 py-2">
                                <p style={{ fontWeight: 600 }} className="text-center fs-18 f-bd mb-0">
                                    โดยลูกค้าสามารถซื้อ พ.ร.บ.
                                    <br />
                                    ผ่านสาขาเงินติดล้อได้ตามปกติ
                                    <br />
                                    ขออภัยในความไม่สะดวก
                                </p>
                            </div>
                        </div>

                        <div className="mt-3">
                            {/* //TODO: recheck redirect href path */}
                            <Link className="btn btn-primary fs-6 d-flex justify-content-center align-items-center w-100" href="/">
                                <strong className="f-bd">ค้นหาสาขา</strong>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainWithDynamicStyle>
    )
}

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'
import MainWithDynamicStyle from '@/cmi-layout/components/MainWithDynamicStyle'

export default async function RenewalErrorPage() {
    const { channelData } = await getDataFromSession()

    let configValue: any = {}
    try {
        configValue = JSON.parse(channelData?.channelConfig?.configValue ?? '{}')
    } catch {
        configValue = {}
    }

    return (
        <MainWithDynamicStyle primaryColor={configValue?.primaryColor} secondaryColor={configValue?.secondaryColor}>
            <div style={{ height: '100vh' }} className="container fullPage-72 pt-48 text-center position-relative d-flex justify-content-center flex-column">
                <div>
                    <Image
                        className="img-fluid mb-12"
                        alt="ไม่สามารถทำรายการได้"
                        width={80}
                        height={80}
                        src="/assets/icon/warning.png"
                    />
                    <p className="text-center f-bd fs-18 mb-2">ไม่สามารถทำรายการได้</p>
                    <p style={{ marginBottom: '24px' }} className="text-center">เนื่องจากตรวจสอบไม่พบบัตรนายหน้า</p>

                    {/* //todo: recheck redirect href path */}
                    <Link className="btn btn-primary fs-6 d-flex justify-content-center align-items-center mx-auto mb-0" href="/">
                        <strong className="f-bd">กลับสู่หน้าหลัก</strong>
                    </Link>
                </div>
            </div>
        </MainWithDynamicStyle>
    )
}

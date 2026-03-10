import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'
import MainWithDynamicStyle from '@/cmi-layout/components/MainWithDynamicStyle'
import '@/public/themes/cmi/css/global.css'
import '@/public/themes/cmi/css/fontface.css'
import '@/public/themes/cmi/css/style-default.css'
import '@/public/custom/plugin/bootstrap/bootstrap.min.css'




export default async function Custom404() {
  const { channelData } = await getDataFromSession()

  let configValue: Record<string, unknown> = {}
  try {
    configValue = JSON.parse(channelData?.channelConfig?.configValue ?? '{}') as Record<string, unknown>
  } catch {
    configValue = {}
  }

  return (
    <MainWithDynamicStyle primaryColor={configValue?.primaryColor as string} secondaryColor={configValue?.secondaryColor as string}>
      <main>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }} className="page-404">
          <div style={{ marginBottom: '8px' }} className="text-center">
            <Image
              src="/assets/not-found/404.svg"
              alt="404"
              width={328}
              height={116}
              priority
              className="img-fluid mb-3"
            />
          </div>
          <h1 className="f-bd mb-12" style={{ color: '#3F74F5', fontSize: '20px' }}>ขออภัย ไม่พบหน้าที่คุณต้องการ</h1>
          <p className="fs-16 text-caption mb-24" style={{ color: '#414243' }}>
            ลองตรวจสอบลิงก์ของคุณอีกครั้ง
          </p>

          {/* //todo: recheck redirect href path */}
          <Link
            href="/"
            style={{ fontSize: '18px', borderRadius: '12px', height: '48px' }}
            className="btn btn-primary  d-flex justify-content-center align-items-center mx-auto mb-4"
          >
            กลับหน้าหลัก
          </Link>
        </div>
      </main>
    </MainWithDynamicStyle>
  )
}

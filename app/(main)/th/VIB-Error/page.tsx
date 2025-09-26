/* eslint-disable @next/next/no-img-element */

import React from 'react'
import Image from 'next/image'
import { Button } from 'primereact/button'
import Link from 'next/link'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'
import MainWithDynamicStyle from '@/cmi-layout/components/MainWithDynamicStyle'

export default async function VIBError() {
  const { channelData } = await getDataFromSession()

  let configValue: any = {}
  try {
    configValue = JSON.parse(channelData?.channelConfig?.configValue ?? '{}')
  } catch {
    configValue = {}
  }

  return (
    <MainWithDynamicStyle primaryColor={configValue?.primaryColor} secondaryColor={configValue?.secondaryColor}>
      <div className="modal confirm-modal fade" aria-labelledby="seviceErrorModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered mx-4 mx-sm-auto">
          <div className="modal-content rounded-4">
            <div className="modal-body pt-20 px-20 pb-20 text-center">
              <Image
                className="img-fluid mb-2 mx-auto"
                alt="ไม่สำเร็จ"
                width="80"
                height="80"
                src="/cmisite/media/assets/icon-error.svg"
              />
              <h5 className="text-black fs-18 f-bd mb-2">
                ขออภัย
                <br />
                ไม่สามารถทำรายการได้ในขณะนี้
              </h5>
              <p className="text-lightgrey text-center mb-20">กรุณาทำรายการใหม่ภายหลัง</p>
              <div>
                <Button
                  className="btn btn-primary w-100 fs-6 d-flex align-items-center justify-content-center me-2 me-2"
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <strong className="f-bd">กลับสู่หน้าหลัก</strong>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container fullPage-72 pt-48 text-center position-relative d-flex justify-content-center flex-column">
        <div>
          <Image className="img-fluid mb-12" alt="Failed" width="80" height="80" src="/assets/icon/error-page.png" />
          <p className="text-center f-bd fs-18 mb-12">
            ขออภัย
            <br />
            ไม่สามารถทำรายการได้ในขณะนี้
          </p>
          <p className="text-center mb-0">กรุณาทำรายการใหม่ภายหลัง</p>
        </div>
      </div>

      <div className="container pb-20">
        <Link className="btn btn-primary fs-6 d-flex justify-content-center align-items-center mx-auto mb-0" href="/">
          <strong className="f-bd">กลับหน้าหลัก</strong>
        </Link>
      </div>
    </MainWithDynamicStyle>
  )
}

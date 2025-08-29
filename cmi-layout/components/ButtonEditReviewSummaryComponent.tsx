/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  readonly psAction: string
}

export default function ButtonEditReviewSummaryComponent({ psAction }: Props) {
  const router = useRouter()

  console.log(psAction)

  const handleCarInformation = (e: React.MouseEvent<HTMLDivElement>) => {
    router.push(`/th/CarInformation`)
  }

  return (
    <>
      <a data-bs-toggle="modal" data-bs-target="#CtpEditModal" data-cf-modified-0e017922931d765566c39c08-="">
        <img className="img-fluid me-1" alt="แก้ไข" width="63" height="24" src="/assets/icon/edit-text.png" />
      </a>

      <div
        className="modal confirm-modal fade"
        id="CtpEditModal"
        aria-labelledby="CtpEditModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered mx-4 mx-sm-auto">
          <div className="modal-content rounded-4">
            <div className="modal-body pt-20 px-20 pb-20">
              <h5 className="text-black text-center fs-18 f-bd mb-20">คุณต้องการแก้ไขข้อมูล</h5>
              <div className="d-flex">
                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; cancelEditOnclick()" */}
                <a
                  className="btn btn-secondary w-100 fs-6 d-flex justify-content-center align-items-center me-2 closePopup-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  data-cf-modified-0e017922931d765566c39c08-=""
                >
                  <strong className="f-bd">ยกเลิก</strong>
                </a>
                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return editOnclick();" */}
                <input
                  type="submit"
                  name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$ReviewSummary$btnEditData"
                  value="แก้ไข"
                  id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_btnEditData"
                  className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center ms-2 confirm-btn"
                  data-cf-modified-0e017922931d765566c39c08-=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

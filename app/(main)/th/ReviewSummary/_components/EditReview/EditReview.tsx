'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from 'primereact/button'
import { useModal } from '@/helpers/hooks/useModal'
import Modal from '@/cmi-layout/components/Modal'

interface Props {
  readonly psAction: string
}

export default function EditReview({ psAction }: Props) {
  const { modal, closeModal, openConfirmModal } = useModal()
  const router = useRouter()

  const handleBackToEdit = () => {
    openConfirmModal({
      title: 'คุณต้องการแก้ไขข้อมูลหรือไม่?',
      confirmText: 'แก้ไข',
      cancelText: 'ยกเลิก',
      hasImg: false,
      onConfirm: () => {
        switch (psAction) {
          case 'vehicle_category':
            router.push('/th/VehicleCategory')
            break
          case 'coverage_date':
          case 'car_info':
            router.push('/th/CarInformation')
            break
          case 'customer_info':
            router.push('/th/CustomerInformation')
            break
        }
      },
    })
  }

  return (
    <>
      <Button onClick={handleBackToEdit} className="p-button-text p-button-plain p-0">
        <img className="img-fluid me-1" alt="แก้ไข" width="63" height="24" src="/assets/icon/edit.svg" />
      </Button>
      <Modal {...modal} onClose={closeModal} />

      <div className="modal confirm-modal fade" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered mx-4 mx-sm-auto">
          <div className="modal-content rounded-4">
            <div className="modal-body pt-20 px-20 pb-20">
              <h5 className="text-black text-center fs-18 f-bd mb-20">คุณต้องการแก้ไขข้อมูล</h5>
              <div className="d-flex">
                <button
                  className="btn btn-secondary w-100 fs-6 d-flex justify-content-center align-items-center me-2 closePopup-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <strong className="f-bd">ยกเลิก</strong>
                </button>
                <input
                  type="submit"
                  name="editData"
                  value="แก้ไข"
                  className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center ms-2 confirm-btn"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

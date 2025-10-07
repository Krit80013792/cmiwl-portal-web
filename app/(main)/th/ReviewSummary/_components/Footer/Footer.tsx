'use client'

import Modal from '@/cmi-layout/components/Modal'
import { useModal } from '@/helpers/hooks/useModal'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { saveCustomerInformation } from '../../_actions'
import { useRouter } from 'next/navigation'
import useLoading from '@/helpers/hooks/useLoading'

const Footer = () => {
  const route = useRouter()
  const prefillData = useSelector((state: any) => state.prefillData)
  const [prefill, setPrefill] = useState<any>({})
  const { modal, openModal, closeModal } = useModal()
  const { openLoading, closeLoading } = useLoading()

  useEffect(() => {
    setPrefill(prefillData)
  }, [prefillData])

  const handleSubmitForm = async () => {
    try {
      openLoading()
      const params = {
        data: {
          channel: {
            channelOrderID: prefill?.channel?.channelOrderID,
          },
          productCmiDetail: {
            carTypeKey: prefill?.productCmiDetail?.carTypeKey,
            isEvType: prefill?.productCmiDetail?.isEvType,
            subCarType: prefill?.productCmiDetail?.subCarType,
            cmiCarTypeCode: prefill?.productCmiDetail?.cmiCarTypeCode,
            carBrandId: prefill?.productCmiDetail?.carBrandId,
            carModelName: prefill?.productCmiDetail?.carModelName,
            carColorId: prefill?.productCmiDetail?.carColorId,
            chassisNumber: prefill?.productCmiDetail?.chassisNumber,
            isRedLicense: prefill?.productCmiDetail?.isRedLicense,
            licensePrefix: prefill?.productCmiDetail?.licensePrefix,
            licenseNo: prefill?.productCmiDetail?.licenseNo,
            yearCoverage: prefill?.productCmiDetail?.yearCoverage,
            monthCoverage: prefill?.productCmiDetail?.monthCoverage,
            dayCoverage: prefill?.productCmiDetail?.dayCoverage,
            registrationYear: prefill?.productCmiDetail?.registrationYear,
            registrationProvinceId: prefill?.productCmiDetail?.registrationProvinceId,
          },
          customer: {
            taxId: prefill?.customer?.taxId,
            firstName: prefill?.customer?.firstName,
            lastName: prefill?.customer?.lastName,
            title: prefill?.customer?.title,
            birthDay: prefill?.customer?.birthDay,
            birthMonth: prefill?.customer?.birthMonth,
            birthYear: prefill?.customer?.birthYear,
          },
          personalInfo: {
            telephoneNo: prefill?.personalInfo?.telephoneNo,
            email: prefill?.personalInfo?.email,
          },
          customerAddress: {
            houseNumber: prefill?.customerAddress?.houseNumber,
            villageNo: prefill?.customerAddress?.villageNo,
            buildingVillage: prefill?.customerAddress?.buildingVillage,
            alley: prefill?.customerAddress?.alley,
            street: prefill?.customerAddress?.street,
            zipCode: prefill?.customerAddress?.zipCode,
            provinceId: prefill?.customerAddress?.provinceId,
            districtId: prefill?.customerAddress?.districtId,
            subDistrictId: prefill?.customerAddress?.subDistrictId,
          },
        },
      }
      const res = await saveCustomerInformation({ body: params })
      if (res?.data?.data) {
        route.push('/th/PaymentChannel')
      } else {
        openModal({
          type: 'error',
          title: 'ขออภัย:ไม่สามารถทำรายการได้ในขณะนี้',
          message: `กรุณาทำรายการใหม่ภายหลัง:หรือติดต่อเจ้าหน้าที่หากพบปัญหาการใช้งาน:(เลขที่อ้างอิง ${prefillData?.channel?.channelOrderID || '-'})`,
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      closeLoading()
    }
  }

  return (
    <>
      <Modal {...modal} onClose={closeModal} />
      <div className="btn-footer-wraper bg-white text-center d-flex justify-content-between">
        <div className="container d-flex justify-content-between">
          <div className="total-price text-grey">
            <p className="mb-0 text-start f-md">ยอดชำระ</p>
            <span className="mb-0 text-start f-bd fs-26">{prefill?.productCmiDetail?.cmiCoverage?.total}</span>
            <span className="fs-6 f-bd"> บาท</span>
          </div>
          <button
            onClick={handleSubmitForm}
            className="btn btn-primary submit-summary fs-6 d-flex justify-content-center align-items-center me-0"
          >
            <strong>ยืนยัน</strong>
          </button>
        </div>
      </div>
    </>
  )
}

export default Footer

'use client'

import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import 'dayjs/locale/th'
import { convertStrToFormat } from '@/helpers/functions/utils'
dayjs.locale('th')

const Review = ({ reviewType }: { reviewType: string }) => {
  const prefillData = useSelector((state: any) => state.prefillData)
  const [prefill, setPrefill] = useState<any>({})

  useEffect(() => {
    setPrefill(prefillData)
  }, [prefillData])

  switch (reviewType) {
    case 'vehicle_category':
      return (
        <div className="info-box bg-lightgrey rounded-4 pt-12 px-3 pb-12 mb-4">
          <div className="d-flex justify-content-between mb-12">
            <span className="f-md text-grey">ประเภทรถ</span>
            <span className="f-bd text-grey">{prefill?.productCmiDetail?.carTypeName?.replace(':', '/')}</span>
          </div>
          <div className="d-flex justify-content-between mb-0">
            <span className="f-md text-grey">ประเภทการใช้รถ</span>
            <span className="f-bd text-grey">{prefill?.productCmiDetail?.compulsoryText}</span>
          </div>
        </div>
      )
    case 'car_info':
      return (
        <div className="info-box bg-lightgrey rounded-4 pt-12 px-3 pb-12 mb-4">
          <div className="d-flex justify-content-between mb-12">
            <span className="f-md text-grey">ยี่ห้อรถ</span>
            <span className="f-bd text-grey">{prefill?.productCmiDetail?.carBrandName}</span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="f-md text-grey">รุ่นรถ</span>
            <span className="f-bd text-grey">{prefill?.productCmiDetail?.carModelName}</span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="f-md text-grey">สีรถ</span>
            <span className="f-bd text-grey">{prefill?.productCmiDetail?.carColorName}</span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="f-md text-grey">เลขตัวถัง</span>
            <span className="f-bd text-grey">{prefill?.productCmiDetail?.chassisNumber}</span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="f-md text-grey">ทะเบียนรถ</span>
            <span className="f-bd text-grey">
              {(prefill?.productCmiDetail?.licensePrefix ? prefill?.productCmiDetail?.licensePrefix + '-' : '') +
                prefill?.productCmiDetail?.licenseNo}
            </span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="f-md text-grey">ปีที่จดทะเบียน</span>
            <span className="f-bd text-grey">{prefill?.productCmiDetail?.registrationYear}</span>
          </div>
          <div className="d-flex justify-content-between mb-0">
            <span className="f-md text-grey">จังหวัดที่จดทะเบียน</span>
            <span className="f-bd text-grey">{prefill?.productCmiDetail?.registrationProvinceName}</span>
          </div>
        </div>
      )
    case 'coverage_date':
      return (
        <div className="info-box bg-lightgrey rounded-4 pt-12 px-3 pb-12 mb-4">
          <div className="d-flex justify-content-between mb-12">
            <span className="f-md text-grey">วันที่เริ่มความคุ้มครอง</span>
            <span className="f-bd text-grey">{dayjs(prefill?.customer?.coverageStartDate).format('DD MMMM YYYY')}</span>
          </div>
          <div className="d-flex justify-content-between mb-0">
            <span className="f-md text-grey">วันที่สิ้นสุดความคุ้มครอง</span>
            <span className="f-bd text-grey">{dayjs(prefill?.customer?.coverageEndDate).format('DD MMMM YYYY')}</span>
          </div>
        </div>
      )
    case 'customer_info':
      return (
        <div className="info-box bg-lightgrey rounded-4 pt-12 px-3 pb-12 mb-4">
          <div className="d-flex justify-content-between mb-12">
            <span className="f-md text-grey">ชื่อ-นามสกุล</span>
            <span className="f-bd text-grey">{`${prefill?.customer?.title} ${prefill?.customer?.firstName} ${prefill?.customer?.lastName}`}</span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="f-md text-grey">เลขบัตรประชาชน</span>
            <span className="f-bd text-grey">{convertStrToFormat(prefill?.customer?.taxId, 'id_card')}</span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="f-md text-grey">วันเกิด</span>
            <span className="f-bd text-grey">
              {dayjs(prefill?.customer?.birthDate).format('DD MMMM')} {dayjs(prefill?.customer?.birthDate).year() + 543}
            </span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="f-md text-grey">เบอร์โทรศัพท์</span>
            <span className="f-bd text-grey">
              {convertStrToFormat(prefill?.personalInfo?.telephoneNo, 'phone_number')}
            </span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="f-md text-grey w-100">ที่อยู่ปัจจุบัน</span>
            <span className="f-bd text-grey text-end">
              {`${prefill?.customerAddress?.houseNumber} ซ.${prefill?.customerAddress?.alley ? prefill?.customerAddress?.alley : ''} ถ.${prefill?.customerAddress?.street ? prefill?.customerAddress?.street : ''} ${prefill?.customerAddress?.subDistrictName} ${prefill?.customerAddress?.districtName} ${prefill?.customerAddress?.provinceName} ${prefill?.customerAddress?.zipCode}`}
            </span>
          </div>
          <div className="d-flex justify-content-between mb-0">
            <span className="f-md text-grey">ช่องทางการจัดส่งเอกสาร</span>
            <span className="f-bd text-grey">
              {[prefill?.deliveryType?.isEmail && 'อีเมล', prefill?.deliveryType?.isSms && 'SMS']
                .filter(Boolean)
                .join(', ') || '-'}
            </span>
          </div>
        </div>
      )
    default:
      return <div />
  }
}

export default Review

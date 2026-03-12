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
        <div className="info-box  rounded-4 pt-12 px-3 pb-12 mb-4" style={{ border: '1px solid #F2F2F2', backgroundColor: 'white' }}>
          <div className="d-flex justify-content-between mb-12">
            <span className="text-grey-2">ประเภทรถ</span>
            <span className="" style={{ color: '#1e1e1f' }}>{prefill?.productCmiDetail?.carTypeName?.replace(':', '/')}</span>
          </div>
          <div className="d-flex justify-content-between mb-0">
            <span className="text-grey-2">ประเภทการใช้รถ</span>
            <span className="" style={{ color: '#1e1e1f' }}>{prefill?.productCmiDetail?.compulsoryText}</span>
          </div>
        </div>
      )
    case 'car_info':
      return (
        <div className="info-box  rounded-4 pt-12 px-3 pb-12 mb-4" style={{ border: '1px solid #F2F2F2', backgroundColor: 'white' }}>
          <div className="d-flex justify-content-between mb-12">
            <span className="text-grey-2">ยี่ห้อรถ</span>
            <span className="" style={{ color: '#1e1e1f' }}>{prefill?.productCmiDetail?.carBrandName}</span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="text-grey-2">รุ่นรถ</span>
            <span className="" style={{ color: '#1e1e1f' }}>{prefill?.productCmiDetail?.carModelName}</span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="text-grey-2">สีรถ</span>
            <span className="" style={{ color: '#1e1e1f' }}>{prefill?.productCmiDetail?.carColorName}</span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="text-grey-2">เลขตัวถัง</span>
            <span className="" style={{ color: '#1e1e1f' }}>{prefill?.productCmiDetail?.chassisNumber}</span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="text-grey-2">ทะเบียนรถ</span>
            <span className="" style={{ color: '#1e1e1f' }}>
              {(prefill?.productCmiDetail?.licensePrefix ? prefill?.productCmiDetail?.licensePrefix + '-' : '') +
                prefill?.productCmiDetail?.licenseNo}
            </span>
          </div>
          {!prefill?.productCmiDetail?.isRedLicense && (
            <>
              <div className="d-flex justify-content-between mb-12">
                <span className="text-grey-2">ปีที่จดทะเบียน</span>
                <span className="" style={{ color: '#1e1e1f' }}>{prefill?.productCmiDetail?.registrationYear}</span>
              </div>
              <div className="d-flex justify-content-between mb-0">
                <span className="text-grey-2">จังหวัดที่จดทะเบียน</span>
                <span className="" style={{ color: '#1e1e1f' }}>{prefill?.productCmiDetail?.registrationProvinceName}</span>
              </div>
            </>
          )}
        </div>
      )
    case 'coverage_date':
      return (
        <div className="info-box  rounded-4 pt-12 px-3 pb-12 mb-4" style={{ border: '1px solid #F2F2F2', backgroundColor: 'white' }}>
          <div className="d-flex justify-content-between mb-12">
            <span className="text-grey-2">วันที่เริ่มความคุ้มครอง</span>
            <span className="" style={{ color: '#1e1e1f' }}>{dayjs(prefill?.customer?.coverageStartDate).format('DD MMMM YYYY')}</span>
          </div>
          <div className="d-flex justify-content-between mb-0">
            <span className="text-grey-2">วันที่สิ้นสุดความคุ้มครอง</span>
            <span className="" style={{ color: '#1e1e1f' }}>{dayjs(prefill?.customer?.coverageEndDate).format('DD MMMM YYYY')}</span>
          </div>
        </div>
      )
    case 'customer_info':
      return (
        <div className="info-box  rounded-4 pt-12 px-3 pb-12 mb-4" style={{ border: '1px solid #F2F2F2', backgroundColor: 'white' }}>
          <div className="d-flex justify-content-between mb-12">
            <span className="text-grey-2">ชื่อ-นามสกุล</span>
            <span className="" style={{ color: '#1e1e1f' }}>{`${prefill?.customer?.title} ${prefill?.customer?.firstName} ${prefill?.customer?.lastName}`}</span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="text-grey-2">เลขบัตรประชาชน</span>
            <span className="" style={{ color: '#1e1e1f' }}>{convertStrToFormat(prefill?.customer?.taxId, 'id_card')}</span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="text-grey-2">วันเกิด</span>
            <span className="" style={{ color: '#1e1e1f' }}>
              {dayjs(prefill?.customer?.birthDate).format('DD MMMM')} {dayjs(prefill?.customer?.birthDate).year() + 543}
            </span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="text-grey-2">เบอร์โทรศัพท์</span>
            <span className="" style={{ color: '#1e1e1f' }}>
              {convertStrToFormat(prefill?.personalInfo?.telephoneNo, 'phone_number')}
            </span>
          </div>
          <div className="d-flex justify-content-between mb-12">
            <span className="text-grey-2 w-100">ที่อยู่ปัจจุบัน</span>
            <span className="  style={{ color: '#1e1e1f'}}text-end" style={{ wordBreak: 'break-all' }}>
              {`${prefill?.customerAddress?.houseNumber} หมู่ที่ ${prefill?.customerAddress?.villageNo ? prefill?.customerAddress?.villageNo : '-'} หมู่บ้าน ${prefill?.customerAddress?.buildingVillage ? prefill?.customerAddress?.buildingVillage : '-'} ซ.${prefill?.customerAddress?.alley ? prefill?.customerAddress?.alley : '-'} ถ.${prefill?.customerAddress?.street ? prefill?.customerAddress?.street : '-'} ${prefill?.customerAddress?.subDistrictName} ${prefill?.customerAddress?.districtName} ${prefill?.customerAddress?.provinceName} ${prefill?.customerAddress?.zipCode}`}
            </span>
          </div>
          <div className="d-flex justify-content-between mb-0">
            <span className="text-grey-2">ช่องทางการจัดส่งเอกสาร</span>
            <span className="" style={{ color: '#1e1e1f' }}>
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

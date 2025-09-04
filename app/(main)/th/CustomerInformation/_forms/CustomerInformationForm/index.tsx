'use client'

import { convertStrToFormat } from '@/helpers/functions/utils'
import { useForm } from '@/helpers/hooks/useForm'
import React, { useEffect } from 'react'
import customerInformationSchema from '../../_schemas'
import { Input } from '@/cmi-layout/components/Input'
import { Select } from '@/cmi-layout/components/Select'
import { useSelector } from 'react-redux'

interface FormProps {
  data: any
}

const CustomerInformationForm: React.FC<FormProps> = ({ data }) => {
  const prefillData = useSelector((state: any) => state.prefillData)
  const [prefill, setPrefill] = React.useState<any>({})
  const { handleChange, handleSubmit, errors, values, setValues } = useForm({} as any, customerInformationSchema)

  useEffect(() => {
    setPrefill(prefillData)
    if (typeof setValues === 'function') {
      setValues({
        title: prefillData?.customer?.title || '',
        firstName: prefillData?.customer?.firstName || '',
        lastName: prefillData?.customer?.lastName || '',
        taxId: prefillData?.customer?.taxId || '',
        telephoneNo: prefillData?.personalInfo?.telephoneNo || '',
        email: prefillData?.personalInfo?.email || '',
        houseNumber: prefillData?.customerAddress?.houseNumber || '',
        moo: prefillData?.customerAddress?.moo || '',
        villageNo: prefillData?.customerAddress?.villageNo || '',
        buildingVillage: prefillData?.customerAddress?.buildingVillage || '',
        alley: prefillData?.customerAddress?.alley || '',
        street: prefillData?.customerAddress?.street || '',
        zipCode: prefillData?.customerAddress?.zipCode || '',
        provinceName: prefillData?.customerAddress?.provinceName || '',
        districtName: prefillData?.customerAddress?.districtName || '',
        subDistrictName: prefillData?.customerAddress?.subDistrictName || '',
      })
    }
  }, [prefillData])
  return (
    <form>
      <div className="content-section fullPage-150">
        <div className="container">
          <div className="d-flex justify-content-between pt-3 pb-12">
            <h2 className="mb-0 text-black fs-18">
              <strong>ข้อมูลผู้เอาประกัน (เจ้าของรถ)</strong>
            </h2>
          </div>

          <div className="formMain">
            <div className="form-group mb-12">
              <select
                name="title"
                className="form-control"
                onChange={({ target: { name, value } }) => handleChange(name, value)}
                value={values?.title || ''}
              >
                <option value="">เลือกคำนำหน้า</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
              </select>
              <label className="form-label">คำนำหน้า</label>
              <div className="feedback">กรุณาเลือก</div>
            </div>

            <div className="form-group mb-12">
              <Input
                label="ชื่อ"
                name="firstName"
                type="text"
                maxLength={50}
                placeholder="กรอกชื่อตามบัตรประชาชน"
                onChange={({ target: { name, value } }) => handleChange(name, value)}
                value={values?.firstName || ''}
                feedback={errors?.firstName}
              />
            </div>
            <div className="form-group mb-12">
              <Input
                label="นามสกุล"
                name="lastName"
                type="text"
                maxLength={50}
                placeholder="กรอกนามสกุลตามบัตรประชาชน"
                onChange={({ target: { name, value } }) => handleChange(name, value)}
                value={values?.lastName || ''}
                feedback={errors?.lastName}
              />
            </div>
            <div className="form-group mb-12">
              <Input
                name="taxId"
                type="text"
                maxLength={17}
                placeholder="กรอกรหัสบัตรประชาชน 13 หลัก"
                onChange={({ target: { name, value } }) => handleChange(name, convertStrToFormat(value, 'id_card'))}
                value={values?.taxId || ''}
                label="เลขบัตรประชาชน"
                feedback={errors?.taxId}
              />
            </div>

            <span className="fs-14 f-bd d-block mb-2 birtday-textFeild">วันเกิด</span>
            <div className="form-group mb-12">
              <div>
                <div className="d-flex">
                  <div className="w-100 position-relative">
                    <Select
                      label="ปี"
                      name="year"
                      firstOptionLabel="เลือกปี"
                      options={[]}
                      onChange={(value) => handleChange('year', value)}
                      value={values?.year || ''}
                      feedback={errors?.year}
                    />
                  </div>
                  <div className="ms-2 me-2 w-100 position-relative">
                    <Select
                      label="เดือน"
                      name="month"
                      firstOptionLabel="เลือกเดือน"
                      options={[]}
                      onChange={(value) => handleChange('month', value)}
                      value={values?.month || ''}
                      feedback={errors?.month}
                    />
                  </div>
                  <div className="ms-0 w-100 position-relative">
                    <Select
                      label="วัน"
                      name="day"
                      firstOptionLabel="เลือกวัน"
                      options={[]}
                      onChange={(value) => handleChange('day', value)}
                      value={values?.day || ''}
                      feedback={errors?.day}
                    />
                  </div>
                </div>
                <div className="feedback">กรุณาเลือก</div>
              </div>
            </div>
            <div className="form-group mb-12">
              <Input
                name="telephoneNo"
                type="text"
                maxLength={12}
                placeholder="กรอกเบอร์โทรศัพท์"
                onChange={({ target: { name, value } }) =>
                  handleChange(name, convertStrToFormat(value, 'phone_number'))
                }
                value={values?.telephoneNo || ''}
                label="เบอร์โทรศัพท์"
                feedback={errors?.telephoneNo}
              />
            </div>
            <div className="form-group mb-12">
              <Input
                label="อีเมล (ใช้สำหรับรับกรมธรรม์อิเล็กทรอนิกส์)"
                name="email"
                type="text"
                maxLength={50}
                placeholder="กรอกอีเมล"
                onChange={({ target: { name, value } }) => handleChange(name, value)}
                value={values?.email || ''}
                feedback={errors?.email}
              />
            </div>
            <h2 className="mb-12 mt-4 text-black fs-18">
              <strong>ที่อยู่ปัจจุบัน</strong>
            </h2>
            <div className="d-flex">
              <div className="form-group mb-12 me-2 w-100">
                <Input
                  label="บ้านเลขที่"
                  name="houseNumber"
                  type="text"
                  maxLength={15}
                  placeholder="กรอกบ้านเลขที่"
                  onChange={({ target: { name, value } }) => handleChange(name, value)}
                  value={values?.houseNumber || ''}
                  feedback={errors?.houseNumber}
                />
              </div>
              <div className="form-group mb-12 ms-2 w-100">
                <Input
                  label="หมู่ที่"
                  name="villageNo"
                  type="text"
                  maxLength={5}
                  placeholder="กรอกหมู่ที่"
                  onChange={({ target: { name, value } }) => handleChange(name, value)}
                  value={values?.villageNo || ''}
                />
              </div>
            </div>
            <div className="form-group mb-12">
              <Input
                label="ชื่อหมู่บ้าน/อาคาร"
                name="buildingVillage"
                type="text"
                maxLength={50}
                placeholder="กรอกหมู่บ้าน/อาคาร"
                onChange={({ target: { name, value } }) => handleChange(name, value)}
                value={values?.buildingVillage || ''}
              />
            </div>
            <div className="d-flex">
              <div className="form-group mb-12 me-2 w-100">
                <Input
                  label="ซอย/ตรอก"
                  name="alley"
                  type="text"
                  maxLength={25}
                  placeholder="กรอกซอย/ตรอก"
                  onChange={({ target: { name, value } }) => handleChange(name, value)}
                  value={values?.alley || ''}
                />
              </div>
              <div className="form-group mb-12 ms-2 w-100">
                <Input
                  label="ถนน"
                  name="street"
                  type="text"
                  maxLength={25}
                  placeholder="กรอกถนน"
                  onChange={({ target: { name, value } }) => handleChange(name, value)}
                  value={values?.street || ''}
                />
                <label className="form-label">ถนน</label>
              </div>
            </div>
            <div>
              <div className="d-flex">
                <div className="form-group mb-12 me-2 w-100">
                  <Input
                    label="รหัสไปรษณีย์"
                    name="zipCode"
                    type="text"
                    maxLength={5}
                    placeholder="กรอกรหัสไปรษณีย์"
                    onChange={({ target: { name, value } }) => handleChange(name, value)}
                    value={values?.zipCode || ''}
                    feedback={errors?.zipCode}
                  />
                </div>
                <div className="form-group mb-12 ms-2 w-100">
                  <Select
                    label="จังหวัด"
                    name="provinceName"
                    disabled
                    options={[]}
                    onChange={() => {}}
                    value={values?.provinceName || ''}
                    firstOptionLabel="เลือกจังหวัด"
                    feedback={errors?.provinceName}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mb-12 me-2 w-100">
                  <Select
                    label="เขต/อำเภอ"
                    name="districtName"
                    disabled
                    options={[]}
                    onChange={() => {}}
                    value={values?.districtName || ''}
                    firstOptionLabel="เลือกเขต/อำเภอ"
                    feedback={errors?.districtName}
                  />
                </div>
                <div className="form-group mb-12 ms-2 w-100">
                  <Select
                    label="แขวง/ตำบล"
                    name="subDistrictName"
                    disabled
                    options={[]}
                    onChange={() => {}}
                    value={values?.subDistrictName || ''}
                    firstOptionLabel="เลือกแขวง/ตำบล"
                    feedback={errors?.subDistrictName}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <button
          type="button"
          // onClick={handleSubmit}
          className="btn btn-primary fs-6 d-flex justify-content-center align-items-center mx-auto mb-4 f-bd"
        >
          ดำเนินการต่อ
        </button>
      </div>
    </form>
  )
}

export default CustomerInformationForm

'use client'

import { convertStrToFormat } from '@/helpers/functions/utils'
import { useForm } from '@/helpers/hooks/useForm'
import React, { useCallback, useEffect, useState } from 'react'
import customerInformationSchema from '../../_schemas'
import { Input } from '@/cmi-layout/components/Input'
import { Select } from '@/cmi-layout/components/Select'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import { prefillDataSlice } from '@/stores/redux/slices/prefillDataSlice'
import { useRouter } from 'next/navigation'
import { getAdressByZipCode } from '../../_actions'
import useLoading from '@/helpers/hooks/useLoading'
import { useDebounce } from '@/helpers/hooks/useDebounce'
dayjs.locale('th')

const CustomerInformationForm: React.FC = () => {
  const { openLoading, closeLoading } = useLoading()
  const route = useRouter()
  const dispatch = useDispatch()
  const prefillData = useSelector((state: any) => state.prefillData)
  const [prefill, setPrefill] = useState<any>({})
  const [provinceList, setProvinceList] = useState<any[]>([])
  const [districtList, setDistrictList] = useState<any[]>([])
  const [subDistrictList, setSubDistrictList] = useState<any[]>([])
  const [addressData, setAddressData] = useState<any>(null)
  const [birthDayList, setBirthDayList] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)
  const { handleChange, handleSubmit, errors, values, setValues } = useForm({}, customerInformationSchema, {
    openLoading,
    closeLoading,
  })
  const zipCodeDebounced = useDebounce(values?.zipCode, 1000)

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setValues({
      title: prefillData?.customer?.title || '',
      firstName: prefillData?.customer?.firstName || '',
      lastName: prefillData?.customer?.lastName || '',
      taxId: prefillData?.customer?.taxId || '',
      birthDay: prefillData?.customer?.birthDay,
      birthMonth: prefillData?.customer?.birthMonth,
      birthYear: prefillData?.customer?.birthYear,
      telephoneNo: prefillData?.personalInfo?.telephoneNo || '',
      email: prefillData?.personalInfo?.email || '',
      houseNumber: prefillData?.customerAddress?.houseNumber || '',
      villageNo: prefillData?.customerAddress?.villageNo || '',
      buildingVillage: prefillData?.customerAddress?.buildingVillage || '',
      alley: prefillData?.customerAddress?.alley || '',
      street: prefillData?.customerAddress?.street || '',
      zipCode: prefillData?.customerAddress?.zipCode || '',
      provinceId: prefillData?.customerAddress?.provinceId || '',
      districtId: prefillData?.customerAddress?.districtId || '',
      subDistrictId: prefillData?.customerAddress?.subDistrictId || '',
      isEmail: prefillData?.deliveryType?.isEmail || false,
      isSms: prefillData?.deliveryType?.isSms || false,
      policyEmail:
        prefillData?.deliveryType?.policyEmail ||
        (prefillData?.deliveryType?.isEmail ? prefillData?.personalInfo?.email : ''),
      policySms:
        prefillData?.deliveryType?.policySms ||
        (prefillData?.deliveryType?.isSms ? prefillData?.personalInfo?.telephoneNo : ''),
    })
  }, [prefillData, setValues])

  useEffect(() => {
    const birthDays = () => {
      const selectedMonth = values?.birthMonth ? dayjs(values?.birthYear).month(values?.birthMonth - 1) : dayjs()
      const daysInMonth = selectedMonth.daysInMonth()
      return Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1
        return {
          value: day.toString(),
          label: day.toString(),
        }
      })
    }
    setBirthDayList(birthDays())
  }, [values?.birthMonth, values?.birthYear])

  const fetchAddressByZipCode = useCallback(
    async (zipCode: string) => {
      try {
        const res = await getAdressByZipCode({ zipCode })
        const data = res?.data?.data[0] || null
        setAddressData(data)
        if (data) {
          handleChange({ name: 'provinceId', value: data?.province?.provinceId || '' })
          setProvinceList(
            data?.province ? [{ label: data?.province?.provinceName, value: data?.province?.provinceId }] : [],
          )
          setDistrictList(
            data?.province?.districts?.map((e: any) => {
              return { label: e.districtName, value: e.districtId }
            }),
          )
          setSubDistrictList(
            data?.province?.districts
              ?.find((d: any) => d.districtId.toString() === values?.districtId?.toString())
              ?.subdistricts?.map((sd: any) => {
                return { label: sd.subdistrictName, value: sd.subdistrictId }
              }) || [],
          )
        }
      } catch (error) {
        console.error('Error fetching address by zip code:', error)
      }
    },
    [setValues, values?.districtId],
  )

  useEffect(() => {
    if (zipCodeDebounced.toString().length === 5 && values.zipCode === zipCodeDebounced) {
      fetchAddressByZipCode(zipCodeDebounced.toString())
    }
  }, [fetchAddressByZipCode, zipCodeDebounced, values.zipCode])

  const handleSubmitForm = async () => {
    const data = {
      ...prefill,
      channel: {
        ...prefill.channel,
      },
      customer: {
        ...prefill.customer,
        taxId: values.taxId,
        firstName: values.firstName,
        lastName: values.lastName,
        title: values.title,
        birthDay: values.birthDay,
        birthMonth: values.birthMonth,
        birthYear: values.birthYear,
        birthDate: dayjs(`${values.birthYear}-${values.birthMonth}-${values.birthDay}`).format('YYYY-MM-DD'),
      },
      personalInfo: {
        ...prefill.personalInfo,
        telephoneNo: values.telephoneNo,
        email: values.email,
        policyEmail: values.policyEmail,
        policySms: values.policySms,
      },
      customerAddress: {
        ...prefill.customerAddress,
        houseNumber: values.houseNumber,
        villageNo: values.villageNo,
        buildingVillage: values.buildingVillage,
        alley: values.alley,
        street: values.street,
        zipCode: values.zipCode,
        provinceId: values.provinceId,
        provinceName: provinceList.find((p) => p.value?.toString() === values.provinceId?.toString())?.label || '',
        districtName: districtList.find((d) => d.value?.toString() === values.districtId?.toString())?.label || '',
        subDistrictName:
          subDistrictList.find((sd) => sd.value?.toString() === values.subDistrictId?.toString())?.label || '',
        districtId: values.districtId,
        subDistrictId: values.subDistrictId,
      },
      deliveryType: {
        ...prefill.deliveryType,
        isEmail: values.isEmail,
        isSms: values.isSms,
        policyEmail: values.policyEmail,
        policySms: values.policySms,
      },
    }
    dispatch(prefillDataSlice.actions.setPrefillData(data))
    route.push('/th/ReviewSummary')
  }

  useEffect(() => {
    setPrefill(prefillData)
  }, [prefillData])

  return (
    <div>
      <div className="content-section fullPage-150">
        <div className="container">
          <div className="d-flex justify-content-between pt-3 pb-12">
            <h2 className="mb-0 text-black fs-18">
              <strong>ข้อมูลผู้เอาประกัน (เจ้าของรถ)</strong>
            </h2>
          </div>

          <div className="formMain">
            <div className="form-group mb-12">
              <Select
                name="title"
                label="คำนำหน้า"
                firstOptionLabel="เลือกคำนำหน้า"
                options={[
                  { label: 'นาย', value: 'นาย' },
                  { label: 'นาง', value: 'นาง' },
                  { label: 'นางสาว', value: 'นางสาว' },
                ]}
                feedback={errors?.title}
                onChange={(value) => handleChange({ name: 'title', value })}
                value={values?.title || ''}
              />
              <label className="form-label">{'คำนำหน้า'}</label>
              <div className="feedback">กรุณาเลือก</div>
            </div>

            <div className="form-group mb-12">
              <Input
                label="ชื่อ"
                name="firstName"
                type="text"
                maxLength={50}
                placeholder="กรอกชื่อตามบัตรประชาชน"
                onChange={({ target: { name, value } }) => handleChange({ name, value })}
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
                onChange={({ target: { name, value } }) => handleChange({ name, value })}
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
                onChange={({ target: { name, value } }) => handleChange({ name, value: value?.replaceAll('-', '') })}
                value={convertStrToFormat(values?.taxId, 'id_card') || ''}
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
                      name="birthYear"
                      firstOptionLabel="เลือกปี"
                      options={
                        mounted
                          ? Array.from({ length: 80 }, (_, i) => {
                              const year = dayjs().year() - 20 - i
                              return {
                                label: (year + 543).toString(),
                                value: year.toString(),
                              }
                            })
                          : []
                      }
                      onChange={(value) => handleChange({ name: 'birthYear', value })}
                      value={values?.birthYear || ''}
                      feedback={errors?.birthYear}
                    />
                  </div>
                  <div className="ms-2 me-2 w-100 position-relative">
                    <Select
                      label="เดือน"
                      name="birthMonth"
                      firstOptionLabel="เลือกเดือน"
                      options={Array.from({ length: 12 }, (_, i) => ({
                        label: dayjs().month(i).format('MMMM'),
                        value: (i + 1).toString(),
                      }))}
                      onChange={(value) => handleChange({ name: 'birthMonth', value })}
                      value={values?.birthMonth || ''}
                      feedback={errors?.birthMonth}
                    />
                  </div>
                  <div className="ms-0 w-100 position-relative">
                    <Select
                      label="วัน"
                      name="birthDay"
                      firstOptionLabel="เลือกวัน"
                      options={birthDayList}
                      onChange={(value) => handleChange({ name: 'birthDay', value })}
                      value={values?.birthDay || ''}
                      feedback={errors?.birthDay}
                    />
                  </div>
                </div>
                <div className="feedback">กรุณาเลือก</div>
              </div>
            </div>
            <div className="form-group mb-12">
              <Input
                label={`เบอร์โทรศัพท์ ${!prefill?.deliveryType?.isEmail && prefill?.deliveryType?.isSms ? '(ใช้สำหรับรับกรมธรรม์อิเล็กทรอนิกส์)' : ''}`}
                name="telephoneNo"
                type="text"
                maxLength={12}
                placeholder="กรอกเบอร์โทรศัพท์"
                onChange={({ target: { name, value } }) => handleChange({ name, value: value?.replaceAll('-', '') })}
                value={convertStrToFormat(values?.telephoneNo, 'phone_number') || ''}
                feedback={errors?.telephoneNo}
              />
            </div>
            <div className="form-group mb-12">
              <Input
                label={`อีเมล ${prefill?.deliveryType?.isEmail && !prefill?.deliveryType?.isSms ? '(ใช้สำหรับรับกรมธรรม์อิเล็กทรอนิกส์)' : ''}`}
                name="email"
                type="text"
                maxLength={50}
                placeholder="กรอกอีเมล"
                onChange={({ target: { name, value } }) => handleChange({ name, value })}
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
                  onChange={({ target: { name, value } }) => handleChange({ name, value })}
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
                  onChange={({ target: { name, value } }) => handleChange({ name, value })}
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
                onChange={({ target: { name, value } }) => handleChange({ name, value })}
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
                  onChange={({ target: { name, value } }) => handleChange({ name, value })}
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
                  onChange={({ target: { name, value } }) => handleChange({ name, value })}
                  value={values?.street || ''}
                />
                <label className="form-label">{'ถนน'}</label>
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
                    onChange={({ target: { name, value } }) => {
                      handleChange({ name, value })
                      setProvinceList([])
                      setDistrictList([])
                      setSubDistrictList([])
                      setValues((prevValues: any) => ({
                        ...prevValues,
                        provinceId: '',
                        districtId: '',
                        subDistrictId: '',
                      }))
                      setAddressData(null)
                    }}
                    value={values?.zipCode || ''}
                    feedback={errors?.zipCode}
                  />
                </div>
                <div className="form-group mb-12 ms-2 w-100">
                  <Select
                    label="จังหวัด"
                    name="provinceId"
                    disabled={provinceList?.length === 0}
                    options={provinceList}
                    onChange={() => {}}
                    value={values?.provinceId || ''}
                    firstOptionLabel="เลือกจังหวัด"
                    feedback={errors?.provinceId}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mb-12 me-2 w-100">
                  <Select
                    label="เขต/อำเภอ"
                    name="districtId"
                    disabled={districtList?.length === 0}
                    options={districtList}
                    onChange={(value) => {
                      handleChange({ name: 'districtId', value })
                      setValues((prevValues: any) => ({
                        ...prevValues,
                        subDistrictId: '',
                      }))
                      setSubDistrictList(
                        addressData?.province?.districts
                          ?.find((d: any) => d.districtId.toString() === value)
                          ?.subdistricts?.map((sd: any) => ({
                            label: sd.subdistrictName,
                            value: sd.subdistrictId,
                          })) || [],
                      )
                    }}
                    value={values?.districtId || ''}
                    firstOptionLabel="เลือกเขต/อำเภอ"
                    feedback={errors?.districtId}
                  />
                </div>
                <div className="form-group mb-12 ms-2 w-100">
                  <Select
                    label="แขวง/ตำบล"
                    name="subDistrictId"
                    disabled={subDistrictList?.length === 0}
                    options={subDistrictList}
                    onChange={(value) => handleChange({ name: 'subDistrictId', value })}
                    value={values?.subDistrictId || ''}
                    firstOptionLabel="เลือกแขวง/ตำบล"
                    feedback={errors?.subDistrictId}
                  />
                </div>
              </div>
            </div>

            {prefill?.channel?.isPolicyEmail && prefill?.channel?.isPolicySms && (
              <>
                <h2 className="mb-12 mt-4 text-black fs-18">
                  <strong>ช่องทางการจัดส่งกรมธรรม์</strong>
                </h2>
                <p>กรมธรรม์อิเล็กทรอนิกส์จะถูกจัดส่งภายใน 15 นาที หลังจากชำระเงินสำเร็จ</p>
                <div
                  style={{ display: 'flex', width: '100%', alignItems: 'center', marginBottom: '12px', gap: '10px' }}
                >
                  <input
                    type="checkbox"
                    checked={values?.isEmail}
                    onChange={(e) => {
                      handleChange({ name: 'isEmail', value: e.target.checked })
                      if (!e.target.checked) {
                        handleChange({ name: 'policyEmail', value: '' })
                      } else {
                        handleChange({ name: 'policyEmail', value: values?.email || '' })
                      }
                    }}
                  />
                  <Input
                    label="อีเมล"
                    name="policyEmail"
                    type="text"
                    maxLength={50}
                    placeholder="กรอกอีเมล"
                    onChange={({ target: { name, value } }) => handleChange({ name, value })}
                    value={values?.policyEmail || ''}
                    feedback={!values?.isEmail ? errors?.isEmail : ''}
                    style={{ width: 'inherit' }}
                    disabled={!values?.isEmail}
                  />
                </div>
                <div
                  style={{ display: 'flex', width: '100%', alignItems: 'center', marginBottom: '12px', gap: '10px' }}
                >
                  <input
                    type="checkbox"
                    checked={values?.isSms}
                    onChange={(e) => {
                      handleChange({ name: 'isSms', value: e.target.checked })
                      if (!e.target.checked) {
                        handleChange({ name: 'policySms', value: '' })
                      } else {
                        handleChange({ name: 'policySms', value: values?.telephoneNo || '' })
                      }
                    }}
                  />
                  <Input
                    name="policySms"
                    type="text"
                    maxLength={12}
                    placeholder="กรอกเบอร์โทรศัพท์"
                    onChange={({ target: { name, value } }) =>
                      handleChange({ name, value: value?.replaceAll('-', '') })
                    }
                    value={convertStrToFormat(values?.policySms, 'phone_number') || ''}
                    label="เบอร์โทรศัพท์"
                    feedback={!values?.isSms ? errors?.isSms : ''}
                    style={{ width: 'inherit' }}
                    disabled={!values?.isSms}
                  />
                </div>
                {!values?.isEmail && !values?.isSms && (errors?.isEmail || errors?.isSms) && (
                  <div className="feedback" style={{ color: 'red', marginTop: '-8px', marginBottom: '12px' }}>
                    {errors?.isEmail || errors?.isSms}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <button
          type="button"
          onClick={() => handleSubmit(handleSubmitForm)}
          className="btn btn-primary fs-6 d-flex justify-content-center align-items-center mx-auto mb-4 f-bd"
        >
          ดำเนินการต่อ
        </button>
      </div>
    </div>
  )
}

export default CustomerInformationForm

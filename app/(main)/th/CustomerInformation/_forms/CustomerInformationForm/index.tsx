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
import { getAddressByZipCode } from '../../_actions'
import useLoading from '@/helpers/hooks/useLoading'
import { useDebounce } from '@/helpers/hooks/useDebounce'
import { RadioButton } from 'primereact/radiobutton'
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
  const [postOtherProvinceList, setPostOtherProvinceList] = useState<any[]>([])
  const [postOtherDistrictList, setPostOtherDistrictList] = useState<any[]>([])
  const [postOtherSubDistrictList, setPostOtherSubDistrictList] = useState<any[]>([])
  const [postOtherAddressData, setPostOtherAddressData] = useState<any>(null)
  const [birthDayList, setBirthDayList] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)
  const { handleChange, setErrors, handleSubmit, errors, values, setValues } = useForm({}, customerInformationSchema, {
    openLoading,
    closeLoading,
  })
  const zipCodeDebounced = useDebounce(values?.zipCode, 1000)
  const postOtherZipCodeDebounced = useDebounce(values?.postOtherZipCode, 1000)

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
      paperless: true,
      //todo: mock scenario juristic 
      personType: 'normal-person',
      juristicTitle: prefillData?.juristic?.juristicTitle || '',
      juristicCompanyName: prefillData?.juristic?.juristicCompanyName || '',
      juristicId: prefillData?.juristic?.juristicId || '',
      juristicRegistrationDate: prefillData?.juristic?.juristicRegistrationDate || '',
      juristicCertificateIssueDate: prefillData?.juristic?.juristicCertificateIssueDate || '',
      juristicTelephoneNo: prefillData?.juristic?.juristicTelephoneNo || '',
      //todo: mock scenario document contact 
      isEmail: !!prefillData?.deliveryType?.isEmail,
      isSms: !!prefillData?.deliveryType?.isSms,
      isPostCurrent: !!prefillData?.deliveryType?.isPostCurrent,
      isPostOther: !!prefillData?.deliveryType?.isPostOther,
      isPrintForCustomer: !!prefillData?.deliveryType?.isPrintForCustomer,
      policyEmail: prefillData?.deliveryType?.policyEmail || '',
      policySms: prefillData?.deliveryType?.policySms || '',
      postOtherHouseNumber: prefillData?.deliveryType?.postOtherHouseNumber || '',
      postOtherVillageNo: prefillData?.deliveryType?.postOtherVillageNo || '',
      postOtherBuildingVillage: prefillData?.deliveryType?.postOtherBuildingVillage || '',
      postOtherAlley: prefillData?.deliveryType?.postOtherAlley || '',
      postOtherStreet: prefillData?.deliveryType?.postOtherStreet || '',
      postOtherZipCode: prefillData?.deliveryType?.postOtherZipCode || '',
      postOtherProvinceId: prefillData?.deliveryType?.postOtherProvinceId || '',
      postOtherDistrictId: prefillData?.deliveryType?.postOtherDistrictId || '',
      postOtherSubDistrictId: prefillData?.deliveryType?.postOtherSubDistrictId || '',
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
        const res = await getAddressByZipCode({ zipCode })
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

  const fetchPostOtherAddressByZipCode = useCallback(
    async (zipCode: string) => {
      try {
        const res = await getAddressByZipCode({ zipCode })
        const data = res?.data?.data[0] || null
        setPostOtherAddressData(data)
        if (data) {
          handleChange({ name: 'postOtherProvinceId', value: data?.province?.provinceId || '' })
          setPostOtherProvinceList(
            data?.province ? [{ label: data?.province?.provinceName, value: data?.province?.provinceId }] : [],
          )
          setPostOtherDistrictList(
            data?.province?.districts?.map((e: any) => {
              return { label: e.districtName, value: e.districtId }
            }),
          )
          setPostOtherSubDistrictList(
            data?.province?.districts
              ?.find((d: any) => d.districtId.toString() === values?.postOtherDistrictId?.toString())
              ?.subdistricts?.map((sd: any) => {
                return { label: sd.subdistrictName, value: sd.subdistrictId }
              }) || [],
          )
        }
      } catch (error) {
        console.error('Error fetching post other address by zip code:', error)
      }
    },
    [values?.postOtherDistrictId],
  )

  useEffect(() => {
    if (zipCodeDebounced.toString().length === 5 && values.zipCode === zipCodeDebounced) {
      fetchAddressByZipCode(zipCodeDebounced.toString())
    }
  }, [fetchAddressByZipCode, zipCodeDebounced, values.zipCode])

  useEffect(() => {
    if (
      postOtherZipCodeDebounced.toString().length === 5 &&
      values.postOtherZipCode === postOtherZipCodeDebounced
    ) {
      fetchPostOtherAddressByZipCode(postOtherZipCodeDebounced.toString())
    }
  }, [fetchPostOtherAddressByZipCode, postOtherZipCodeDebounced, values.postOtherZipCode])

  const selectPolicyDelivery = (option: 'email' | 'sms' | 'postCurrent' | 'postOther' | 'print') => {
    setValues((prev: any) => ({
      ...prev,
      isEmail: option === 'email',
      isSms: option === 'sms',
      isPostCurrent: option === 'postCurrent',
      isPostOther: option === 'postOther',
      isPrintForCustomer: option === 'print',

      policyEmail:
        option === 'email'
          ? prev.policyEmail || prev.email || ''
          : '',

      policySms:
        option === 'sms'
          ? prev.policySms || prev.telephoneNo || ''
          : '',

    }))
  }

  const handleSubmitForm = async () => {
    const emailActive = values?.isEmail === true || values?.isEmail === 'true'
    const smsActive = values?.isSms === true || values?.isSms === 'true'
    const policyEmail = emailActive ? values.policyEmail : ''
    const policySms = smsActive ? values.policySms?.replaceAll('-', '') : ''

    const { policyDeliveryMethod: _legacyPolicyDeliveryMethod, ...deliveryTypeRest } = prefill.deliveryType || {}

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
        policyEmail,
        policySms,
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
        ...deliveryTypeRest,
        isEmail: emailActive,
        isSms: smsActive,
        isPostCurrent: values.isPostCurrent === true || values.isPostCurrent === 'true',
        isPostOther: values.isPostOther === true || values.isPostOther === 'true',
        isPrintForCustomer: values.isPrintForCustomer === true || values.isPrintForCustomer === 'true',
        policyEmail,
        policySms,
        postOtherHouseNumber: values.postOtherHouseNumber,
        postOtherVillageNo: values.postOtherVillageNo,
        postOtherBuildingVillage: values.postOtherBuildingVillage,
        postOtherAlley: values.postOtherAlley,
        postOtherStreet: values.postOtherStreet,
        postOtherZipCode: values.postOtherZipCode,
        postOtherProvinceId: values.postOtherProvinceId,
        postOtherProvinceName:
          postOtherProvinceList.find((p) => p.value?.toString() === values.postOtherProvinceId?.toString())?.label || '',
        postOtherDistrictId: values.postOtherDistrictId,
        postOtherDistrictName:
          postOtherDistrictList.find((d) => d.value?.toString() === values.postOtherDistrictId?.toString())?.label || '',
        postOtherSubDistrictId: values.postOtherSubDistrictId,
        postOtherSubDistrictName:
          postOtherSubDistrictList.find((sd) => sd.value?.toString() === values.postOtherSubDistrictId?.toString())
            ?.label || '',
      },
      juristic: values?.juristic || {},
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
          <div>
            <span
              style={{
                color: '#1E1E1F',
                fontSize: '16px',
                fontWeight: 700,
                display: 'block',
              }}
            >
              ประเภทผู้เอาประกัน
            </span>
          </div>

          <div className="formMain">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="gap-3 mb-12" style={{ display: 'flex', width: '100%' }}>
                <label
                  htmlFor="normal-person"
                  className={`person-type-option ${values?.personType == 'normal-person' ? 'person-type-option--selected' : ''}`}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    height: '48px',
                  }}
                >
                  <RadioButton
                    inputId="normal-person"
                    name="normal-person"
                    value={'normal-person'}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        juristicTitle: '',
                        juristicCompanyName: '',
                        juristicId: '',
                        juristicRegistrationDate: '',
                        juristicCertificateIssueDate: '',
                        juristicTelephoneNo: '',
                      })
                      setErrors((prevErrors: any) => ({
                        ...prevErrors,
                        juristicTitle: undefined,
                        juristicCompanyName: undefined,
                        juristicId: undefined,
                        juristicRegistrationDate: undefined,
                        juristicCertificateIssueDate: undefined,
                        juristicTelephoneNo: undefined,
                      }))
                      handleChange({ name: 'personType', value: e.value })
                    }}
                    checked={values?.personType == 'normal-person'}
                  />
                  <span>บุคคลธรรมดา</span>
                </label>
                <label
                  htmlFor="juristic-person"
                  className={`person-type-option ${values?.personType == 'juristic-person' ? 'person-type-option--selected' : ''}`}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    height: '48px',
                  }}
                >
                  <RadioButton
                    inputId="juristic-person"
                    name="juristic-person"
                    value={'juristic-person'}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        title: '',
                        firstName: '',
                        lastName: '',
                        taxId: '',
                        birthYear: '',
                        birthMonth: '',
                        birthDay: '',
                        telephoneNo: '',
                      })
                      setErrors((prevErrors: any) => ({
                        ...prevErrors,
                        title: undefined,
                        firstName: undefined,
                        lastName: undefined,
                        taxId: undefined,
                        birthYear: undefined,
                        birthMonth: undefined,
                        birthDay: undefined,
                        telephoneNo: undefined,
                      }))
                      handleChange({ name: 'personType', value: e.value })
                    }}
                    checked={values?.personType == 'juristic-person'}
                  />
                  <span>นิติบุคคล</span>
                </label>
              </div>
            </div>

            {/* บุคคลธรรมดา */}
            {values?.personType === 'normal-person' && (
              <>
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
                </div>

                <div className="form-group mb-12">
                  <Input
                    label="ชื่อตามบัตรประชาชน"
                    name="firstName"
                    type="text"
                    maxLength={50}
                    placeholder="กรอกชื่อตามบัตรประชาชน"
                    onChange={({ target: { name, value } }) =>
                      handleChange({ name, value: value?.replaceAll(' ', '') })}
                    value={values?.firstName || ''}
                    feedback={errors?.firstName}
                  />
                </div>
                <div className="form-group mb-12">
                  <Input
                    label="นามสกุลตามบัตรประชาชน"
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
                <div className="form-group mb-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
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
                  </div>

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
              </>
            )}

            {/* นิติบุคคล */}
            {values?.personType === 'juristic-person' && (
              <>
                <div className="form-group mb-12">
                  <Select
                    name="juristicTitle"
                    label="คำนำหน้าชื่อบริษัท"
                    firstOptionLabel="เลือกคำนำหน้า"
                    options={[
                      { label: 'บริษัท', value: 'บริษัท' },
                      { label: 'ห้างหุ้นส่วน', value: 'ห้างหุ้นส่วน' },
                      { label: 'ห้างหุ้นส่วนจำกัด', value: 'ห้างหุ้นส่วนจำกัด' },
                    ]}
                    feedback={errors?.juristicTitle}
                    // IMPORTANT: use handleChange here for juristicTitle
                    onChange={(value) =>
                      handleChange({ name: 'juristicTitle', value })
                    }
                    value={values?.juristicTitle || ''}
                  />
                </div>
                <div className="form-group mb-12">
                  <Input
                    label="ชื่อบริษัท"
                    name="juristicCompanyName"
                    type="text"
                    maxLength={50}
                    placeholder="กรอกชื่อบริษัท"
                    onChange={({ target: { value } }) =>
                      handleChange({ name: 'juristicCompanyName', value })
                    }
                    value={values?.juristicCompanyName || ''}
                    feedback={errors?.juristicCompanyName}
                  />
                </div>
                <div className="form-group mb-12">
                  <Input
                    label="เลขนิติบุคคล"
                    name="juristicId"
                    type="text"
                    maxLength={13}
                    placeholder="กรอกเลขนิติบุคคล 13 หลัก"
                    onChange={({ target: { value } }) =>
                      handleChange({ name: 'juristicId', value: value?.replaceAll('-', '') })
                    }
                    value={values?.juristicId || ''}
                    feedback={errors?.juristicId}
                  />
                </div>
                <div className="form-group mb-12">
                  <Input
                    label="วันจดทะเบียนบริษัท"
                    name="juristicRegistrationDate"
                    type="text"
                    placeholder="กรอกวันจดทะเบียนบริษัท"
                    onChange={({ target: { value } }) =>
                      handleChange({ name: 'juristicRegistrationDate', value })
                    }
                    value={values?.juristicRegistrationDate || ''}
                    feedback={errors?.juristicRegistrationDate}
                  />
                </div>
                <div className="form-group mb-12">
                  <Input
                    label="วันออกหนังสือรับรองบริษัท"
                    name="juristicCertificateIssueDate"
                    type="text"
                    placeholder="กรอกวันออกหนังสือรับรองบริษัท"
                    onChange={({ target: { value } }) =>
                      handleChange({ name: 'juristicCertificateIssueDate', value })
                    }
                    value={values?.juristicCertificateIssueDate || ''}
                    feedback={errors?.juristicCertificateIssueDate}
                  />
                </div>
                <div className="form-group mb-12">
                  <Input
                    label="เบอร์โทรศัพท์บริษัท"
                    name="juristicTelephoneNo"
                    type="text"
                    maxLength={10}
                    placeholder="กรอกเบอร์โทรศัพท์ 10 หลัก"
                    onChange={({ target: { value } }) =>
                      handleChange({ name: 'juristicTelephoneNo', value: value?.replaceAll('-', '') })
                    }
                    value={values?.juristicTelephoneNo || ''}
                    feedback={errors?.juristicTelephoneNo}
                  />
                </div>
              </>
            )}

            <h2
              className="mb-12 mt-4 text-black"
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#1E1E1F'
              }}
            >
              ที่อยู่ปัจจุบัน
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
                  feedback={errors?.villageNo}
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
                feedback={errors?.buildingVillage}
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
                  feedback={errors?.alley}
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
                  feedback={errors?.street}
                />
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
                    onChange={() => { }}
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
                {/* Replaced legacy checkbox delivery selection with radio-card options; SMS option restored as fifth card */}
                <span
                  style={{
                    color: '#1E1E1F',
                    fontSize: '16px',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '12px',
                    marginTop: '16px',
                  }}
                >
                  ช่องทางการจัดส่งกรมธรรม์
                </span>
                <div className="policy-delivery-options mb-12">
                  <label
                    htmlFor="policy-delivery-email"
                    className={`person-type-option policy-delivery-option ${values?.isEmail ? 'person-type-option--selected' : ''}`}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <RadioButton
                        inputId="policy-delivery-email"
                        name="policy-delivery-channel"
                        value="email"
                        onChange={() => selectPolicyDelivery('email')}
                        checked={values?.isEmail}
                      />
                      <span>อีเมล</span>
                    </div>
                    {values?.isEmail && (
                      <div className="mt-12">
                        <Input
                          label="อีเมล"
                          name="policyEmail"
                          type="text"
                          maxLength={50}
                          placeholder="กรอกอีเมล"
                          onChange={({ target: { name, value } }) => handleChange({ name, value })}
                          value={values?.policyEmail || ''}
                          feedback={errors?.policyEmail}
                          style={{ width: 'inherit' }}
                        />
                      </div>
                    )}
                  </label>

                  <label
                    htmlFor="policy-delivery-sms"
                    className={`person-type-option policy-delivery-option ${values?.isSms ? 'person-type-option--selected' : ''}`}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <RadioButton
                        inputId="policy-delivery-sms"
                        name="policy-delivery-channel"
                        value="sms"
                        onChange={() => selectPolicyDelivery('sms')}
                        checked={values?.isSms}
                      />
                      <span>SMS</span>
                    </div>
                    {values?.isSms && (
                      <div className="mt-12">
                        <Input
                          label="เบอร์โทรศัพท์"
                          name="policySms"
                          type="text"
                          maxLength={12}
                          placeholder="กรอกเบอร์โทรศัพท์"
                          onChange={({ target: { name, value } }) =>
                            handleChange({ name, value: value?.replaceAll('-', '') })
                          }
                          value={convertStrToFormat(values?.policySms, 'phone_number') || ''}
                          feedback={errors?.policySms}
                          style={{ width: 'inherit' }}
                        />
                      </div>
                    )}
                  </label>

                  <label
                    htmlFor="policy-delivery-post-current"
                    className={`person-type-option policy-delivery-option ${values?.isPostCurrent ? 'person-type-option--selected' : ''}`}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <RadioButton
                        inputId="policy-delivery-post-current"
                        name="policy-delivery-channel"
                        value="post-current"
                        onChange={() => selectPolicyDelivery('postCurrent')}
                        checked={!!values?.isPostCurrent}
                      />
                      <span>ส่งไปรษณีย์ตามที่อยู่ปัจจุบัน</span>
                    </div>
                  </label>

                  <label
                    htmlFor="policy-delivery-post-other"
                    className={`person-type-option policy-delivery-option ${values?.isPostOther ? 'person-type-option--selected' : ''}`}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <RadioButton
                        inputId="policy-delivery-post-other"
                        name="policy-delivery-channel"
                        value="post-other"
                        onChange={() => selectPolicyDelivery('postOther')}
                        checked={!!values?.isPostOther}
                      />
                      <span>ส่งไปรษณีย์ตามที่อยู่อื่น</span>
                    </div>
                    {values?.isPostOther && (
                      <div className="mt-12">
                        <div className="d-flex">
                          <div className="form-group mb-12 me-2 w-100">
                            <Input
                              label="บ้านเลขที่"
                              name="postOtherHouseNumber"
                              type="text"
                              maxLength={15}
                              placeholder="กรอกบ้านเลขที่"
                              onChange={({ target: { name, value } }) => handleChange({ name, value })}
                              value={values?.postOtherHouseNumber || ''}
                              feedback={errors?.postOtherHouseNumber}
                            />
                          </div>
                          <div className="form-group mb-12 ms-2 w-100">
                            <Input
                              label="หมู่ที่"
                              name="postOtherVillageNo"
                              type="text"
                              maxLength={5}
                              placeholder="กรอกหมู่ที่"
                              onChange={({ target: { name, value } }) => handleChange({ name, value })}
                              value={values?.postOtherVillageNo || ''}
                              feedback={errors?.postOtherVillageNo}
                            />
                          </div>
                        </div>
                        <div className="form-group mb-12">
                          <Input
                            label="ชื่อหมู่บ้าน/อาคาร"
                            name="postOtherBuildingVillage"
                            type="text"
                            maxLength={50}
                            placeholder="กรอกหมู่บ้าน/อาคาร"
                            onChange={({ target: { name, value } }) => handleChange({ name, value })}
                            value={values?.postOtherBuildingVillage || ''}
                            feedback={errors?.postOtherBuildingVillage}
                          />
                        </div>
                        <div className="d-flex">
                          <div className="form-group mb-12 me-2 w-100">
                            <Input
                              label="ซอย/ตรอก"
                              name="postOtherAlley"
                              type="text"
                              maxLength={25}
                              placeholder="กรอกซอย/ตรอก"
                              onChange={({ target: { name, value } }) => handleChange({ name, value })}
                              value={values?.postOtherAlley || ''}
                              feedback={errors?.postOtherAlley}
                            />
                          </div>
                          <div className="form-group mb-12 ms-2 w-100">
                            <Input
                              label="ถนน"
                              name="postOtherStreet"
                              type="text"
                              maxLength={25}
                              placeholder="กรอกถนน"
                              onChange={({ target: { name, value } }) => handleChange({ name, value })}
                              value={values?.postOtherStreet || ''}
                              feedback={errors?.postOtherStreet}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="d-flex">
                            <div className="form-group mb-12 me-2 w-100">
                              <Input
                                label="รหัสไปรษณีย์"
                                name="postOtherZipCode"
                                type="text"
                                maxLength={5}
                                placeholder="กรอกรหัสไปรษณีย์"
                                onChange={({ target: { name, value } }) => {
                                  handleChange({ name, value })
                                  setPostOtherProvinceList([])
                                  setPostOtherDistrictList([])
                                  setPostOtherSubDistrictList([])
                                  setValues((prevValues: any) => ({
                                    ...prevValues,
                                    postOtherProvinceId: '',
                                    postOtherDistrictId: '',
                                    postOtherSubDistrictId: '',
                                  }))
                                  setPostOtherAddressData(null)
                                }}
                                value={values?.postOtherZipCode || ''}
                                feedback={errors?.postOtherZipCode}
                              />
                            </div>
                            <div className="form-group mb-12 ms-2 w-100">
                              <Select
                                label="จังหวัด"
                                name="postOtherProvinceId"
                                disabled={postOtherProvinceList?.length === 0}
                                options={postOtherProvinceList}
                                onChange={() => { }}
                                value={values?.postOtherProvinceId || ''}
                                firstOptionLabel="เลือกจังหวัด"
                                feedback={errors?.postOtherProvinceId}
                              />
                            </div>
                          </div>
                          <div className="d-flex">
                            <div className="form-group mb-12 me-2 w-100">
                              <Select
                                label="เขต/อำเภอ"
                                name="postOtherDistrictId"
                                disabled={postOtherDistrictList?.length === 0}
                                options={postOtherDistrictList}
                                onChange={(value) => {
                                  handleChange({ name: 'postOtherDistrictId', value })
                                  setValues((prevValues: any) => ({
                                    ...prevValues,
                                    postOtherSubDistrictId: '',
                                  }))
                                  setPostOtherSubDistrictList(
                                    postOtherAddressData?.province?.districts
                                      ?.find((d: any) => d.districtId.toString() === value)
                                      ?.subdistricts?.map((sd: any) => ({
                                        label: sd.subdistrictName,
                                        value: sd.subdistrictId,
                                      })) || [],
                                  )
                                }}
                                value={values?.postOtherDistrictId || ''}
                                firstOptionLabel="เลือกเขต/อำเภอ"
                                feedback={errors?.postOtherDistrictId}
                              />
                            </div>
                            <div className="form-group mb-12 ms-2 w-100">
                              <Select
                                label="แขวง/ตำบล"
                                name="postOtherSubDistrictId"
                                disabled={postOtherSubDistrictList?.length === 0}
                                options={postOtherSubDistrictList}
                                onChange={(value) => handleChange({ name: 'postOtherSubDistrictId', value })}
                                value={values?.postOtherSubDistrictId || ''}
                                firstOptionLabel="เลือกแขวง/ตำบล"
                                feedback={errors?.postOtherSubDistrictId}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </label>

                  <label
                    htmlFor="policy-delivery-print"
                    className={`person-type-option policy-delivery-option ${values?.isPrintForCustomer ? 'person-type-option--selected' : ''}`}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <RadioButton
                        inputId="policy-delivery-print"
                        name="policy-delivery-channel"
                        value="print"
                        onChange={() => selectPolicyDelivery('print')}
                        checked={!!values?.isPrintForCustomer}
                      />
                      <span>พิมพ์เอกสารให้ลูกค้า</span>
                    </div>
                  </label>
                </div>
                {errors?.isEmail && typeof errors.isEmail === 'string' && (
                  <div className="feedback" style={{ color: 'red', marginTop: '-8px', marginBottom: '12px' }}>
                    {errors.isEmail}
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
'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { getCarBrands, getCarColors, getCarModels, getProvinces } from '../../_actions'
import { RadioButton } from 'primereact/radiobutton'
import { YEAR_REGISTER } from '../../_constants'
import { ChassisDialog } from './ChassisDialog'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Select } from '@/cmi-layout/components/Select'
import { Input } from '@/cmi-layout/components/Input'
import { prefillDataSlice } from '@/stores/redux/slices/prefillDataSlice'
import { convertStrToFormat } from '@/helpers/functions/utils'
import { useForm } from '@/helpers/hooks/useForm'
import carInformationSchema from '../../_schemas'
import useLoading from '@/helpers/hooks/useLoading'
import 'dayjs/locale/th'
dayjs.locale('th')

interface PrefillData {
  productCmiDetail: {
    carBrandId: string | null
    carBrandName: string | null
    carModelName: string | null
    carColorId: string | null
    carColorName: string | null
    chassisNumber: string | null
    isRedLicense: boolean
    licensePrefix: string | null
    licenseNo: string | null
    yearCoverage: string | null
    monthCoverage: string | null
    dayCoverage: string | null
    registrationYear: string | null
    registrationProvinceId: string | null
    registrationProvinceName: string | null
    carTypeKey: string
    isEvType: boolean
  }
  customer: {
    coverageStartDate: string | null
    coverageEndDate: string | null
  }
}

interface RootState {
  prefillData: PrefillData
}

interface CarColor {
  carColorId: string
  carColorNameTh: string
}

interface CarBrand {
  carBrandId: string
  carBrandName: string
  carBrandImage: string
  carBrandRanking: number
}

interface CarModel {
  carModelName: string
}

const CarInformationForm = () => {
  const { openLoading, closeLoading } = useLoading()
  const route = useRouter()
  const prefillData = useSelector((state: RootState) => state.prefillData)
  const dispatch = useDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [carColorList, setCarColorList] = useState<CarColor[]>([])
  const [carBrandList, setCarBrandList] = useState<CarBrand[]>([])
  const [carModelList, setCarModelList] = useState<CarModel[]>([])
  const [carProvinceList, setCarProvinceList] = useState<any[]>([])
  const [dayList, setDayList] = useState<any[]>([])
  const [coverageEndDateDisplay, setCoverageEndDateDisplay] = useState<string>('')
  const [mounted, setMounted] = useState(false)
  const { values, handleChange, errors, handleSubmit, setValues } = useForm({}, carInformationSchema, {
    openLoading,
    closeLoading,
  })

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Only set date values after component is mounted on client
    if (!mounted) return

    setValues({
      carBrandId: prefillData?.productCmiDetail?.carBrandId ?? null,
      carModelName: prefillData?.productCmiDetail?.carModelName ?? null,
      carColorId: prefillData?.productCmiDetail?.carColorId ?? null,
      chassisNumber: prefillData?.productCmiDetail?.chassisNumber ?? null,
      isRedLicense: prefillData?.productCmiDetail?.isRedLicense ?? false,
      licenseNo: prefillData?.productCmiDetail?.licenseNo
        ? `${prefillData?.productCmiDetail?.licensePrefix ?? ''}-${prefillData?.productCmiDetail?.licenseNo}`
        : '',
      yearCoverage: prefillData?.productCmiDetail?.yearCoverage ?? dayjs().year(),
      monthCoverage: prefillData?.productCmiDetail?.monthCoverage ?? dayjs().month() + 1,
      dayCoverage: prefillData?.productCmiDetail?.dayCoverage ?? dayjs().date(),
      registrationYear: prefillData?.productCmiDetail?.registrationYear ?? null,
      registrationProvinceId: prefillData?.productCmiDetail?.registrationProvinceId ?? null,
    })
  }, [prefillData, mounted, setValues])

  useEffect(() => {
    const days = () => {
      const selectedMonth = values?.monthCoverage
        ? dayjs()
          .year(values?.yearCoverage)
          .month(values?.monthCoverage - 1)
        : dayjs()
      const daysInMonth = selectedMonth.daysInMonth()
      const today = dayjs().startOf('day')
      const maxDate = today.add(90, 'day')

      return Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1
        const currentDate = selectedMonth.date(day).startOf('day')

        // Only include days that are within 90 days from today
        if (
          (currentDate.isAfter(today) || currentDate.isSame(today)) &&
          (currentDate.isBefore(maxDate) || currentDate.isSame(maxDate))
        ) {
          return {
            value: day.toString(),
            label: day.toString(),
          }
        }
        return null
      }).filter(Boolean) as { value: string; label: string }[]
    }
    setDayList(days())
    setCoverageEndDateDisplay(
      dayjs(`${values?.yearCoverage}-${values?.monthCoverage}-${values?.dayCoverage}`)
        .add(1, 'year')
        .format('D MMMM YYYY')
        .replace(/\d{4}/, (year) => (parseInt(year) + 543).toString()),
    )
  }, [values?.monthCoverage, values?.yearCoverage, values?.dayCoverage])

  const fetchCarProvinces = useCallback(async () => {
    const res = await getProvinces()
    setCarProvinceList((res.data.data ?? []).sort((a: any, b: any) => a.provinceId - b.provinceId))
  }, [])

  const fetchCarColors = useCallback(async () => {
    const res = await getCarColors()
    setCarColorList((res.data.data ?? []).sort((a: any, b: any) => a.carColorId.localeCompare(b.carColorId)))
  }, [])

  const fetchCarBrands = useCallback(async () => {
    try {
      openLoading()
      const res = await getCarBrands({
        carTypeKey: prefillData?.productCmiDetail?.carTypeKey,
        isEvType: prefillData?.productCmiDetail?.isEvType,
      })
      setCarBrandList(res?.data?.data)
    } catch (error) {
      console.error('Error fetching car brands:', error)
    } finally {
      closeLoading()
    }
  }, [prefillData?.productCmiDetail?.carTypeKey, prefillData?.productCmiDetail?.isEvType, openLoading, closeLoading])

  useEffect(() => {
    fetchCarProvinces()
  }, [fetchCarProvinces])

  useEffect(() => {
    fetchCarColors()
    fetchCarBrands()
  }, [fetchCarColors, fetchCarBrands])

  const fetchCarModelData = useCallback(
    async (brandId: string) => {
      try {
        const res = await getCarModels({
          carBrandId: brandId,
          carTypeKey: prefillData?.productCmiDetail?.carTypeKey,
          isEvType: prefillData?.productCmiDetail?.isEvType,
        })
        setCarModelList(res?.data?.data)
      } catch (error) {
        console.error('Error fetching car model data:', error)
      }
    },
    [prefillData?.productCmiDetail?.carTypeKey, prefillData?.productCmiDetail?.isEvType],
  )

  useEffect(() => {
    if (values?.carBrandId) {
      fetchCarModelData(values?.carBrandId as string)
    }
  }, [values?.carBrandId, fetchCarModelData])

  const handleSubmitForm = async () => {
    try {
      const prefix = convertStrToFormat(values?.licenseNo, 'idcar')?.split('-')[0]
      const license = convertStrToFormat(values?.licenseNo, 'idcar')?.split('-')[1]
      const data = {
        carBrandId: values?.carBrandId,
        carBrandName:
          carBrandList.find((b) => b.carBrandId.toString() === values?.carBrandId?.toString())?.carBrandName || '',
        carModelName: values?.carModelName,
        carColorId: values?.carColorId,
        carColorName:
          carColorList.find((c) => c.carColorId.toString() === values?.carColorId?.toString())?.carColorNameTh || '',
        chassisNumber: values?.chassisNumber,
        isRedLicense: values?.isRedLicense,
        licensePrefix: !license ? null : prefix,
        licenseNo: !license ? prefix : license,
        yearCoverage: values?.yearCoverage?.toString(),
        monthCoverage: values?.monthCoverage?.toString(),
        dayCoverage: values?.dayCoverage?.toString(),
      }
      if (!values?.isRedLicense) {
        Object.assign(data, {
          registrationYear: values?.registrationYear,
          registrationProvinceId: values?.registrationProvinceId,
          registrationProvinceName:
            carProvinceList.find((p) => p.provinceId.toString() === values?.registrationProvinceId?.toString())
              ?.provinceName || '',
        })
      }
      dispatch(
        prefillDataSlice.actions.setPrefillData({
          ...prefillData,
          productCmiDetail: {
            ...prefillData?.productCmiDetail,
            ...data,
          },
          customer: {
            ...prefillData?.customer,
            coverageStartDate: dayjs(`${values?.yearCoverage}-${values?.monthCoverage}-${values?.dayCoverage}`).format(
              'YYYY-MM-DD',
            ),
            coverageEndDate: dayjs(`${values?.yearCoverage}-${values?.monthCoverage}-${values?.dayCoverage}`)
              .add(1, 'year')
              .format('YYYY-MM-DD'),
          },
        }),
      )
      route.push(`/th/CustomerInformation`)
    } catch (error) {
      console.error('Error in handleSubmit:', error)
    }
  }

  return (
    <form>
      <div className="formMain">
        <div className="row car-brand">
          {carBrandList
            ?.slice()
            ?.sort((a: any, b: any) => a.carBrandRanking - b.carBrandRanking)
            ?.slice(0, 9)
            ?.map((brand: any) => {
              const isActive = values?.carBrandId === brand.carBrandId
              return (
                <button
                  type="button"
                  className="col-4 pe-6 mb-12"
                  key={brand.carBrandId}
                  onClick={() => {
                    handleChange({ name: 'carBrandId', value: brand.carBrandId })
                    fetchCarModelData(brand.carBrandId)
                  }}
                >
                  <div className={`rounded-4 text-center js-listdata choice-card h-100${isActive ? ' active' : ''}`}>
                    <Image alt={brand?.carBrandName} width="48" height="48" src={brand?.carBrandImage} />
                  </div>
                </button>
              )
            })}
        </div>
        <div className="form-group mb-12 carbrand">
          <Select
            label="ยี่ห้อรถ"
            name="carBrand"
            firstOptionLabel="เลือกยี่ห้อรถ"
            options={carBrandList
              ?.slice()
              ?.sort((a: any, b: any) => a.carBrandRanking - b.carBrandRanking)
              ?.map((brand: any) => ({
                label: brand?.carBrandName,
                value: brand?.carBrandId,
              }))}
            onChange={(value) => {
              handleChange({ name: 'carBrandId', value })
              fetchCarModelData(value)
            }}
            value={values?.carBrandId || ''}
            feedback={errors?.carBrandId}
          />
        </div>
        <div className='car-model-color-container'>
          <div style={{ width: '100%' }} className="form-group mb-12 carmodel">
            <Select
              label="รุ่นรถ"
              name="carModelName"
              firstOptionLabel="เลือกรุ่นรถ"
              disabled={values?.carBrandId === 'NO_VALUE'}
              options={carModelList?.slice()?.map((model: any) => ({
                label: model,
                value: model,
              }))}
              onChange={(value) => handleChange({ name: 'carModelName', value })}
              value={values?.carModelName || ''}
              feedback={errors?.carModelName}
            />
          </div>
          <div style={{ width: '100%' }} className="form-group mb-12 carcolor">
            <Select
              label="สีรถ"
              name="carColorId"
              firstOptionLabel="เลือกสีรถ"
              value={values?.carColorId || ''}
              onChange={(value) => handleChange({ name: 'carColorId', value })}
              options={carColorList?.slice()?.map((color: any) => ({
                label: color?.carColorNameTh,
                value: color?.carColorId,
              }))}
              feedback={errors?.carColorId}
            />
          </div>
        </div>
        <div className="form-group form-vehicle-id mb-12 chassisnumber">
          <Input
            label="เลขตัวถัง"
            name="chassisNumber"
            type="text"
            maxLength={17}
            placeholder="ตัวอย่าง AAAAAA123AA123456"
            value={values?.chassisNumber || ''}
            onChange={(e) =>
              handleChange({
                name: 'chassisNumber',
                value: convertStrToFormat(e.target.value.replaceAll(' ', ''), 'eng_number'),
              })
            }
            suffix={
              <Image
                alt="ตัวช่วย"
                width="24"
                height="24"
                src="/assets/icon/question-circle.svg"
                onClick={() => setOpen(true)}
              />
            }
            feedback={errors?.chassisNumber}
          />
        </div>
        <ChassisDialog open={open} onClose={() => setOpen(false)} />
        <div style={{ marginTop: '24px' }} className="form-group mb-12 radio-list-horizontal">
          <h2 className="text-black" style={{ fontSize: '16px', fontWeight: '700' }}>รถของคุณป้ายแดงหรือไม่ ?</h2>
          <div className="mt-2">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="gap-3" style={{ display: 'flex', width: '100%' }}>
                <div style={{ display: 'flex', width: '100%' }}>
                  <RadioButton
                    inputId="isNotRed"
                    name="isRedLicense"
                    value={false}
                    onChange={(e) => handleChange({ name: 'isRedLicense', value: e.value })}
                    checked={!values?.isRedLicense}
                  />
                  <label htmlFor="isNotRed" className="ml-2">
                    ไม่ใช่
                  </label>
                </div>
                <div style={{ display: 'flex', width: '100%' }}>
                  <RadioButton
                    inputId="isRedLicense"
                    name="isRedLicense"
                    value={true}
                    onChange={(e) => {
                      handleChange({ name: 'isRedLicense', value: e.value })
                      handleChange({ name: 'registrationYear', value: null })
                      handleChange({ name: 'registrationProvinceId', value: null })
                      handleChange({ name: 'registrationProvinceName', value: null })
                    }}
                    checked={values?.isRedLicense}
                  />
                  <label htmlFor="isRedLicense" className="ml-2">
                    ใช่ ป้ายแดง
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="license-registration-container">
          <div className="form-group licenseregis">
            <Input
              label="ทะเบียนรถ"
              name="licenseNo"
              type="text"
              maxLength={13}
              placeholder="ตัวอย่าง 2ขข2222"
              value={values?.licenseNo?.replaceAll('-', '') || ''}
              onChange={(e) =>
                handleChange({
                  name: 'licenseNo',
                  value: convertStrToFormat(e.target.value.replaceAll(' ', ''), 'idcar'),
                })
              }
              feedback={errors?.licenseNo}
            />
          </div>
          {!values?.isRedLicense && (
            <>
              <div className="form-group yearregis">
                <Select
                  label="ปีที่จดทะเบียน"
                  name="registrationYear"
                  value={values?.registrationYear}
                  onChange={(value) => handleChange({ name: 'registrationYear', value })}
                  options={YEAR_REGISTER}
                  firstOptionLabel="เลือกปีที่จดทะเบียน"
                  feedback={errors?.registrationYear}
                />
              </div>
              <div className="form-group province span-2">
                <Select
                  label="จังหวัดที่จดทะเบียน"
                  name="registrationProvinceId"
                  value={values?.registrationProvinceId}
                  onChange={(value) => handleChange({ name: 'registrationProvinceId', value })}
                  options={carProvinceList?.map((e) => ({
                    label: e.provinceName,
                    value: e.provinceId,
                  }))}
                  firstOptionLabel="เลือกจังหวัดที่จดทะเบียน"
                  feedback={errors?.registrationProvinceId}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="formMain">
        <h6 className="fs-18 f-bd mb-12 mt-4">ระยะเวลาคุ้มครอง</h6>
        <span className="fs-14 f-bd d-block mb-2 coverageDate-textFeild">วันที่เริ่มความคุ้มครอง</span>
        <div className="form-group mb-12 form-coverage">
          <div>
            <div className="d-flex">
              <div className="w-100 position-relative year">
                <Select
                  label="ปี"
                  name="yearCoverage"
                  value={values?.yearCoverage ? values?.yearCoverage.toString() : ''}
                  onChange={(value) => handleChange({ name: 'yearCoverage', value: Number(value) })}
                  options={
                    mounted
                      ? (() => {
                        const years = []
                        const currentYear = dayjs().year()
                        const maxDate = dayjs().add(90, 'day')
                        const maxYear = maxDate.year()

                        // Add current year and next year if 90 days spans into it
                        for (let year = currentYear; year <= maxYear; year++) {
                          years.push({
                            label: (year + 543).toString(),
                            value: year.toString(),
                          })
                        }
                        return years
                      })()
                      : []
                  }
                  feedback={errors?.yearCoverage}
                />
              </div>
              <div className="ms-2 me-2 w-100 position-relative month">
                <Select
                  label="เดือน"
                  name="monthCoverage"
                  value={values?.monthCoverage?.toString() || ''}
                  onChange={(value) => {
                    handleChange({ name: 'monthCoverage', value: Number(value) })

                    // Auto-update year if selected month is in next year
                    const today = dayjs()
                    const currentMonth = today.month() + 1
                    const selectedMonthNum = Number(value)

                    // If selected month is less than current month, it must be next year
                    if (selectedMonthNum < currentMonth) {
                      handleChange({ name: 'yearCoverage', value: today.year() + 1 })
                    } else {
                      handleChange({ name: 'yearCoverage', value: today.year() })
                    }
                  }}
                  options={
                    mounted
                      ? (() => {
                        const months = []
                        const maxDate = dayjs().add(90, 'day')
                        for (let i = 0; i < 4; i++) {
                          const month = dayjs().add(i, 'month')
                          if (month.isBefore(maxDate) || month.isSame(maxDate, 'month')) {
                            months.push({
                              label: month.format('MMMM'),
                              value: (month.month() + 1).toString(),
                            })
                          }
                        }
                        return months
                      })()
                      : []
                  }
                  feedback={errors?.monthCoverage}
                />
              </div>
              <div className="ms-0 w-100 position-relative day">
                <Select
                  label="วัน"
                  name="dayCoverage"
                  value={values?.dayCoverage?.toString() || ''}
                  onChange={(value) => {
                    handleChange({ name: 'dayCoverage', value: Number(value) })

                    // Auto-update year if selected date is in next year
                    const today = dayjs()
                    const currentMonth = today.month() + 1
                    const selectedMonthNum = values?.monthCoverage || currentMonth

                    // If selected month is less than current month, it must be next year
                    if (selectedMonthNum < currentMonth) {
                      handleChange({ name: 'yearCoverage', value: today.year() + 1 })
                    } else {
                      handleChange({ name: 'yearCoverage', value: today.year() })
                    }
                  }}
                  options={dayList}
                  feedback={errors?.dayCoverage}
                />
              </div>
            </div>
            <div className="feedback d-none">กรุณาเลือก</div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-2 mb-4">
          <span className="f-md text-grey">วันที่สิ้นสุดความคุ้มครอง</span>
          <span className="f-bd text-grey line-dotted">
            <strong>{coverageEndDateDisplay}</strong>
          </span>
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
    </form>
  )
}

export default CarInformationForm

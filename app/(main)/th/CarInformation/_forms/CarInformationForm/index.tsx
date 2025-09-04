'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { getCarBrands, getCarColors, getCarModels, getProvinces } from '../../_actions'
import { RadioButton } from 'primereact/radiobutton'
import { MONTHS_TH, YEAR_REGISTER } from '../../_constants'
import { ChassisDialog } from './ChassisDialog'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import { useDispatch, useSelector } from 'react-redux'
import { carUserDetailSlice } from '@/stores/redux/slices/carUserDetailSlice'
import { useRouter } from 'next/navigation'
import { Select } from '@/cmi-layout/components/Select'
import { Input } from '@/cmi-layout/components/Input'
import { prefillDataSlice } from '@/stores/redux/slices/prefillDataSlice'
import { convertStrToFormat } from '@/helpers/functions/utils'
dayjs.locale('th')

interface FormProps {
  data: any
}

const CarInformationForm = ({ data }: FormProps) => {
  const route = useRouter()
  const prefillData = useSelector((state: any) => state.prefillData)
  const dispatch = useDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [carColorList, setCarColorList] = useState<any[]>([])
  const [carBrandList, setCarBrandList] = useState<any[]>([])
  const [carModelList, setCarModelList] = useState<any[]>([])
  const [carProvinceList, setCarProvinceList] = useState<any[]>([])
  const [carBrandId, setCarBrandId] = useState<string | null>(null)
  const [carModelName, setCarModelName] = useState<string | null>(null)
  const [carColorId, setCarColorId] = useState<string | null>(null)
  const [chassisNumber, setChassisNumber] = useState<string | null>(null)
  const [isRedLicense, setIsRedLicense] = useState<boolean>(false)
  const [licenseNo, setLicenseNo] = useState<string | null>(null)
  const [yearCoverage, setYearCoverage] = useState<number | null>(null)
  const [monthCoverage, setMonthCoverage] = useState<number | null>(null)
  const [dayCoverage, setDayCoverage] = useState<number | null>(null)
  const [registrationYear, setRegistrationYear] = useState<string>('')
  const [registrationProvinceId, setRegistrationProvinceId] = useState<string>('')

  useEffect(() => {
    if (!yearCoverage) setYearCoverage(dayjs().year())
    if (!monthCoverage) setMonthCoverage(dayjs().month() + 1)
    if (!dayCoverage) setDayCoverage(dayjs().date())
    if (!carBrandId) setCarBrandId(prefillData?.productCmiDetail?.carBrandId ?? null)
    if (!carModelName) setCarModelName(prefillData?.productCmiDetail?.carModelName ?? null)
    if (!carColorId) setCarColorId(prefillData?.productCmiDetail?.carColorId ?? null)
    if (!chassisNumber) setChassisNumber(prefillData?.productCmiDetail?.chassisNumber ?? null)
    if (!licenseNo)
      setLicenseNo(
        prefillData?.productCmiDetail?.licenseNo
          ? `${prefillData?.productCmiDetail?.licensePrefix}${prefillData?.productCmiDetail?.licenseNo}`
          : null,
      )
    if (!registrationYear) setRegistrationYear(prefillData?.productCmiDetail?.registrationYear ?? null)
    if (!registrationProvinceId)
      setRegistrationProvinceId(prefillData?.productCmiDetail?.registrationProvinceId ?? null)
  }, [
    yearCoverage,
    monthCoverage,
    dayCoverage,
    carBrandId,
    carModelName,
    carColorId,
    chassisNumber,
    licenseNo,
    registrationYear,
    registrationProvinceId,
  ])

  const fetchCarProvinces = useCallback(async () => {
    const res = await getProvinces({ token: data?.token })
    setCarProvinceList(res.data.data)
  }, [data?.token])

  const fetchCarColors = useCallback(async () => {
    const res = await getCarColors({ token: data?.token })
    setCarColorList(res.data.data)
  }, [data?.token])

  const fetchCarBrands = useCallback(async () => {
    try {
      const res = await getCarBrands({
        token: data?.token,
        carTypeKey: prefillData?.productCmiDetail?.carTypeKey,
        isEvType: prefillData?.productCmiDetail?.isEvType,
      })
      setCarBrandList(res?.data?.data)
    } catch (error) {
      console.error('Error fetching car brands:', error)
    }
  }, [data?.token])

  useEffect(() => {
    fetchCarProvinces()
  }, [fetchCarProvinces])

  useEffect(() => {
    if (carBrandId) {
      fetchCarModelData(carBrandId as string)
    }
  }, [carBrandId])

  useEffect(() => {
    fetchCarColors()
    fetchCarBrands()
  }, [fetchCarColors, fetchCarBrands])

  const fetchCarModelData = async (brandId: string) => {
    try {
      const res = await getCarModels({
        token: data?.token,
        carBrandId: brandId,
        carTypeKey: prefillData?.productCmiDetail?.carTypeKey,
        isEvType: prefillData?.productCmiDetail?.isEvType,
      })
      setCarModelList(res?.data?.data)
      setCarBrandId(brandId)
    } catch (error) {
      console.error('Error fetching car model data:', error)
    }
  }

  const handleSubmit = async () => {
    try {
      const prefix = licenseNo?.split('-')[0]
      const license = licenseNo?.split('-')[1]
      const data = {
        carBrandId,
        carModelName,
        carColorId,
        chassisNumber,
        isRedLicense,
        licensePrefix: !license ? null : prefix,
        licenseNo: !license ? prefix : license,
        yearCoverage: yearCoverage?.toString(),
        monthCoverage: monthCoverage?.toString(),
        dayCoverage: dayCoverage?.toString(),
      }
      !isRedLicense &&
        Object.assign(data, {
          registrationYear,
          registrationProvinceId,
        })
      dispatch(
        prefillDataSlice.actions.setPrefillData({
          ...prefillData,
          productCmiDetail: { ...prefillData?.productCmiDetail, ...data },
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
              const isActive = carBrandId === brand.carBrandId
              return (
                <div
                  className="col-4 pe-6 mb-12"
                  key={brand.carBrandId}
                  onClick={() => fetchCarModelData(brand.carBrandId)}
                >
                  <div className={`rounded-4 text-center js-listdata choice-card h-100${isActive ? ' active' : ''}`}>
                    <Image alt={brand?.carBrandName} width="48" height="48" src={brand?.carBrandImage} />
                  </div>
                </div>
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
              fetchCarModelData(value)
            }}
            value={carBrandId || ''}
          />
        </div>
        <div className="form-group mb-12 carmodel">
          <Select
            label="รุ่นรถ"
            name="carModel"
            firstOptionLabel="เลือกรุ่นรถ"
            disabled={carBrandId === 'NO_VALUE'}
            options={carModelList?.slice()?.map((model: any) => ({
              label: model,
              value: model,
            }))}
            onChange={(value) => setCarModelName(value)}
            value={carModelName || ''}
          />
        </div>
        <div className="form-group mb-12 carcolor">
          <Select
            label="สีรถ"
            name="carColorId"
            firstOptionLabel="เลือกสีรถ"
            value={carColorId || ''}
            onChange={(value) => setCarColorId(value)}
            options={carColorList?.slice()?.map((color: any) => ({
              label: color?.carColorNameTh,
              value: color?.carColorId,
            }))}
          />
        </div>
        <div className="form-group form-vehicle-id mb-12 chassisnumber">
          <Input
            label="เลขตัวถัง"
            name="chassisNumber"
            type="text"
            maxLength={17}
            placeholder="ตัวอย่าง AAAAAA123AA123456"
            value={chassisNumber || ''}
            onChange={(e) => setChassisNumber(e.target.value)}
            suffix={
              <button type="button" className="bg-transparent border-0 z-index-2" onClick={() => setOpen(true)}>
                <Image alt="ตัวช่วย" width="24" height="24" src="/assets/icon/icon-question.png" />
              </button>
            }
          />
        </div>
        <ChassisDialog open={open} onClose={() => setOpen(false)} />
        <div className="form-group mb-12 radio-list-horizontal">
          <span className="EditingFormLabel fs-14 ">รถของคุณป้ายแดงหรือไม่ ?</span>
          <div className="mt-2">
            <div style={{ display: 'flex' }}>
              <div className="flex-wrap gap-3" style={{ display: 'flex' }}>
                <div style={{ display: 'flex' }}>
                  <RadioButton
                    inputId="isNotRed"
                    name="isRedLicense"
                    value={false}
                    onChange={(e) => setIsRedLicense(e.value)}
                    checked={!isRedLicense}
                  />
                  <label htmlFor="isNotRed" className="ml-2">
                    ไม่ใช่
                  </label>
                </div>
                <div style={{ display: 'flex' }}>
                  <RadioButton
                    inputId="isRedLicense"
                    name="isRedLicense"
                    value={true}
                    onChange={(e) => setIsRedLicense(e.value)}
                    checked={isRedLicense}
                  />
                  <label htmlFor="isRedLicense" className="ml-2">
                    ใช่ ป้ายแดง
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group mb-12 licenseregis">
          <Input
            label="ทะเบียนรถ"
            name="licenseNo"
            type="text"
            maxLength={13}
            placeholder="ตัวอย่าง 2ขข2222"
            value={licenseNo?.replaceAll('-', '') || ''}
            onChange={(e) => setLicenseNo(convertStrToFormat(e.target.value, 'idcar'))}
          />
        </div>
        {!isRedLicense && (
          <div>
            <div className="form-group mb-12 yearregis">
              <Select
                label="ปีที่จดทะเบียน"
                name="registrationYear"
                value={registrationYear}
                onChange={(value) => setRegistrationYear(value)}
                options={YEAR_REGISTER}
                firstOptionLabel="เลือกปีที่จดทะเบียน"
              />
            </div>
            <div className="form-group mb-12 province">
              <Select
                label="จังหวัดที่จดทะเบียน"
                name="registrationProvinceId"
                value={registrationProvinceId}
                onChange={(value) => setRegistrationProvinceId(value)}
                options={carProvinceList?.map((e) => ({
                  label: e.provinceName,
                  value: e.provinceId,
                }))}
                firstOptionLabel="เลือกจังหวัดที่จดทะเบียน"
              />
            </div>
          </div>
        )}
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
                  firstOptionLabel="เลือกปี"
                  name="yearCoverage"
                  value={yearCoverage ? yearCoverage.toString() : ''}
                  onChange={(value) => setYearCoverage(Number(value))}
                  options={[dayjs().year()].map((year) => ({
                    label: (year + 543).toString(),
                    value: year.toString(),
                  }))}
                />
              </div>
              <div className="ms-2 me-2 w-100 position-relative month">
                <Select
                  label="เดือน"
                  firstOptionLabel="เลือกเดือน"
                  name="monthCoverage"
                  value={monthCoverage?.toString() || ''}
                  onChange={(value) => setMonthCoverage(Number(value))}
                  options={Array.from({ length: 12 }, (_, i) => ({
                    label: dayjs().month(i).format('MMMM'),
                    value: (i + 1).toString(),
                  }))}
                />
              </div>
              <div className="ms-0 w-100 position-relative day">
                <Select
                  label="วัน"
                  firstOptionLabel="เลือกวัน"
                  name="dayCoverage"
                  value={dayCoverage?.toString() || ''}
                  onChange={(value) => setDayCoverage(Number(value))}
                  options={(() => {
                    const selectedMonth = monthCoverage ? dayjs().month(monthCoverage - 1) : dayjs()
                    const daysInMonth = selectedMonth.daysInMonth()
                    return Array.from({ length: daysInMonth }, (_, i) => {
                      const day = i + 1
                      return {
                        value: day.toString(),
                        label: day.toString(),
                      }
                    })
                  })()}
                />
                {}
              </div>
            </div>
            <div className="feedback d-none">กรุณาเลือก</div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-2 mb-4">
          <span className="f-md text-grey">วันที่สิ้นสุดความคุ้มครอง</span>
          <span className="f-bd text-grey line-dotted">
            <strong>
              {`${dayCoverage} ${monthCoverage ? MONTHS_TH[monthCoverage - 1] : ''} ${yearCoverage !== null && yearCoverage !== undefined ? yearCoverage + 543 : ''}`}
            </strong>
          </span>
        </div>
      </div>
      <div className="container">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary fs-6 d-flex justify-content-center align-items-center mx-auto mb-4 f-bd"
        >
          ดำเนินการต่อ
        </button>
      </div>
    </form>
  )
}

export default CarInformationForm

import { object, string } from 'yup'

const validateLicenseNo = (value: string | undefined | null): boolean => {
  if (!value) return false

  const cleanValue = value.replace(/-/g, '')

  if (cleanValue.length < 3) return false

  const digitPattern = /\d/

  if (!digitPattern.test(cleanValue)) return false

  if (/^\d+$/.test(cleanValue)) {
    return cleanValue.length >= 1 && cleanValue.length <= 4
  }

  if (/^[ก-ฮ]+\d+$/.test(cleanValue)) {
    const letters = cleanValue.match(/^[ก-ฮ]+/)?.[0] || ''
    const numbers = cleanValue.match(/\d+$/)?.[0] || ''
    return letters.length >= 2 && letters.length <= 3 && numbers.length >= 1 && numbers.length <= 4
  }

  if (/^\d+[ก-ฮ]+\d+$/.test(cleanValue)) {
    const finalNumbers = cleanValue.match(/\d+$/)?.[0] || ''
    const prefix = cleanValue.substring(0, cleanValue.length - finalNumbers.length)
    return prefix.length >= 1 && prefix.length <= 3 && finalNumbers.length >= 1 && finalNumbers.length <= 4
  }

  return false
}

const carInformationSchema = object({
  carBrandId: string().required('กรุณาเลือกยี่ห้อรถยนต์'),
  carModelName: string().required('กรุณาเลือกรุ่นรถยนต์'),
  carColorId: string().required('กรุณาเลือกสีรถยนต์'),
  chassisNumber: string().required('กรุณากรอกหมายเลขตัวถังรถยนต์'),
  licenseNo: string()
    .required('กรุณากรอกหมายเลขทะเบียนรถยนต์')
    .test('valid-license', 'รูปแบบทะเบียนรถไม่ถูกต้อง', validateLicenseNo),
  yearCoverage: string().required('กรุณาเลือกปีที่ครอบคลุมรถยนต์'),
  monthCoverage: string().required('กรุณาเลือกเดือนที่ครอบคลุมรถยนต์'),
  dayCoverage: string().required('กรุณาเลือกวันที่ครอบคลุมรถยนต์'),
  registrationYear: string().when('isRedLicense', {
    is: (value: any) => value === false,
    then: (schema) => schema.required('กรุณาเลือกปีที่จดทะเบียนรถยนต์'),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  registrationProvinceId: string().when('isRedLicense', {
    is: (value: any) => value === false,
    then: (schema) => schema.required('กรุณาเลือกจังหวัดที่จดทะเบียนรถยนต์'),
    otherwise: (schema) => schema.optional().nullable(),
  }),
})

export default carInformationSchema

import { isValidThaiID } from '@/helpers/functions/utils'
import { object, string } from 'yup'

const customerInformationSchema = object({
  title: string().required('กรุณาเลือกคำนำหน้า').notOneOf([null, '', 'NO_VALUE'], 'กรุณาเลือกคำนำหน้า'),
  firstName: string()
    .required('กรุณากรอกชื่อ')
    .matches(/^[ก-๏\s]+$/, 'กรุณากรอกชื่อเป็นภาษาไทยเท่านั้น')
    .max(50, 'กรุณากรอกชื่อไม่เกิน 50 ตัวอักษร'),
  lastName: string()
    .required('กรุณากรอกนามสกุล')
    .matches(/^[ก-๏\s]+$/, 'กรุณากรอกนามสกุลเป็นภาษาไทยเท่านั้น')
    .max(50, 'กรุณากรอกนามสกุลไม่เกิน 50 ตัวอักษร'),
  taxId: string()
    .required('กรุณากรอกเลขบัตรประชาชน')
    .length(13, 'กรุณากรอกเลขบัตรประชาชน 13 หลัก')
    .test('is-valid-thai-id', 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง', (value) => {
      if (!value) return false
      return isValidThaiID(value)
    }),
  birthYear: string().required('กรุณากรอกปีเกิด').notOneOf(['NO_VALUE'], 'กรุณากรอกปีเกิด'),
  birthMonth: string().required('กรุณากรอกเดือนเกิด').notOneOf(['NO_VALUE'], 'กรุณากรอกเดือนเกิด'),
  birthDay: string().required('กรุณากรอกวันเกิด').notOneOf(['NO_VALUE'], 'กรุณากรอกวันเกิด'),
  telephoneNo: string()
    .required('กรุณากรอกเบอร์โทรศัพท์')
    .matches(/^\d{10}$/, 'กรุณากรอกเบอร์โทรศัพท์ 10 หลัก'),
  email: string().required('กรุณากรอกอีเมล').email('กรุณากรอกอีเมลให้ถูกต้อง'),
  houseNumber: string().required('กรุณากรอกที่อยู่'),
  zipCode: string().required('กรุณากรอกไปรษณีย์').length(5, 'กรุณากรอกไปรษณีย์ 5 หลัก'),
  provinceId: string().required('กรุณาเลือกจังหวัด').notOneOf(['NO_VALUE'], 'กรุณาเลือกจังหวัด'),
  districtId: string().required('กรุณาเลือกอำเภอ').notOneOf(['NO_VALUE'], 'กรุณาเลือกอำเภอ'),
  subDistrictId: string().required('กรุณาเลือกตำบล').notOneOf(['NO_VALUE'], 'กรุณาเลือกตำบล'),
})

export default customerInformationSchema

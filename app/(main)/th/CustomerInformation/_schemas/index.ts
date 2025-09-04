import { boolean, object, string } from 'yup'

const customerInformationSchema = object({
  title: string().required('กรุณาเลือกคำนำหน้า'),
  name: string()
    .required('กรุณากรอกชื่อ')
    .matches(/^[ก-๏\s]+$/, 'กรุณากรอกชื่อเป็นภาษาไทยเท่านั้น')
    .max(50, 'กรุณากรอกชื่อไม่เกิน 50 ตัวอักษร'),
  surname: string()
    .required('กรุณากรอกนามสกุล')
    .matches(/^[ก-๏\s]+$/, 'กรุณากรอกนามสกุลเป็นภาษาไทยเท่านั้น')
    .max(50, 'กรุณากรอกนามสกุลไม่เกิน 50 ตัวอักษร'),
  citizen: string().required('กรุณากรอกเลขบัตรประชาชน').length(13, 'กรุณากรอกเลขบัตรประชาชน 13 หลัก'),
  birthday: string().required('กรุณากรอกวันเกิด'),
  tel: string()
    .required('กรุณากรอกเบอร์โทรศัพท์')
    .matches(/^[0-9]{10}$/, 'กรุณากรอกเบอร์โทรศัพท์ 10 หลัก'),
  email: string().required('กรุณากรอกอีเมล').email('กรุณากรอกอีเมลให้ถูกต้อง'),
  address: string().required('กรุณากรอกที่อยู่'),
  zipcode: string().required('กรุณากรอกไปรษณีย์').length(5, 'กรุณากรอกไปรษณีย์ 5 หลัก'),
  year: string().required('กรุณากรอกปีเกิด'),
  month: string().required('กรุณากรอกเดือนเกิด'),
  day: string().required('กรุณากรอกวันเกิด'),
})

export default customerInformationSchema

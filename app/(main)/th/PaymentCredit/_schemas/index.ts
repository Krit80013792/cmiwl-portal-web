import { getCreditCardType } from '@/helpers/functions/utils'
import { object, string } from 'yup'

const creditCardSchema = object({
  creditCardNo: string()
    .required('กรุณากรอกหมายเลขบัตร')
    .matches(/^[0-9\s]+$/, 'กรุณากรอกหมายเลขบัตรให้ถูกต้อง')
    .min(13, 'กรุณากรอกหมายเลขบัตรให้ถูกต้อง')
    .max(19, 'กรุณากรอกหมายเลขบัตรให้ถูกต้อง')
    .test('card-type', 'ประเภทบัตรไม่รองรับ', (value) => {
      if (!value) return true
      return getCreditCardType(value) !== 'unknown'
    }),
  creditName: string().required('กรุณากรอกชื่อผู้ถือบัตร').max(100, 'กรุณากรอกชื่อผู้ถือบัตรไม่เกิน 100 ตัวอักษร'),
  creditExpiry: string()
    .required('กรุณากรอกวันหมดอายุ')
    .matches(/^(0[1-9]|1[0-2])\/?(\d{2})$/, 'กรุณากรอกวันหมดอายุให้ถูกต้อง'),
  creditCVV: string()
    .required('กรุณากรอก CVV/CVC')
    .matches(/^\d{3}$/, 'กรุณากรอก CVV/CVC ให้ถูกต้อง')
    .min(3, 'กรุณากรอก CVV/CVC ให้ถูกต้อง')
    .max(3, 'กรุณากรอก CVV/CVC ให้ถูกต้อง'),
})

export default creditCardSchema

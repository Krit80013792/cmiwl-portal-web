import { isValidThaiID } from '@/helpers/functions/utils'
import { boolean, object, string } from 'yup'

const customerInformationSchema = object({
  personType: string().required('กรุณาเลือกประเภทบุคคล'),


  // Fields below validate only when personType === 'normal-person'
  title: string().when('personType', {
    is: 'normal-person',
    then: (schema) => schema.required('กรุณาเลือกคำนำหน้า').notOneOf([null, '', 'NO_VALUE'], 'กรุณาเลือกคำนำหน้า'),
    otherwise: (schema) => schema.notRequired(),
  }),
  firstName: string().when('personType', {
    is: 'normal-person',
    then: (schema) =>
      schema
        .required('กรุณากรอกชื่อ')
        .matches(/^[ก-๏\s]+$/, 'กรุณากรอกชื่อเป็นภาษาไทยเท่านั้น')
        .max(50, 'กรุณากรอกชื่อไม่เกิน 50 ตัวอักษร'),
    otherwise: (schema) => schema.notRequired(),
  }),
  lastName: string().when('personType', {
    is: 'normal-person',
    then: (schema) =>
      schema
        .required('กรุณากรอกนามสกุล')
        .matches(/^[ก-๏\s]+$/, 'กรุณากรอกนามสกุลเป็นภาษาไทยเท่านั้น')
        .matches(/^(?!\s).*/, 'ไม่สามารถขึ้นต้นด้วยช่องว่างได้')
        .max(50, 'กรุณากรอกนามสกุลไม่เกิน 50 ตัวอักษร'),
    otherwise: (schema) => schema.notRequired(),
  }),
  taxId: string().when('personType', {
    is: 'normal-person',
    then: (schema) =>
      schema
        .required('กรุณากรอกเลขบัตรประชาชน')
        .length(13, 'กรุณากรอกเลขบัตรประชาชน 13 หลัก')
        .test('is-valid-thai-id', 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง', (value) => {
          if (!value) return false
          return isValidThaiID(value)
        }),
    otherwise: (schema) => schema.notRequired(),
  }),
  birthYear: string().when('personType', {
    is: 'normal-person',
    then: (schema) => schema.required('กรุณากรอกปีเกิด').notOneOf(['NO_VALUE'], 'กรุณากรอกปีเกิด'),
    otherwise: (schema) => schema.notRequired(),
  }),
  birthMonth: string().when('personType', {
    is: 'normal-person',
    then: (schema) => schema.required('กรุณากรอกเดือนเกิด').notOneOf(['NO_VALUE'], 'กรุณากรอกเดือนเกิด'),
    otherwise: (schema) => schema.notRequired(),
  }),
  birthDay: string().when('personType', {
    is: 'normal-person',
    then: (schema) => schema.required('กรุณากรอกวันเกิด').notOneOf(['NO_VALUE'], 'กรุณากรอกวันเกิด'),
    otherwise: (schema) => schema.notRequired(),
  }),
  telephoneNo: string().when('personType', {
    is: 'normal-person',
    then: (schema) =>
      schema
        .required('กรุณากรอกเบอร์โทรศัพท์')
        .matches(/^\d{10}$/, 'กรุณากรอกเบอร์โทรศัพท์ 10 หลัก'),
    otherwise: (schema) => schema.notRequired(),
  }),

  //todo: personType = นิติบุคคล

  juristicTitle: string().when('personType', {
    is: 'juristic-person',
    then: (schema) =>
      schema
        .required('กรุณาเลือกคำนำหน้า')
        .notOneOf([null, '', 'NO_VALUE'], 'กรุณาเลือกคำนำหน้า'),
    otherwise: (schema) => schema.notRequired(),
  }),
  juristicCompanyName: string().when('personType', {
    is: 'juristic-person',
    then: (schema) =>
      schema
        .required('กรุณากรอกชื่อบริษัท')
        .max(50, 'กรุณากรอกชื่อบริษัทไม่เกิน 50 ตัวอักษร'),
    otherwise: (schema) => schema.notRequired(),
  }),
  juristicId: string().when('personType', {
    is: 'juristic-person',
    then: (schema) =>
      schema
        .required('กรุณากรอกเลขนิติบุคคล')
        .matches(/^\d{13}$/, 'ต้องเป็นตัวเลข 13 หลัก'),
    otherwise: (schema) => schema.notRequired(),
  }),
  juristicRegistrationDate: string().when('personType', {
    is: 'juristic-person',
    then: (schema) =>
      schema
        .required('กรุณากรอกวันจดทะเบียนบริษัท'),
    otherwise: (schema) => schema.notRequired(),
  }),
  juristicCertificateIssueDate: string().when('personType', {
    is: 'juristic-person',
    then: (schema) =>
      schema
        .required('กรุณากรอกวันออกหนังสือรับรองบริษัท'),
    otherwise: (schema) => schema.notRequired(),
  }),
  juristicTelephoneNo: string().when('personType', {
    is: 'juristic-person',
    then: (schema) =>
      schema
        .required('กรุณากรอกเบอร์โทรศัพท์')
        .matches(/^\d{10}$/, 'กรุณากรอกเบอร์โทรศัพท์ 10 หลัก'),
    otherwise: (schema) => schema.notRequired(),
  }),



  // email: string().required('กรุณากรอกอีเมล').email('กรุณากรอกอีเมลให้ถูกต้อง'),

  houseNumber: string()
    .required('กรุณากรอกที่อยู่')
    .matches(/^(?!\s).*/, 'ไม่สามารถขึ้นต้นด้วยช่องว่างได้'),
  villageNo: string().matches(/^\d*$/, 'กรุณากรอกเฉพาะตัวเลข'),
  buildingVillage: string().matches(/^(?!\s).*/, 'ไม่สามารถขึ้นต้นด้วยช่องว่างได้'),
  alley: string().matches(/^(?!\s).*/, 'ไม่สามารถขึ้นต้นด้วยช่องว่างได้'),
  street: string().matches(/^(?!\s).*/, 'ไม่สามารถขึ้นต้นด้วยช่องว่างได้'),
  zipCode: string().required('กรุณากรอกไปรษณีย์').length(5, 'กรุณากรอกไปรษณีย์ 5 หลัก'),
  provinceId: string().required('กรุณาเลือกจังหวัด').notOneOf(['NO_VALUE'], 'กรุณาเลือกจังหวัด'),
  districtId: string().required('กรุณาเลือกอำเภอ').notOneOf(['NO_VALUE'], 'กรุณาเลือกอำเภอ'),
  subDistrictId: string().required('กรุณาเลือกตำบล').notOneOf(['NO_VALUE'], 'กรุณาเลือกตำบล'),
  isEmail: boolean().test('at-least-one', 'กรุณาเลือกช่องทางการติดต่ออย่างน้อย 1 ช่องทาง', function (value) {
    const { isSms } = this.parent
    return value === true || isSms === true
  }),
  isSms: boolean().test('at-least-one', 'กรุณาเลือกช่องทางการติดต่ออย่างน้อย 1 ช่องทาง', function (value) {
    const { isEmail } = this.parent
    return value === true || isEmail === true
  }),
  policyEmail: string().when('isEmail', {
    is: true,
    then: (schema) => schema.required('กรุณากรอกอีเมล').email('กรุณากรอกอีเมลให้ถูกต้อง'),
    otherwise: (schema) => schema.notRequired(),
  }),
  policySms: string().when('isSms', {
    is: true,
    then: (schema) => schema.required('กรุณากรอกเบอร์โทรศัพท์').matches(/^\d{10}$/, 'กรุณากรอกเบอร์โทรศัพท์ 10 หลัก'),
    otherwise: (schema) => schema.notRequired(),
  }),
})

export default customerInformationSchema

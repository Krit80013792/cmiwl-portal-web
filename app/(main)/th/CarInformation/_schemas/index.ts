import { object, string } from 'yup'

const carInformationSchema = object({
  carBrandId: string().required('กรุณาเลือกยี่ห้อรถยนต์'),
  carModelName: string().required('กรุณาเลือกรุ่นรถยนต์'),
  carColorId: string().required('กรุณาเลือกสีรถยนต์'),
  chassisNumber: string().required('กรุณากรอกหมายเลขตัวถังรถยนต์'),
  licenseNo: string().required('กรุณากรอกหมายเลขทะเบียนรถยนต์'),
  yearCoverage: string().required('กรุณาเลือกปีที่ครอบคลุมรถยนต์'),
  monthCoverage: string().required('กรุณาเลือกเดือนที่ครอบคลุมรถยนต์'),
  dayCoverage: string().required('กรุณาเลือกวันที่ครอบคลุมรถยนต์'),
  registrationYear: string().required('กรุณาเลือกปีที่จดทะเบียนรถยนต์'),
  registrationProvinceId: string().required('กรุณาเลือกจังหวัดที่จดทะเบียนรถยนต์'),
})

export default carInformationSchema

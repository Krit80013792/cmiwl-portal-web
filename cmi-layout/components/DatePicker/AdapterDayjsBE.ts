import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

/**
 * Custom adapter for MUI X Date Pickers ที่แสดงปี พ.ศ. (Buddhist Era)
 * โดยการบวก 543 เข้าไปในปี ค.ศ.
 */
export class AdapterDayjsBE extends AdapterDayjs {
  /**
   * Override formatByString เพื่อแปลงปี ค.ศ. เป็น พ.ศ.
   */
  formatByString = (date: Dayjs, formatString: string): string => {
    // แทนที่ YYYY ด้วย BBBB (Buddhist Era year format จาก buddhistEra plugin)
    const beFormat = formatString.replaceAll('YYYY', 'BBBB').replaceAll('YY', 'BB')
    return date.format(beFormat)
  }

  /**
   * Override parse เพื่อแปลง พ.ศ. กลับเป็น ค.ศ.
   */
  parse = (value: string, formatString: string): Dayjs | null => {
    if (value === '') {
      return null
    }

    // แปลง format string เพื่อ parse
    const ceFormat = formatString.replaceAll('BBBB', 'YYYY').replaceAll('BB', 'YY')
    
    // หาตำแหน่งของปีใน format string
    const yearMatch = /YYYY|YY/.exec(formatString)
    if (yearMatch) {
      // Extract year from value string
      const parts = value.split(/[/\-.\s]/)
      const formatParts = formatString.split(/[/\-.\s]/)
      
      let yearPartIndex = -1
      for (let i = 0; i < formatParts.length; i++) {
        if (formatParts[i]?.includes('YYYY') || formatParts[i]?.includes('YY')) {
          yearPartIndex = i
          break
        }
      }
      
      const yearStr = parts[yearPartIndex]
      if (yearPartIndex !== -1 && yearStr) {
        let yearValue = Number.parseInt(yearStr, 10)
        
        // ถือว่า input ทั้งหมดเป็น พ.ศ. เสมอ ไม่ว่าจะกรอกกี่หลักก็ตาม
        // ลบ 543 เพื่อแปลงกลับเป็น ค.ศ.
        if (!Number.isNaN(yearValue) && yearValue > 0) {
          yearValue = yearValue - 543
          parts[yearPartIndex] = yearValue.toString()
          value = parts.join('/')
        }
      }
    }

    const parsed = dayjs(value, ceFormat, this.locale, true)
    return parsed.isValid() ? parsed : null
  }
}


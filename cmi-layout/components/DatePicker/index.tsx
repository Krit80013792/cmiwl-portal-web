import React, { createContext, useContext, useMemo, useState } from 'react'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers/PickersCalendarHeader'
import { Box, IconButton, MenuItem, Select, type SelectChangeEvent } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import dayjs, { type Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import 'dayjs/locale/th'
import { AdapterDayjsBE } from './AdapterDayjsBE'
import { FormLabel } from '../FormLabel'
import { FormMessageError } from '../FormMessageError'
const calendar = '/assets/icons/calendar-ico.svg'
import * as S from './styled'

dayjs.extend(utc)
dayjs.extend(buddhistEra)

// เดือนในภาษาไทย
const THAI_MONTHS = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม',
]

// สร้าง list ปี พ.ศ. โดยรับ minDate และ maxDate
const generateYearOptions = (minDate?: Dayjs, maxDate?: Dayjs) => {
  const currentYear = dayjs().year() + 543 // ปี พ.ศ. ปัจจุบัน

  // ใช้ minDate/maxDate ถ้ามี ไม่งั้นใช้ค่า default
  const minYear = minDate ? minDate.year() + 543 : currentYear - 100
  const maxYear = maxDate ? maxDate.year() + 543 : currentYear + 20

  const years: number[] = []
  for (let i = maxYear; i >= minYear; i--) {
    years.push(i)
  }
  return years
}

// Default Calendar Icon Component
const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  // Filter out MUI-specific props that shouldn't be passed to DOM elements
  const { ownerState, ...restProps } = props as any

  // Extract only valid HTML img attributes
  const { className, style, onClick, onMouseEnter, onMouseLeave } = restProps

  // Only pass valid HTML img attributes
  const validImgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    src: calendar,
    alt: 'calendar',
    width: 24,
    height: 24,
    style: { display: 'block', ...style },
    ...(className && { className }),
    ...(onClick && { onClick }),
    ...(onMouseEnter && { onMouseEnter }),
    ...(onMouseLeave && { onMouseLeave }),
  }

  // Ensure `alt` is explicitly set in JSX to satisfy Sonar's accessibility rule.
  return <img {...validImgProps} alt="calendar" />
}
CalendarIcon.displayName = 'CalendarIcon'

// Context สำหรับ track ว่า Select dropdown กำลังเปิดอยู่หรือไม่
interface SelectOpenContextType {
  isSelectOpen: boolean
  setIsSelectOpen: (open: boolean) => void
}
const SelectOpenContext = createContext<SelectOpenContextType | null>(null)

// Context สำหรับส่ง minDate/maxDate ไปยัง CustomCalendarHeader
interface DateRangeContextType {
  minDate?: Dayjs
  maxDate?: Dayjs
}
const DateRangeContext = createContext<DateRangeContextType | null>(null)

// Custom Calendar Header Component
const CustomCalendarHeader = (props: PickersCalendarHeaderProps) => {
  const { currentMonth, onMonthChange } = props
  const context = useContext(SelectOpenContext)
  const dateRangeContext = useContext(DateRangeContext)

  const currentMonthIndex = currentMonth.month()
  const currentYearBE = currentMonth.year() + 543 // แปลงเป็น พ.ศ.

  // สร้าง year options ตาม minDate/maxDate
  const yearOptions = useMemo(() => {
    return generateYearOptions(dateRangeContext?.minDate, dateRangeContext?.maxDate)
  }, [dateRangeContext?.minDate, dateRangeContext?.maxDate])

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    const newMonth = Number(event.target.value)
    const newDate = currentMonth.month(newMonth)
    onMonthChange(newDate)
  }

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    const newYearBE = Number(event.target.value)
    const newYearCE = newYearBE - 543 // แปลงกลับเป็น ค.ศ.
    const newDate = currentMonth.year(newYearCE)
    onMonthChange(newDate)
  }

  const handlePrevMonth = () => {
    const newDate = currentMonth.subtract(1, 'month')
    onMonthChange(newDate)
  }

  const handleNextMonth = () => {
    const newDate = currentMonth.add(1, 'month')
    onMonthChange(newDate)
  }

  const handleSelectOpen = () => {
    context?.setIsSelectOpen(true)
  }

  const handleSelectClose = () => {
    // Delay เพื่อให้ click event ผ่านไปก่อน
    setTimeout(() => {
      context?.setIsSelectOpen(false)
    }, 150)
  }

  return (
    <Box sx={S.calendarHeaderContainerSx}>
      <IconButton onClick={handlePrevMonth} size="small">
        <ChevronLeft />
      </IconButton>

      <Box sx={S.calendarHeaderSelectContainerSx}>
        {/* Month Dropdown */}
        <Select
          value={currentMonthIndex}
          onChange={handleMonthChange}
          onOpen={handleSelectOpen}
          onClose={handleSelectClose}
          size="small"
          variant="outlined"
          MenuProps={{
            container: document.body,
            sx: S.selectMenuPropsSx,
          }}
          sx={S.monthSelectSx}
        >
          {THAI_MONTHS.map((month, index) => (
            <MenuItem key={month} value={index} sx={S.menuItemSx}>
              {month}
            </MenuItem>
          ))}
        </Select>

        {/* Year Dropdown (พ.ศ.) */}
        <Select
          value={currentYearBE}
          onChange={handleYearChange}
          onOpen={handleSelectOpen}
          onClose={handleSelectClose}
          size="small"
          variant="outlined"
          MenuProps={{
            container: document.body,
            sx: S.selectMenuPropsSx,
          }}
          sx={S.yearSelectSx}
        >
          {yearOptions.map((year) => (
            <MenuItem key={year} value={year} sx={S.menuItemSx}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <IconButton onClick={handleNextMonth} size="small">
        <ChevronRight />
      </IconButton>
    </Box>
  )
}

interface DatePickerProps {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  descLabel?: string
  size?: 'small' | 'medium'
  error?: string
  value?: string
  onChange?: (date: string | null) => void
  className?: string
  format?: string
  icon?: React.ReactNode
  minDate?: string // YYYY-MM-DD format
  maxDate?: string // YYYY-MM-DD format
  weightLabel?: 'normal' | 'bold' | 400 | 700
}

const AppDatePicker: React.FC<DatePickerProps> = ({
  name,
  label,
  weightLabel = 'normal',
  placeholder,
  required = false,
  disabled = false,
  descLabel,
  error,
  value = '',
  onChange,
  size,
  className,
  format = 'DD/MM/YYYY',
  icon,
  minDate,
  maxDate,
  ...props
}) => {
  const invalid = !!error
  const [open, setOpen] = useState(false)
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const handleChange = (date: Dayjs | null) => {
    if (onChange) {
      let result: string | null = null
      if (date) {
        try {
          const utcDate = dayjs.utc(date)
          if (utcDate.isValid()) {
            result = utcDate.toISOString()
          }
        } catch {
          result = null
        }
      }
      onChange(result)
    }
  }

  const parseDate = (dateString: string): Dayjs | null => {
    if (!dateString) return null
    // Parse เป็น UTC แล้วแปลงเป็น local timezone สำหรับแสดงผล
    const parsedDate = dayjs.utc(dateString).local()
    return parsedDate.isValid() ? parsedDate : null
  }

  // Parse minDate and maxDate from YYYY-MM-DD format
  const parsedMinDate = useMemo(() => {
    if (!minDate) return undefined
    const parsed = dayjs(minDate, 'YYYY-MM-DD')
    return parsed.isValid() ? parsed : undefined
  }, [minDate])

  const parsedMaxDate = useMemo(() => {
    if (!maxDate) return undefined
    const parsed = dayjs(maxDate, 'YYYY-MM-DD')
    return parsed.isValid() ? parsed : undefined
  }, [maxDate])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    // ถ้า Select dropdown กำลังเปิดอยู่ ไม่ให้ปิด DatePicker
    if (isSelectOpen) {
      return
    }
    setOpen(false)
  }

  const muiSize = size === 'small' ? 'small' : 'medium'

  const contextValue = useMemo(() => ({ isSelectOpen, setIsSelectOpen }), [isSelectOpen])

  const dateRangeContextValue = useMemo(
    () => ({
      minDate: parsedMinDate,
      maxDate: parsedMaxDate,
    }),
    [parsedMinDate, parsedMaxDate],
  )

  // Create icon component for MUI DatePicker
  const IconComponent = useMemo(() => {
    if (icon) {
      // If custom icon is provided, wrap it in a component
      const CustomIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => {
        return icon as React.ReactElement
      }
      return CustomIcon
    }
    return CalendarIcon
  }, [icon])

  return (
    <SelectOpenContext.Provider value={contextValue}>
      <DateRangeContext.Provider value={dateRangeContextValue}>
        <LocalizationProvider
          dateAdapter={AdapterDayjsBE}
          adapterLocale="th"
          localeText={{
            fieldDayPlaceholder: () => 'วว',
            fieldMonthPlaceholder: () => 'ดด',
            fieldYearPlaceholder: (params) => 'ป'.repeat(params.digitAmount ?? 4),
          }}
        >
          <div>
            <FormLabel name={name} label={label} descLabel={descLabel} required={required} weight={weightLabel} />
            <MuiDatePicker
              data-testid={`${name}-date-picker`}
              sx={S.datePickerSx}
              name={name}
              disabled={disabled}
              value={parseDate(value)}
              onChange={handleChange}
              open={open}
              onOpen={handleOpen}
              onClose={handleClose}
              minDate={parsedMinDate}
              maxDate={parsedMaxDate}
              dayOfWeekFormatter={(day) => {
                const thaiDays = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.']
                return thaiDays[day.day()] ?? ''
              }}
              slots={{
                calendarHeader: CustomCalendarHeader,
                openPickerIcon: IconComponent,
              }}
              slotProps={{
                textField: {
                  size: muiSize,
                  className,
                  error: invalid,
                  fullWidth: true,
                  placeholder,
                  autoComplete: 'off',
                  inputProps: {
                    autoComplete: 'off',
                    'data-form-type': 'other',
                    'data-lpignore': 'true',
                  },
                },
                field: {
                  clearable: true,
                  onClear: () => handleChange(null),
                },
                openPickerButton: {
                  sx: S.openPickerButtonSx,
                },
                inputAdornment: {
                  sx: S.inputAdornmentSx,
                },
                popper: {
                  sx: S.popperSx,
                },
                day: {
                  sx: S.daySx,
                },
                calendarHeader: {
                  sx: S.calendarHeaderSx,
                },
                layout: {
                  sx: S.layoutSx,
                },
              }}
              format={format}
              {...props}
            />
            <FormMessageError name={name} invalid={invalid} errorText={error} />
          </div>
        </LocalizationProvider>
      </DateRangeContext.Provider>
    </SelectOpenContext.Provider>
  )
}

export { AppDatePicker as DatePicker }

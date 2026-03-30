import { SxProps, Theme } from '@mui/material'

// Calendar Header Container
export const calendarHeaderContainerSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  px: 1,
  py: 1,
}

// Calendar Header Select Container
export const calendarHeaderSelectContainerSx: SxProps<Theme> = {
  display: 'flex',
  gap: 1.5,
}

// Month/Year Select MenuProps
export const selectMenuPropsSx: SxProps<Theme> = {
  zIndex: 1500,
  '& .MuiPaper-root': {
    maxHeight: 300,
  },
}

// Month Select
export const monthSelectSx: SxProps<Theme> = {
  minWidth: 130,
  height: 36,
  borderRadius: '8px',
  backgroundColor: '#fff',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e0e0e0',
    borderRadius: '8px',
  },
  '& .MuiSelect-select': {
    fontSize: 18,
    lineHeight: '1.2',
    fontWeight: 400,
    paddingTop: '6px !important',
    paddingBottom: '6px !important',
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiSelect-icon': {
    color: '#757575',
  },
}

// Year Select
export const yearSelectSx: SxProps<Theme> = {
  minWidth: 90,
  height: 36,
  borderRadius: '8px',
  backgroundColor: '#fff',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e0e0e0',
    borderRadius: '8px',
  },
  '& .MuiSelect-select': {
    fontSize: 18,
    lineHeight: '1.2',
    fontWeight: 400,
    paddingTop: '6px !important',
    paddingBottom: '6px !important',
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiSelect-icon': {
    color: '#757575',
  },
}

// MenuItem
export const menuItemSx: SxProps<Theme> = {
  fontSize: 18,
}

// DatePicker Root
export const datePickerSx: SxProps<Theme> = {
  width: '100%',
}

// Open Picker Button
export const openPickerButtonSx: SxProps<Theme> = {
  marginRight: '4px',
}

// Input Adornment
export const inputAdornmentSx: SxProps<Theme> = {
  marginRight: '-4px',
}

// Popper
export const popperSx: SxProps<Theme> = {
  zIndex: 1300,
}

// Day
export const daySx: SxProps<Theme> = {
  fontSize: 18,
  width: 32,
  height: 24,
  margin: '4px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: 'grey.300',
    borderRadius: '4px',
  },
  '&.Mui-selected': {
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
    '&:focus': {
      backgroundColor: 'primary.main',
    },
  },
}

// Calendar Header
export const calendarHeaderSx: SxProps<Theme> = {
  paddingLeft: 0,
  paddingRight: 0,
}

// Layout
export const layoutSx: SxProps<Theme> = {
  paddingTop: 2,
  // Day calendar container
  '& .MuiDayCalendar-weekContainer': {
    justifyContent: 'space-around',
    margin: '4px 0',
  },
  // Week day labels (อา, จ, อ, ...)
  '& .MuiDayCalendar-weekDayLabel': {
    fontSize: 18,
    fontWeight: 500,
    color: 'text.secondary',
    width: 40,
    height: 40,
    margin: '4px',
  },
  // Header container
  '& .MuiDayCalendar-header': {
    justifyContent: 'space-around',
  },
  // Slide transition container
  '& .MuiDayCalendar-slideTransition': {
    minHeight: 280,
  },
}

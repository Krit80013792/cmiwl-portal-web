'use client'

import { useMemo, useState } from 'react'
import { DatePicker } from '@/cmi-layout/components/DatePicker'

const CarInformationDatePickerExample = () => {
  // DatePicker emits ISO string (or null). We keep it as ISO to match the component's API.
  const [selectedIso, setSelectedIso] = useState<string | null>(null)

  const selectedDisplay = useMemo(() => {
    if (!selectedIso) return 'ยังไม่ได้เลือก'
    return selectedIso
  }, [selectedIso])

  return (
    <div style={{ marginTop: 24 }}>
      <DatePicker
        name="exampleCoverageStartDate"
        label="วันเริ่มต้นความคุ้มครอง (ตัวอย่าง)"
        placeholder="เลือกวันที่"
        required
        value={selectedIso ?? ''}
        onChange={(dateIso) => setSelectedIso(dateIso)}
        minDate="2020-01-01"
        maxDate="2030-12-31"
      />

      <div style={{ marginTop: 12, fontSize: 14, color: '#6b7280' }}>
        ค่าที่เลือก: <strong>{selectedDisplay}</strong>
      </div>
    </div>
  )
}

export default CarInformationDatePickerExample


const InfoRow: React.FC<{
  label: string
  value?: React.ReactNode
  labelWidth?: number
  valueColor?: string
}> = ({ label, value, labelWidth = 170, valueColor }) => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
    <label className="font-bold" style={{ width: labelWidth, color: '#4b5563', fontSize: 14, flexShrink: 0 }}>
      {label}
    </label>
    <span style={{ color: valueColor || '#111827', fontSize: 14, wordBreak: 'break-word' }}>{value ?? '-'}</span>
  </div>
)

export default InfoRow

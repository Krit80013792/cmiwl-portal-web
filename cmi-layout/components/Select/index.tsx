interface SelectProps {
  name: string
  options: Array<{ value: string; label: string }>
  onChange: (value: string) => void
  value: string
  disabled?: boolean
  feedback?: string
  label?: string
  firstOptionLabel?: string
}

export const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  value,
  name,
  disabled,
  feedback,
  label,
  firstOptionLabel,
}: SelectProps) => {
  return (
    <>
      <select
        name={name}
        className={'form-control form-select'}
        onChange={(e) => onChange(e.target.value)}
        value={value || ''}
        disabled={disabled}
      >
        {firstOptionLabel && <option value="NO_VALUE">{firstOptionLabel}</option>}
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="form-label">{label}</label>
      <div className="feedback">{feedback}</div>
    </>
  )
}

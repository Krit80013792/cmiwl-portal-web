import styled, { css } from 'styled-components'

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

const StyledSelect = styled.select.withConfig({
  shouldForwardProp: (prop) => prop !== 'error',
}) <{ error: boolean }>`
  &.form-control {
    ${({ error }) =>
    error &&
    css`
        box-shadow: 0 0 0 1px rgba(235, 88, 72, 1) !important;
      `}
  }
`

const Feedback = styled.span`
  display: block;
  color: #eb5748;
  margin-top: 2px;
  margin-left: 12px;
  font-size: 14px;
  position: inherit;
`

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
      <StyledSelect
        name={name}
        className={'form-control form-select'}
        onChange={(e) => onChange(e.target.value)}
        value={value || ''}
        disabled={disabled}
        error={!!feedback}
      >
        {firstOptionLabel && <option value="NO_VALUE">{firstOptionLabel}</option>}
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      <label className="form-label">{label}</label>
      {feedback &&
        <Feedback>
          <span style={{ marginRight: '2px' }}><img src="/assets/icon/alert-circle.svg" alt="alert-circle" /></span>
          {feedback}
        </Feedback>}
    </>
  )
}

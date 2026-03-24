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
  id?: string
}

const StyledSelect = styled.select.withConfig({
  shouldForwardProp: (prop) => prop !== 'error',
}) <{ error: boolean, disabled?: boolean }>`
  &.form-control {
    background-color: ${({ error, disabled }) =>
    disabled ? '#DDDDDF' : error ? '#FFFAFA' : '#FFFFFF'};
    ${({ error }) =>
    error &&
    css`
        box-shadow: 0 0 0 1px rgba(235, 88, 72, 1) !important;
      `}
  }

  &.form-control:focus,
  &.form-control.filled {
    padding-top: 16px !important;
    padding-bottom: 8px !important;
  }

  &.form-control:focus + .form-label,
  &.form-control.filled + .form-label {
    font-size: 12px;
    top: 12px;
    left: 0px;
    transform: translateY(-50%);
    transition: top 0.2s cubic-bezier(0.4, 0, 0.2, 1), bottom 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    color: ${({ error }) => error && '#eb5748 !important'};
  }

  &.form-control + .form-label {
    color: ${({ error }) => error && '#eb5748 !important'};
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
  id = name,
  // firstOptionLabel,
}: SelectProps) => {
  return (
    <>    <div className="position-relative">
      <StyledSelect
        id={id}
        name={name}
        className={`form-control form-select ${value ? 'filled' : ''}`}
        onChange={(e) => onChange(e.target.value)}
        value={value || ''}
        disabled={disabled}
        error={!!feedback}
      >
        {/* {firstOptionLabel && <option value="NO_VALUE">{firstOptionLabel}</option>} */}
        <option value="" disabled hidden></option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      <label htmlFor={name} className="form-label">{label}</label>
    </div>

      {feedback &&
        <Feedback>
          <span style={{ marginRight: '2px' }}><img src="/assets/icon/alert-circle.svg" alt="alert-circle" /></span>
          {feedback}
        </Feedback>}
    </>


  )
}

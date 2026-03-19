import styled, { css } from 'styled-components'

export interface InputProps {
  name: string
  id?: string
  type: string
  maxLength?: number
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  label: string
  feedback?: string
  suffix?: React.ReactNode
  style?: React.CSSProperties
  disabled?: boolean
  autoComplete?: string
}

const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== 'error',
}) <{ error: boolean }>`
  &.form-control {
    background-color: ${({ error }) => (error ? '#FFFAFA' : '#FFFFFF')};
    transition: background-color 0.2s;

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
  &.form-control.filled + .form-label,
  &.form-control:-webkit-autofill + .form-label {
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

export const Input = ({
  name,
  id = name,
  type,
  maxLength,
  // placeholder,
  onChange,
  value,
  label,
  feedback,
  suffix,
  style,
  disabled,
  autoComplete,
}: InputProps) => {
  return (
    <div className="w-100">
      <div className="position-relative" style={style}>
        <StyledInput
          id={id}
          name={name}
          type={type}
          maxLength={maxLength}
          className={`form-control ${value ? 'filled' : ''}`}
          // placeholder={label}
          onChange={onChange}
          value={value}
          error={!!feedback}
          disabled={disabled}
          autoComplete={autoComplete}
        />
        <label htmlFor={name} className="form-label">{label}</label>
        {suffix && <button type='button' className="position-absolute top-50 end-0 translate-middle-y me-3">{suffix}</button>}
      </div>
      {feedback && <Feedback>
        <span style={{ marginRight: '2px' }}><img src="/assets/icon/alert-circle.svg" alt="warning" /></span>
        {feedback}
      </Feedback>}
    </div>
  )
}

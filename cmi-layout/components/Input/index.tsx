import styled, { css } from 'styled-components'

export interface InputProps {
  name: string
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
}

const StyledInput = styled.input.withConfig({
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

export const Input = ({
  name,
  type,
  maxLength,
  placeholder,
  onChange,
  value,
  label,
  feedback,
  suffix,
  style,
  disabled,
}: InputProps) => {
  return (
    <div className="w-100">
      <div className="position-relative" style={style}>
        <StyledInput
          name={name}
          type={type}
          maxLength={maxLength}
          className={`form-control`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          error={!!feedback}
          disabled={disabled}
        />
        {suffix && <button type='button' className="position-absolute top-50 end-0 translate-middle-y me-3">{suffix}</button>}
        {/* <label className="form-label">{label}</label> */}
      </div>
      {feedback && <Feedback>
        <span style={{ marginRight: '2px' }}><img src="/assets/icon/alert-circle.svg" alt="warning" /></span>
        {feedback}
      </Feedback>}
    </div>
  )
}

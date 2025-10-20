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
}

const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== 'error',
})<{ error: boolean }>`
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

export const Input = ({ name, type, maxLength, placeholder, onChange, value, label, feedback, suffix }: InputProps) => {
  return (
    <>
      <div className="position-relative">
        <StyledInput
          name={name}
          type={type}
          maxLength={maxLength}
          className={`form-control`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          error={!!feedback}
        />
        {suffix && <div className="position-absolute top-50 end-0 translate-middle-y me-3">{suffix}</div>}
        <label className="form-label">{label}</label>
      </div>
      {feedback && <Feedback>{feedback}</Feedback>}
    </>
  )
}

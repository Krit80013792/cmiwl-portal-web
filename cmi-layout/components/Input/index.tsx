import styled from 'styled-components'

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
      <input
        name={name}
        type={type}
        maxLength={maxLength}
        className={`form-control`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <label className="form-label">{label}</label>
      {suffix}
      {feedback && <Feedback>{feedback}</Feedback>}
    </>
  )
}

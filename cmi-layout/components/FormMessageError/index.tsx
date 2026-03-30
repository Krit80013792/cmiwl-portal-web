import React from 'react'
import { ErrorMessageWrapper } from './styled'

interface FormMessageErrorProps {
  invalid?: boolean
  errorText?: string
  className?: string
  style?: React.CSSProperties
  name: string
}

export const FormMessageError: React.FC<FormMessageErrorProps> = ({
  className,
  invalid,
  errorText,
  style = {},
  name,
}) => {
  if (!invalid) return null
  return (
    <ErrorMessageWrapper className={className} style={style} data-testid={`${name}-form-error-text`}>
      {errorText}
    </ErrorMessageWrapper>
  )
}
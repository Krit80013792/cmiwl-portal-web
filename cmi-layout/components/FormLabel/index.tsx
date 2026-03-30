import React from 'react'
import { FormLabelWrapper } from './styled'
import { Typography } from '../typographys'

type TypographySize = React.ComponentProps<typeof Typography>['size']

interface FormLabelProps {
  textAlign?: 'left' | 'center' | 'right'
  name: string
  label: string
  descLabel?: string
  required?: boolean
  className?: string
  style?: React.CSSProperties
  weight?: React.ComponentProps<typeof Typography>['weight']
  size?: TypographySize
  noMargin?: boolean
}

export const FormLabel: React.FC<FormLabelProps> = ({
  textAlign = 'left',
  label,
  descLabel = '',
  required = false,
  className = 'form-label',
  weight = 'bold',
  size = 'md',
  noMargin = false,
}) => {
  return (
    <FormLabelWrapper $noMargin={noMargin}>
      <Typography
        size={size}
        weight={weight}
        className={`font-boldx mb-1 block ${className}`}
        sx={{ textAlign: textAlign }}
      >
        {label}
      </Typography>
      {descLabel && (
        <Typography size="sm" weight="normal" sx={{ marginTop: '-4px', textAlign: textAlign }}>
          {descLabel}
        </Typography>
      )}
    </FormLabelWrapper>
  )
}

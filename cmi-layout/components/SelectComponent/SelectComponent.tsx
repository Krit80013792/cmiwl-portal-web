'use client'

import React from 'react'

export interface SelectOption {
  label: string
  value: string | number
}

export interface SelectComponentProps {
  name: string
  id: string
  options: SelectOption[]
  value: string | number | undefined
  onChange: (value: string | number) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  name,
  id,
  options,
  value,
  onChange,
  label,
  placeholder = 'Select...',
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`select-component ${className}`}>
      {label && <label className="select-label">{label}</label>}
      <select
        name={name}
        id={id}
        className="select-input"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectComponent

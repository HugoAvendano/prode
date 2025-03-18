
'use client';

import React from 'react'
import { Controller } from 'react-hook-form'

interface Props {
  control: any,
  name: string,
  value: string,
  disabled: boolean
}

export default function RadioButton({ control, name, disabled, value }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center justify-center">
          <input
            {...field}
            disabled={disabled}
            type="radio"
            value={value}
            className="w-4 h-4 my-1 transition-all duration-300 ease-in-out transform hover:scale-125 text-[rgb(5,76,137)]"
            checked={field.value === value}
          />
        </div>
      )}
    />
  )
}

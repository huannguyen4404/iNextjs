import { TextField, TextFieldProps } from '@mui/material'
import { ChangeEvent } from 'react'
import { Control, useController } from 'react-hook-form'

export type InputFieldProps = TextFieldProps & {
  name: string
  control: Control<any>
}

export function InputField({
  name,
  control,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ref: externalRef,
  value: externalValue,
  ...rest
}: InputFieldProps) {
  const {
    field: { onChange, onBlur, ref, value },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      name={name}
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChange(event)
        externalOnChange?.(event)
      }}
      onBlur={onBlur}
      inputRef={ref}
      error={!!error}
      helperText={error?.message}
      {...rest}
    />
  )
}

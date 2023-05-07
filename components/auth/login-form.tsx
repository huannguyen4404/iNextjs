import { LoginPayload } from '@/models'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, IconButton, InputAdornment } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '../form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export interface LoginFormProps {
  onSubmit?: (payload: LoginPayload) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Please enter username')
      .min(4, 'username requires at least 4 chars'),

    password: yup
      .string()
      .required('Please enter password')
      .min(6, 'password requires at least 6 chars'),
  })

  const [showPassword, setShowPassword] = useState(false)

  const { control, handleSubmit } = useForm<LoginPayload>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  function handleLoginSubmit(payload: LoginPayload) {
    onSubmit?.(payload)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputField name="username" control={control} />
      <InputField
        type={showPassword ? 'text' : 'password'}
        name="password"
        control={control}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button variant="contained" type="submit">
        Login
      </Button>
    </Box>
  )
}

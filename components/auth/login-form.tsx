import { Box, Button, IconButton, InputAdornment } from '@mui/material'
import { useForm } from 'react-hook-form'
import { InputField } from '../form'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function handleLoginSubmit(values: any) {
    console.log(values)
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

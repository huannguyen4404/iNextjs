import { WorkFiltersPayload } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Search } from '@mui/icons-material'
import { Box, InputAdornment, debounce } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { InputField } from '../form'
import { ChangeEvent } from 'react'

export interface WorkFiltersProps {
  onSubmit?: (payload: WorkFiltersPayload) => void
}

export function WorkFilters({ onSubmit }: WorkFiltersProps) {
  const schema = yup.object().shape({})

  const { control, handleSubmit } = useForm<WorkFiltersPayload>({
    defaultValues: {
      search: '',
    },
    resolver: yupResolver(schema),
  })

  async function handleLoginSubmit(payload: WorkFiltersPayload) {
    await onSubmit?.(payload)
  }

  const debounceSearchChange = debounce(handleSubmit(handleLoginSubmit), 350)

  return (
    <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputField
        name="search"
        placeholder="search works by title"
        control={control}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          debounceSearchChange()
        }}
      />
    </Box>
  )
}

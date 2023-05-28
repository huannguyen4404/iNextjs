import { Skeleton } from '@mui/material'

export function WorkFiltersSkeleton() {
  return (
    <Skeleton
      variant="rectangular"
      height={40}
      sx={{
        display: 'inline-block',
        width: '100%',
        mt: 2,
        mb: 1,
        verticalAlign: 'center',
      }}
    />
  )
}

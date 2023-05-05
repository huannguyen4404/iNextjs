import { Box } from '@mui/material'

export interface HeaderMobileProps {}

export function HeaderMobile(props: HeaderMobileProps) {
  return <Box display={{ xs: 'block', md: 'none' }}>HeaderMobile</Box>
}

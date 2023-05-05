import { Box, Container, Link as LinkMui, Stack } from '@mui/material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ROUTE_LIST } from './routes'

export function HeaderDesktop() {
  const router = useRouter()

  return (
    <Box display={{ xs: 'none', md: 'block' }} py={2}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {ROUTE_LIST.map((route) => (
            <LinkMui
              key={route.path}
              href={route.path}
              sx={{ ml: 2 }}
              className={clsx({ active: router.pathname === route.path })}
            >
              {route.label}
            </LinkMui>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}

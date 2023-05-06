import { Box, Container, Link as LinkMui, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { ROUTE_LIST } from './routes'
import clsx from 'clsx'
import Link from 'next/link'

export interface HeaderDesktopProps {}

export function HeaderDesktop(props: HeaderDesktopProps) {
  const router = useRouter()

  return (
    <Box display={{ xs: 'none', md: 'block' }} py={2}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {ROUTE_LIST.map((route) => (
            <Link key={route.path} href={route.path} passHref legacyBehavior>
              <LinkMui
                sx={{ ml: 2, fontWeight: 'medium' }}
                className={clsx({ active: router.pathname === route.path })}
              >
                {route.label}
              </LinkMui>
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}

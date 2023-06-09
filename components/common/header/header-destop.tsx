import { Box, Container, Link as LinkMui, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { ROUTE_LIST } from './routes'
import clsx from 'clsx'
import Link from 'next/link'
import { useAuth } from '@/hooks'
import { useEffect, useState } from 'react'

export interface HeaderDesktopProps {}

export function HeaderDesktop(props: HeaderDesktopProps) {
  const router = useRouter()
  const { profile, logout } = useAuth()
  const isLoggedIn = Boolean(profile?.username)

  // // 1st render
  // const [routeList, setRouteList] = useState(ROUTE_LIST.filter((route) => !route.requireLogin))
  // useEffect(() => {
  //   // 2nd re-render:
  //   setRouteList(() => ROUTE_LIST.filter((route) => !route.requireLogin || isLoggedIn))
  // }, [isLoggedIn])

  const routeList = ROUTE_LIST.filter((route) => !route.requireLogin || isLoggedIn)

  return (
    <Box display={{ xs: 'none', md: 'block' }} py={2}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {routeList.map((route) => (
            <Link key={route.path} href={route.path} passHref legacyBehavior>
              <LinkMui
                sx={{ ml: 2, fontWeight: 'medium' }}
                className={clsx({ active: router.pathname === route.path })}
              >
                {route.label}
              </LinkMui>
            </Link>
          ))}

          {!isLoggedIn && (
            <Link key="login" href="/login" passHref legacyBehavior>
              <LinkMui sx={{ ml: 2, fontWeight: 'medium' }}>Login</LinkMui>
            </Link>
          )}

          {isLoggedIn && (
            <LinkMui sx={{ ml: 2, fontWeight: 'medium', cursor: 'pointer' }} onClick={logout}>
              Logout
            </LinkMui>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

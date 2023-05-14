import { useAuth } from '@/hooks'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, Drawer, IconButton, ListItem, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ROUTE_LIST } from './routes'

export interface HeaderMobileProps {}

export function HeaderMobile(props: HeaderMobileProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { profile, logout } = useAuth()
  const isLoggedIn = Boolean(profile?.username)

  const routeList = ROUTE_LIST.filter((route) => !route.requireLogin || isLoggedIn)

  function handleMenuClick(route: string) {
    setOpen(false)
    router.push(route)
  }

  return (
    <Box display={{ xs: 'block', md: 'none' }}>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        open={open}
        anchor="left"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        onClose={() => setOpen(false)}
      >
        {routeList.map((item, index) => (
          <ListItem key={index} onClick={() => handleMenuClick(item.path)}>
            <ListItemText primary={item.label} sx={{ minWidth: '200px' }} />
          </ListItem>
        ))}

        {!isLoggedIn && (
          <ListItem key="login" onClick={() => handleMenuClick('/login')}>
            <ListItemText primary="Login" />
          </ListItem>
        )}

        {isLoggedIn && (
          <ListItem key="logout" onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItem>
          // <LinkMui sx={{ ml: 2, fontWeight: 'medium', cursor: 'pointer' }} onClick={logout}>
          //   Logout
          // </LinkMui>
        )}
      </Drawer>
    </Box>
  )
}

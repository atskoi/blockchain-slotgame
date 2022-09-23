import React from 'react'
import { NavLink as RouterLink, useLocation } from 'react-router-dom'
// material
import { styled } from '@material-ui/core/styles'
import {
  Box,
  AppBar,
  Toolbar,
  Stack,
  Typography,
  Badge,
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
// hooks
import useOffSetTop from '../../hooks/useOffSetTop'
// components
import Logo from '../../components/Logo'
import { MHidden } from '../../components/@material-extend'
//
import MenuDesktop from './MenuDesktop'
import MenuMobile from './MenuMobile'
import navConfig from './MenuConfig'

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { IconButton } from '@material-ui/core'

import useAuth from '../../hooks/useAuth'

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 60
const APP_BAR_DESKTOP = 80

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.longer,
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP,
  },
}))

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}))

// ----------------------------------------------------------------------

const TopLink = styled(RouterLink)(({ theme }) => ({
  color: '#FFF',
  marginRight: theme.spacing(4),
  textDecoration: 'none !important',
  fontSize: '20px',
  fontWeight: '500',
}))

export default function MainNavbar() {
  const isOffset = useOffSetTop(100)
  const { pathname } = useLocation()
  const { isAuthenticated, logout } = useAuth()
  const isHome = pathname === '/'
  const cart = JSON.parse(localStorage.getItem('cart'))

  return (
    <>
      <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent !important' }}>
        <Box
          sx={{
            boxShadow: 0,
            bgcolor: '#161C24',
            height: '56px',
            display: 'flex',
            padding: '0 20px',
            justifyContent: 'end',
            ...(isOffset && { display: 'none !important' }),
          }}
        >
          {isAuthenticated ? (
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                href="/cart"
              >
                <Badge badgeContent={cart.length} color="primary">
                  <AddShoppingCartIcon />
                </Badge>
              </IconButton>
              <TopLink
                to="/dashboard/account"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <PersonIcon sx={{ fontSize: '30px' }} /> My Account
              </TopLink>
              <Typography onClick={logout} sx={{ cursor: 'pointer' }}>
                Logout
              </Typography>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <TopLink to="/auth/login">Login</TopLink>
              <TopLink to="/auth/register">Register</TopLink>
            </Stack>
          )}
        </Box>
        <ToolbarStyle
          disableGutters
          sx={{
            bgcolor: 'white',
            ...(isOffset && {
              bgcolor: 'rgba(255, 255, 255, 0.7)',
              height: { md: APP_BAR_DESKTOP - 80 },
            }),
          }}
        >
          <Box
            sx={{
              width: '100%',
              padding: '0 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <RouterLink to="/">
              <Logo
                sx={{
                  left: 0,
                  width: { xs: 100, md: '80%' },
                  transition: 'transform 0.3s',
                  ...(isOffset && {
                    transform: { md: 'scale(0.7)' },
                  }),
                }}
              />
            </RouterLink>
            <Box sx={{ flexGrow: 1 }} />

            <MHidden width="mdDown">
              <MenuDesktop
                isOffset={isOffset}
                isHome={isHome}
                navConfig={navConfig}
              />
            </MHidden>

            <MHidden width="mdUp">
              <MenuMobile
                isOffset={isOffset}
                isHome={isHome}
                navConfig={navConfig}
              />
            </MHidden>
          </Box>
        </ToolbarStyle>

        {isOffset && <ToolbarShadowStyle />}
      </AppBar>
    </>
  )
}

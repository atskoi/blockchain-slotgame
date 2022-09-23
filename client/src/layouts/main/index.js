import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Container, Typography, useTheme } from '@material-ui/core'
import MainNavbar from './MainNavbar'
import MainFooter from './MainFooter'

// ----------------------------------------------------------------------

export default function MainLayout() {
  const theme = useTheme()
  return (
    <Fragment>
      <MainNavbar />
      <div>
        <Outlet />
      </div>
      <MainFooter />
    </Fragment>
  )
}

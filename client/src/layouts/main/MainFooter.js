import React from 'react'
// material
import { styled } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  background: theme.palette.grey[800],
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
}))

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle className="footer">
      <Typography
        color="white"
        sx={{
          py: 4,
          fontSize: 16,
          fontWeight: 500,
          lineHeight: '24px',
          textAlign: 'center',
          fontFamily: 'Poppins',
        }}
      >
        Copyright @ 2021 Gear-Mobile LLC. All Right reserved
      </Typography>
    </RootStyle>
  )
}

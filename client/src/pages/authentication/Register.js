import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
// material
import { styled } from '@material-ui/core/styles'
import { Box, Link, Container, Typography } from '@material-ui/core'
// routes
import { PATH_AUTH, PATH_USER } from '../../routes/paths'
// components
import Page from '../../components/Page'
import { RegisterForm } from '../../components/authentication/register'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    backgroundImage: 'url(/images/auth-background.png)',
    height: '100vh',
  },
}))

const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(3, 6),
  backgroundColor: '#202125',
}))

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <RootStyle title="Register | Minimal-UI">
      <Container sx={{ margin: 'auto' }}>
        <ContentStyle>
          <Box sx={{ mb: 0, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h2"
                sx={{ textAlign: 'center', fontWeight: '400' }}
              >
                SIGN UP
              </Typography>
            </Box>
          </Box>

          {/* {method === 'firebase' && <AuthFirebaseSocials />} */}

          <RegisterForm />

          <Typography sx={{ mt: 3, textAlign: 'center' }}>
            Have an account?&nbsp;
            <Link to={PATH_AUTH.login} component={RouterLink}>
              Login
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link to={PATH_USER.home} component={RouterLink}>
              Go home
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}

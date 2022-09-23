/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
// material
import { styled } from '@material-ui/core/styles'
import { Box, Stack, Link, Container, Typography } from '@material-ui/core'
// routes
import { PATH_USER } from '../../routes/paths'
// components
import Page from '../../components/Page'
import useAuth from 'hooks/useAuth'
import LoadingScreen from 'components/LoadingScreen'

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
  color: 'white',
}))

// ----------------------------------------------------------------------

export default function AuthSuccess() {
  const { verifyEmail, user } = useAuth()
  const { token } = useParams()
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const handleLoading = async () => {
      await verifyEmail(token)
      await setIsLoading(false)
    }
    handleLoading()
  }, [token])

  useEffect(() => {
    if (user) {
      setIsVerified(true)
    } else {
      setIsVerified(false)
    }
  }, [user])

  return (
    <RootStyle>
      <Container maxWidth="sm" sx={{ margin: 'auto' }}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 0 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h2"
                  sx={{ textAlign: 'center', fontWeight: '400' }}
                >
                  LOGIN {isVerified ? 'SUCCESS' : 'FAILED'}
                </Typography>
              </Box>
            </Stack>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              <Link
                sx={{ color: '#2fc557' }}
                component={RouterLink}
                to={PATH_USER.home}
              >
                Go home
              </Link>
            </Typography>
          </ContentStyle>
        )}
      </Container>
    </RootStyle>
  )
}

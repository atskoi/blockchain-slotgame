/* eslint-disable */
import React from 'react'
// material
import { styled } from '@material-ui/core/styles'
import { Typography, Stack, Box, Button } from '@material-ui/core'
import { MotionInView, varFadeInUp, varFadeInDown } from '../components/animate'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  // padding: theme.spacing(14, 0),
}))

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
}))

// ----------------------------------------------------------------------

export default function Banner() {
  return (
    <RootStyle>
      <ContentStyle>
        <Box position="relative">
          <img
            src="/images/slider.jpg"
            alt="banner"
            style={{ width: '100%', height: 580 }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '35%',
              width: '100%',
              color: 'common.white',
            }}
          >
            <Stack spacing={1}>
              <Stack>
                <MotionInView variants={varFadeInUp}>
                  <Typography
                    fontSize={{ xs: 36, sm: 40, md: 44, lg: 48 }}
                    fontWeight="bold"
                    align="center"
                    sx={{ textTransform: 'uppercase' }}
                  >
                    WELCOME TO WNOC
                  </Typography>
                  <Typography
                    fontSize={{ xs: 16, sm: 20, md: 24, lg: 28 }}
                    align="center"
                    sx={{ textTransform: 'uppercase' }}
                  >
                    Learn More About Us
                  </Typography>
                </MotionInView>
              </Stack>
              <Stack direction="row" justifyContent="center">
                <MotionInView variants={varFadeInUp}>
                  <Typography
                    fontSize={{ xs: 12, sm: 14, md: 16, lg: 20 }}
                    align="center"
                    align="center"
                    maxWidth={750}
                  >
                    Sign up today to secure yourself a seat in the main event!
                    The main-event starting date will be announced on social
                    media! Follow us to stay tuned on the upcoming news for this
                    one-in-a-lifetime chance at some of the most prestigious
                    prizes.
                  </Typography>
                </MotionInView>
              </Stack>
              <MotionInView variants={varFadeInDown}>
                <Typography align="center">
                  <Button
                    variant="contained"
                    color="success"
                    sx={{
                      px: 4,
                      color: 'common.white',
                      fontSize: { xs: 12, sm: 14, md: 16, lg: 20 },
                      textTransform: 'uppercase',
                    }}
                  >
                    sign up now
                  </Button>
                </Typography>
              </MotionInView>
            </Stack>
          </Box>
        </Box>
      </ContentStyle>
    </RootStyle>
  )
}

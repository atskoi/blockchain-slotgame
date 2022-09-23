/* eslint-disable */
import React from 'react'
// material
import { styled, useTheme } from '@material-ui/core/styles'
import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  Button,
  Card,
  Paper,
  Rating 
} from '@material-ui/core'
//
import {
  MotionInView,
  varFadeInUp,
  varFadeInDown,
  varFadeInLeft,
  varFadeInRight,
} from '../../components/animate'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(14, 0),
}))

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  // marginBottom: theme.spacing(10),
  // [theme.breakpoints.up('md')]: {
  //   height: '100%',
  //   marginBottom: 0,
  //   textAlign: 'left',
  //   display: 'inline-flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'flex-start',
  // },
}))

// ----------------------------------------------------------------------

export default function LiveEvents() {
  const theme = useTheme()
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <ContentStyle>
          <MotionInView variants={varFadeInUp}>
            <Stack direction="row" justifyContent="center">
              <img src="/images/logoBlack.png" alt="logo black" width="100" />
            </Stack>
          </MotionInView>
          <MotionInView variants={varFadeInUp}>
            <Typography
              variant="h3"
              align="center"
              sx={{ mb: 1, color: 'common.black', textTransform: 'uppercase' }}
            >
              Clent Reviews
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Typography
              align="center"
              sx={{ mb: 5 }}
              color="primary"
              variant="subtitle1"
            >
              Dummy text is also used to demonstrate the appearance <br />
              of different typefaces and layouts
            </Typography>
          </MotionInView>

          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <MotionInView variants={varFadeInLeft}>
                <Card
                  sx={{
                    padding: 2,
                    backgroundColor: 'common.white',
                    borderRadius: 0,
                  }}
                >
                  <Stack spacing={2}>
                    <Typography
                      variant="h4"
                      color="primary"
                      align="left"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      John Doe
                    </Typography>
                    <Typography
                      variant="h6"
                      color="black"
                      align="left"
                    >
                      General Customer
                    </Typography>
                    <Rating name="read-only" control />
                    <Typography variant="body2" color="black">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam eros arcu, malesuada auctor velit feugiat, dapibus
                      congue ligula. Etiam ipsum nisl, scelerisque
                    </Typography>
                  </Stack>
                </Card>
              </MotionInView>
            </Grid>
            <Grid item xs={12} md={4}>
              <MotionInView variants={varFadeInLeft}>
                <Card
                  sx={{
                    padding: 2,
                    backgroundColor: 'common.white',
                    borderRadius: 0,
                  }}
                >
                  <Stack spacing={2}>
                    <Typography
                      variant="h4"
                      color="primary"
                      align="left"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      John Doe
                    </Typography>
                    <Typography
                      variant="h6"
                      color="black"
                      align="left"
                    >
                      General Customer
                    </Typography>
                    <Rating name="read-only" control />
                    <Typography variant="body2" color="black">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam eros arcu, malesuada auctor velit feugiat, dapibus
                      congue ligula. Etiam ipsum nisl, scelerisque
                    </Typography>
                  </Stack>
                </Card>
              </MotionInView>
            </Grid>
            <Grid item xs={12} md={4}>
              <MotionInView variants={varFadeInLeft}>
                <Card
                  sx={{
                    padding: 2,
                    backgroundColor: 'common.white',
                    borderRadius: 0,
                  }}
                >
                  <Stack spacing={2}>
                    <Typography
                      variant="h4"
                      color="primary"
                      align="left"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      John Doe
                    </Typography>
                    <Typography
                      variant="h6"
                      color="black"
                      align="left"
                    >
                      General Customer
                    </Typography>
                    <Rating name="read-only" control />
                    <Typography variant="body2" color="black">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam eros arcu, malesuada auctor velit feugiat, dapibus
                      congue ligula. Etiam ipsum nisl, scelerisque
                    </Typography>
                  </Stack>
                </Card>
              </MotionInView>
            </Grid>
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}

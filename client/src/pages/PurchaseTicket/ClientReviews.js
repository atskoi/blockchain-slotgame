/* eslint-disable */
import React from 'react'
// material
import { styled, useTheme } from '@material-ui/core/styles'
import {
  Grid,
  Container,
  Typography,
  Stack,
  Card,
  Rating,
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
}))

// ----------------------------------------------------------------------

export default function ClientReviews() {
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
              Client Reviews
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Container maxWidth="sm">
              <Typography
                align="center"
                sx={{ mb: 5 }}
                color="primary"
                fontSize={18}
              >
                Dumy text is also used to demonstrate the appearance of
                different typefaces and layouts
              </Typography>
            </Container>
          </MotionInView>

          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <MotionInView variants={varFadeInLeft}>
                <Card
                  sx={{
                    px: 3,
                    py: 4,
                    backgroundColor: 'common.white',
                    borderRadius: 0,
                  }}
                >
                  <Stack spacing={2}>
                    <Stack>
                      <Typography variant="h4" align="left" color="primary">
                        John Doe
                      </Typography>
                      <Typography
                        fontSize={18}
                        align="left"
                        color="common.black"
                      >
                        General Customer
                      </Typography>
                    </Stack>
                    <Rating defaultValue={2.5} precision={0.5} />
                    <Typography align="left" color="common.black">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam eros arcu, malesuada auctor velit feugiat, dapibus
                      congue ligula. Etiam ipsum nisl, Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Aliquam eros arcu,
                      malesuada auctor velit.
                    </Typography>
                  </Stack>
                </Card>
              </MotionInView>
            </Grid>

            <Grid item xs={12} md={4}>
              <MotionInView variants={varFadeInDown}>
                <Card
                  sx={{
                    px: 3,
                    py: 4,
                    backgroundColor: 'common.white',
                    borderRadius: 0,
                  }}
                >
                  <Stack spacing={2}>
                    <Stack>
                      <Typography variant="h4" align="left" color="primary">
                        John Doe
                      </Typography>
                      <Typography
                        fontSize={18}
                        align="left"
                        color="common.black"
                      >
                        General Customer
                      </Typography>
                    </Stack>
                    <Rating defaultValue={2.5} precision={0.5} />
                    <Typography align="left" color="common.black">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam eros arcu, malesuada auctor velit feugiat, dapibus
                      congue ligula. Etiam ipsum nisl, Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Aliquam eros arcu,
                      malesuada auctor velit.
                    </Typography>
                  </Stack>
                </Card>
              </MotionInView>
            </Grid>

            <Grid item xs={12} md={4}>
              <MotionInView variants={varFadeInRight}>
                <Card
                  sx={{
                    px: 3,
                    py: 4,
                    backgroundColor: 'common.white',
                    borderRadius: 0,
                  }}
                >
                  <Stack spacing={2}>
                    <Stack>
                      <Typography variant="h4" align="left" color="primary">
                        John Doe
                      </Typography>
                      <Typography
                        fontSize={18}
                        align="left"
                        color="common.black"
                      >
                        General Customer
                      </Typography>
                    </Stack>
                    <Rating defaultValue={2.5} precision={0.5} />
                    <Typography align="left" color="common.black">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam eros arcu, malesuada auctor velit feugiat, dapibus
                      congue ligula. Etiam ipsum nisl, Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Aliquam eros arcu,
                      malesuada auctor velit.
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

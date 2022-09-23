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
} from '@material-ui/core'
//
import {
  MotionInView,
  varFadeInUp,
  varFadeInDown,
  varFadeInLeft,
  varFadeInRight,
} from '../../components/animate'
import { Spellcheck } from '@material-ui/icons'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(14, 0),
  backgroundColor: theme.palette.grey[900],
}))

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
}))

// ----------------------------------------------------------------------

export default function WhyChooseUs() {
  const theme = useTheme()
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <ContentStyle>
          <MotionInView variants={varFadeInUp}>
            <Stack direction="row" justifyContent="center">
              <img src="/images/logoWhite.png" alt="logo white" width="100" />
            </Stack>
          </MotionInView>
          <MotionInView variants={varFadeInUp}>
            <Typography
              variant="h3"
              align="center"
              sx={{ mb: 1, color: 'common.white', textTransform: 'uppercase' }}
            >
              WHY CHOOSE US
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Typography
              align="center"
              sx={{ mb: 5 }}
              color="primary"
              variant="subtitle1"
            >
              Simply put, we are the only legal website of this kind!
            </Typography>
          </MotionInView>

          <Grid container maxWidth="xl" spacing={5}>
            <Grid item xs={12} md={3}>
              <MotionInView variants={varFadeInLeft}>
                <Card
                  sx={{
                    padding: 2,
                    backgroundColor: 'common.white',
                    borderRadius: 0,
                    minHeight: 300,
                  }}
                >
                  <Spellcheck sx={{ fontSize: 36, color: 'black' }} />
                  <Stack spacing={2}>
                    <Typography
                      variant="h4"
                      color="primary"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      Authenticity
                    </Typography>
                    <Typography variant="body2" color="black">
                      All of our prizes are graded and certified authentic. You
                      will not be receiving a duplicate or a fake card. Enjoy
                      peace at mind winning the most exclusive prizes available
                      on the market.
                    </Typography>
                  </Stack>
                </Card>
              </MotionInView>
            </Grid>
            <Grid item xs={12} md={3}>
              <MotionInView variants={varFadeInUp}>
                <Card
                  sx={{
                    padding: 2,
                    backgroundColor: 'common.white',
                    borderRadius: 0,
                    minHeight: 300,
                  }}
                >
                  <Spellcheck sx={{ fontSize: 36, color: 'black' }} />
                  <Stack spacing={2}>
                    <Typography
                      variant="h4"
                      color="primary"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      Legal Business
                    </Typography>
                    <Typography variant="body2" color="black">
                      Our website and business are 100% legal to be operated in
                      the land of Canada. You have no reason to fear any sort of
                      legal repercussions by participating in these events! Have
                      Fun!
                    </Typography>
                  </Stack>
                </Card>
              </MotionInView>
            </Grid>
            <Grid item xs={12} md={3}>
              <MotionInView variants={varFadeInRight}>
                <Card
                  sx={{
                    padding: 2,
                    backgroundColor: 'common.white',
                    borderRadius: 0,
                    minHeight: 300,
                  }}
                >
                  <Spellcheck sx={{ fontSize: 36, color: 'black' }} />
                  <Stack spacing={2}>
                    <Typography
                      variant="h4"
                      color="primary"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      Fans
                    </Typography>
                    <Typography variant="body2" color="black">
                      Just like you, we absolutely love the sports in which we
                      collect these rare items. We understand exactly what
                      collectors and fans like to experience in our events. We
                      are the same.
                    </Typography>
                  </Stack>
                </Card>
              </MotionInView>
            </Grid>
            <Grid item xs={12} md={3}>
              <MotionInView variants={varFadeInRight}>
                <Card
                  sx={{
                    padding: 2,
                    backgroundColor: 'common.white',
                    borderRadius: 0,
                    minHeight: 300,
                  }}
                >
                  <Spellcheck sx={{ fontSize: 36, color: 'black' }} />
                  <Stack spacing={2}>
                    <Typography
                      variant="h4"
                      color="primary"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      Safe
                    </Typography>
                    <Typography variant="body2" color="black">
                      None of your payment information is stored on the website.
                      None of the admins are even able to see any of your
                      payment information. Handled by 256 bits secure
                      connections.
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

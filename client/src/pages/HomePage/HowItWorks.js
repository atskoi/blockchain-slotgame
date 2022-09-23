/* eslint-disable */
import React from 'react'
// material
import { styled, useTheme } from '@material-ui/core/styles'
import { Grid, Container, Typography, Stack, Box } from '@material-ui/core'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
//
import {
  MotionInView,
  varFadeInUp,
  varFadeInLeft,
  varFadeInRight,
} from '../../components/animate'

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

export default function HowItWorks() {
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
              How it Works
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Typography
              align="center"
              sx={{ mb: 5 }}
              color="primary"
              variant="subtitle1"
            >
              3 EASY AND FUN STEPS FOR EVERYONE
            </Typography>
          </MotionInView>

          <Grid container spacing={5} mt={5}>
            <Grid item xs={12} md={4}>
              <MotionInView variants={varFadeInLeft}>
                <Stack spacing={8}>
                  <Stack direction="row" justifyContent="center">
                    <Box sx={{ width: 200, height: 200 }}>
                      <CircularProgressbar
                        value={35}
                        strokeWidth={5}
                        text={1}
                        styles={buildStyles({
                          textColor: 'white',
                          pathColor: '#29B2FE',
                          trailColor: 'white',
                        })}
                      />
                    </Box>
                  </Stack>
                  <Stack spacing={2}>
                    <Typography fontSize={24} align="center">
                      STEP 1:
                    </Typography>
                    <Typography fontSize={16} align="center">
                      You must register on our website in order to view the
                      product page. Once that is done you may purchase any
                      amount of entries to the products of your choice. Once you
                      have purchased your entries, you will be randomly assigned
                      to a table in the event of your choice.
                    </Typography>
                  </Stack>
                </Stack>
              </MotionInView>
            </Grid>
            <Grid item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <Stack spacing={8}>
                  <Stack direction="row" justifyContent="center">
                    <Box sx={{ width: 200, height: 200 }}>
                      <CircularProgressbar
                        value={60}
                        strokeWidth={5}
                        text={2}
                        styles={buildStyles({
                          textColor: 'white',
                          pathColor: '#29B2FE',
                          trailColor: 'white',
                        })}
                      />
                    </Box>
                  </Stack>
                  <Stack spacing={2}>
                    <Typography fontSize={24} align="center">
                      STEP 2:
                    </Typography>
                    <Typography fontSize={16} align="center">
                      Once the room is full or that the sales in entries has
                      ceased, our software will then begin the events drawing
                      sequence. If you are in the main event, 3 random winning
                      tickets are chosen from every table in every room. As the
                      winners proceed through the rooms, we continue this
                      elimination tournament till we have 75 total winning
                      tickets.
                    </Typography>
                  </Stack>
                </Stack>
              </MotionInView>
            </Grid>
            <Grid item xs={12} md={4}>
              <MotionInView variants={varFadeInRight}>
                <Stack spacing={8}>
                  <Stack direction="row" justifyContent="center">
                    <Box sx={{ width: 200, height: 200 }}>
                      <CircularProgressbar
                        value={100}
                        strokeWidth={5}
                        text={3}
                        styles={buildStyles({
                          textColor: 'white',
                          pathColor: '#29B2FE',
                          trailColor: 'white',
                        })}
                      />
                    </Box>
                  </Stack>
                  <Stack spacing={2}>
                    <Typography fontSize={24} align="center">
                      STEP 3:
                    </Typography>
                    <Typography fontSize={16} align="center">
                      You must register on our website in order to view the
                      product page. Once that is done you may purchase any
                      amount of entries to the products of your choice. Once you
                      have purchased your entries, you will be randomly assigned
                      to a table in the event of your choice.
                    </Typography>
                  </Stack>
                </Stack>
              </MotionInView>
            </Grid>
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}

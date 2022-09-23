/* eslint-disable */
import React, { useEffect } from 'react'
import useDraw from 'hooks/useDraw'

// material
import { styled, useTheme } from '@material-ui/core/styles'
import {
  Grid,
  Container,
  Typography,
  Stack,
  Button,
  Card,
  Paper,
} from '@material-ui/core'
//
import {
  MotionInView,
  varFadeInUp,
  varFadeInDown,
  varFadeInLeft,
  varFadeInRight,
} from '../components/animate'
import EventsCarousel from './EventsCarousel'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(14, 0),
}))

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
}))

// ----------------------------------------------------------------------

export default function LiveEvents() {
  const theme = useTheme()
  const { products, getProducts, getCurrentEvent, current_event } = useDraw()

  useEffect(() => {
    getCurrentEvent()
  }, [])
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
              Live Events
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Typography
              align="center"
              sx={{ mb: 5 }}
              color="primary"
              variant="subtitle1"
            >
              Small sub-title for the section
            </Typography>
          </MotionInView>

          <EventsCarousel current_event={current_event} />
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}

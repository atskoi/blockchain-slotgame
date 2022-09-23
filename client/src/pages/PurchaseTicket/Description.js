/* eslint-disable */
import React from 'react'
// material
import { styled, useTheme } from '@material-ui/core/styles'
import {
  Container,
  Typography,
  Stack,
  Button,
  ButtonGroup,
} from '@material-ui/core'
//
import {
  MotionInView,
  varFadeInUp,
  varFadeInDown,
} from '../../components/animate'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(14, 0),
  // backgroundColor: theme.palette.grey[900],
}))

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  backgroundColor: theme.palette.grey[900],
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

export default function Description() {
  const theme = useTheme()
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <MotionInView variants={varFadeInUp}>
          <ButtonGroup sx={{ borderRadius: 0 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ textTransform: 'uppercase', borderRadius: 0 }}
            >
              Description
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{
                textTransform: 'uppercase',
                backgroundColor: theme.palette.grey[500],
              }}
            >
              Other tab
            </Button>
          </ButtonGroup>
        </MotionInView>
      </Container>
      <ContentStyle>
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <MotionInView variants={varFadeInDown}>
            <Stack spacing={1} sx={{ p: 5 }}>
              <Typography
                variant="h4"
                align="left"
                sx={{
                  color: 'common.white',
                  textTransform: 'capitalize',
                }}
              >
                Item description
              </Typography>
              <Typography align="left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                eros arcu, malesuada auctor velit feugiat, dapibus congue
                ligula. Etiam ipsum nisl, scelerisque ac nunc mollis,
                ullamcorper rhoncus est. Vestibulum dapibus tortor turpis, et
                Pretium odio eleifend et. Nam sit amet leo mi. Quisque molestie
                nisi orci. Vestibulum lobortis mauris vitae fringilla elementum.
                Mauris consectetur dapibus faucibus.
              </Typography>
              <Typography align="left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                eros arcu, malesuada auctor velit feugiat, dapibus congue
                ligula. Etiam ipsum nisl, scelerisque ac nunc mollis,
                ullamcorper rhoncus est. Vestibulum dapibus tortor turpis, et
                Pretium odio eleifend et. Nam sit amet leo mi. Quisque molestie
                nisi orci. Vestibulum lobortis mauris vitae fringilla elementum.
                Mauris consectetur dapibus faucibus.
              </Typography>
              <Typography align="left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                eros arcu, malesuada auctor velit feugiat, dapibus congue
                ligula. Etiam ipsum nisl, scelerisque ac nunc mollis,
                ullamcorper rhoncus est. Vestibulum dapibus tortor turpis, et
                Pretium odio eleifend et. Nam sit amet leo mi. Quisque molestie
                nisi orci. Vestibulum lobortis mauris vitae fringilla elementum.
                Mauris consectetur dapibus faucibus.
              </Typography>
            </Stack>
          </MotionInView>
        </Container>
      </ContentStyle>
    </RootStyle>
  )
}

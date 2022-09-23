/* eslint-disable */
import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

import Page from '../../components/Page'

import Banner from '../../customComponents/Banner'
import SignUpCTA from '../../customComponents/SignUpCTA'

import LiveEvents from '../../customComponents/LiveEvents'

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: 120,
  height: '100%',
}))

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  backgroundImage: 'url("/images/site-background.jpg")'
}))

export default function ProductPage(props) {

  return (
    <RootStyle>
      <ContentStyle>
        <Banner />
        <LiveEvents />
        <Box sx={{ backgroundImage: 'url("/images/site-background.jpg")' }}>
          <SignUpCTA />
        </Box>
      </ContentStyle>
    </RootStyle>
  )
}

/* eslint-disable */
import React from 'react'
// material
import { styled } from '@material-ui/core/styles'
import { Box, Stack } from '@material-ui/core'
// components
import Page from '../../components/Page'
import WhoWeAre from './WhoWeAre'
import LiveEvents from './LiveEvents'
import SignUpCTA from 'customComponents/SignUpCTA'
import Banner from 'customComponents/Banner'
import WhyChooseUs from './WhyChooseUs'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  paddingTop: 120,
  // paddingBottom: 88,
  height: '100%',
})

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}))

// ----------------------------------------------------------------------

export default function AboutUs() {
  return (
    <RootStyle>
      <ContentStyle>
        <Banner />
        <Box sx={{ backgroundImage: 'url("/images/site-background.jpg")' }}>
          <WhoWeAre />
          <WhyChooseUs />
          <Stack direction="row" justifyContent="center">
            <Box component="img" src="/images/youtube-2.png" my={5} />
          </Stack>
          {/* <ReactPlayer url="https://www.youtube.com/watch?v=ug50zmP9I7s" /> */}
          {/* <LiveEvents /> */}
          <SignUpCTA />
        </Box>
      </ContentStyle>
    </RootStyle>
  )
}

/* eslint-disable */
import React from 'react'
import { styled } from '@material-ui/core/styles'
import { Box, Container, Grid } from '@material-ui/core'
import Banner from 'customComponents/Banner'
import SignUpCTA from 'customComponents/SignUpCTA'
import Item from './Item.js'

const RootStyle = styled('div')(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
}))

const ContentStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center',
}))

const MainStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#000',
  color: '#fff',
}))

export default function Portfolio() {
  return (
    <RootStyle>
      <ContentStyle>
        {/* Banner */}
        <Banner />

        <Box sx={{ backgroundImage: 'url("/images/site-background.jpg")' }}>
          {/* Drop a message */}
          <Container maxWidth="xl" sx={{ py: 4 }}>
            <Grid container spacing={1}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
                <Grid item md={3} key={item} mb={3}>
                  <Item />
                </Grid>
              ))}
            </Grid>
          </Container>

          {/* Sign Up Now */}
          <SignUpCTA />
        </Box>
      </ContentStyle>
    </RootStyle>
  )
}

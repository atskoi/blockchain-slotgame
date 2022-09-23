/* eslint-disable */
import React from 'react'
import { Box } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

import Banner from '../../customComponents/Banner'
import ProductDetail from './ProductDetail'
import Description from './Description'
import ClientReviews from './ClientReviews'
import SignUpCTA from 'customComponents/SignUpCTA'

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: 120,
  height: '100%',
}))

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}))

export default function PurchaseTicket() {
  return (
    <RootStyle>
      <ContentStyle>
        <Banner />
        <Box sx={{ backgroundImage: 'url("/images/site-background.jpg")' }}>
          <ProductDetail />
          <Description />
          <ClientReviews />
          <SignUpCTA />
        </Box>
      </ContentStyle>
    </RootStyle>
  )
}

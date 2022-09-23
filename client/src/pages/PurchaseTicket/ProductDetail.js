/* eslint-disable */
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
// material
import { styled } from '@material-ui/core/styles'
import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  Button,
} from '@material-ui/core'
//
import {
  MotionInView,
  varFadeInLeft,
  varFadeInRight,
} from '../../components/animate'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import Incrementer from 'customComponents/Incrementer'

import useCart from 'hooks/useCart'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(14, 0),
}))

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
}))

// ----------------------------------------------------------------------

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1)

  console.log(quantity)
  const { addToCart } = useCart()
  let cart = JSON.parse(localStorage.getItem('cart'))
  const currentProductIndex = localStorage.getItem('currentProductIndex')
  const currentProduct = cart.filter(
    (item) => item.index == currentProductIndex,
  )[0]
  const addtocart = () => {
    // addToCart(quantity);
    let cart = JSON.parse(localStorage.getItem('cart'))
    const currentProductIndex = localStorage.getItem('currentProductIndex')
    cart.filter((item) => item.index == currentProductIndex)[0].qty = quantity

    console.log(cart)
    localStorage.setItem('cart', JSON.stringify(cart))
    window.location.replace('/cart')
  }

  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <ContentStyle>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <MotionInView variants={varFadeInRight}>
                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="h3"
                      align="left"
                      sx={{
                        color: 'common.black',
                        textTransform: 'uppercase',
                      }}
                    >
                      {currentProduct.index === 0
                        ? 'Main Event'
                        : `Satellite${currentProduct.index}`}
                    </Typography>
                    <Typography
                      align="left"
                      color="primary"
                      fontSize={36}
                      fontWeight={500}
                    >
                      ${currentProduct.price}
                    </Typography>
                  </Box>
                  <Typography align="left" variant="body2" color="common.black">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam eros arcu, malesuada auctor velit feugiat, dapibus
                    congue ligula. Etiam ipsum nisl, scelerisque ac nunc mollis,
                    ullamcorper rhoncus est. Vestibulum dapibus tortor turpis,
                    et
                  </Typography>
                  <Typography align="left" variant="body2" color="common.black">
                    Pretium odio eleifend et. Nam sit amet leo mi. Quisque
                    molestie nisi orci. Vestibulum lobortis mauris vitae
                    fringilla elementum. Mauris consectetur dapibus faucibus.
                  </Typography>
                  <Stack spacing={1}>
                    <Typography
                      align="left"
                      variant="body2"
                      color="common.black"
                    >
                      Retium odio eleifend et. Nam sit amet
                    </Typography>
                    <Typography
                      align="left"
                      variant="body2"
                      color="common.black"
                    >
                      Retium odio eleifend et. Nam sit amet
                    </Typography>
                    <Typography
                      align="left"
                      variant="body2"
                      color="common.black"
                    >
                      Retium odio eleifend et. Nam sit amet
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ flexWrap: 'wrap' }}
                    spacing={4}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      color="info"
                      sx={{
                        color: 'white',
                        textTransform: 'uppercase',
                        fontSize: 12,
                      }}
                      href="/productPage"
                      startIcon={<ArrowBackIcon />}
                    >
                      Bact To Product Page
                    </Button>
                    <Incrementer
                      name="quantity"
                      available={100}
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                    <Button
                      variant="contained"
                      size="large"
                      color="success"
                      sx={{
                        color: 'white',
                        textTransform: 'uppercase',
                        fontSize: 12,
                      }}
                      onClick={addtocart}
                      endIcon={<ArrowRightAltIcon />}
                      // component={RouterLink}
                      // to="/purchaseTicket"
                    >
                      Add to cart
                    </Button>
                  </Stack>
                </Stack>
              </MotionInView>
            </Grid>

            <Grid item xs={12} md={6}>
              <MotionInView variants={varFadeInLeft}>
                <img
                  src="/images/placeholder-about-us-homepage.jpg"
                  alt="whoWeArePlaceholder"
                />
              </MotionInView>
            </Grid>
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}

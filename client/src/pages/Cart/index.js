/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@material-ui/core/styles'
import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  IconButton,
  TextField,
  Stack,
} from '@material-ui/core'


import DeleteIcon from '@material-ui/icons/Delete';

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { LoadingButton } from '@material-ui/lab'

import { MotionInView, varFadeInUp } from '../../components/animate'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import Banner from 'customComponents/Banner'
import SignUpCTA from 'customComponents/SignUpCTA'

import useDraw from 'hooks/useDraw'
import useCart from 'hooks/useCart'

const RootStyle = styled('div')(({ theme }) => ({
  width: '100%',
  background: 'url(/images/site-background.jpg)',
  backgroundSize: 'cover',
  display: 'flex',
  alignItems: 'center',
}))

const ContentStyle = styled('div')(({ theme }) => ({
  width: '1200px',
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center',
  margin: '180px auto',
}))

const MainStyle = styled('div')(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#000',
  padding: theme.spacing(3),
  margin: theme.spacing(3, 0),
  width: '100%',
}))

const TableStyle = styled(Table)(({ theme }) => ({
  width: '100%',
}))

const TAX_RATE = 0.07

function ccyFormat(num) {
  return `USD ${num.toFixed(2)} $`
}

function subtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

export default function Cart() {
  let cart = JSON.parse(localStorage.getItem('cart'))

  const removeProduct = (index) => {
    cart.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(cart))

    window.location.replace('/cart')
  }

  const proceedCheckout = () => {
    window.location.replace('/checkout')
  }

  return (
    <RootStyle>
      <ContentStyle>
        {/* Drop a message */}
        <Container maxWidth="lg">
          <Button
            variant="contained"
            size="large"
            color="info"
            sx={{ color: 'white', textTransform: 'uppercase' }}
            href="/productPage"
            startIcon={<ArrowBackIcon />}
          >
            Continue Shopping
          </Button>
          <MainStyle>
            <Grid container>
              <Grid item md="8" xs="12">
                <Grid container sx={{ padding: '0 20px' }}>

                  <TableContainer
                    component={Paper}
                    sx={{ backgroundColor: 'white', color: 'black' }}
                  >
                    <TableStyle aria-label="spanning table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="left"
                            sx={{
                              boxShadow: 'none !important',
                              borderRadius: '0 !important',
                            }}
                          >

                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              boxShadow: 'none !important',
                              borderRadius: '0 !important',
                            }}
                          >

                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              boxShadow: 'none !important',
                              borderRadius: '0 !important',
                            }}
                          >
                            Event Type
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              boxShadow: 'none !important',
                              borderRadius: '0 !important',
                            }}
                          >
                            Price
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              boxShadow: 'none !important',
                              borderRadius: '0 !important',
                            }}
                          >
                            Quantity
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              boxShadow: 'none !important',
                              borderRadius: '0 !important',
                            }}
                          >
                            Subtotal
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cart.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell
                              align="left"
                              sx={{ color: 'black' }}
                            >
                              <IconButton aria-label="delete" name={row.index} onClick={() => removeProduct(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{ color: 'black' }}
                            >

                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{ color: 'black' }}
                            >
                              {row.index === 0 ? "Main Event" : `Satellite${row.index}`}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{ color: 'black' }}
                            >
                              {row.price}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{ color: 'black' }}
                            >
                              {row.qty}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{ color: 'black' }}
                            >
                              {ccyFormat(row.price * row.qty)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </TableStyle>
                  </TableContainer>
                </Grid>
              </Grid>
              <Grid item md="4" xs="12">
                <Grid container>
                  <Stack
                    sx={{
                      borderRadius: '8px',
                      width: '100%',
                      backgroundColor: 'white',
                    }}
                  >
                    <Stack
                      sx={{
                        borderRadius: '8px 8px 0 0',
                        padding: '20px',
                        width: '100%',
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ margin: 0, textAlign: 'left' }}
                      >
                        Cart Total
                      </Typography>
                    </Stack>

                    <Stack
                      sx={{
                        width: '100%',
                        padding: '20px',
                        backgroundColor: 'white',
                      }}
                    >
                      <TableContainer
                        component={Paper}
                        sx={{ backgroundColor: 'white', color: 'black' }}
                      >
                        <TableStyle aria-label="spanning table">
                          <TableHead>
                            <TableRow>
                              <TableCell
                                align="left"
                                colSpan={3}
                                sx={{
                                  boxShadow: 'none !important',
                                  borderRadius: '0 !important',
                                }}
                              >
                                Desc
                              </TableCell>
                              <TableCell
                                align="left"
                                colSpan={2}
                                sx={{
                                  boxShadow: 'none !important',
                                  borderRadius: '0 !important',
                                }}
                              >
                                Amount
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell
                                align="left"
                                colSpan={3}
                                sx={{ color: 'black' }}
                              >
                                Sub total
                              </TableCell>
                              <TableCell
                                align="left"
                                colSpan={2}
                                sx={{ color: 'black' }}
                              >
                                {ccyFormat(subtotal(cart))}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                align="left"
                                colSpan={3}
                                sx={{ color: 'black' }}
                              >
                                Total
                              </TableCell>
                              <TableCell
                                align="left"
                                colSpan={2}
                                sx={{ color: 'black' }}
                              >
                                {ccyFormat(subtotal(cart))}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </TableStyle>
                      </TableContainer>

                      <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: '#FF4842',
                          boxShadow: 'none',
                          mt: 3,
                        }}
                        onClick={proceedCheckout}
                      >
                        Proceed Checkout
                      </LoadingButton>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </MainStyle>
        </Container>
      </ContentStyle>
    </RootStyle>
  )
}

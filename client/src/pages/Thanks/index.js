/* eslint-disable */
import React from 'react'
import { styled } from '@material-ui/core/styles'
import { Box, Grid, Container, Typography, Button, TextField, Stack, Divider } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { LoadingButton } from '@material-ui/lab';

import { MotionInView, varFadeInUp } from '../../components/animate';

import Banner from 'customComponents/Banner';
import SignUpCTA from 'customComponents/SignUpCTA';

const RootStyle = styled('div')(({ theme }) => ({
  width: '100%',
  background: 'url(/images/site-background.jpg)',
  backgroundSize: 'cover',
  display: 'flex',
  alignItems: 'center'
}))

const ContentStyle = styled('div')(({ theme }) => ({
  width: '1200px',
  minHeight: '600px',
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center',
  margin: '180px auto'
}))

const MainStyle = styled('div')(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#000',
  padding: theme.spacing(3),
  margin: theme.spacing(3, 0),
  width: '100%'
}))

const TableStyle = styled(Table)(({ theme }) => ({
  width: '100%',
}))

const Item = styled('div')(({ theme }) => ({
  padding: '0 5px',
  textAlign: 'left',
  color: 'black',
}));

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `USD ${num.toFixed(2)} $`;
}

function subtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

export default function Thanks() {
  const cart = JSON.parse(localStorage.getItem('cart'))

  const payment = () => {
    window.location.href="/thanks";
  }

  return (
    <RootStyle>
      <ContentStyle>

      {/* Drop a message */}
        <Container maxWidth="lg">
          <MainStyle>
            <Grid container>
              <Typography sx={{ mb: 3, fontSize: '30px', textAlign: 'left' }}>
                Good luck! You are now entered into the draw
              </Typography>

              <Grid container sx={{ mb: 5 }}>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                >
                  <Item>
                    <Typography sx={{ fontSize: '14px' }}>
                      ORDER NUMBER:
                    </Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                      21572
                    </Typography>
                  </Item>
                  <Item>
                    <Typography sx={{ fontSize: '14px' }}>
                      DATE:
                    </Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                      October 30, 2021
                    </Typography>
                  </Item>
                  <Item>
                    <Typography sx={{ fontSize: '14px' }}>
                      EMAIL:
                    </Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                      yousif@jabaky.com
                    </Typography>
                  </Item>
                  <Item>
                    <Typography sx={{ fontSize: '14px' }}>
                      TOTAL:
                    </Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                      {ccyFormat(subtotal(cart))}
                    </Typography>
                  </Item>
                </Stack>
              </Grid>

              <Grid container>
                <Typography sx={{ mb: 3, fontSize: '30px', textAlign: 'left' }}>
                  Order Detail
                </Typography>
                <TableContainer component={Paper} sx={{backgroundColor: 'white', color: 'black'}}>
                  <TableStyle aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left" colSpan={3} sx={{boxShadow: 'none !important', borderRadius: '0 !important'}}>Product</TableCell>
                        <TableCell align="left" colSpan={2} sx={{boxShadow: 'none !important', borderRadius: '0 !important'}}>Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart.map((row) => (
                        <TableRow key={row.desc}>
                          <TableCell align="left" colSpan={3} sx={{color: 'black'}}>{row.index === 0 ? "Main Event" : `Satellite${row.index}`}</TableCell>
                          <TableCell align="left" colSpan={2} sx={{color: 'black'}}>{ccyFormat(row.price * row.qty)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </TableStyle>
                </TableContainer>
              </Grid>

              <Typography sx={{ mt: 5, mb: 1, fontSize: '30px', textAlign: 'left', width: '600px' }}>
                Billing address
              </Typography>

              <Grid container sx={{ padding: '10px', borderRadius: '8px', border: '1px solid #eaeef3', backgroundColor: 'white' }}>
                <Stack spacing={1} sx={{ textAlign: 'left' }}>
                  <Typography>
                    Yousif Jabaky
                  </Typography>
                  <Typography>
                    12313 Alfred
                  </Typography>
                  <Typography>
                    Montreal QC H8T 1W1
                  </Typography>
                  <Typography>
                    23456789
                  </Typography>
                  <Typography>
                    yousif@jabaky.com
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </MainStyle>
        </Container>
      </ContentStyle>
    </RootStyle>
  )
}

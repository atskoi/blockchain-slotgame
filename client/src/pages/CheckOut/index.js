/* eslint-disable */
import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { styled } from '@material-ui/core/styles'
import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  TextField,
  Stack,
} from '@material-ui/core'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { LoadingButton } from '@material-ui/lab'

import { MotionInView, varFadeInUp } from '../../components/animate'

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
  const { purchase } = useDraw()
  // const { cart } = useCart()
  const cart = JSON.parse(localStorage.getItem('cart'))

  const [userid, setUserID] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [company, setCompany] = useState('')
  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [town, setTown] = useState('')
  const [province, setProvince] = useState('')
  const [postalcode, setPostalcode] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const [cardname, setCardname] = useState('')
  const [expire, setExpire] = useState('')
  const [cvc, setCvc] = useState('')

  const payment = () => {
    if (cardname == '' || expire == '' || cvc == '') {
      window.alert('Please Input your Card info.')
      return
    }

    let user = {
      id: userid,
      xBillFirstName: firstname,
      xBillLastName: lastname,
      xBillCompany: company,
      xBillCountry: country,
      xBillStreet: address,
      xBillCity: town,
      xBillPhone: phone,
      xEmail: email,
      cardname,
      expire,
      cvc,
    }

    purchase(user)
  }

  useEffect(() => {
    let user = localStorage.getItem('user')
    if (user === null) {
      window.location.href = '/auth/login'
    }
    user = JSON.parse(user)
    setUserID(user._id)
    setFirstname(user.username.split(' ')[0])
    setLastname(user.username.split(' ')[1])
    setCompany(user.company)
    setCountry(user.country)
    setAddress(user.address)
    setTown(user.town)
    setProvince(user.province)
    setPostalcode(user.postalcode)
    setPhone(user.phone)
    setEmail(user.email)
  })

  return (
    <RootStyle>
      <ContentStyle>
        {/* Drop a message */}
        <Container maxWidth="lg">
          <MainStyle>
            <Grid container>
              <Grid item md="8" xs="12">
                <Grid container sx={{ padding: '0 20px' }}>
                  <Grid item xs={12}>
                    <Grid container sx={{ padding: '0 20px' }}>
                      <Typography
                        variant="h5"
                        sx={{ mb: 3, fontWeight: '300', fontWeight: '30px' }}
                      >
                        Billing Details
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                    <Grid container sx={{ padding: '0 20px' }}>
                      <Typography
                        variant="h6"
                        sx={{ margin: 0, fontWeight: '300' }}
                      >
                        First Name <span style={{ color: '#364e9b' }}>*</span>
                      </Typography>
                      <TextField
                        fullWidth
                        autoComplete="username"
                        label="Enter your first name"
                        sx={{ marginTop: '10px !important' }}
                        value={firstname}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                    <Grid container sx={{ padding: '0 20px' }}>
                      <Typography
                        variant="h6"
                        sx={{ margin: 0, fontWeight: '300' }}
                      >
                        Last Name <span style={{ color: '#364e9b' }}>*</span>
                      </Typography>
                      <TextField
                        fullWidth
                        autoComplete="current-password"
                        label="Enter your subject"
                        sx={{ marginTop: '10px !important' }}
                        value={lastname}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sx={{ mb: 2 }}>
                    <Grid container sx={{ padding: '0 20px' }}>
                      <Typography
                        variant="h6"
                        sx={{ margin: 0, fontWeight: '300' }}
                      >
                        Company Name (Optional)
                      </Typography>
                      <TextField
                        fullWidth
                        autoComplete="username"
                        label="Enter your first name"
                        sx={{ marginTop: '10px !important' }}
                        value={company}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sx={{ mb: 2 }}>
                    <Grid container sx={{ padding: '0 20px' }}>
                      <Typography
                        variant="h6"
                        sx={{ margin: 0, fontWeight: '300' }}
                      >
                        Country Region{' '}
                        <span style={{ color: '#364e9b' }}>*</span>
                      </Typography>
                      <TextField
                        fullWidth
                        autoComplete="username"
                        label="Enter your first name"
                        sx={{ marginTop: '10px !important' }}
                        value={country}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sx={{ mb: 2 }}>
                    <Grid container sx={{ padding: '0 20px' }}>
                      <Typography
                        variant="h6"
                        sx={{ margin: 0, fontWeight: '300' }}
                      >
                        Street Address{' '}
                        <span style={{ color: '#364e9b' }}>*</span>
                      </Typography>
                      <TextField
                        fullWidth
                        autoComplete="username"
                        label="Enter your first name"
                        sx={{ marginTop: '10px !important' }}
                        value={address}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sx={{ mb: 2 }}>
                    <Grid container sx={{ padding: '0 20px' }}>
                      <Typography
                        variant="h6"
                        sx={{ margin: 0, fontWeight: '300' }}
                      >
                        Town/City
                      </Typography>
                      <TextField
                        fullWidth
                        autoComplete="username"
                        label="Enter your first name"
                        sx={{ marginTop: '10px !important' }}
                        value={town}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sx={{ mb: 2 }}>
                    <Grid container sx={{ padding: '0 20px' }}>
                      <Typography
                        variant="h6"
                        sx={{ margin: 0, fontWeight: '300' }}
                      >
                        Province
                      </Typography>
                      <TextField
                        fullWidth
                        autoComplete="username"
                        label="Enter your first name"
                        sx={{ marginTop: '10px !important' }}
                        value={province}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sx={{ mb: 2 }}>
                    <Grid container sx={{ padding: '0 20px' }}>
                      <Typography
                        variant="h6"
                        sx={{ margin: 0, fontWeight: '300' }}
                      >
                        Postal Code
                      </Typography>
                      <TextField
                        fullWidth
                        autoComplete="username"
                        label="Enter your first name"
                        sx={{ marginTop: '10px !important' }}
                        value={postalcode}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sx={{ mb: 2 }}>
                    <Grid container sx={{ padding: '0 20px' }}>
                      <Typography
                        variant="h6"
                        sx={{ margin: 0, fontWeight: '300' }}
                      >
                        Phone
                      </Typography>
                      <TextField
                        fullWidth
                        autoComplete="username"
                        label="Enter your first name"
                        sx={{ marginTop: '10px !important' }}
                        value={phone}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sx={{ mb: 2 }}>
                    <Grid container sx={{ padding: '0 20px' }}>
                      <Typography
                        variant="h6"
                        sx={{ margin: 0, fontWeight: '300' }}
                      >
                        Email address
                      </Typography>
                      <TextField
                        fullWidth
                        autoComplete="username"
                        label="Enter your first name"
                        sx={{ marginTop: '10px !important' }}
                        value={email}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md="4" xs="12">
                <Typography
                  sx={{
                    mb: 3,
                    fontSize: '30px',
                    textAlign: 'left',
                    width: '600px',
                  }}
                >
                  Your Order
                </Typography>

                <Grid container>
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
                        {cart.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell
                              align="left"
                              colSpan={3}
                              sx={{ color: 'black' }}
                            >
                              {row.index === 0 ? `Main Event * ${row.qty}` : `Satellite${row.index} * ${row.qty}`}
                            </TableCell>
                            <TableCell
                              align="left"
                              colSpan={2}
                              sx={{ color: 'black' }}
                            >
                              {ccyFormat(row.price * row.qty)}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ color: 'black' }}
                          >
                            total
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

                  <Stack
                    sx={{
                      borderRadius: '8px',
                      mt: 3,
                      width: '100%',
                      backgroundColor: 'white',
                    }}
                  >
                    <Stack
                      sx={{
                        borderRadius: '8px 8px 0 0',
                        padding: '20px',
                        width: '100%',
                        backgroundColor: 'yellow',
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ margin: 0, textAlign: 'left' }}
                      >
                        Credit Card
                      </Typography>
                    </Stack>

                    <Stack
                      sx={{
                        width: '100%',
                        padding: '20px',
                        backgroundColor: 'white',
                      }}
                    >
                      <Stack spacing={3} sx={{ width: '100%' }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              margin: 0,
                              fontWeight: 400,
                              textAlign: 'left',
                            }}
                          >
                            Cardname <span style={{ color: '#364e9b' }}>*</span>
                          </Typography>
                          <TextField
                            fullWidth
                            autoComplete="username"
                            type="email"
                            label="Enter your card name"
                            sx={{
                              marginTop: '10px !important',
                              '& input': { color: 'black' },
                            }}
                            value={cardname}
                            onChange={(e) => setCardname(e.target.value)}
                          />
                        </Box>
                      </Stack>

                      <Stack
                        direction={{
                          xs: 'column',
                          marginTop: '10px !important',
                          sm: 'row',
                        }}
                        spacing={2}
                        sx={{ mt: 3, width: '100%' }}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              margin: 0,
                              fontWeight: 400,
                              textAlign: 'left',
                            }}
                          >
                            Expire Code{' '}
                            <span style={{ color: '#364e9b' }}>*</span>
                          </Typography>
                          <TextField
                            fullWidth
                            autoComplete="username"
                            type="email"
                            label="Enter your card name"
                            sx={{
                              marginTop: '10px !important',
                              '& input': { color: 'black' },
                            }}
                            value={expire}
                            onChange={(e) => setExpire(e.target.value)}
                          />
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              margin: 0,
                              fontWeight: 400,
                              textAlign: 'left',
                            }}
                          >
                            Card Code(CVC){' '}
                            <span style={{ color: '#364e9b' }}>*</span>
                          </Typography>
                          <TextField
                            fullWidth
                            autoComplete="username"
                            type="email"
                            label="Enter your card name"
                            sx={{
                              marginTop: '10px !important',
                              '& input': { color: 'black' },
                            }}
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                          />
                        </Box>
                      </Stack>

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
                        onClick={payment}
                      >
                        Place Order
                      </LoadingButton>
                      <Link to="/productPage" style={{ marginTop: '10px', '&hover' : {color: "#ff0032"} }}> Go back to product page! </Link>
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

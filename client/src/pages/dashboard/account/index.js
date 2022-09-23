/* eslint-disable */
// material
import React, { useState, useEffect, useCallback } from 'react'
import { styled } from '@material-ui/core/styles'
// components
import Page from '../../../components/Page'

import {
  Container,
  Typography,
  Grid,
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  TextField,
  Stack,
} from '@material-ui/core'

import { LoadingButton } from '@material-ui/lab'
import useAuth from 'hooks/useAuth'
import useDraw from 'hooks/useDraw'
import UploadAvatar from 'customComponents/UploadAvatar'
import { fData } from 'utils/formatNumber'
import ChooseAvatar from './ChooseAvatar'

const RootStyle = styled(Page)({
  paddingTop: 176,
  paddingBottom: 105,
  height: '100%',
})

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}))

export default function Account() {
  const { logout, updateProfile } = useAuth()
  const { getAllAvatars } = useDraw()

  const [id, setID] = useState('')
  const [phone, setPhone] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newpassword1, setNewpassword1] = useState('')
  const [newpassword2, setNewpassword2] = useState('')
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    getAllAvatars()
    let user = localStorage.getItem('user')
    user = JSON.parse(user)
    setID(user._id)
    setPhone(user.phone)
    setFirstname(user.name.split(' ')[0])
    setLastname(user.name.split(' ')[1])
    setUsername(user.username)
    setEmail(user.email)
    setAvatar(user.avatar)
  }, [])

  const updateUser = () => {
    if (newpassword1 !== newpassword2) {
      window.alert('please enter your new password')
      return
    }
    const updatedUserInfo = {
      id,
      phone,
      firstname,
      lastname,
      username,
      email,
      password,
      newpassword1,
    }
    if (avatar) {
      updatedUserInfo.avatar = avatar._id
    }
    updateProfile(updatedUserInfo)
  }

  return (
    <RootStyle>
      <ContentStyle>
        <Container>
          <Typography
            variant="h3"
            component="h1"
            paragraph
            sx={{ textAlign: 'center', mt: 3 }}
          >
            My Account
          </Typography>

          <Grid container>
            <Grid item xs={12} md={3}>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                }}
              >
                <ListItem>
                  <ListItemButton component="a" href="/dashboard">
                    Dashboard
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton component="a" href="/dashboard/order">
                    Orders
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton component="a" href="/dashboard/account">
                    Account Details
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton onClick={logout}>Logout</ListItemButton>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container sx={{ padding: '0 20px' }}>
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <ChooseAvatar avatar={avatar} setAvatar={setAvatar} />
                </Grid>
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Grid container sx={{ padding: '0 20px' }}>
                    <Typography
                      variant="h5"
                      sx={{ margin: 0, fontWeight: '300' }}
                    >
                      Mobile Number
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="mobilenumber"
                      label="Enter your mobile number"
                      sx={{ marginTop: '10px !important' }}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                  <Grid container sx={{ padding: '0 20px' }}>
                    <Typography
                      variant="h5"
                      sx={{ margin: 0, fontWeight: '300' }}
                    >
                      First Name <span style={{ color: '#364e9b' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="firstname"
                      label="Enter your first name"
                      sx={{ marginTop: '10px !important' }}
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                  <Grid container sx={{ padding: '0 20px' }}>
                    <Typography
                      variant="h5"
                      sx={{ margin: 0, fontWeight: '300' }}
                    >
                      Last Name <span style={{ color: '#364e9b' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="lastname"
                      label="Enter your lastname"
                      sx={{ marginTop: '10px !important' }}
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Grid container sx={{ padding: '0 20px' }}>
                    <Typography
                      variant="h5"
                      sx={{ margin: 0, fontWeight: '300' }}
                    >
                      Display Name <span style={{ color: '#364e9b' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="displayname"
                      label="Enter your display name"
                      sx={{ marginTop: '10px !important' }}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Grid container sx={{ padding: '0 20px' }}>
                    <Typography
                      variant="h5"
                      sx={{ margin: 0, fontWeight: '300' }}
                    >
                      Email Address <span style={{ color: '#364e9b' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="email"
                      label="Enter your email address"
                      sx={{ marginTop: '10px !important' }}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Typography variant="h4" sx={{ mt: 3, fontWeight: '300' }}>
                      Password Change
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Grid container sx={{ padding: '0 20px' }}>
                    <Typography
                      variant="h5"
                      sx={{ margin: 0, fontWeight: '300' }}
                    >
                      Current Password (leave blank to leave unchanged)
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="password"
                      label="Enter your current password"
                      type="password"
                      sx={{ marginTop: '10px !important' }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Grid container sx={{ padding: '0 20px' }}>
                    <Typography
                      variant="h5"
                      sx={{ margin: 0, fontWeight: '300' }}
                    >
                      New Password (leave blank to leave unchanged)
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="newpassword"
                      label="Enter your new password"
                      type="password"
                      sx={{ marginTop: '10px !important' }}
                      value={newpassword1}
                      onChange={(e) => setNewpassword1(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Grid container sx={{ padding: '0 20px' }}>
                    <Typography
                      variant="h5"
                      sx={{ margin: 0, fontWeight: '300' }}
                    >
                      Confirm new Password
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="confirmpassword"
                      type="password"
                      label="Confirm your password"
                      sx={{ marginTop: '10px !important' }}
                      value={newpassword2}
                      onChange={(e) => setNewpassword2(e.target.value)}
                    />

                    <LoadingButton
                      size="large"
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: '#2fc557',
                        boxShadow: 'none',
                        mt: 3,
                      }}
                      onClick={updateUser}
                    >
                      Save Change
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </ContentStyle>
    </RootStyle>
  )
}

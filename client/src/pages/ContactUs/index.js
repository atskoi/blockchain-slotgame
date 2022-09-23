/* eslint-disable */
import React, { useState } from 'react'
import { styled } from '@material-ui/core/styles'
import {
  Grid,
  Container,
  Typography,
  Button,
  TextField,
  Box,
} from '@material-ui/core'
import { useSnackbar } from 'notistack5'
import { Icon } from '@iconify/react'
import closeFill from '@iconify/icons-eva/close-fill'

import { MotionInView, varFadeInUp } from '../../components/animate'
import { MIconButton } from '../../components/@material-extend'

import Banner from 'customComponents/Banner'
import SignUpCTA from 'customComponents/SignUpCTA'
import useDraw from 'hooks/useDraw'
import { SAMPLE_USER_EMAIL, SAMPLE_USER_EMAIL_PASSWORD } from 'utils/constants'

const RootStyle = styled('div')(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  height: '100%',
}))

const ContentStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center',
}))

const MainStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#000',
  color: '#fff',
  padding: theme.spacing(3),
  // margin: theme.spacing(3, 0),
}))

export default function ContactUs() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { sendEmailToAdmin } = useDraw()
  const [messageData, setMessageData] = useState({
    firstName: '',
    lastName: '',
    email: SAMPLE_USER_EMAIL,
    password: SAMPLE_USER_EMAIL_PASSWORD,
    subject: '',
    message: '',
  })
  const [adminEmail, setAdminEmail] = useState('mr.new0509@gmail.com')

  const onChange = (e) => {
    const { name, value } = e.target
    setMessageData({
      ...messageData,
      [name]: value,
    })
  }

  const onSubmit = async () => {
    const response = await sendEmailToAdmin(messageData)
    const { status, data } = response
    if (data === 'Success') {
      await enqueueSnackbar('Message submit success!', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      })
    } else {
      await enqueueSnackbar('Message submit failed!', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      })
    }
  }

  return (
    <RootStyle>
      <ContentStyle>
        {/* Banner */}
        <Banner />

        <Box sx={{ backgroundImage: 'url("/images/site-background.jpg")' }}>
          {/* Drop a message */}
          <Container maxWidth="lg" sx={{ py: 10 }}>
            <MainStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography
                  sx={{
                    mt: 3,
                    mb: 3,
                    fontFamily: 'Arciform,AdobeInvisFont,MyriadPro-Regular',
                    fontSize: '20px',
                  }}
                >
                  DROP US A MESSAGE
                </Typography>
              </MotionInView>

              <Grid container>
                <Grid item xs={12} md={6}>
                  <MotionInView variants={varFadeInUp}>
                    <TextField
                      fullWidth
                      autoComplete="first_name"
                      label="First Name"
                      sx={{ mt: 3 }}
                      name="firstName"
                      value={messageData.firstName}
                      onChange={(e) => onChange(e)}
                    />
                    <TextField
                      fullWidth
                      autoComplete="last_name"
                      label="Last Name"
                      sx={{ mt: 3 }}
                      name="lastName"
                      value={messageData.lastName}
                      onChange={(e) => onChange(e)}
                    />
                    <TextField
                      fullWidth
                      autoComplete="email"
                      type="email"
                      label="Email"
                      sx={{ mt: 3 }}
                      name="email"
                      value={messageData.email}
                      onChange={(e) => onChange(e)}
                    />
                    <TextField
                      fullWidth
                      autoComplete="password"
                      type="password"
                      label="Password"
                      sx={{ mt: 3 }}
                      name="password"
                      value={messageData.password}
                      onChange={(e) => onChange(e)}
                    />
                    <TextField
                      fullWidth
                      autoComplete="subject"
                      label="Subject"
                      sx={{ mt: 3 }}
                      name="subject"
                      value={messageData.subject}
                      onChange={(e) => onChange(e)}
                    />
                    <TextField
                      fullWidth
                      multiline
                      autoComplete="message"
                      minRows="5"
                      label="Message"
                      sx={{ mt: 3 }}
                      name="message"
                      value={messageData.message}
                      onChange={(e) => onChange(e)}
                    />
                    <Button
                      varient="contained"
                      sx={{
                        backgroundColor: '#2FC656',
                        color: '#fff',
                        my: 3,
                        width: '30px',
                        textAlign: 'left',
                        '&:hover': {
                          backgroundColor: '#29B2FE',
                          color: '#fff',
                        },
                      }}
                      onClick={() => onSubmit()}
                    >
                      SUBMIT
                    </Button>
                  </MotionInView>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img
                    src="/images/contact_phone.png"
                    alt="contact_phone"
                    style={{ margin: 'auto', width: 50 }}
                  />
                  <Typography
                    sx={{
                      mt: 2,
                      mb: 3,
                      // fontFamily: 'Arciform,AdobeInvisFont,MyriadPro-Regular',
                      fontSize: '5',
                    }}
                  >
                    1.800.555.5555
                  </Typography>
                  <img
                    src="/images/contact_email.png"
                    alt="contact_email"
                    style={{ margin: 'auto', width: 50 }}
                  />
                  <Typography
                    sx={{
                      mt: 2,
                      mb: 3,
                      // fontFamily: 'Arciform,AdobeInvisFont,MyriadPro-Regular',
                      fontSize: '5',
                    }}
                  >
                    {adminEmail}
                  </Typography>
                  <img
                    src="/images/placeholder-portfolio-items.jpg"
                    alt="placeholder-portfolio-items"
                    style={{ margin: 'auto', width: 400, marginBottom: '10px' }}
                  />
                </Grid>
              </Grid>
            </MainStyle>
          </Container>

          {/* Sign Up Now */}
          <SignUpCTA />
        </Box>
      </ContentStyle>
    </RootStyle>
  )
}

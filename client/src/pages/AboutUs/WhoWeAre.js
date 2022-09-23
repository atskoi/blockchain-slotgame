/* eslint-disable */
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
  varFadeInUp,
  varFadeInLeft,
  varFadeInRight,
} from '../../components/animate'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(14, 0),
}))

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  // marginBottom: theme.spacing(10),
  // [theme.breakpoints.up('md')]: {
  //   height: '100%',
  //   marginBottom: 0,
  //   textAlign: 'left',
  //   display: 'inline-flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'flex-start',
  // },
}))

// ----------------------------------------------------------------------

export default function WhoWeAre() {
  return (
    <RootStyle>
      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        <ContentStyle>
          <MotionInView variants={varFadeInUp}>
            <Stack direction="row" justifyContent="center">
              <img src="/images/logoBlack.png" alt="logo black" width="100" />
            </Stack>
          </MotionInView>
          <MotionInView variants={varFadeInUp}>
            <Typography
              variant="h3"
              align="center"
              sx={{ mb: 1, color: 'common.black', textTransform: 'uppercase' }}
            >
              Who we are
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Typography
              align="center"
              sx={{ mb: 5 }}
              color="primary"
              variant="subtitle1"
            >
              THE WORLD NATION OF CARDS
            </Typography>
          </MotionInView>

          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <MotionInView variants={varFadeInLeft}>
                <Box
                  component="img"
                  src="/images/whoWeAre.jpg"
                  alt="whoWeArePlaceholder"
                  sx={{ borderRadius: 2 }}
                />
              </MotionInView>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionInView variants={varFadeInRight}>
                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="h3"
                      align="center"
                      sx={{
                        color: 'common.black',
                        textTransform: 'uppercase',
                      }}
                    >
                      About us
                    </Typography>
                    <Typography
                      align="center"
                      color="primary"
                      variant="subtitle1"
                    >
                      Bringing excitement to you through online entertainment
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="common.black">
                    Getting your hands on prominent hockey cards these days can
                    seem unattainable… in fact, getting your hands on any
                    sporting card is difficult. That leaves you with no choice
                    but to hunt for cards on the internet, where the costs
                    (before fees) have simply become unsustainable for most
                    people. That’s when the concept for WNOC arose.
                  </Typography>
                  <Typography variant="body1" color="common.black">
                    WNOC is the only online draw website giving fans and
                    experience-seekers the chance to win exclusive cards through
                    online entertainment. Whether it be from your desktop or
                    mobile device, winning these precious prizes in your pockets
                    has never been so easy and fun. We are a legal enterprise
                    operating within Canada, St Régis Akwasasne, CEO Abraham
                    David with Pierre Daigle acting consultant.
                  </Typography>
                  <Stack direction="row" justifyContent="center">
                    <Button
                      variant="contained"
                      size="large"
                      color="success"
                      sx={{ color: 'white' }}
                    >
                      Learn More
                    </Button>
                  </Stack>
                </Stack>
              </MotionInView>
            </Grid>
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}

// material
import { styled } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography, Stack } from '@material-ui/core';
//
import { MotionInView, varFadeInUp, varFadeInDown } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  // padding: theme.spacing(28, 0)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    height: '100%',
    marginBottom: 0,
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
}));

// ----------------------------------------------------------------------

export default function LandingDarkMode() {
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid container spacing={8} direction="row-reverse" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography variant="h2" sx={{ mb: 3, fontFamily: 'Poppins' }}>
                  How Gear Mobile Works
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 2 }}>
                  <Stack direction="row" justifyContent="center" sx={{ width: 102 }}>
                    <Box component="img" sx src="/images/search.png" />
                  </Stack>
                  <Typography sx={{ fontSize: 18, lineHeight: '26px', fontWeight: 700 }}>
                    Find the tool your looking for
                  </Typography>
                </Stack>
              </MotionInView>
              <MotionInView variants={varFadeInUp}>
                <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 2 }}>
                  <Stack direction="row" justifyContent="center" sx={{ width: 102 }}>
                    <Box component="img" sx src="/images/phone.png" />
                  </Stack>
                  <Typography sx={{ fontSize: 18, lineHeight: '26px', fontWeight: 700 }}>Book your rental</Typography>
                </Stack>
              </MotionInView>
              <MotionInView variants={varFadeInUp}>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Stack direction="row" justifyContent="center" sx={{ width: 102 }}>
                    <Box component="img" sx src="/images/shake.png" />
                  </Stack>
                  <Typography sx={{ fontSize: 18, lineHeight: '26px', fontWeight: 700 }}>Pick up your Gear!</Typography>
                </Stack>
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
            <MotionInView threshold={0.5} variants={varFadeInUp}>
              <Box component="img" src="/images/guitars.png" />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

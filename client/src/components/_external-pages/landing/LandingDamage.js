// material
import { styled } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography, Stack } from '@material-ui/core';
//
import { MotionInView, varFadeInUp, varFadeInDown, varFadeInLeft, varFadeInRight } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(28, 0),
  background: 'url(/images/content-bg.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%'
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
      <Container maxWidth="lg" sx={{ position: 'relative', pt: 30 }}>
        <Grid container spacing={5} direction="row" justifyContent="space-between">
          <Grid item xs={12} md={5}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography color="white" sx={{ mb: 3, fontWeight: 700, fontSize: 70, lineHeight: '90px' }}>
                  Damage warivers for property damage & theft
                </Typography>
              </MotionInView>
              <MotionInView variants={varFadeInUp}>
                <Box component="img" src="/images/insurance-logo.png" />
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={7} sx={{ position: 'relative' }}>
            <MotionInView threshold={0.5} variants={varFadeInUp}>
              <Box component="img" src="/images/repair.png" />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={10} sx={{ mt: 10 }}>
        <MotionInView variants={varFadeInLeft}>
          <Box component="img" src="/images/device1.png" />
        </MotionInView>
        <MotionInView variants={varFadeInRight}>
          <Box component="img" src="/images/device2.png" />
        </MotionInView>
      </Stack>
    </RootStyle>
  );
}

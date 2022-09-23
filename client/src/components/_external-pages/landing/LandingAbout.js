// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Box, Grid, Button, Container, Typography } from '@material-ui/core';
//
import { varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(12, 0, 24, 0),
  background: 'url(/images/about-bg.png)',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0
  }
}));
// ----------------------------------------------------------------------

export default function LandingHugeAbout() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <ContentStyle>
          <MotionInView variants={varFadeInUp}>
            <Typography variant="h2" sx={{ mb: 3, fontFamily: 'Poppins' }}>
              Endless Options
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Typography
              sx={{
                mb: 5,
                color: 'text.secondary'
              }}
            >
              Choose freom hundreds of different Equipment Catagories and Equipment Owners <br /> You name it we can
              find someone who has the Equipment you looking for.
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Button size="large" variant="contained">
              Browse catalog
            </Button>
          </MotionInView>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

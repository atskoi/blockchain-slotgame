// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Box, Grid, Button, Container, Typography } from '@material-ui/core';
//
import { varFadeInUp, MotionInView } from '../../animate';
import { CityCarousel } from '../../carousel';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
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
            <Typography variant="h2" sx={{ mb: 3, textAlign: 'center', fontFamily: 'Poppins' }}>
              Browse equipments by destination
            </Typography>
            <Typography sx={{ mb: 3, fontSize: 14, lineHeight: '16px', fontWeight: 400, textAlign: 'center' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s,
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <CityCarousel />
          </MotionInView>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

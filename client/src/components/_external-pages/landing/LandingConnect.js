// material
import { styled } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography, Stack, TextField, Button } from '@material-ui/core';
//
import { MotionInView, varFadeInUp, varFadeInDown, varFadeInLeft, varFadeInRight } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0)
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
        <Typography
          sx={{ mb: 5, textAlign: 'center', fontSize: 52, lineHeight: '78px', fontWeight: 700, fontFamily: 'Poppins' }}
        >
          Lets Get you Connected!
        </Typography>
        <Grid container spacing={2} sx={{ width: 1, maxWidth: 680, mx: 'auto' }}>
          <Grid item xs={12} md={6}>
            <TextField sx={{ background: '#E3E3E3' }} label="Full Name" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField sx={{ background: '#E3E3E3' }} label="Email" fullWidth />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField sx={{ background: '#E3E3E3' }} label="Phone" fullWidth />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField multiline rows={4} sx={{ background: '#E3E3E3' }} label="Your project specification" fullWidth />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button variant="contained" size="large" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

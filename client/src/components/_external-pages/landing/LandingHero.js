import { useState } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import flashFill from '@iconify/icons-eva/flash-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Button, Box, Link, Container, Typography, Stack, Select, MenuItem, TextField } from '@material-ui/core';
import { DatePicker, StaticDatePicker, MobileDatePicker, DesktopDatePicker, DesktopTimePicker } from '@material-ui/lab';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { varFadeIn, varFadeInUp, varWrapEnter, varFadeInRight } from '../../animate';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  background: 'url(/images/hero-bg.png)',
  backgroundSize: 'cover',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    // height: '100vh',
    display: 'flex',
    // position: 'fixed',
    alignItems: 'center'
  }
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(30),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left'
  }
}));

const HeroOverlayStyle = styled(motion.img)({
  zIndex: 9,
  width: '100%',
  // height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '8%',
    width: 'auto',
    height: '48vh'
  }
}));

// ----------------------------------------------------------------------

export default function LandingHero() {
  const [age, setAge] = useState('');
  const [value, setValue] = useState(new Date());
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        {/* <HeroOverlayStyle alt="overlay" src="/static/overlay.svg" variants={varFadeIn} />

        <HeroOverlayStyle alt="hero" src="/images/hero-bg.png" variants={varFadeIn} /> */}

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography sx={{ color: 'common.white', fontSize: 90, fontWeight: 700, lineHeight: '98px' }}>
                Let's get you <br />
                Connected!
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Typography sx={{ color: 'common.white' }}>
                Peer to Peer equipment rental made easy. Share your equipment
                <br />
                and make money while your at it!
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Button size="large" variant="contained">
                Get Started
              </Button>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Box sx={{ border: '5px solid #29B2FE', borderRadius: '16px', mt: 12 }}>
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  spacing={1}
                  sx={{
                    p: 4,
                    filter: 'drop-shadow(15px 25.981px 133px rgba(0, 0, 0, 0.259))',
                    borderRadius: '16px',
                    background: '#FFFFFF',
                    transform: 'translate(32px, -32px)'
                  }}
                >
                  <Stack>
                    <Typography sx={{ mb: 1, fontFamily: 'Poppins', fontSize: 16, lineHeight: '24px' }}>
                      Where
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      value={age}
                      label="City, State"
                      // SelectProps={{ native: true }}
                      onChange={handleChange}
                      sx={{
                        '& fieldset': { border: '0 !important' },
                        '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
                        '&.MuiTextField-root': { width: '300px' },
                        '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
                        '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 }
                      }}
                    >
                      <MenuItem value={10}>City1</MenuItem>
                      <MenuItem value={20}>City2</MenuItem>
                      <MenuItem value={30}>City3</MenuItem>
                    </TextField>
                  </Stack>

                  <Stack>
                    <Typography sx={{ mb: 1, fontFamily: 'Poppins', fontSize: 16, lineHeight: '24px' }}>
                      From
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <DesktopDatePicker
                        label="For desktop"
                        value={value}
                        minDate={new Date('2017-01-01')}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        components={{
                          OpenPickerIcon: ExpandMoreRoundedIcon
                        }}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            sx={{
                              '& fieldset': { border: '0 !important' },
                              '&.MuiTextField-root': { width: '150px' },
                              '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' }
                            }}
                          />
                        )}
                      />
                      <DesktopTimePicker
                        label="For desktop"
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        components={{
                          OpenPickerIcon: ExpandMoreRoundedIcon
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={{
                              '& fieldset': { border: '0 !important' },
                              '&.MuiTextField-root': { width: '130px' },
                              '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' }
                            }}
                          />
                        )}
                      />
                    </Stack>
                  </Stack>

                  <Stack>
                    <Typography sx={{ mb: 1, fontFamily: 'Poppins', fontSize: 16, lineHeight: '24px' }}>To</Typography>
                    <Stack direction="row" spacing={1}>
                      <DesktopDatePicker
                        label="For desktop"
                        value={value}
                        minDate={new Date('2017-01-01')}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        components={{
                          OpenPickerIcon: ExpandMoreRoundedIcon
                        }}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            sx={{
                              '& fieldset': { border: '0 !important' },
                              '&.MuiTextField-root': { width: '150px' },
                              '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' }
                            }}
                          />
                        )}
                      />
                      <DesktopTimePicker
                        label="For desktop"
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        components={{
                          OpenPickerIcon: ExpandMoreRoundedIcon
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={{
                              '& fieldset': { border: '0 !important' },
                              '&.MuiTextField-root': { width: '130px' },
                              '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' }
                            }}
                          />
                        )}
                      />
                    </Stack>
                  </Stack>

                  <Button size="large" variant="contained" sx={{ flexGrow: 1, height: 56 }}>
                    Search
                  </Button>
                </Stack>
              </Box>
            </motion.div>
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
}

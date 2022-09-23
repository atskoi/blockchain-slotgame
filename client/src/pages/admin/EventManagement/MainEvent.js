/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { styled } from '@material-ui/core/styles'
import { Grid, Container, Typography, Button, TextField } from '@material-ui/core';
import { DatePicker, StaticDatePicker, MobileDatePicker, DesktopDatePicker, DesktopTimePicker } from '@material-ui/lab';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import { MotionInView, varFadeInUp } from '../../../components/animate';
// hooks
import useDraw from '../../../hooks/useDraw';

// ---------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center'
}))

const ContentStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center'
}))

const MainStyle = styled('div')(({ theme }) => ({
  // backgroundColor: '#000',
  color: '#fff',
  padding: theme.spacing(3),
  margin: theme.spacing(3, 0),
}))


export default function MainEvent() {
  const { isCreatedEvent, current_event, create_mEvent, days, loading } = useDraw();
  const [formData, setFormData] = useState({
    price: '',
  });
  const [date, setDate] = useState(new Date());

  const { price } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await create_mEvent({ 
      id: current_event._id,
      date, 
      price 
    });
  };

  let buttonFlag = current_event.length == 0 ? false : current_event.status == 0 ? false : true;

  return (
    <RootStyle>
      <ContentStyle>
      {/* Create a ticket */}
        <Container maxWidth="lg">
          <MainStyle>
            <MotionInView variants={varFadeInUp}>
              <Typography sx={{ fontFamily: 'Arciform,AdobeInvisFont,MyriadPro-Regular', fontSize: '20px' }}>
                CREATE A MAIN EVENT
              </Typography>
            </MotionInView>

            <Grid container>
              <Grid item xs={12} md={12}>
                <MotionInView variants={varFadeInUp}>
                  <TextField
                    fullWidth
                    autoComplete="price"
                    label="Ticket Price"
                    type="number"
                    sx={{mt: 3}}
                    name="price"
                    value={price}
                    onChange={onChange}
                  />
                  <DesktopDatePicker
                    fullWidth
                    label="For desktop"
                    name="date"
                    value={date}
                    onChange={(date) => {
                      setDate(date);
                    }}
                    minDate={new Date()}
                    components={{
                      OpenPickerIcon: ExpandMoreRoundedIcon
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        sx={{
                          mt: 3,
                          '& fieldset': { border: '0 !important' },
                          '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' }
                        }}
                      />
                    )}
                  />
                  {/* disabled={isCreatedEvent} */}
                  <Button onClick={onSubmit} disabled={buttonFlag || loading} variant="contained" sx={{mt: 3}}>{loading? "Loading..." : "SUBMIT"}  </Button>
                </MotionInView>
              </Grid>
            </Grid>
          </MainStyle>
        </Container>
      </ContentStyle>
    </RootStyle>
  )
}

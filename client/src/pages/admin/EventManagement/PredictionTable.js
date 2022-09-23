/* eslint-disable */
import React, { useState, useEffect } from 'react'
// material
import {
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Button,
  Stack,
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  ButtonGroup,
  TextField,
  InputLabel,
  FormControl,
  Modal,
  Backdrop,
  Fade
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
// hooks
import useSettings from '../../../hooks/useSettings'
import useDraw from 'hooks/useDraw'
// components
import Page from '../../../components/Page'

// ----------------------------------------------------------------------

export default function PredictionTable() {
  const { themeStretch } = useSettings()
  const [open, setOpen] = React.useState(false);
  const [winner, setWinner] = React.useState(1);

  const {
    current_event,
    roomDraw,
    days,
    endDay,
    finalRoom,
    loading
  } = useDraw()

  const setFinalWinner = (val) => setWinner(Number(val))

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    finalRoom(winner);
    handleClose();
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };

  let roomname = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  let finalWinner = days.length > 0 ? days[days.length - 1].entry : 1;

  const startFlag = (item) => {
    return item.room.filter(roomitem => roomitem.status == true).length == 0 || item.status != 1 || loading
  }

  const finalFlag = (item) => {
    return item.room.filter(roomitem => roomitem.status == true).length > 0 || item.status != 1 || loading
  }

  const drawRoomFlag = (roomitem, dayitem) => {
    if(dayitem.status == 0 || dayitem.status == 2) {
      return true;
    } else if(dayitem.status == 1){
      return roomitem.status || loading
    }
  }

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mb: 2, justifyContent: 'right' }}>
        <Button variant="contained" sx={{
          '&:hover': { backgroundColor: '#ff0032'}
        }} onClick={handleOpen} disabled={days.status != 1}> End Current Event Now !</Button>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day number</TableCell>
              <TableCell>Current user</TableCell>
              <TableCell>After draw</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              days instanceof Array && days.length > 0 && days.map((item, index) => (
                <>
                  <TableRow>
                    <TableCell>Day {index+1}</TableCell>
                    <TableCell>{item.entry}</TableCell>
                    <TableCell>{item.winner == 0 ? "next: " + Math.ceil(item.entry * 0.3) : item.winner}</TableCell>
                    <TableCell>
                      <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button variant="contained" sx={{
                            backgroundColor: '#ff0032', color: '#fff',
                          '&:hover': { backgroundColor: '#yello', color: '#000' }
                        }} onClick={() => endDay(item.daynumber)} disabled={startFlag(item)}> {loading ? "Loading..." :"End Day"} </Button>
                        <Button sx={{
                            backgroundColor: 'yellow', color: '#000',
                            '&:hover': { backgroundColor: '#29B2FE', color: '#fff' }
                          }} disabled={finalFlag(item)} onClick={handleOpen}>{loading ? "Loading..." :"Final Draw"}</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={3}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>Rooms</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Stack spacing={1}>
                            {
                              item.room.sort((a1, a2) => a1.roomnumber - a2.roomnumber).map((roomitem, index) => (
                                <Button variant="contained" sx={{
                                  backgroundColor: 'yellow', color: '#000',
                                  '&:hover': { backgroundColor: '#29B2FE', color: '#fff' }
                                }} key={index} onClick={() => roomDraw(roomitem.roomnumber, item.daynumber)} disabled={drawRoomFlag(roomitem, item)}>
                                  {loading ? "Loading..." : roomname[roomitem.roomnumber]+" - DRAW"}
                                </Button>
                              ))
                            }
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                </>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      {/* Input Modal : Satellite Room Number */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ textAlign: "center" }}>
              Select Final Winner
            </Typography>

            <TextField
              fullWidth
              autoComplete="winner"
              label="Event Name"
              value={winner}
              onChange={(e) => setFinalWinner(e.target.value)}
              sx={{mt: 3}}
              type="number"
              inputProps={{ max: finalWinner }}
            />
            <Stack spacing={2} direction="row" justifyContent="right" sx={{ mt: 3 }}>
              <Button onClick={onSubmit} variant="outlined" sx={{ background: "transparent" }}>OK</Button>
              <Button onClick={handleClose} variant="contained" sx={{ background: "transparent" }}>Close</Button>
            </Stack>

          </Box>
        </Fade>
      </Modal>
    </>
  )
}

/* eslint-disable */
import React, { useEffect, useState } from 'react'
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
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

// hooks
import useSettings from '../../../hooks/useSettings'
import useDraw from '../../../hooks/useDraw'
// components
import Page from '../../../components/Page'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  marginRight: '10px',
}))

export default function CurrentEvent() {
  const { themeStretch } = useSettings()
  const {
    current_event,
    days,
    assignSatelliteTable,
    makeTable,
    loading,
  } = useDraw()

  const [open, setOpen] = React.useState(false)
  const [id, setId] = React.useState('')
  const handleOpen = (id) => {
    setOpen(true)
    setId(id)
  }
  const handleClose = () => setOpen(false)

  const [formData, setFormData] = useState({
    roomNum: 0,
  })
  const { roomNum } = formData
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    assignSatelliteTable(id, roomNum)
    handleClose()
  }

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
  }

  let roomname = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]

  const mainflag = () => {
    if(current_event.status > 1) return true

    if (days.length > 0) {
      return days[0].status != 0
    }
    return false
  }

  return (
    <RootStyle>
      <>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event Type</TableCell>
                <TableCell>Sales Begin Date</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Entries</TableCell>
                <TableCell>Winners</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Main Event */}
              {current_event ? (
                current_event.main.price != 0 ? (
                  <TableRow>
                    <TableCell>Main</TableCell>
                    <TableCell>{current_event.main.date}</TableCell>
                    <TableCell>{current_event.main.price}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      - - - - - -
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      - - - - - -
                    </TableCell>
                    <TableCell>
                      {loading ? (
                        'Loading...'
                      ) : (
                        <Button
                          varient="contained"
                          sx={{
                            backgroundColor: 'yellow',
                            color: '#000',
                            '&:hover': {
                              backgroundColor: '#29B2FE',
                              color: '#fff',
                            },
                          }}
                          onClick={() => {
                            makeTable()
                          }}
                          disabled={mainflag()}
                        >
                          {' '}
                          Draw{' '}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
              {current_event ? (
                current_event.satellite.length > 0 ? (
                  current_event.satellite.map((satellite, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>Satellite{index + 1}</TableCell>
                        <TableCell>{satellite.date}</TableCell>
                        <TableCell>{satellite.price}</TableCell>
                        <TableCell>{satellite.entries}</TableCell>
                        <TableCell>{satellite.winners}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleOpen(satellite._id)}
                            varient="contained"
                            sx={{
                              backgroundColor: 'yellow',
                              color: '#000',
                              '&:hover': {
                                backgroundColor: '#29B2FE',
                                color: '#fff',
                              },
                            }}
                            disabled={!satellite.status || current_event.status > 1 || (days.length > 0 ? days[0].status == 2 : false)}
                          >
                            {' '}
                            Draw{' '}
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <p>There is no Satellite Event</p>
                )
              ) : (
                <></>
              )}
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: 'center' }}
              >
                Select Room !
              </Typography>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Room Name</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={roomNum}
                  name="roomNum"
                  label="Room Name"
                  onChange={onChange}
                >
                  {roomname.map((item, index) => (
                    <MenuItem value={index} key={index}>
                      {roomname[index]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="right"
                sx={{ mt: 3 }}
              >
                <Button
                  onClick={onSubmit}
                  variant="outlined"
                  sx={{ background: 'transparent' }}
                >
                  Ok
                </Button>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  sx={{ background: 'transparent' }}
                >
                  Close
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Modal>
      </>
    </RootStyle>
  )
}

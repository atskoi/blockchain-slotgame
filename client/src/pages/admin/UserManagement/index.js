/* eslint-disable */
import React, { useEffect, useState } from 'react'
// material
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  useTheme,
  Modal,
  Backdrop,
  Fade,
  Box,
  Stack,
  TextField,
} from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component'

// hooks
import useSettings from '../../../hooks/useSettings'
import useDraw from '../../../hooks/useDraw'
// components
import Page from '../../../components/Page'

// ----------------------------------------------------------------------

export default function UserManagement() {
  const theme = useTheme()
  const { themeStretch } = useSettings()
  const {
    getAllUsers,
    users,
    clearUsers,
    expectedUsersAmount,
    updatePassword,
  } = useDraw()
  const [pageSize, setPageSize] = useState(20)
  const [pageNumber, setPageNumber] = useState(1)
  const [searchKey, setSearchKey] = useState('')
  const [open, setOpen] = React.useState(false)
  const [id, setID] = useState('')
  const [newpassword1, setNewpassword1] = useState('')
  const [newpassword2, setNewpassword2] = useState('')

  useEffect(() => {
    let user = localStorage.getItem('user')
    user = JSON.parse(user)
    setID(user._id)
  }, [])

  const handleOpen = (e) => {
    setID(e.target.id)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (newpassword1 !== newpassword2) {
      window.alert('please confirm your new password')
      return
    }
    console.log(id, newpassword1)

    handleClose()
    const result = await updatePassword({
      id: id,
      password: newpassword1,
    })
    if (result.success)
      alert(
        `${result.user.name} 's password is changed as a ${newpassword1} successfully!`,
      )
    else
      alert(
        `Error: Unfortunately, ${result.user.name} 's password is not changed!`,
      )
  }

  useEffect(() => {
    getAllUsers({ pageSize, pageNumber })
    console.log(users)
    return () => clearUsers()
  }, [])

  const onSearch = (sKey) => {
    clearUsers()
    initializePageData()
    // searchSatelliteUsersBySatelliteEventId(satelliteEventId, {
    //   pageSize,
    //   pageNumber,
    //   keyword: sKey,
    // })
  }

  const fetchNextData = () => {
    if (users.length !== expectedUsersAmount) {
      console.log(users.length, expectedUsersAmount)
      setPageSize(pageSize + 10)
      setPageNumber(pageNumber + 1)
      if (searchKey) {
        // searchSatelliteUsersBySatelliteEventId(satelliteEventId, {
        //   pageSize,
        //   pageNumber,
        //   keyword: searchKey,
        // })
      } else {
        getAllUsers({ pageSize, pageNumber })
      }
    }
  }

  const initializePageData = () => {
    setPageSize(10)
    setPageNumber(1)
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

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          User Management
        </Typography>
        <TableContainer sx={{ position: 'relative' }}>
          <InfiniteScroll
            dataLength={pageSize}
            hasMore={users.length === expectedUsersAmount ? false : true}
            next={fetchNextData}
            height={700}
            loader={
              users.length <= expectedUsersAmount ? (
                <></>
              ) : (
                <Typography variant="subtitle1" align="center" mt={1}>
                  Loading...
                </Typography>
              )
            }
          >
            <Table>
              <TableHead
                sx={{
                  position: 'sticky',
                  top: 0,
                  bgcolor: theme.palette.grey[900],
                  zIndex: 500,
                }}
              >
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Verified</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((item, key) => (
                  <TableRow key={key}>
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      {item.isVerified ? 'Verified' : 'Not verified'}
                    </TableCell>
                    <TableCell>
                      <Button
                        id={item._id}
                        onClick={handleOpen}
                        variant="contained"
                      >
                        Reset passowrd
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </TableContainer>
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
                variant="h3"
                component="h2"
                sx={{ textAlign: 'center' }}
              >
                Reset Password !
              </Typography>
              <Typography variant="h5" sx={{ margin: 0, fontWeight: '300' }}>
                New Password
              </Typography>
              <TextField
                fullWidth
                autoComplete="newpassword"
                label="Enter your new password"
                type="password"
                sx={{ marginTop: '10px !important' }}
                value={newpassword1}
                onChange={(e) => setNewpassword1(e.target.value)}
              />

              <Typography variant="h5" sx={{ margin: 0, fontWeight: '300' }}>
                Confirm new Password
              </Typography>
              <TextField
                fullWidth
                autoComplete="confirmpassword"
                type="password"
                label="Confirm your password"
                sx={{ marginTop: '10px !important' }}
                value={newpassword2}
                onChange={(e) => setNewpassword2(e.target.value)}
              />

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
                  Save Change
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
      </Container>
    </Page>
  )
}

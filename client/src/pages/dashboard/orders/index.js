/* eslint-disable */
// material
import React, { useEffect } from 'react'
import { styled } from '@material-ui/core/styles'
// components
import Page from '../../../components/Page'

import {
  Container,
  Typography,
  Grid,
  Stack,
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@material-ui/core'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

import useAuth from 'hooks/useAuth'
import useDraw from 'hooks/useDraw'

const RootStyle = styled(Page)({
  paddingTop: 120,
  paddingBottom: 105,
  height: '100%',
})

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}))

const columns = [
  {
    id: 'name',
    label: 'Purchase Data',
    minWidth: 170,
  },
  {
    id: 'code',
    label: 'Event Time',
    minWidth: 100,
  },
  {
    id: 'population',
    label: 'Quantity',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Result',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
]

function createData(name, code, population, size) {
  const density = population / size
  return { name, code, population, size, density }
}

const rows = []

export default function Orders() {
  const { getTicketsByUserId, tickets } = useDraw()
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const { logout } = useAuth()

  const resultFilter = (result) => {
    switch (result) {
      case true:
        return 'Started'
      case false:
        return 'Finished'
      case 0:
        return 'Started'
      case 1:
        return 'Finished salesment and assignment'
      case 2:
        return 'Ended event'
      default:
        return 'TBD'
    }
  }

  useEffect(() => {
    // getTicketsByUserId('6182ba693bcffd36c8f05deb')
    getTicketsByUserId(currentUser._id)
  }, [])

  return (
    <RootStyle>
      <ContentStyle>
        <Container sx={{ minHeight: '600px' }}>
          <Typography
            variant="h3"
            component="h1"
            paragraph
            sx={{ textAlign: 'center', mt: 3 }}
          >
            My Account
          </Typography>

          <Grid container>
            <Grid item md={3}>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                }}
              >
                <ListItem>
                  <ListItemButton component="a" href="/dashboard">
                    Dashboard
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton component="a" href="/dashboard/order">
                    Orders
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton component="a" href="/dashboard/account">
                    Account Details
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton onClick={logout}>Logout</ListItemButton>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={9}>
              <Grid container sx={{ padding: '0 20px' }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={10}
                >
                  <Typography
                    variant="h5"
                    paragraph
                    sx={{ textAlign: 'center' }}
                  >
                    No order has been made yet.
                  </Typography>
                </Stack>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Purchase Data</TableCell>
                        <TableCell>Event Time</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Result</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tickets.map((ticket) => {
                        return (
                          <TableRow key={ticket._id}>
                            <TableCell>{ticket.purchaseData}</TableCell>
                            <TableCell>
                              {ticket.eventTime.split('T')[0]}
                            </TableCell>
                            <TableCell>{ticket.quantity}</TableCell>
                            <TableCell>{resultFilter(ticket.result)}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </ContentStyle>
    </RootStyle>
  )
}

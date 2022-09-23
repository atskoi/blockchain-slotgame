/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
  Stack,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Divider,
  useTheme,
} from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component'

import useDraw from 'hooks/useDraw'

export default function MainEventTab({ eventId }) {
  const theme = useTheme()
  const {
    getSearchData,
    users,
    expectedUsersAmount,
    clearUsers,
    getRandomTablesByUserId,
    currentDay
  } = useDraw()
  const [searchKey, setSearchKey] = useState('')
  const [pageSize, setPageSize] = useState(23)
  const [pageNumber, setPageNumber] = useState(1)
  const [selectedUserId, setSelectedUserId] = useState('')

  useEffect(() => {
    clearUsers()
    getSearchData(searchKey, { pageSize, pageNumber, eventId, currentDay })
    return () => clearUsers()
  }, [])

  const onSearch = (sKey) => {
    clearUsers()
    initializePageData()
    getSearchData(sKey, { pageSize, pageNumber, eventId, currentDay })
  }

  const getTablesByUser = (user) => {
    setSelectedUserId(user._id)
    getRandomTablesByUserId(user._id, currentDay)
  }

  const fetchNextData = () => {
    if (users.length !== expectedUsersAmount) {
      setPageSize(pageSize + 10)
      setPageNumber(pageNumber + 1)
      getSearchData(searchKey, { pageSize, pageNumber, eventId, currentDay })
    }
  }

  const initializePageData = () => {
    setPageSize(10)
    setPageNumber(1)
  }
  return (
    <Stack spacing={2}>
      <Stack direction="row">
        <TextField
          placeholder="Search..."
          variant="outlined"
          sx={{ width: '75%', color: 'black' }}
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Button
          sx={{ width: '25%', bgcolor: 'black', color: 'white' }}
          onClick={() => onSearch(searchKey)}
        >
          Search
        </Button>
      </Stack>
      <TableContainer sx={{ position: 'relative' }}>
        <InfiniteScroll
          dataLength={pageSize}
          hasMore={users.length === expectedUsersAmount ? false : true}
          next={fetchNextData}
          height={1200}
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
                <TableCell>Username</TableCell>
                <TableCell>Entries</TableCell>
                <TableCell>Tables</TableCell>
                <TableCell>Ticket Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users &&
                users.map((item, key) => (
                  <TableRow
                    key={key}
                    hover={true}
                    selected={selectedUserId === item._id ? true : false}
                    onClick={() => getTablesByUser(item)}
                  >
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.ticketAmount}</TableCell>
                    <TableCell>Views Table</TableCell>
                    <TableCell>
                      {item.winAmount && `${item.winAmount}W`}&nbsp;
                      {item.loseAmount && `${item.loseAmount}L`}
                      {!item.winAmount && !item.loseAmount && 'TBD'}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </TableContainer>
    </Stack>
  )
}

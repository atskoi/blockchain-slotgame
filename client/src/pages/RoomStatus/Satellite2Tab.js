/* eslint-disable */
import React from 'react'
import {
  Card,
  Stack,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core'
export default function Satellite2Tab() {
  return (
    <Stack spacing={2}>
      <Stack direction="row">
        <TextField
          placeholder="Search..."
          variant="outlined"
          sx={{ width: '75%', color: 'black' }}
        />
        <Button sx={{ width: '25%', bgcolor: 'black', color: 'white' }}>
          Search
        </Button>
      </Stack>
      <TableContainer sx={{ minHeight: 1200 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Entries</TableCell>
              <TableCell>Tables</TableCell>
              <TableCell>Ticket Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) => (
              <TableRow key={item}>
                <TableCell>smokeypetel123</TableCell>
                <TableCell>15</TableCell>
                <TableCell>View Table</TableCell>
                <TableCell>TBD OR 5L OR 10W</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

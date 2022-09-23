/* eslint-disable */

import React from 'react'
import { Paper, Typography } from '@material-ui/core'

export default function Ticket({ value }) {
  return (
    <Paper sx={{ bgcolor: 'white', color: 'red', px: 1 }}>
      <Typography color="inherit" variant="h3" fontSize={14}>
        {value}
      </Typography>
    </Paper>
  )
}

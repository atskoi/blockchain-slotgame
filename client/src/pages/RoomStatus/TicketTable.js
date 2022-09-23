/* eslint-disable */
import React, { useRef, useState, useLayoutEffect } from 'react'
import { Box, Avatar, Paper, Stack, Typography } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import Ticket from './Ticket'
import useDraw from 'hooks/useDraw'
import { SERVER_UPLOAD_URL } from 'utils/constants'

export default function TicketTable({ table }) {
  const { currentDay } = useDraw()
  const tableImage = useRef(null)
  const [centerX, setCenterX] = useState(0)
  const [centerY, setCenterY] = useState(0)

  useLayoutEffect(() => {
    function updateSize() {
      const { offsetWidth } = tableImage.current
      setCenterX(offsetWidth / 2)
      setCenterY((offsetWidth * 643) / 1227 / 2)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  let flagday = 0;
  flagday = table.seat[0].day;
  for (var i = table.seat.length - 1; i >= 0; i--) {
    if(table.seat[i].day < flagday) {
      flagday = table.seat[i].day;
    }
  }

  let card = [];
  for (var i = 0; i < table.seat.length; i++) {
    if(table.seat[i].day > flagday) card.push(i+1);
  }

  return (
    <Box position="relative">
      <Box ref={tableImage}>
        <img src="/images/table.png" alt="table" style={{ zIndex: 1 }} />
      </Box>
      <Box sx={{ position: 'absolute', top: '15%', width: '100%' }} zIndex={3}>
        <Stack direction="row" justifyContent="center">
          <Paper sx={{ width: 50, bgcolor: '#54D62C' }}>
            <Typography
              fontSize="8"
              color="white"
              align="center"
              fontWeight="bold"
            >
              {table.table % 2000}
            </Typography>
          </Paper>
        </Stack>
      </Box>

      {/*{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => {
        const positionY =
          centerY - 30 - (centerY + 5) * Math.sin((Math.PI * key * 2) / 10)
        const positionX =
          centerX - 30 + (centerX + 5) * Math.cos((Math.PI * key * 2) / 10)
        const matchedTicket = table.seat.find(
          (ticket) => ticket.history[ticket.history.length - 1].seat === key,
        )
        if (matchedTicket) {
          return (
            <Box
              key={key}
              position="absolute"
              sx={{ top: positionY, right: positionX }}
              zIndex={2}
            >
              <Stack spacing={-1}>
                <Stack direction="row" justifyContent="center">
                  <Avatar
                    sx={{
                      bgcolor: '#000',
                      color: 'white',
                      border: matchedTicket.history.length > currentDay && '1px solid red',
                    }}
                  >
                    <PersonIcon />
                  </Avatar>
                </Stack>
                <Stack direction="row" justifyContent="center">
                  <Paper
                    sx={{
                      bgcolor: 'black',
                      color: 'white',
                      p: 0.5,
                      fontSize: 9,
                      minWidth: 70,
                    }}
                  >
                    <Typography align="center" fontSize="inherit">
                      {matchedTicket.user_id.username}
                    </Typography>
                  </Paper>
                </Stack>
              </Stack>
            </Box>
          )
        }
        return (
          <Box
            key={key}
            position="absolute"
            sx={{ top: positionY, right: positionX }}
            zIndex={2}
          >
            <Avatar src="/images/emptySeat.png" alt="empty seat" />
          </Box>
        )
      })}*/}
      {table.seat.map((matchedTicket, key) => {
        const positionY =
          centerY - 30 - (centerY + 5) * Math.sin((Math.PI * key * 2) / 10)
        const positionX =
          centerX - 30 + (centerX + 5) * Math.cos((Math.PI * key * 2) / 10)
        if (matchedTicket) {
          return (
            <Box
              key={key}
              position="absolute"
              sx={{ top: positionY, right: positionX }}
              zIndex={2}
            >
              <Stack spacing={-1}>
                <Stack direction="row" justifyContent="center">
                  {matchedTicket.user_id.avatar ? (
                    <Avatar
                      src={
                        SERVER_UPLOAD_URL + matchedTicket.user_id.avatar.name
                      }
                      alt={matchedTicket.user_id.avatar.name}
                      sx={{
                        bgcolor: '#000',
                        color: 'white',
                        border:
                          matchedTicket.day > flagday &&
                          '2px solid yellow',
                        // border: matchedTicket.status && '1px solid red',
                      }}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        bgcolor: '#000',
                        color: 'white',
                        border:
                          matchedTicket.day > flagday &&
                          '1px solid yellow',
                        // border: matchedTicket.status && '1px solid red',
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                  )}
                </Stack>
                <Stack direction="row" justifyContent="center">
                  <Paper
                    sx={{
                      bgcolor: 'black',
                      color: 'white',
                      p: 0.5,
                      fontSize: 9,
                      minWidth: 70,
                    }}
                  >
                    <Typography align="center" fontSize="inherit">
                      {matchedTicket.user_id.username}
                    </Typography>
                  </Paper>
                </Stack>
              </Stack>
            </Box>
          )
        }
        return (
          <Box
            key={key}
            position="absolute"
            sx={{ top: positionY, right: positionX }}
            zIndex={2}
          >
            <Avatar src="/images/emptySeat.png" alt="empty seat" />
          </Box>
        )
      })}
      <Box position="absolute" sx={{ top: '35%' }} width="100%">
        <Stack direction="row" justifyContent="center" spacing={1}>
          {card.map(
            (ticket, key) =>
              (
                <Ticket
                  key={key}
                  value={ticket}
                />
              ),
          )}
        </Stack>
      </Box>
    </Box>
  )
}

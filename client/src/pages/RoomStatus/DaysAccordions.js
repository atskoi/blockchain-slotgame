/* eslint-disable */
import React, { useEffect } from 'react'
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Button,
  Stack,
} from '@material-ui/core'
import { LoadingButton } from '@material-ui/lab'
import { ExpandMore } from '@material-ui/icons'
import useDraw from 'hooks/useDraw'

const generateMockData = (dayNumber) => {
  const mockData = []
  for (let i = 1; i <= dayNumber; i += 1) {
    let mockDataItem = { number: i, rooms: [] }
    ;['A', 'B', 'C', 'D'].map((item) => {
      mockDataItem.rooms.push({ name: i + '-' + item })
    })
    mockData.push(mockDataItem)
  }
  return mockData
}

export default function DaysAccordion() {
  const mockData = generateMockData(4)
  const { getRandomTablesByDayIdAndRoomNumber, days, getAllDays } = useDraw()

  useEffect(() => {
    getAllDays()
  }, [])

  const getTables = (data = null) => {
    getRandomTablesByDayIdAndRoomNumber(data)
  }

  let roomname = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  return (
    <Box mt={5}>
      {days.length > 0
        ? days.map((item, key) => (
            <Accordion key={key}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Day {item.daynumber}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={1}>
                  {item.room.sort((a1, a2) => a1.roomnumber - a2.roomnumber).map((item2, key2) => (
                    <Button
                      variant="contained"
                      onClick={() =>
                        getTables({
                          dayId: item._id,
                          dayNum: item.daynumber,
                          roomnumber: item2.roomnumber,
                        })
                      }
                      key={key2}
                    >
                      Room {roomname[item2.roomnumber]}
                    </Button>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))
        : ''}
    </Box>
  )
}

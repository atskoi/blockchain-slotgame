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
  const {
    getRandomTablesByDayIdAndRoomNumber,
    days,
    getRandomTables,
  } = useDraw()

  const getTables = (data = null) => {
    getRandomTables()
  }
  return (
    <Box mt={5}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Day 1 afdafasdf</Typography>
          <Typography>Day 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1}>
            <Button variant="contained" onClick={() => getTables()}>
              Day 1-A
            </Button>
            <Button variant="contained" onClick={() => getTables()}>
              Day 1-B
            </Button>
            <Button variant="contained" onClick={() => getTables()}>
              Day 1-C
            </Button>
            <Button variant="contained" onClick={() => getTables()}>
              Day 1-D
            </Button>
            <Button variant="contained" onClick={() => getTables()}>
              Day 1-E
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Day 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1}>
            <Button variant="contained" onClick={() => getTables()}>
              Day 2-A
            </Button>
            <Button variant="contained" onClick={() => getTables()}>
              Day 2-B
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Day 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1}>
            <Button variant="contained" onClick={() => getTables()}>
              Day 3-A
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Day 4</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1}>
            <Button variant="contained" onClick={() => getTables()}>
              Day 4-A
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Day 5</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1}>
            <Button variant="contained" onClick={() => getTables()}>
              Day 5-A
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Day 6</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1}>
            <Button variant="contained" onClick={() => getTables()}>
              Day 6-A
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Day 7</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1}>
            <Button variant="contained" onClick={() => getTables()}>
              Day 7-A
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
      {/* {days.length > 0
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
                  {item.rooms.map((item2, key2) => (
                    <Button
                      variant="contained"
                      onClick={() =>
                        getTables({
                          dayId: item._id,
                          roomnumber: item2.roomnumber,
                        })
                      }
                      key={key2}
                    >
                      Room {item2.roomnumber}
                    </Button>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))
        : ''} */}
    </Box>
  )
}

/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Stack, Box, Tabs, Tab, Card } from '@material-ui/core'
import { capitalCase } from 'change-case'

import SatelliteTab from './SatlliteTab'
import MainEventTab from './MainEventTab'
import useDraw from 'hooks/useDraw'


export default function UserList({ setIsVisibleDaysAccordion }) {
  const { getEventById, current_event } = useDraw()
  const [currentTab, setCurrentTab] = useState('main_event')
  const [tabs, setTabs] = useState([])

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue)
  }

  useEffect(async () => {
    await getEventById()
  }, [])

  useEffect(() => {
    const tempTabs = []
    if (current_event) {
      tempTabs.push({
        value: 'main_event',
        component: <MainEventTab eventId={current_event._id} />,
      })
      for (let i = 0; i < current_event.satellite.length; i += 1) {
        tempTabs.push({
          value: `satellite_${i + 1}`,
          component: (
            <SatelliteTab satelliteEventId={current_event.satellite[i]._id} />
          ),
        })
      }
    }
    setTabs(tempTabs)
  }, [current_event])

  useEffect(() => {
    if (currentTab === 'main_event') {
      setIsVisibleDaysAccordion(true)
    } else {
      setIsVisibleDaysAccordion(false)
    }
  }, [currentTab])

  return (
    <Stack spacing={3}>
      <Box>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={handleChangeTab}
        >
          {tabs.map((item) => (
            <Tab
              disableRipple
              key={item.value}
              value={item.value}
              icon={item.icon}
              label={capitalCase(item.value)}
              variant="contained"
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((item, key) => {
        const isMatched = item.value === currentTab
        return (
          isMatched && (
            <Card sx={{ padding: 3 }} key={key}>
              {item.component}
            </Card>
          )
        )
      })}
    </Stack>
  )
}

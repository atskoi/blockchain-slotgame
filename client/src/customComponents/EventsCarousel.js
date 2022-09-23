import { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
// material
import { useTheme, styled } from '@material-ui/core/styles'
import {
  Box,
  Paper,
  Typography,
  Stack,
  Card,
  Button,
  useMediaQuery,
} from '@material-ui/core'
import { CarouselControlsArrowsBasic3 } from '../components/carousel/controls'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  // overflow: 'hidden',
  position: 'relative',
  '& .slick-slide': {
    opacity: 0.2,
    transition: 'all .5s',
  },
  '& .slick-center': {
    transform: 'scale(1.3)',
    opacity: 1,
  },
}))
// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
}

function CarouselItem({ currentEvent, item, index }) {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const register = (index, item) => {
    let user = localStorage.getItem('user')
    let cart = localStorage.getItem('cart')
    localStorage.setItem('currentProductIndex', index)
    if (user === null) {
      window.location.href = '/auth/login'
    }

    const userInfo = JSON.parse(user)
    const cartInfo = JSON.parse(cart)

    if (index === 0) {
      if (cartInfo.length === 0) {
        cartInfo.push({
          index: index,
          user_id: userInfo._id,
          event: currentEvent._id,
          price: item.price,
          username: userInfo.username,
          qty: 0,
        })

        window.localStorage.setItem('cart', JSON.stringify(cartInfo))
      } else {
        let exist = cartInfo.filter((item) => item.index === index)
        if (exist.length === 0) {
          cartInfo.push({
            index: index,
            user_id: userInfo._id,
            event: currentEvent._id,
            price: item.price,
            username: userInfo.username,
            qty: 0,
          })

          window.localStorage.setItem('cart', JSON.stringify(cartInfo))
        }
      }
    } else {
      if (cartInfo.length === 0) {
        cartInfo.push({
          index: index,
          user_id: userInfo._id,
          eventId: currentEvent._id,
          satelliteId: item._id,
          price: item.price,
          qty: 0,
        })

        window.localStorage.setItem('cart', JSON.stringify(cartInfo))
      } else {
        let exist = cartInfo.filter((item) => item.index === index)
        if (exist.length === 0) {
          cartInfo.push({
            index: index,
            user_id: userInfo._id,
            eventId: currentEvent._id,
            satelliteId: item._id,
            price: item.price,
            qty: 0,
          })

          window.localStorage.setItem('cart', JSON.stringify(cartInfo))
        }
      }
    }

    window.location.href = '/purchaseTicket'
  }
  return (
    <Box
      sx={{
        textAlign: 'center',
        mx: 1,
        borderRadius: 1,
        display: 'flex',
        justifyContent: 'center',
        height: 400,
        boxShadow: '0px 4px 31px rgba(0, 0, 0, 0.11)',
        position: 'relative',
        my: 10,
      }}
    >
      {index === 0 ? (
        <Card
          sx={{
            px: 4,
            py: 3,
            backgroundColor: '#000',
            borderRadius: 0,
            width: '100%',
          }}
        >
          <Stack spacing={2}>
            <Typography
              sx={{ fontSize: { xs: 18, sm: 22, md: 26, lg: 30 } }}
              color="common.white"
            >
              Main Event
            </Typography>
            <Stack>
              {isDesktop ? (
                <Typography
                  sx={{ fontSize: { xs: 14, sm: 18, md: 22, lg: 26 } }}
                  color="common.white"
                >
                  Entry Fee
                </Typography>
              ) : (
                ''
              )}

              <Typography
                sx={{ fontSize: { xs: 22, sm: 26, md: 30, lg: 34 } }}
                fontWeight="bold"
              >
                ${item.price}
              </Typography>
            </Stack>
            <Paper
              sx={{
                backgroundColor: 'common.white',
                py: 3,
                height: { xs: 20, sm: 40, md: 60, lg: 80 },
              }}
            ></Paper>
            <Button
              variant="contained"
              color="success"
              sx={{
                color: 'common.white',
                textTransform: 'uppercase',
                fontSize: { xs: 12, sm: 16, md: 20, lg: 24 },
              }}
              onClick={() => register(index, item)}
            >
              Register Now
            </Button>
          </Stack>
        </Card>
      ) : (
        <Card
          sx={{
            px: 4,
            py: 4,
            backgroundColor:
              index % 2 === 1 ? '#29B2FE' : theme.palette.grey[500],
            borderRadius: 0,
            width: '100%',
          }}
        >
          <Stack spacing={2}>
            <Typography
              sx={{ fontSize: { xs: 18, sm: 22, md: 26, lg: 30 } }}
              color="common.white"
            >
              Satellite Event {index}
            </Typography>
            <Stack>
              <Typography
                sx={{ fontSize: { xs: 14, sm: 18, md: 22, lg: 26 } }}
                color="common.white"
              >
                Entry Fee
              </Typography>
              <Typography
                sx={{ fontSize: { xs: 22, sm: 26, md: 30, lg: 34 } }}
                fontWeight="bold"
              >
                ${item.price}
              </Typography>
            </Stack>
            <Paper sx={{ backgroundColor: 'common.white', py: 2 }}>
              <Typography
                align="center"
                color="common.black"
                sx={{ fontSize: { xs: 6, sm: 10, md: 14, lg: 18 } }}
              >
                Total entries:{' '}
                <Typography
                  sx={{ fontSize: { xs: 6, sm: 10, md: 14, lg: 18 } }}
                  component="span"
                  color="primary"
                >
                  {item.entries}
                </Typography>
              </Typography>
              <Typography
                sx={{ fontSize: { xs: 6, sm: 10, md: 14, lg: 18 } }}
                align="center"
                color="common.black"
              >
                Total Winners:{' '}
                <Typography
                  sx={{ fontSize: { xs: 6, sm: 10, md: 14, lg: 18 } }}
                  component="span"
                  color="primary"
                >
                  {item.winners}
                </Typography>
              </Typography>
            </Paper>
            <Button
              variant="contained"
              color="success"
              sx={{
                color: 'common.white',
                textTransform: 'uppercase',
                fontSize: { xs: 12, sm: 16, md: 20, lg: 24 },
              }}
              size="large"
              onClick={() => register(index, item)}
            >
              Register Now
            </Button>
          </Stack>
        </Card>
      )}
    </Box>
  )
}

export default function EventsCarousel({ current_event }) {
  const carouselRef = useRef()
  const [events, setEvents] = useState([])

  const settings = {
    slidesToShow: 3,
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 960,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' },
      },
    ],
  }

  const handlePrevious = () => {
    carouselRef.current.slickPrev()
  }

  const handleNext = () => {
    carouselRef.current.slickNext()
  }

  useEffect(() => {
    const tempEvents = []
    if (current_event) {
      tempEvents.push(current_event.main)
      current_event.satellite.map((item) => tempEvents.push(item))
    }
    setEvents(tempEvents)
  }, [current_event])
  return (
    <RootStyle>
      <Slider ref={carouselRef} {...settings}>
        {events.map((item, key) => (
          <CarouselItem
            key={key}
            item={item}
            currentEvent={current_event}
            index={key}
          />
        ))}
      </Slider>
      <CarouselControlsArrowsBasic3
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </RootStyle>
  )
}

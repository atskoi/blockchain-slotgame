import Slider from 'react-slick'
import PropTypes from 'prop-types'
import { useRef } from 'react'
// material
import { useTheme, styled } from '@material-ui/core/styles'
import { Box, Stack, Typography, Button } from '@material-ui/core'
// utils
import mockData from '../../utils/mock-data'
import { MotionInView, varFadeInUp, varFadeInDown } from '../animate'

//
import {
  CarouselControlsPaging2,
  CarouselControlsArrowsBasic2,
} from './controls'

// ----------------------------------------------------------------------

const MOCK_CAROUSELS = [...Array(5)].map((_, index) => ({
  id: mockData.id(index),
  title: mockData.text.title(index),
  image: mockData.image.feed(index),
  description: mockData.text.description(index),
}))

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  '& .slick-list': {
    // boxShadow: theme.customShadows.z16,
    // borderRadius: theme.shape.borderRadiusMd
  },
}))

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
}

function CarouselItem({ item }) {
  const { image, title } = item

  return (
    <Box position="relative">
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: '100%', height: 580, objectFit: 'cover', zIndex: 1 }}
      />
      <Box
        position="absolute"
        sx={{
          position: 'absolute',
          top: '30%',
          width: '100%',
          zIndex: 2,
          color: 'common.white',
        }}
      >
        <Stack spacing={1}>
          <Stack>
            <MotionInView variants={varFadeInUp}>
              <Typography
                fontSize={{ xs: 36, sm: 40, md: 44, lg: 48 }}
                fontWeight="bold"
                align="center"
                sx={{ textTransform: 'uppercase' }}
              >
                WELCOME TO WNOC
              </Typography>
              <Typography
                fontSize={{ xs: 16, sm: 20, md: 24, lg: 28 }}
                align="center"
                sx={{ textTransform: 'uppercase' }}
              >
                Where everyone has a fair chance at the prizes!
              </Typography>
            </MotionInView>
          </Stack>
          <Stack direction="row" justifyContent="center">
            <MotionInView variants={varFadeInUp}>
              <Typography
                fontSize={{ xs: 12, sm: 14, md: 16, lg: 20 }}
                align="center"
                maxWidth={850}
              >
                Sign up today to secure yourself a seat in the main event! The
                main-event starting date will be announced on social media!
                Follow us to stay tuned on the upcoming news for this
                one-in-a-lifetime chance at some of the most prestigious prizes.
              </Typography>
            </MotionInView>
          </Stack>
          <MotionInView variants={varFadeInDown}>
            <Typography align="center">
              <Button
                variant="contained"
                color="success"
                sx={{
                  px: 4,
                  color: 'common.white',
                  fontSize: { xs: 12, sm: 14, md: 16, lg: 20 },
                  textTransform: 'uppercase',
                }}
              >
                sign up now
              </Button>
            </Typography>
          </MotionInView>
        </Stack>
      </Box>
    </Box>
  )
}

export default function CarouselBasic3() {
  const theme = useTheme()
  const carouselRef = useRef()

  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselControlsPaging2({
      sx: { mt: -4 },
    }),
  }

  const handlePrevious = () => {
    carouselRef.current.slickPrev()
  }

  const handleNext = () => {
    carouselRef.current.slickNext()
  }

  return (
    <RootStyle>
      <Slider ref={carouselRef} {...settings}>
        {MOCK_CAROUSELS.map((item) => (
          <CarouselItem key={item.title} item={item} />
        ))}
      </Slider>
      <CarouselControlsArrowsBasic2
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </RootStyle>
  )
}

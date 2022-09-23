import React, { useRef } from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
// material
import { styled } from '@material-ui/core/styles'
import { Box, Typography, CardContent, Stack } from '@material-ui/core'
// utils
import { CarouselControlsArrowsBasic2 } from './controls'

// ----------------------------------------------------------------------

const MOCK_CAROUSELS = [
  {
    title: 'Musical',
    image: '/images/guitar.png',
    description: 'Instruments',
  },
  {
    title: 'Musical',
    image: '/images/tools.png',
    description: 'Instruments',
  },
  {
    title: 'Musical',
    image: '/images/camera.png',
    description: 'Instruments',
  },
  {
    title: 'Musical',
    image: '/images/speaker.png',
    description: 'Instruments',
  },
  {
    title: 'Musical',
    image: '/images/gears.png',
    description: 'Instruments',
  },
  {
    title: 'Musical',
    image: '/images/guitar.png',
    description: 'Instruments',
  },
  {
    title: 'Musical',
    image: '/images/tools.png',
    description: 'Instruments',
  },
  {
    title: 'Musical',
    image: '/images/camera.png',
    description: 'Instruments',
  },
  {
    title: 'Musical',
    image: '/images/speaker.png',
    description: 'Instruments',
  },
  {
    title: 'Musical',
    image: '/images/gears.png',
    description: 'Instruments',
  },
]
const RootStyle = styled('div')(({ theme }) => ({
  // overflow: 'hidden',
  position: 'relative',
}))
// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
}

function CarouselItem({ item }) {
  const { image, title } = item

  return (
    <Box
      sx={{
        textAlign: 'center',
        mx: 1,
        borderRadius: 1,
        display: 'flex',
        justifyContent: 'center',
        height: 270,
        background: '#FFFFFF',
        boxShadow: '0px 4px 31px rgba(0, 0, 0, 0.11)',
        position: 'relative',
        mt: 10,
        mb: 5,
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          transform: 'translateY(-50px)',
          borderRadius: '50%',
          width: 138,
          height: 138,
          background: '#FFFFFF',
          boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.22)',
        }}
      >
        <Box component="img" src={image} />
      </Stack>
      <CardContent
        sx={{
          bottom: 0,
          zIndex: 9,
          width: '100%',
          textAlign: 'left',
          position: 'absolute',
        }}
      >
        <Typography variant="h4" paragraph>
          {title}
        </Typography>
      </CardContent>
    </Box>
  )
}

export default function CarouselCenterMode() {
  const carouselRef = useRef()

  const settings = {
    slidesToShow: 5,
    arrows: false,
    // centerMode: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    // centerPadding: '60px',
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

  return (
    <RootStyle>
      <Slider ref={carouselRef} {...settings}>
        {MOCK_CAROUSELS.map((item, index) => (
          <CarouselItem key={index} item={item} />
        ))}
      </Slider>
      <CarouselControlsArrowsBasic2
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </RootStyle>
  )
}

import React, { useRef } from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
// material
import { styled } from '@material-ui/core/styles'
import { Box, CardContent } from '@material-ui/core'
//
import { CarouselControlsArrowsBasic3 } from './controls'

// ----------------------------------------------------------------------

const MOCK_CAROUSELS = [...Array(8)].map((_, index) => ({
  id: index,
  title: 'Musical',
  image: '/images/city1.png',
  description: 'Instruments',
}))

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

function CarouselItem({ item }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        mx: 1,
        borderRadius: 1,
        display: 'flex',
        justifyContent: 'center',
        height: 270,
        boxShadow: '0px 4px 31px rgba(0, 0, 0, 0.11)',
        position: 'relative',
        my: 10,
        background: `url(${item.image})`,
      }}
    >
      <CardContent
        sx={{
          bottom: 0,
          zIndex: 9,
          width: '100%',
          textAlign: 'left',
          position: 'absolute',
        }}
      >
        {/* <Typography variant="h4" paragraph>
          {title}
        </Typography> */}
      </CardContent>
    </Box>
  )
}

export default function CarouselCenterMode() {
  const carouselRef = useRef()

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

  return (
    <RootStyle>
      <Slider ref={carouselRef} {...settings}>
        {MOCK_CAROUSELS.map((item) => (
          <CarouselItem key={item.title} item={item} />
        ))}
      </Slider>
      <CarouselControlsArrowsBasic3
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </RootStyle>
  )
}

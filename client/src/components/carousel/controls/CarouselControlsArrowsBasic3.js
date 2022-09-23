import React from 'react'
import { Icon } from '@iconify/react'
import arrowBackFill from '@iconify/icons-eva/arrow-back-fill'
import arrowForwardFill from '@iconify/icons-eva/arrow-forward-fill'
// material
import { useTheme, styled } from '@material-ui/core/styles'
import { IconButton, Box } from '@material-ui/core'
// ----------------------------------------------------------------------

const SIZE = 60

const ICON_SIZE = {
  width: 32,
  height: 32,
}

const RootStyle = styled(Box)(({ theme }) => ({
  top: 0,
  bottom: 0,
  zIndex: 9,
  height: SIZE,
  width: 'calc(100% + 60px)',
  transform: 'translate(-30px, 20px)',
  margin: 'auto',
  display: 'flex',
  position: 'absolute',
  justifyContent: 'space-between',
}))

const ArrowStyle = styled(IconButton)(({ theme }) => ({
  width: SIZE,
  height: SIZE,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  background: theme.palette.primary.main,
  borderRadius: '50%',
  transition: theme.transitions.create('opacity'),
  boxShadow: '0px 2px 28px rgb(0, 0, 0, 0.27)',
  '&:hover': {
    opacity: 1,
    background: theme.palette.primary.main,
  },
}))

// ----------------------------------------------------------------------

export default function CarouselControlsArrowsBasic3({
  arrowLine,
  onNext,
  onPrevious,
  ...other
}) {
  const theme = useTheme()
  const isRTL = theme.direction === 'rtl'

  return (
    <RootStyle {...other}>
      <ArrowStyle size="small" onClick={onPrevious}>
        <Icon icon={isRTL ? arrowForwardFill : arrowBackFill} {...ICON_SIZE} />
      </ArrowStyle>

      <ArrowStyle size="small" onClick={onNext}>
        <Icon icon={isRTL ? arrowBackFill : arrowForwardFill} {...ICON_SIZE} />
      </ArrowStyle>
    </RootStyle>
  )
}

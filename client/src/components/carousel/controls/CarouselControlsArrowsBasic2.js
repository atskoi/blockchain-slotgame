import PropTypes from 'prop-types'

import { Icon } from '@iconify/react'
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill'
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill'
// material
import { useTheme, styled } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
//
import { MIconButton } from '../../@material-extend'

// ----------------------------------------------------------------------

const SIZE = 64

const ICON_SIZE = {
  width: 40,
  height: 40,
}

const RootStyle = styled(Box)(({ theme }) => ({
  top: 0,
  bottom: 0,
  zIndex: 9,
  height: SIZE,
  width: 'calc(100% + 100px)',
  transform: 'translate(-50px, 20px)',
  margin: 'auto',
  display: 'flex',
  position: 'absolute',
  justifyContent: 'space-between',
}))

const ArrowStyle = styled(MIconButton)(({ theme }) => ({
  width: SIZE,
  height: SIZE,
  opacity: 0.48,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.black,
  background: theme.palette.common.white,
  borderRadius: '50%',
  transition: theme.transitions.create('opacity'),
  boxShadow: '0px 2px 28px rgba(0, 0, 0, 0.27)',
  '&:hover': {
    opacity: 1,
    // background: theme.palette.grey[900]
  },
}))

// ----------------------------------------------------------------------

CarouselControlsArrowsBasic2.propTypes = {
  arrowLine: PropTypes.bool,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
}

export default function CarouselControlsArrowsBasic2({
  arrowLine,
  onNext,
  onPrevious,
  ...other
}) {
  const theme = useTheme()
  const isRTL = theme.direction === 'rtl'

  return (
    <RootStyle {...other}>
      <ArrowStyle size="small" onClick={onPrevious} sx={{ marginLeft: 8 }}>
        {arrowLine ? (
          <Icon
            icon={isRTL ? arrowIosForwardFill : arrowIosBackFill}
            {...ICON_SIZE}
          />
        ) : (
          <Icon
            icon={isRTL ? arrowIosForwardFill : arrowIosBackFill}
            {...ICON_SIZE}
          />
        )}
      </ArrowStyle>

      <ArrowStyle size="small" onClick={onNext} sx={{ marginRight: 8 }}>
        {arrowLine ? (
          <Icon
            icon={isRTL ? arrowIosBackFill : arrowIosForwardFill}
            {...ICON_SIZE}
          />
        ) : (
          <Icon
            icon={isRTL ? arrowIosBackFill : arrowIosForwardFill}
            {...ICON_SIZE}
          />
        )}
      </ArrowStyle>
    </RootStyle>
  )
}

/* eslint-disable */
import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import plusFill from '@iconify/icons-eva/plus-fill'
import minusFill from '@iconify/icons-eva/minus-fill'
import { Box, Typography } from '@material-ui/core'
import { MIconButton } from '../components/@material-extend'

export default function Incrementer({setQuantity, available, quantity}) {

  const incrementQuantity = () => {
    setQuantity(quantity + 1)
  }
  const decrementQuantity = () => {
    setQuantity(quantity - 1)
  }

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
        backgroundColor: 'black',
        color: 'white',
      }}
    >
      <MIconButton
        size="small"
        color="inherit"
        disabled={quantity <= 1}
        onClick={decrementQuantity}
      >
        <Icon icon={minusFill} width={16} height={16} />
      </MIconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{
          width: 40,
          textAlign: 'center',
          display: 'inline-block',
        }}
      >
        {quantity}
      </Typography>
      <MIconButton
        size="small"
        color="inherit"
        disabled={quantity >= available}
        onClick={incrementQuantity}
      >
        <Icon icon={plusFill} width={16} height={16} />
      </MIconButton>
    </Box>
  )
}

/* eslint-disable */
import React, { useState } from 'react'
import { Grid, Box, Typography, Avatar, Stack } from '@material-ui/core'
import { Icon } from '@iconify/react'
import { useDropzone } from 'react-dropzone'
import roundAddAPhoto from '@iconify/icons-ic/round-add-a-photo'
import { alpha, styled } from '@material-ui/core/styles'
import IconButton from 'theme/overrides/IconButton'
import { SERVER_UPLOAD_URL } from 'utils/constants'
import useAuth from 'hooks/useAuth'
import useDraw from 'hooks/useDraw'
import { MotionInView, varFadeInDown, varFadeInLeft } from 'components/animate'

const RootStyle = styled('div')(({ theme }) => ({
  width: 144,
  height: 144,
  margin: 'auto',
  borderRadius: '50%',
  padding: theme.spacing(1),
  border: `1px dashed ${theme.palette.grey[500_32]}`,
}))

const DropZoneStyle = styled('div')({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '50%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9,
    },
  },
})

const PlaceholderStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': { opacity: 0.72 },
}))

export default function ChooseAvatar({ avatar, setAvatar }) {
  const { avatars } = useDraw()
  const [isVisibleAvatarPack, setIsVisibleAvatarPack] = useState(false)
  const selectAvatar = (avatarItem) => {
    setAvatar(avatarItem._id)
  }
  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={4}>
        <RootStyle>
          <DropZoneStyle
            onClick={() => setIsVisibleAvatarPack(!isVisibleAvatarPack)}
          >
            {avatar && (
              <Box
                component="img"
                alt="avatar"
                src={SERVER_UPLOAD_URL + avatar.name}
                sx={{ zIndex: 8, objectFit: 'cover' }}
              />
            )}
            <PlaceholderStyle
              className="placeholder"
              sx={{
                ...(avatar && {
                  opacity: 0,
                  color: 'common.white',
                  bgcolor: 'grey.900',
                  '&:hover': { opacity: 0.72 },
                }),
              }}
            >
              <Box
                component={Icon}
                icon={roundAddAPhoto}
                sx={{ width: 24, height: 24, mb: 1 }}
              />
              <Typography variant="caption">
                {avatar ? 'Update image' : 'Set image'}
              </Typography>
            </PlaceholderStyle>
          </DropZoneStyle>
        </RootStyle>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        {isVisibleAvatarPack && (
          <MotionInView variants={varFadeInLeft}>
            <Stack direction="row" flexWrap="wrap">
              {avatars.map((item2, index) => (
                <Avatar
                  key={index}
                  index={index}
                  sx={{ margin: 1 }}
                  src={SERVER_UPLOAD_URL + item2.name}
                  alt={item2.name}
                  onClick={() => setAvatar(item2)}
                />
              ))}
            </Stack>
          </MotionInView>
        )}
      </Grid>
    </Grid>
  )
}

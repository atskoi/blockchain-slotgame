import React from 'react'
import { Icon } from '@iconify/react'
import homeFill from '@iconify/icons-eva/home-fill'

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
}

const menuConfig = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
  },
  {
    title: 'Portfolio',
    path: '/portfolio',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
  },
  {
    title: 'Product',
    path: '/productPage',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
  },
  {
    title: 'Room status',
    path: '/roomStatus',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
  },
  {
    title: 'About us',
    path: '/aboutUs',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
  },
  {
    title: 'Contact us',
    path: '/contactUs',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
  },
]

export default menuConfig

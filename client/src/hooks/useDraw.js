import { useContext } from 'react'
import { DrawContext } from '../contexts/DrawContext'

// ----------------------------------------------------------------------

const useDraw = () => useContext(DrawContext)

export default useDraw

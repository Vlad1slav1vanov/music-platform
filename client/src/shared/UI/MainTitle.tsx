import { Typography } from '@mui/material'
import React from 'react'

interface MainTitleProps {
  children: React.ReactNode
}

const MainTitle: React.FC<MainTitleProps> = ({ children }) => {
  return (
    <Typography
    variant='h4'
    fontWeight={800}
    >
      {children}
    </Typography>
  )
}

export default MainTitle

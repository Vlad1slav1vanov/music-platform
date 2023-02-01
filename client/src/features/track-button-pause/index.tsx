import { IconButton } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { Pause } from '@mui/icons-material'
import React from 'react'

const TrackButtonPause: React.FC = () => {
  return (
    <IconButton>
      <Pause
      fontSize='large'
      color='secondary'
      />
    </IconButton>
  )
}

export default observer(TrackButtonPause)

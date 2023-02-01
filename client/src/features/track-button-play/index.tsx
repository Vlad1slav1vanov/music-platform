import { IconButton } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { PlayCircle } from '@mui/icons-material'

import React from 'react'

const TrackButtonPlay: React.FC = () => {
  return (
    <IconButton>
      <PlayCircle
      fontSize='large'
      color='secondary'
      />
    </IconButton>
  )
}

export default observer(TrackButtonPlay)

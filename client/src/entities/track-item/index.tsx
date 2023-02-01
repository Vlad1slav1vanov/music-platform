import { Card } from '@mui/material'
import TrackButtonPlay from 'features/track-button-play'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { url } from 'shared/consts/url'
import { type ITrack } from 'shared/models/track'
import './styles/index.scss'

interface TrackItemProps {
  track: ITrack
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const navigate = useNavigate()

  return (
    <Card
    onClick={() => { navigate(`${track._id}`) }}
    className='track-item'
    >
      <TrackButtonPlay />
      <img
      src={url + track.picture}
      alt={`${track.artist}, ${track.name}`}
      className='track-item__picture'
      />
      <div className='track-item__info-wrapper'>
        <span className='track-item__name'>
          {track.name}
        </span>
        <span className='track-item__artist'>
          {track.artist}
        </span>
      </div>
    </Card>
  )
}

export default observer(TrackItem)

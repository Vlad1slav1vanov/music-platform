import { observer } from 'mobx-react-lite'
import React from 'react'
import MainTitle from 'shared/UI/MainTitle'
import TrackList from 'widgets/track-list'
import './styles/index.scss'

const TracksListPage: React.FC = () => {
  return (
    <div className='tracks-page'>
      <MainTitle>Треки</MainTitle>
      <TrackList />
    </div>
  )
}

export default observer(TracksListPage)

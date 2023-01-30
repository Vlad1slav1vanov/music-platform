import { observer } from 'mobx-react-lite'
import React from 'react'
import TrackList from 'widgets/track-list'

const TracksListPage: React.FC = () => {
  return (
    <div className='tracks-page'>
      <TrackList tracks={[]} />
    </div>
  )
}

export default observer(TracksListPage)
